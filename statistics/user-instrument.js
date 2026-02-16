const $ = (s) => document.querySelector(s);
const urlInput = $("#urlInput");
const statusEl = $("#status");
const output = $("#output");
const controlsEl = document.querySelector(".controls");
const modeRadios = document.querySelectorAll('input[name="summaryMode"]');

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

const MODE_META = {
  users: {
    countLabel: "DeviceIdCount",
    yAxisLabel: "Unique DeviceIds"
  },
  sessions: {
    countLabel: "ItemsCount",
    yAxisLabel: "Total Items"
  }
};

let RAW_ITEMS = [];
let CURRENT_MODE = "users";
let CURRENT_ROWS = [];
let chartInstance = null;

$("#fetchBtn").addEventListener("click", fetchAndRender);
$("#clearBtn").addEventListener("click", () => {
  RAW_ITEMS = [];
  CURRENT_ROWS = [];
  destroyChart();
  output.innerHTML = "";
  statusEl.textContent = "";
});

modeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!radio.checked) return;
    CURRENT_MODE = radio.value;
    if (RAW_ITEMS.length) {
      CURRENT_ROWS = buildRows(RAW_ITEMS, CURRENT_MODE);
      renderChart();
      setStatus(`Loaded ${RAW_ITEMS.length} item(s). Showing ${CURRENT_ROWS.length} instrument group(s).`);
    }
  });
});

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

    RAW_ITEMS = data;
    CURRENT_MODE = getSelectedMode();
    CURRENT_ROWS = buildRows(RAW_ITEMS, CURRENT_MODE);
    renderChart();
    setStatus(`Loaded ${data.length} item(s). Showing ${CURRENT_ROWS.length} instrument group(s).`);
  } catch (e) {
    setError(`Error: ${e.message}. ${corsHint(url)}`);
  }
}

function getSelectedMode() {
  const selected = Array.from(modeRadios).find((r) => r.checked);
  return selected ? selected.value : "users";
}

function buildRows(items, mode) {
  const deviceKey = findKey(items, ["deviceid"]);
  const instrumentKey = findKey(items, ["instrument"]);
  if (!instrumentKey) return [];

  if (mode === "users") {
    return buildUsersCountRows(items, instrumentKey, deviceKey);
  }
  return buildSessionsCountRows(items, instrumentKey);
}

function buildUsersCountRows(items, instrumentKey, deviceKey) {
  const instrumentToDeviceSet = new Map();

  for (const item of items) {
    if (!isPlainRecord(item)) continue;

    const instrumentValue = normalizeEnumValue(item[instrumentKey]);
    if (instrumentValue == null) continue;

    const deviceRaw = deviceKey ? item[deviceKey] : null;
    const deviceId = deviceRaw != null && String(deviceRaw).trim() !== ""
      ? String(deviceRaw)
      : "(unknown)";

    const bucket = String(instrumentValue);
    let deviceSet = instrumentToDeviceSet.get(bucket);
    if (!deviceSet) {
      deviceSet = new Set();
      instrumentToDeviceSet.set(bucket, deviceSet);
    }
    deviceSet.add(deviceId);
  }

  return Array.from(instrumentToDeviceSet.entries()).map(([instrumentValue, deviceSet]) => ({
    instrument: mapInstrumentValue(instrumentValue),
    instrumentValue: normalizeEnumValue(instrumentValue),
    count: deviceSet.size
  }));
}

function buildSessionsCountRows(items, instrumentKey) {
  const instrumentCounts = Object.create(null);

  for (const item of items) {
    if (!isPlainRecord(item)) continue;
    const instrumentValue = normalizeEnumValue(item[instrumentKey]);
    if (instrumentValue == null) continue;
    const bucket = String(instrumentValue);
    instrumentCounts[bucket] = (instrumentCounts[bucket] || 0) + 1;
  }

  return Object.keys(instrumentCounts).map((instrumentValue) => ({
    instrument: mapInstrumentValue(instrumentValue),
    instrumentValue: normalizeEnumValue(instrumentValue),
    count: instrumentCounts[instrumentValue]
  }));
}

function findKey(items, aliases) {
  const aliasSet = new Set(aliases.map((a) => a.toLowerCase()));
  for (const item of items) {
    if (!isPlainRecord(item)) continue;
    for (const key of Object.keys(item)) {
      if (aliasSet.has(key.toLowerCase())) return key;
    }
  }
  return null;
}

function isPlainRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value);
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
    return trimmed;
  }
  return value;
}

function mapInstrumentValue(value) {
  if (value == null) return "";
  if (typeof value === "number") return InstrumentEnum[value] ?? String(value);
  const numeric = Number(value);
  if (Number.isFinite(numeric)) return InstrumentEnum[numeric] ?? String(value);
  return String(value);
}

function renderChart() {
  destroyChart();

  if (!CURRENT_ROWS.length) {
    output.innerHTML = "<p>No instrument usage data found.</p>";
    return;
  }

  if (typeof Chart === "undefined") {
    setError("Chart.js failed to load.");
    return;
  }

  const sortedRows = sortByPopularity(CURRENT_ROWS);
  const modeMeta = MODE_META[CURRENT_MODE] || MODE_META.users;

  output.innerHTML = `
    <div class="chart-panel">
      <div class="chart-canvas-wrap">
        <canvas id="instrumentChart"></canvas>
      </div>
    </div>`;

  const canvas = $("#instrumentChart");
  applyChartSizing(sortedRows.length);

  const labels = sortedRows.map((row) => row.instrument);
  const data = sortedRows.map((row) => row.count);
  const colors = labels.map((_, idx) => `hsl(${(idx * 37) % 360}, 70%, 55%)`);

  chartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: modeMeta.countLabel,
        data,
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
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(context) {
              return `${modeMeta.countLabel}: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Instrument"
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          },
          title: {
            display: true,
            text: modeMeta.yAxisLabel
          }
        }
      }
    }
  });
}

function applyChartSizing(barCount) {
  const wrap = output.querySelector(".chart-canvas-wrap");
  if (wrap) wrap.style.height = `${getChartHeightPx()}px`;

  const canvas = chartInstance ? chartInstance.canvas : $("#instrumentChart");
  if (!canvas) return;

  const frameWidth = Math.max(320, output.clientWidth - 24);
  const minWidth = Math.max(frameWidth, barCount * 72);
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

function sortByPopularity(rows) {
  return rows.slice().sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    const left = String(a.instrument || "").toLowerCase();
    const right = String(b.instrument || "").toLowerCase();
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
  });
}

function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

function setStatus(msg) {
  statusEl.textContent = msg;
  statusEl.className = "status";
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
