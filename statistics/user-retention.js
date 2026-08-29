const $ = (s) => document.querySelector(s);
const urlInput = $("#urlInput");
const statusEl = $("#status");
const output = $("#output");
const controlsEl = document.querySelector(".controls");
const viewRadios = document.querySelectorAll('input[name="retentionView"]');
const milestoneStepPicker = $("#milestoneStepPicker");
const milestoneStepRadios = document.querySelectorAll('input[name="milestoneStep"]');

const COLUMNS = [
  { key: "deviceId", label: "DeviceId" },
  { key: "count", label: "ItemCount" },
  { key: "earliest", label: "EarliestDateTime" },
  { key: "latest", label: "LastDateTime" },
  { key: "retentionDays", label: "RetentionDays" },
  { key: "maxLevel", label: "HighestLevel" },
  { key: "language", label: "Language" },
  { key: "topInstrument", label: "MostUsedInstrument" }
];

const ELIGIBLE_RETENTION_THRESHOLDS = [30, 60, 90, 120, 150, 180];

const InstrumentEnum = {
  0: "Other",
  1: "Piano",
  2: "Violin",
  3: "Viola",
  4: "Cello",
  5: "Guitar",
  6: "Clarinet",
  7: "Piccolo",
  8: "French Horn",
  9: "Flute",
  10: "Double Bass",
  11: "Trumpet",
  12: "Harp",
  13: "Bass",
  14: "Oboe",
  15: "Bassoon",
  16: "Saxophone",
  17: "Trombone",
  18: "Tuba"
};

const LangaugeRegionEnum =
  (window.SharedEnums && window.SharedEnums.LangaugeRegionEnum) || {};

let SORT_STATE = { col: "count", dir: "desc" };
let CURRENT_ROWS = [];
let CURRENT_ITEM_COUNT = 0;
let CURRENT_VIEW = "list";
let chartInstance = null;

$("#fetchBtn").addEventListener("click", fetchAndRender);
$("#clearBtn").addEventListener("click", () => {
  CURRENT_ROWS = [];
  CURRENT_ITEM_COUNT = 0;
  destroyChart();
  output.innerHTML = "";
  statusEl.textContent = "";
});

viewRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!radio.checked) return;
    CURRENT_VIEW = radio.value;
    updateMilestoneStepVisibility();
    if (CURRENT_ROWS.length) {
      if (renderSelectedView()) setLoadedStatus();
    }
  });
});

milestoneStepRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!radio.checked) return;
    if (CURRENT_VIEW !== "milestones" || !CURRENT_ROWS.length) return;
    if (renderSelectedView()) setLoadedStatus();
  });
});

// Browsers can restore a previously checked radio on reload, so sync from the DOM.
CURRENT_VIEW = getSelectedView();
updateMilestoneStepVisibility();

function updateMilestoneStepVisibility() {
  if (milestoneStepPicker) milestoneStepPicker.disabled = CURRENT_VIEW !== "milestones";
}

function getMilestoneStep() {
  const selected = Array.from(milestoneStepRadios).find((radio) => radio.checked);
  const step = selected ? Number(selected.value) : 30;
  return Number.isFinite(step) && step > 0 ? step : 30;
}

window.addEventListener("resize", () => {
  if (!chartInstance) return;
  applyChartSizing(chartInstance.data.labels.length);
  chartInstance.resize();
});

async function fetchAndRender() {
  const url = urlInput.value.trim();
  if (!url) return;

  setStatus(`Fetching ${url} ...`);
  destroyChart();
  output.innerHTML = "";

  try {
    const resp = await fetch(url, { headers: { "Accept": "application/json" } });
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    const data = await resp.json();
    if (!Array.isArray(data)) throw new Error("Response is not a JSON array.");

    CURRENT_ITEM_COUNT = data.length;
    CURRENT_ROWS = buildRetentionRows(data);
    CURRENT_VIEW = getSelectedView();
    updateMilestoneStepVisibility();
    SORT_STATE = { col: "count", dir: "desc" };
    if (renderSelectedView()) setLoadedStatus();
  } catch (e) {
    setError(`Error: ${e.message}. ${corsHint(url)}`);
  }
}

function getSelectedView() {
  const selected = Array.from(viewRadios).find((radio) => radio.checked);
  return selected ? selected.value : "list";
}

function renderSelectedView() {
  if (CURRENT_VIEW === "milestones") {
    return renderRetentionMilestonesChart(CURRENT_ROWS);
  }
  if (CURRENT_VIEW === "eligible") {
    return renderEligibleRetentionChart(CURRENT_ROWS);
  }
  return renderTable(CURRENT_ROWS);
}

function buildRetentionRows(items) {
  const deviceKey = findKey(items, ["deviceid"]);
  const dateKey = findKey(items, ["datetime"]);
  const levelKey = findKey(items, ["level"]);
  const instrumentKey = findKey(items, ["instrument"]);
  const languageKey = findKey(items, ["language", "languageregion"]);

  const groups = new Map();

  for (const item of items) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;

    const deviceRaw = deviceKey ? item[deviceKey] : null;
    const deviceId = deviceRaw != null && deviceRaw !== "" ? String(deviceRaw) : "(unknown)";
    const group = groups.get(deviceId) || {
      deviceId,
      count: 0,
      earliest: "",
      earliestTs: null,
      latest: "",
      latestTs: null,
      retentionDays: null,
      maxLevel: null,
      language: "",
      languageValue: null,
      languageCount: 0,
      topInstrument: "",
      topInstrumentValue: null,
      topInstrumentCount: 0,
      languageCounts: Object.create(null),
      instrumentCounts: Object.create(null)
    };

    group.count += 1;

    if (dateKey) {
      const rawDate = item[dateKey];
      const ts = toTimestamp(rawDate);
      if (ts != null) {
        if (group.earliestTs == null || ts < group.earliestTs) {
          group.earliestTs = ts;
          group.earliest = formatDateValue(rawDate, ts);
        }
        if (group.latestTs == null || ts > group.latestTs) {
          group.latestTs = ts;
          group.latest = formatDateValue(rawDate, ts);
        }
      } else {
        if (!group.earliest && rawDate != null) group.earliest = String(rawDate);
        if (!group.latest && rawDate != null) group.latest = String(rawDate);
      }
    }

    if (levelKey) {
      const level = toNumber(item[levelKey]);
      if (level != null && (group.maxLevel == null || level > group.maxLevel)) {
        group.maxLevel = level;
      }
    }

    if (languageKey) {
      const languageValue = normalizeEnumValue(item[languageKey]);
      incrementUsage(
        group,
        "languageCounts",
        languageValue,
        mapLanguageValue,
        "languageCount",
        "languageValue",
        "language"
      );
    }

    if (instrumentKey) {
      const instrumentValue = normalizeEnumValue(item[instrumentKey]);
      incrementUsage(
        group,
        "instrumentCounts",
        instrumentValue,
        mapInstrumentValue,
        "topInstrumentCount",
        "topInstrumentValue",
        "topInstrument"
      );
    }

    groups.set(deviceId, group);
  }

  for (const group of groups.values()) {
    group.retentionDays = calculateRetentionDays(group.earliestTs, group.latestTs);
  }

  return Array.from(groups.values());
}

function findKey(items, aliases) {
  const aliasSet = new Set(aliases.map((a) => a.toLowerCase()));
  for (const item of items) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    for (const key of Object.keys(item)) {
      if (aliasSet.has(key.toLowerCase())) return key;
    }
  }
  return null;
}

function decodeLangFlags(value) {
  if (typeof value !== "number") return value;
  const result = Object.entries(LangaugeRegionEnum)
    .filter(([bit]) => (value & bit) !== 0)
    .map(([, name]) => name);
  return result.length ? result.join(", ") : value;
}

function calculateRetentionDays(earliestTs, latestTs) {
  if (earliestTs == null || latestTs == null) return null;
  const diff = latestTs - earliestTs;
  if (!Number.isFinite(diff)) return null;
  if (diff <= 0) return 0;
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil(diff / msPerDay);
}

function normalizeEnumValue(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^[-+]?\d+(\.\d+)?$/.test(trimmed)) {
      const num = Number(trimmed);
      return Number.isFinite(num) ? num : null;
    }
    return value;
  }
  return value;
}

function mapInstrumentValue(value) {
  if (value == null) return "";
  if (typeof value === "number") return InstrumentEnum[value] ?? value;
  const num = toNumber(value);
  if (num != null) return InstrumentEnum[num] ?? value;
  return String(value);
}

function mapLanguageValue(value) {
  if (value == null) return "";
  const num = toNumber(value);
  if (num != null) return decodeLangFlags(num);
  return String(value);
}

function incrementUsage(group, countsKey, value, mapFn, countKey, valueKey, labelKey) {
  if (value == null) return;
  const counts = group[countsKey];
  const bucketKey = String(value);
  const nextCount = (counts[bucketKey] || 0) + 1;
  counts[bucketKey] = nextCount;

  if (shouldReplaceTop(nextCount, group[countKey], value, group[valueKey])) {
    group[countKey] = nextCount;
    group[valueKey] = value;
    group[labelKey] = mapFn(value);
  }
}

function shouldReplaceTop(nextCount, currentCount, nextValue, currentValue) {
  if (currentCount == null || nextCount > currentCount) return true;
  if (nextCount < currentCount) return false;
  if (currentValue == null) return true;
  const res = compareValues(toComparable(nextValue), toComparable(currentValue));
  return res < 0;
}

function toTimestamp(value) {
  if (value == null) return null;
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return null;
    if (value > 1e12) return value;
    if (value > 1e9) return value * 1000;
    return value;
  }
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
}

function formatDateValue(value, ts) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "number" && ts != null) return new Date(ts).toISOString();
  return String(value);
}

function toNumber(value) {
  if (value == null || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function renderTable(rows) {
  destroyChart();

  if (!rows.length) {
    output.innerHTML = "<p>No retention data found.</p>";
    return true;
  }

  const rowsToDraw = sortIfNeeded(rows);

  const thead = `
    <thead>
      <tr>
        ${COLUMNS.map((col) => {
          const isActive = SORT_STATE.col === col.key;
          const indicator = isActive ? (SORT_STATE.dir === "desc" ? "v" : "^") : "";
          const aria = isActive ? (SORT_STATE.dir === "desc" ? "descending" : "ascending") : "none";
          return `<th class="sortable" data-col="${escapeHtml(col.key)}" aria-sort="${aria}">
                    ${escapeHtml(col.label)}<span class="sort-indicator">${indicator}</span>
                  </th>`;
        }).join("")}
      </tr>
    </thead>`;

  const tbody = `
    <tbody>
      ${rowsToDraw.map((row) => {
        return `<tr>
          ${COLUMNS.map((col) => `<td>${escapeHtml(valueToString(row[col.key]))}</td>`).join("")}
        </tr>`;
      }).join("")}
    </tbody>`;

  output.innerHTML = `<table>${thead}${tbody}</table>`;

  const head = output.querySelector("thead");
  attachHeaderSortHandlers(head);
  return true;
}

function attachHeaderSortHandlers(theadEl) {
  theadEl.querySelectorAll("th.sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const col = th.getAttribute("data-col");
      if (SORT_STATE.col === col) {
        SORT_STATE.dir = SORT_STATE.dir === "desc" ? "asc" : "desc";
      } else {
        SORT_STATE.col = col;
        SORT_STATE.dir = "desc";
      }
      renderSelectedView();
    });
  });
}

function renderRetentionMilestonesChart(rows) {
  destroyChart();

  if (!rows.length) {
    output.innerHTML = "<p>No retention data found.</p>";
    return true;
  }

  if (typeof Chart === "undefined") {
    setError("Chart.js failed to load.");
    return false;
  }

  const step = getMilestoneStep();
  const buckets = buildRetentionMilestoneBuckets(rows, step);
  if (!buckets.length) {
    output.innerHTML = `<p>No users have RetentionDays of at least ${step}.</p>`;
    return true;
  }

  output.innerHTML = `
    <div class="chart-panel">
      <div class="chart-canvas-wrap">
        <canvas id="retentionMilestonesChart"></canvas>
      </div>
    </div>`;

  const canvas = $("#retentionMilestonesChart");
  applyChartSizing(buckets.length);
  const yAxisMax = getPercentageAxisMax(buckets);

  chartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: buckets.map((bucket) => `>= ${bucket.threshold} days`),
      datasets: [{
        label: "Users",
        data: buckets.map((bucket) => bucket.percent),
        backgroundColor: "#1f77d0",
        borderColor: "#1f77d0",
        borderWidth: 1,
        counts: buckets.map((bucket) => bucket.count)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(context) {
              const count = context.dataset.counts[context.dataIndex];
              return `${context.parsed.y.toFixed(1)}% (${count} of ${rows.length} users)`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: `RetentionDays Threshold (${step}-day steps)`
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          max: yAxisMax,
          ticks: {
            callback(value) {
              return `${value}%`;
            }
          },
          title: {
            display: true,
            text: "Users Meeting Threshold"
          }
        }
      }
    }
  });

  return true;
}

function renderEligibleRetentionChart(rows) {
  destroyChart();

  if (!rows.length) {
    output.innerHTML = "<p>No retention data found.</p>";
    return true;
  }

  if (typeof Chart === "undefined") {
    setError("Chart.js failed to load.");
    return false;
  }

  const { cutoffTs, buckets } = buildEligibleRetentionBuckets(rows);
  if (!buckets.length) {
    output.innerHTML = "<p>No usable first-seen dates found.</p>";
    return true;
  }

  const cutoffLabel = cutoffTs == null ? "the latest activity" : formatDayLabel(cutoffTs);

  output.innerHTML = `
    <div class="chart-panel">
      <div class="chart-canvas-wrap">
        <canvas id="retentionMilestonesChart"></canvas>
      </div>
    </div>
    <p class="hint">
      Each bar only counts devices that were first seen at least that many days before
      ${escapeHtml(cutoffLabel)} (the newest activity in this dataset), so devices that
      have not yet had the chance to reach a threshold are excluded from it.
    </p>`;

  const canvas = $("#retentionMilestonesChart");
  applyChartSizing(buckets.length);
  const yAxisMax = getPercentageAxisMax(buckets);

  chartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: buckets.map((bucket) => `${bucket.threshold} days`),
      datasets: [{
        label: "Eligible Users",
        data: buckets.map((bucket) => bucket.percent),
        backgroundColor: "#2a9d54",
        borderColor: "#2a9d54",
        borderWidth: 1,
        counts: buckets.map((bucket) => bucket.count),
        eligibles: buckets.map((bucket) => bucket.eligible)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(context) {
              const eligible = context.dataset.eligibles[context.dataIndex];
              if (!eligible) return "No devices have had this much opportunity yet";
              const count = context.dataset.counts[context.dataIndex];
              return `${context.parsed.y.toFixed(1)}% (${count} of ${eligible} eligible users)`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Retention Threshold"
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          max: yAxisMax,
          ticks: {
            callback(value) {
              return `${value}%`;
            }
          },
          title: {
            display: true,
            text: "Eligible Users Reaching Threshold"
          }
        }
      }
    }
  });

  return true;
}

function buildEligibleRetentionBuckets(rows) {
  // The newest activity in the dataset stands in for "now" so a stale export
  // does not credit devices with opportunity they never actually had.
  let cutoffTs = null;
  for (const row of rows) {
    if (row.latestTs == null) continue;
    if (cutoffTs == null || row.latestTs > cutoffTs) cutoffTs = row.latestTs;
  }
  if (cutoffTs == null) return { cutoffTs: null, buckets: [] };

  const devices = [];
  for (const row of rows) {
    if (row.earliestTs == null) continue;
    const opportunityDays = calculateRetentionDays(row.earliestTs, cutoffTs);
    const retentionDays = toNumber(row.retentionDays);
    if (opportunityDays == null || retentionDays == null) continue;
    devices.push({ opportunityDays, retentionDays });
  }
  if (!devices.length) return { cutoffTs, buckets: [] };

  const buckets = ELIGIBLE_RETENTION_THRESHOLDS.map((threshold) => {
    let eligible = 0;
    let reached = 0;
    for (const device of devices) {
      if (device.opportunityDays < threshold) continue;
      eligible += 1;
      if (device.retentionDays >= threshold) reached += 1;
    }
    return {
      threshold,
      eligible,
      count: reached,
      percent: eligible ? (reached / eligible) * 100 : 0
    };
  });

  return { cutoffTs, buckets };
}

function formatDayLabel(ts) {
  const d = new Date(ts);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getPercentageAxisMax(buckets) {
  const highestPercent = buckets.reduce((max, bucket) => Math.max(max, bucket.percent), 0);
  return Math.min(100, Math.max(10, Math.ceil(highestPercent / 10) * 10));
}

function buildRetentionMilestoneBuckets(rows, step) {
  const buckets = [];

  for (let threshold = step; ; threshold += step) {
    const count = rows.filter((row) => {
      const days = toNumber(row.retentionDays);
      return days != null && days >= threshold;
    }).length;

    if (count === 0) break;

    buckets.push({
      threshold,
      count,
      percent: rows.length ? (count / rows.length) * 100 : 0
    });
  }

  return buckets;
}

function applyChartSizing(barCount) {
  const wrap = output.querySelector(".chart-canvas-wrap");
  if (wrap) wrap.style.height = `${getChartHeightPx()}px`;

  const canvas = chartInstance ? chartInstance.canvas : $("#retentionMilestonesChart");
  if (!canvas) return;

  const frameWidth = Math.max(320, output.clientWidth - 24);
  const minWidth = Math.max(frameWidth, barCount * 120);
  canvas.style.width = `${minWidth}px`;
}

function getChartHeightPx() {
  const viewportHeight = window.innerHeight;
  const controlsHeight = controlsEl ? controlsEl.getBoundingClientRect().height : 0;
  const bodyStyle = getComputedStyle(document.body);
  const bodyGap = Number.parseFloat(bodyStyle.gap) || 0;
  const paddingTop = Number.parseFloat(bodyStyle.paddingTop) || 0;
  const paddingBottom = Number.parseFloat(bodyStyle.paddingBottom) || 0;

  const remaining = viewportHeight - controlsHeight - bodyGap - paddingTop - paddingBottom - 8;
  const targetPercent = Math.floor(viewportHeight * 0.62);
  const available = Math.max(0, Math.floor(remaining));
  return Math.min(available, targetPercent);
}

function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

function sortIfNeeded(rows) {
  if (!SORT_STATE.col || !SORT_STATE.dir) return rows;
  const col = SORT_STATE.col;
  const dir = SORT_STATE.dir;

  const decorated = rows.map((row, idx) => {
    const comp = toComparable(getSortValue(row, col));
    return { row, idx, comp };
  });

  decorated.sort((a, b) => {
    const res = compareValues(a.comp, b.comp);
    return dir === "desc" ? -res : res;
  });

  return decorated.map((d) => d.row);
}

function getSortValue(row, col) {
  switch (col) {
    case "earliest":
      return row.earliestTs ?? row.earliest;
    case "latest":
      return row.latestTs ?? row.latest;
    case "language":
      return row.languageValue ?? row.language;
    case "topInstrument":
      return row.topInstrumentValue ?? row.topInstrument;
    default:
      return row[col];
  }
}

function toComparable(v) {
  if (v == null) return null;
  if (typeof v === "number") return { t: "n", v };
  if (typeof v === "string") {
    const num = parseFloat(v);
    const numericLike = v.trim().match(/^[-+]?\d+(\.\d+)?$/);
    if (numericLike && Number.isFinite(num)) return { t: "n", v: num };
    return { t: "s", v: v.toLowerCase() };
  }
  return { t: "s", v: JSON.stringify(v).toLowerCase() };
}

function compareValues(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  const order = { "n": 2, "s": 1 };
  const ao = order[a.t] ?? 0;
  const bo = order[b.t] ?? 0;
  if (ao !== bo) return ao - bo;

  if (a.v < b.v) return -1;
  if (a.v > b.v) return 1;
  return 0;
}

function valueToString(v) {
  if (v == null) return "";
  return String(v);
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setStatus(msg) {
  statusEl.textContent = msg;
  statusEl.className = "status";
}

function setLoadedStatus() {
  const suffix = getLoadedViewLabel();
  setStatus(`Loaded ${CURRENT_ITEM_COUNT} item(s). ${CURRENT_ROWS.length} device(s). Showing ${suffix}.`);
}

function getLoadedViewLabel() {
  if (CURRENT_VIEW === "milestones") {
    return `retention milestone chart (${getMilestoneStep()}-day steps)`;
  }
  if (CURRENT_VIEW === "eligible") {
    return "eligible retention chart";
  }
  return "user list";
}

function setError(msg) {
  statusEl.textContent = msg;
  statusEl.className = "status error";
}

function corsHint(url) {
  try {
    const u = new URL(url);
    const fromFile = location.protocol === "file:";
    const crossOrigin = location.origin !== `${u.protocol}//${u.host}`;
    if (fromFile || crossOrigin) {
      return "If this page is opened from file:// or a different origin, enable CORS on the API or host this HTML from the same origin/port.";
    }
  } catch {}
  return "";
}
