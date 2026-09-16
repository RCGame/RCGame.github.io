const PIE_CHART_ENUMS = {
  practiceCategory: {
    0: "FlashCard",
    1: "FullFlowSheetMusic",
    2: "RealSongs",
    3: "MusicTheory"
  },
  practiceMode: {
    0: "PitchOnly",
    1: "Rhythm"
  },
  musicTheoryCategory: {
    0: "Scale",
    1: "Chord",
    2: "Rhythm",
    3: "Aural"
  }
};

const PIE_CHART_META = [
  {
    title: "Sessions by practice category",
    description: "Percentage of all sessions in each practice category.",
    emptyMessage: "No practice category data found."
  },
  {
    title: "FullFlowSheetMusic sessions by practice mode",
    description: "Percentage of FullFlowSheetMusic sessions using each practice mode.",
    emptyMessage: "No FullFlowSheetMusic practice-mode data found."
  },
  {
    title: "MusicTheory sessions by category",
    description: "Percentage of MusicTheory sessions in each music-theory category.",
    emptyMessage: "No MusicTheory category data found."
  }
];

let renderedCharts = [];

window.addEventListener("tableviewer:data", (event) => {
  renderPieCharts(event.detail.items);
});

window.addEventListener("tableviewer:clear", clearPieCharts);

function renderPieCharts(items) {
  clearPieCharts();

  if (typeof Chart === "undefined") {
    setChartMessage("Chart.js failed to load.", true);
    return;
  }

  const keys = findDataKeys(items);
  const rowsByChart = [
    buildPercentageRows(items, keys.practiceCategory, PIE_CHART_ENUMS.practiceCategory, true),
    buildPracticeModeRows(items, keys.practiceCategory, keys.practiceMode),
    buildMusicTheoryRows(items, keys.practiceCategory, keys.musicTheoryCategory)
  ];

  rowsByChart.forEach((rows, index) => renderChartPanel(index, rows));
}

function clearPieCharts() {
  renderedCharts.forEach((chart) => chart.destroy());
  renderedCharts = [];

  const chartsEl = document.getElementById("charts");
  if (chartsEl) chartsEl.innerHTML = "";
}

function findDataKeys(items) {
  return {
    practiceCategory: findKey(items, "practicecategory"),
    practiceMode: findKey(items, "practicemode"),
    musicTheoryCategory: findKey(items, "musictheorycategory")
  };
}

function findKey(items, expectedKey) {
  for (const item of items) {
    if (!isRecord(item)) continue;
    const key = Object.keys(item).find((name) => name.toLowerCase() === expectedKey);
    if (key) return key;
  }
  return null;
}

function buildPracticeModeRows(items, practiceCategoryKey, practiceModeKey) {
  if (!practiceCategoryKey || !practiceModeKey) return [];

  const fullFlowSessions = items.filter((item) =>
    matchesEnum(item && item[practiceCategoryKey], 1, PIE_CHART_ENUMS.practiceCategory)
  );
  return buildPercentageRows(fullFlowSessions, practiceModeKey, PIE_CHART_ENUMS.practiceMode);
}

function buildMusicTheoryRows(items, practiceCategoryKey, musicTheoryCategoryKey) {
  if (!practiceCategoryKey || !musicTheoryCategoryKey) return [];

  const musicTheorySessions = items.filter((item) =>
    matchesEnum(item && item[practiceCategoryKey], 3, PIE_CHART_ENUMS.practiceCategory)
  );
  return buildPercentageRows(
    musicTheorySessions,
    musicTheoryCategoryKey,
    PIE_CHART_ENUMS.musicTheoryCategory
  );
}

function buildPercentageRows(items, key, labels, includeMissing = false) {
  if (!key) return [];

  const counts = new Map();
  let total = 0;

  for (const item of items) {
    if (!isRecord(item)) continue;

    const value = normalizeEnumValue(item[key]);
    if (value == null && !includeMissing) continue;
    const bucket = value == null ? "__missing__" : String(value);
    counts.set(bucket, (counts.get(bucket) || 0) + 1);
    total += 1;
  }

  if (!total) return [];

  return Array.from(counts, ([value, count]) => ({
    label: value === "__missing__" ? "Unspecified" : mapPieEnumValue(value, labels),
    count,
    percentage: (count / total) * 100,
    order: value === "__missing__" ? Number.MAX_SAFE_INTEGER : enumSortValue(value)
  })).sort((left, right) => left.order - right.order || left.label.localeCompare(right.label));
}

function renderChartPanel(index, rows) {
  const meta = PIE_CHART_META[index];
  const chartsEl = document.getElementById("charts");
  const panel = document.createElement("section");
  panel.className = "chart-panel";
  panel.setAttribute("aria-labelledby", "chart-title-" + index);

  const title = document.createElement("h2");
  title.id = "chart-title-" + index;
  title.textContent = meta.title;
  panel.append(title);

  const description = document.createElement("p");
  description.className = "chart-description";
  description.textContent = meta.description;
  panel.append(description);

  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "chart-empty";
    empty.textContent = meta.emptyMessage;
    panel.append(empty);
    chartsEl.append(panel);
    return;
  }

  const total = rows.reduce((sum, row) => sum + row.count, 0);
  description.textContent += " Based on " + total.toLocaleString() + " session" +
    (total === 1 ? "." : "s.");

  const canvasWrap = document.createElement("div");
  canvasWrap.className = "chart-canvas-wrap";
  const canvas = document.createElement("canvas");
  canvas.id = "pieChart" + index;
  canvasWrap.append(canvas);
  panel.append(canvasWrap);
  chartsEl.append(panel);

  renderedCharts.push(createPercentagePieChart(canvas, rows));
}

function createPercentagePieChart(canvas, rows) {
  const colors = rows.map((_, index) => "hsl(" + ((index * 61 + 205) % 360) + ", 67%, 52%)");

  return new Chart(canvas, {
    type: "pie",
    data: {
      labels: rows.map((row) => row.label),
      datasets: [{
        label: "Sessions",
        data: rows.map((row) => row.percentage),
        counts: rows.map((row) => row.count),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: true, position: "bottom" },
        tooltip: {
          callbacks: {
            label(context) {
              const count = context.dataset.counts[context.dataIndex];
              const percentage = typeof context.parsed === "number" ? context.parsed : context.parsed.y;
              return percentage.toFixed(1) + "% (" + count.toLocaleString() +
                " session" + (count === 1 ? ")" : "s)");
            }
          }
        }
      }
    }
  });
}

function isRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function normalizeEnumValue(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^[-+]?\d+(\.\d+)?$/.test(trimmed)) {
      const numericValue = Number(trimmed);
      return Number.isFinite(numericValue) ? numericValue : null;
    }
    return trimmed;
  }
  return value;
}

function matchesEnum(value, expectedValue, labels) {
  const normalized = normalizeEnumValue(value);
  if (normalized === expectedValue) return true;

  const expectedLabel = labels[expectedValue];
  return typeof normalized === "string" &&
    normalized.toLowerCase() === expectedLabel.toLowerCase();
}

function mapPieEnumValue(value, labels) {
  const normalized = normalizeEnumValue(value);
  return labels[normalized] ?? String(normalized);
}

function enumSortValue(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : Number.MAX_SAFE_INTEGER;
}

function setChartMessage(message, isError) {
  const chartsEl = document.getElementById("charts");
  chartsEl.innerHTML = "";

  const status = document.createElement("p");
  status.className = "status" + (isError ? " error" : "");
  status.textContent = message;
  chartsEl.append(status);
}

