const $ = (s) => document.querySelector(s);
const urlInput = $("#urlInput");
const statusEl = $("#status");
const output = $("#output");
const controlsEl = document.querySelector(".controls");

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

let chartInstance = null;

$("#fetchBtn").addEventListener("click", fetchAndRender);
$("#clearBtn").addEventListener("click", () => {
  destroyChart();
  output.innerHTML = "";
  statusEl.textContent = "";
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

    const weeklyRows = buildWeeklyActiveRows(data);
    renderChart(weeklyRows);
    setStatus(`Loaded ${data.length} item(s). Showing ${weeklyRows.length} week bucket(s).`);
  } catch (e) {
    setError(`Error: ${e.message}. ${corsHint(url)}`);
  }
}

function buildWeeklyActiveRows(items) {
  const deviceKey = findKey(items, ["deviceid"]);
  const dateKey = findKey(items, ["datetime"]);
  if (!deviceKey || !dateKey) return [];

  const parsed = [];
  for (const item of items) {
    if (!isPlainRecord(item)) continue;
    const deviceRaw = item[deviceKey];
    const deviceId = deviceRaw == null ? "" : String(deviceRaw).trim();
    if (!deviceId) continue;

    const ts = toTimestamp(item[dateKey]);
    if (ts == null) continue;
    parsed.push({ deviceId, ts });
  }
  if (!parsed.length) return [];

  let minTs = parsed[0].ts;
  let maxTs = parsed[0].ts;
  for (let i = 1; i < parsed.length; i++) {
    if (parsed[i].ts < minTs) minTs = parsed[i].ts;
    if (parsed[i].ts > maxTs) maxTs = parsed[i].ts;
  }

  const weekMap = new Map();
  for (const entry of parsed) {
    // Backward bucketing: index 0 is always the latest 7-day window.
    const indexFromEnd = Math.floor((maxTs - entry.ts) / WEEK_MS);
    let bucket = weekMap.get(indexFromEnd);
    if (!bucket) {
      const endTs = maxTs - indexFromEnd * WEEK_MS;
      const startTs = endTs - WEEK_MS + 1;
      bucket = {
        indexFromEnd,
        startTs,
        endTs,
        label: formatIntervalLabel(startTs, endTs),
        devices: new Set()
      };
      weekMap.set(indexFromEnd, bucket);
    }
    bucket.devices.add(entry.deviceId);
  }

  const maxIndexFromEnd = Math.floor((maxTs - minTs) / WEEK_MS);
  const rows = [];
  for (let indexFromEnd = maxIndexFromEnd; indexFromEnd >= 0; indexFromEnd--) {
    const existing = weekMap.get(indexFromEnd);
    if (existing) {
      rows.push({
        label: existing.label,
        count: existing.devices.size
      });
      continue;
    }

    // Keep continuous intervals even when a week has zero active users.
    const endTs = maxTs - indexFromEnd * WEEK_MS;
    const startTs = endTs - WEEK_MS + 1;
    rows.push({
      label: formatIntervalLabel(startTs, endTs),
      count: 0
    });
  }

  return rows.map((bucket) => ({
      label: bucket.label,
      count: bucket.count
    }));
}

function renderChart(rows) {
  destroyChart();
  if (!rows.length) {
    output.innerHTML = "<p>No valid device/date data found.</p>";
    return;
  }
  if (typeof Chart === "undefined") {
    setError("Chart.js failed to load.");
    return;
  }

  output.innerHTML = `
    <div class="chart-panel">
      <div class="chart-canvas-wrap">
        <canvas id="activeUsersChart"></canvas>
      </div>
    </div>`;

  const canvas = $("#activeUsersChart");
  applyChartSizing(rows.length);

  chartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: rows.map((r) => r.label),
      datasets: [{
        label: "Weekly Active Users",
        data: rows.map((r) => r.count),
        backgroundColor: "#1f77d0",
        borderColor: "#1f77d0",
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
              return `Users: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "7-Day Interval"
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          ticks: { precision: 0 },
          title: {
            display: true,
            text: "Active Users (Unique DeviceIds)"
          }
        }
      }
    }
  });
}

function applyChartSizing(barCount) {
  const wrap = output.querySelector(".chart-canvas-wrap");
  if (wrap) wrap.style.height = `${getChartHeightPx()}px`;

  const canvas = chartInstance ? chartInstance.canvas : $("#activeUsersChart");
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

function formatDate(ts) {
  const d = new Date(ts);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatIntervalLabel(startTs, endTs) {
  return [formatDate(startTs), "-", formatDate(endTs)];
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
