const $ = (s) => document.querySelector(s);
const urlInput = $("#urlInput");
const statusEl = $("#status");
const output = $("#output");
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

const COLUMN_CONFIG = {
  users: [
    { key: "instrument", label: "Instrument" },
    { key: "count", label: "DeviceIdCount" }
  ],
  sessions: [
    { key: "instrument", label: "Instrument" },
    { key: "count", label: "ItemsCount" }
  ]
};

let RAW_ITEMS = [];
let CURRENT_MODE = "users";
let CURRENT_ROWS = [];
let SORT_STATE = { col: "count", dir: "desc" };

$("#fetchBtn").addEventListener("click", fetchAndRender);
$("#clearBtn").addEventListener("click", () => {
  RAW_ITEMS = [];
  CURRENT_ROWS = [];
  output.innerHTML = "";
  statusEl.textContent = "";
});

modeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!radio.checked) return;
    CURRENT_MODE = radio.value;
    SORT_STATE = { col: "count", dir: "desc" };
    if (RAW_ITEMS.length) {
      CURRENT_ROWS = buildRows(RAW_ITEMS, CURRENT_MODE);
      renderTable();
      setStatus(`Loaded ${RAW_ITEMS.length} item(s). Showing ${CURRENT_ROWS.length} instrument group(s).`);
    }
  });
});

async function fetchAndRender() {
  const url = urlInput.value.trim();
  if (!url) return;

  setStatus(`Fetching ${url} ...`);
  output.innerHTML = "";

  try {
    const resp = await fetch(url, { headers: { "Accept": "application/json" } });
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    const data = await resp.json();
    if (!Array.isArray(data)) throw new Error("Response is not a JSON array.");

    RAW_ITEMS = data;
    CURRENT_MODE = getSelectedMode();
    SORT_STATE = { col: "count", dir: "desc" };
    CURRENT_ROWS = buildRows(RAW_ITEMS, CURRENT_MODE);
    renderTable();
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

function renderTable() {
  if (!CURRENT_ROWS.length) {
    output.innerHTML = "<p>No instrument usage data found.</p>";
    return;
  }

  const columns = COLUMN_CONFIG[CURRENT_MODE] || COLUMN_CONFIG.users;
  const rowsToDraw = sortRows(CURRENT_ROWS);

  const thead = `
    <thead>
      <tr>
        ${columns.map((col) => {
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
        return `<tr>${columns.map((col) => `<td>${escapeHtml(valueToString(row[col.key]))}</td>`).join("")}</tr>`;
      }).join("")}
    </tbody>`;

  output.innerHTML = `<table>${thead}${tbody}</table>`;
  attachHeaderSortHandlers();
}

function attachHeaderSortHandlers() {
  output.querySelectorAll("th.sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const col = th.getAttribute("data-col");
      if (SORT_STATE.col === col) {
        SORT_STATE.dir = SORT_STATE.dir === "desc" ? "asc" : "desc";
      } else {
        SORT_STATE.col = col;
        SORT_STATE.dir = "desc";
      }
      renderTable();
    });
  });
}

function sortRows(rows) {
  if (!SORT_STATE.col || !SORT_STATE.dir) return rows.slice();
  const col = SORT_STATE.col;
  const dir = SORT_STATE.dir;

  const decorated = rows.map((row, idx) => ({
    row,
    idx,
    comp: toComparable(getSortValue(row, col))
  }));

  decorated.sort((a, b) => {
    const res = compareValues(a.comp, b.comp);
    if (res !== 0) return dir === "desc" ? -res : res;
    return a.idx - b.idx;
  });

  return decorated.map((entry) => entry.row);
}

function getSortValue(row, col) {
  if (col === "instrument") return row.instrumentValue ?? row.instrument;
  return row[col];
}

function toComparable(v) {
  if (v == null) return null;
  if (typeof v === "number") return { t: "n", v };
  if (typeof v === "string") {
    const num = Number(v);
    if (Number.isFinite(num) && /^[-+]?\d+(\.\d+)?$/.test(v.trim())) return { t: "n", v: num };
    return { t: "s", v: v.toLowerCase() };
  }
  return { t: "s", v: JSON.stringify(v).toLowerCase() };
}

function compareValues(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  const order = { n: 2, s: 1 };
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
