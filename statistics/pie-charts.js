const SharedEnums = window.SharedEnums || {};
const PIE_CHART_ENUMS = {
  practiceCategory: SharedEnums.PracticeCategoriesEnum || {},
  practiceMode: SharedEnums.PracticeModeEnum || {},
  musicTheoryCategory: SharedEnums.MusicTheoryCategoryEnum || {},
  auralCategory: SharedEnums.AuralCategoryEnum || {},
  language: SharedEnums.LanguageRegionEnum || SharedEnums.LangaugeRegionEnum || {},
  instrument: SharedEnums.InstrumentEnum || {},
  platform: SharedEnums.PlatformEnum || {}
};

const PIE_FIELD_ENUMS = Object.freeze({
  practicecategory: PIE_CHART_ENUMS.practiceCategory,
  practicemode: PIE_CHART_ENUMS.practiceMode,
  musictheorycategory: PIE_CHART_ENUMS.musicTheoryCategory,
  auralcategory: PIE_CHART_ENUMS.auralCategory,
  language: PIE_CHART_ENUMS.language,
  languageregion: PIE_CHART_ENUMS.language,
  instrument: PIE_CHART_ENUMS.instrument,
  platform: PIE_CHART_ENUMS.platform
});

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
  },
  {
    title: "Sessions by language",
    description: "Percentage of all sessions in each language.",
    emptyMessage: "No language data found."
  },
  {
    title: "MusicTheory Aural sessions by category",
    description: "Percentage of MusicTheory Aural sessions in each aural category.",
    emptyMessage: "No MusicTheory Aural category data found."
  }
];

let renderedCharts = [];

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
    buildMusicTheoryRows(items, keys.practiceCategory, keys.musicTheoryCategory),
    buildLanguageRows(items, keys.language),
    buildAuralRows(
      items,
      keys.practiceCategory,
      keys.musicTheoryCategory,
      keys.auralCategory
    )
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
    musicTheoryCategory: findKey(items, "musictheorycategory"),
    auralCategory: findKey(items, "auralcategory"),
    language: findKey(items, "language") || findKey(items, "languageregion")
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

function buildLanguageRows(items, languageKey) {
  return buildPercentageRows(
    items,
    languageKey,
    PIE_CHART_ENUMS.language,
    true,
    mapLanguageValue
  );
}

function buildAuralRows(
  items,
  practiceCategoryKey,
  musicTheoryCategoryKey,
  auralCategoryKey
) {
  if (!practiceCategoryKey || !musicTheoryCategoryKey || !auralCategoryKey) return [];

  const auralSessions = items.filter((item) =>
    matchesEnum(item && item[practiceCategoryKey], 3, PIE_CHART_ENUMS.practiceCategory) &&
    matchesEnum(item && item[musicTheoryCategoryKey], 3, PIE_CHART_ENUMS.musicTheoryCategory)
  );
  return buildPercentageRows(
    auralSessions,
    auralCategoryKey,
    PIE_CHART_ENUMS.auralCategory
  );
}

function buildPercentageRows(
  items,
  key,
  labels,
  includeMissing = false,
  mapValue = mapPieEnumValue
) {
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
    label: value === "__missing__" ? "Unspecified" : mapValue(value, labels),
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

function mapLanguageValue(value, labels) {
  const normalized = normalizeEnumValue(value);
  if (!Number.isInteger(normalized)) return mapPieEnumValue(normalized, labels);

  const languages = Object.entries(labels)
    .filter(([bit]) => (normalized & Number(bit)) !== 0)
    .map(([, label]) => label);
  return languages.length ? languages.join(", ") : String(normalized);
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

(function enableChartFiltering() {
  const urlInput = document.getElementById("urlInput");
  const searchInput = document.getElementById("searchInput");
  const statusEl = document.getElementById("status");
  const fetchButton = document.getElementById("fetchBtn");
  const clearButton = document.getElementById("clearBtn");

  let rawItems = [];
  let filterTerms = [];
  let searchTimer = null;
  const searchTextCache = new WeakMap();

  fetchButton.addEventListener("click", fetchAndRender);
  clearButton.addEventListener("click", clearPage);

  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setFilterTerms(searchInput.value);
      renderFilteredCharts();
    }, 120);
  });

  searchInput.addEventListener("search", () => {
    clearTimeout(searchTimer);
    setFilterTerms(searchInput.value);
    renderFilteredCharts();
  });

  async function fetchAndRender() {
    const url = urlInput.value.trim();
    if (!url) return;

    rawItems = [];
    clearPieCharts();
    setStatus("Fetching " + url + " ...");

    try {
      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Response is not a JSON array.");

      rawItems = data;
      setFilterTerms(searchInput.value);
      renderFilteredCharts();
    } catch (error) {
      setError("Error: " + error.message + ". " + corsHint(url));
    }
  }

  function clearPage() {
    clearTimeout(searchTimer);
    rawItems = [];
    filterTerms = [];
    searchInput.value = "";
    clearPieCharts();
    setStatus("");
  }

  function setFilterTerms(value) {
    filterTerms = String(value || "")
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function renderFilteredCharts() {
    if (!rawItems.length) {
      clearPieCharts();
      return;
    }

    const filteredItems = filterTerms.length
      ? rawItems.filter(matchesSearch)
      : rawItems;

    renderPieCharts(filteredItems);

    if (filterTerms.length) {
      setStatus(
        "Showing " + filteredItems.length.toLocaleString() + " of " +
        rawItems.length.toLocaleString() + " session" +
        (rawItems.length === 1 ? "" : "s") +
        " matching \"" + filterTerms.join(" ") + "\"."
      );
    } else {
      setStatus(
        "Loaded " + rawItems.length.toLocaleString() + " session" +
        (rawItems.length === 1 ? "" : "s") + "."
      );
    }
  }

  function matchesSearch(item) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const text = getSearchText(item);
    return filterTerms.every((term) => text.includes(term));
  }

  function getSearchText(item) {
    let cached = searchTextCache.get(item);
    if (cached) return cached;

    const fields = [];
    for (const [key, value] of Object.entries(item)) {
      fields.push(key, valueToSearchString(value), mapSearchValue(key, value));
    }

    cached = fields.join(" ").toLowerCase();
    searchTextCache.set(item, cached);
    return cached;
  }

  function mapSearchValue(key, value) {
    const labels = PIE_FIELD_ENUMS[key.toLowerCase()];
    if (!labels) return valueToSearchString(value);
    return key.toLowerCase() === "language" || key.toLowerCase() === "languageregion"
      ? mapLanguageValue(value, labels)
      : mapPieEnumValue(value, labels);
  }

  function valueToSearchString(value) {
    if (value == null) return "";
    return typeof value === "object" ? JSON.stringify(value) : String(value);
  }

  function setStatus(message) {
    statusEl.textContent = message;
    statusEl.className = "status";
  }

  function setError(message) {
    statusEl.textContent = message;
    statusEl.className = "status error";
  }

  function corsHint(url) {
    try {
      const parsed = new URL(url);
      const fromFile = location.protocol === "file:";
      const crossOrigin = location.origin !== parsed.protocol + "//" + parsed.host;
      if (fromFile || crossOrigin) {
        return "If this page is opened from file:// or a different origin, enable CORS on the API or host this HTML from the same origin/port.";
      }
    } catch {}
    return "";
  }
})();
