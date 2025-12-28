const ignored = new Set(["_rid", "_self", "_etag", "_attachments", "_ts", "id"]);

const $ = (s) => document.querySelector(s);
const urlInput = $("#urlInput");
const statusEl = $("#status");
const output = $("#output");

// AcrylicTouchableEnum mapping
const AcrylicTouchableEnum = {
  0: "Bass Clef",
  1: "Treble Clef",
  2: "Mix Clef",
  3: "C Major",
  4: "G Major",
  5: "D Major",
  6: "A Major",
  7: "E Major",
  8: "B Major",
  9: "F♯ Major",
  10: "F Major",
  11: "B♭ Major",
  12: "E♭ Major",
  13: "A♭ Major",
  14: "D♭ Major",
  15: "G♭ Major",
  16: "Natural",
  17: "Double Sharp",
  18: "Double Flat",
  19: "♯ Accidental",
  20: "♭ Accidental",
  21: "Single Note",
  22: "Double Note",
  23: "Triple Note",
  24: "C Clef",
  25: "Alto Clef",
  26: "Tenor Clef",
  27: "French Horn (New)",
  28: "French Horn (Old)",
  29: "Practice Mode: Pitch Only",
  30: "Practice Mode: Pitch & Rhythm"
};

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

const PlatformEnum = {
  0: "iOS",
  1: "Android",
  2: "Windows"
};

const PracticeCategoriesEnum = {
  0: "FlashCard",
  1: "FullFlowSheetMusic",
  2: "RealSongs"
};

const ViolinTypeEnum = {
  0: "Traditional",
  1: "Suzuki"
};

const ClarinetTypeEnum = {
  0: "Bb",
  1: "A"
};

const FrenchHornTypeEnum = {
  0: "F",
  1: "Bb"
};

const TrumpetTypeEnum = {
  0: "C",
  1: "Bb"
};

const TromboneTypeEnum = {
  0: "Tenor",
  1: "Bass"
};

const SaxophoneTypeEnum = {
  0: "Alto",
  1: "Tenor",
  2: "Soprano",
  3: "Baritone"
};

// Flag-based enum for language (bitwise combination)
const LangaugeRegionEnum = {
  1: "English",
  2: "Traditional Chinese",
  4: "Japanese",
  8: "Korean",
  16: "Simplified Chinese",
  32: "Spanish",
  64: "German",
  128: "Portuguese",
  256: "Dutch"
};



// Helper to decode bit flags for LangaugeRegion
function decodeLangFlags(value) {
  if (typeof value !== "number") return value;
  const result = Object.entries(LangaugeRegionEnum)
    .filter(([bit]) => (value & bit) !== 0)
    .map(([, name]) => name);
  return result.length ? result.join(", ") : value;
}

function getInstrumentValue(row) {
  if (!row || typeof row !== "object") return null;
  for (const key of Object.keys(row)) {
    if (key.toLowerCase() === "instrument") return row[key];
  }
  return null;
}

function mapInstrumentType(row, value) {
  if (value == null) return "";

  const instrument = getInstrumentValue(row);
  switch (instrument) {
    case 2:
      return ViolinTypeEnum[value] ?? value;
    case 6:
      return ClarinetTypeEnum[value] ?? value;
    case 8:
      return FrenchHornTypeEnum[value] ?? value;
    case 11:
      return TrumpetTypeEnum[value] ?? value;
    case 17:
      return TromboneTypeEnum[value] ?? value;
    case 16:
      return SaxophoneTypeEnum[value] ?? value;
    default:
      return value;
  }
}

function mapEnumValue(key, value, row) {
  if (value == null) return "";

  const keyLower = key.toLowerCase();

  if (keyLower === "instrument") {
    return InstrumentEnum[value] ?? value;
  }
  if (keyLower === "platform") {
    return PlatformEnum[value] ?? value;
  }
  if (keyLower === "practicecategory") {
    return PracticeCategoriesEnum[value] ?? value;
  }
  if (keyLower === "instrumenttype") {
    return mapInstrumentType(row, value);
  }
  if (keyLower === "language" || keyLower === "languageregion") {
    return decodeLangFlags(value);
  }

  // Apply AcrylicTouchableEnum for multiple fields
  if (["clef", "key", "numberofnotes", "ccleftype"].includes(keyLower)) {
    return AcrylicTouchableEnum[value] ?? value;
  }

  return value; // default
}


function valueToString(v) {
  if (v == null) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}


$("#fetchBtn").addEventListener("click", fetchAndRender);
$("#clearBtn").addEventListener("click", () => {
  output.innerHTML = "";
  statusEl.textContent = "";
});

// --- NEW: sort state (module-level)
let SORT_STATE = { col: null, dir: null }; // dir: 'desc' | 'asc'
let CURRENT_ROWS = []; // original data (array of objects)
let CURRENT_COLS = []; // union of columns being shown

// Replace your existing fetchAndRender's success section with this:
async function fetchAndRender() {
  const url = urlInput.value.trim();
  if (!url) return;

  setStatus(`Fetching ${url} ...`);
  output.innerHTML = "";

  try {
    const resp = await fetch(url, { headers: { "Accept": "application/json" }});
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    const data = await resp.json();
    if (!Array.isArray(data)) throw new Error("Response is not a JSON array.");

    // NEW: set globals, reset sort
    CURRENT_ROWS = data.slice();
    SORT_STATE = { col: null, dir: null };

    renderTable(CURRENT_ROWS);
    setStatus(`Loaded ${data.length} item(s).`);
  } catch (e) {
    setError(`Error: ${e.message}. ${corsHint(url)}`);
  }
}

// --- Unchanged helpers: valueToString, escapeHtml, mapEnumValue, decodeLangFlags, etc.

// Replace your renderTable with the enhanced version:
function renderTable(rows) {
  // Derive columns (union), exclude ignored
  const cols = Array.from(
    rows.reduce((set, obj) => {
      if (obj && typeof obj === "object" && !Array.isArray(obj)) {
        for (const k of Object.keys(obj)) if (!ignored.has(k)) set.add(k);
      }
      return set;
    }, new Set())
  );

  if (cols.length === 0) {
    output.innerHTML = "<p>No displayable properties found.</p>";
    return;
  }

  CURRENT_COLS = cols;

  // If currently sorted, apply it to CURRENT_ROWS before drawing
  const rowsToDraw = sortIfNeeded(CURRENT_ROWS);

  const thead = `
    <thead>
      <tr>
        ${cols.map(c => {
          const isActive = SORT_STATE.col === c;
          const indicator = isActive ? (SORT_STATE.dir === "desc" ? "▼" : "▲") : "";
          const aria = isActive ? (SORT_STATE.dir === "desc" ? "descending" : "ascending") : "none";
          return `<th class="sortable" data-col="${escapeHtml(c)}" aria-sort="${aria}">
                    ${escapeHtml(c)}<span class="sort-indicator">${indicator}</span>
                  </th>`;
        }).join("")}
      </tr>
    </thead>`;

  const tbody = `
    <tbody>
      ${rowsToDraw.map(obj => {
        if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
          return `<tr><td colspan="${cols.length}">${escapeHtml(String(obj))}</td></tr>`;
        }
        return `<tr>${
          cols.map(c => {
            const mapped = mapEnumValue(c, obj[c], obj);
            return `<td>${escapeHtml(valueToString(mapped))}</td>`;
          }).join("")
        }</tr>`;
      }).join("")}
    </tbody>`;

  output.innerHTML = `<table>${thead}${tbody}</table>`;

  // Attach header click handlers
  const head = output.querySelector("thead");
  attachHeaderSortHandlers(head);

  // If you’re using the fixed-header Option B from earlier, keep this call:
  if (typeof buildFixedHeaderFrom === "function") {
    const tableEl = output.querySelector("table");
    buildFixedHeaderFrom(tableEl);
  }
}

// --- NEW: click handlers + sorting utilities
function attachHeaderSortHandlers(theadEl) {
  theadEl.querySelectorAll("th.sortable").forEach(th => {
    th.addEventListener("click", () => {
      const col = th.getAttribute("data-col");
      // Toggle rule: first click desc (high→low), then asc.
      if (SORT_STATE.col === col) {
        SORT_STATE.dir = SORT_STATE.dir === "desc" ? "asc" : "desc";
      } else {
        SORT_STATE.col = col;
        SORT_STATE.dir = "desc";
      }
      // Redraw with new sort
      renderTable(CURRENT_ROWS);
    });
  });
}

function sortIfNeeded(rows) {
  if (!SORT_STATE.col || !SORT_STATE.dir) return rows;
  const col = SORT_STATE.col;
  const dir = SORT_STATE.dir;

  // Build decorated array to keep sorting stable
  const decorated = rows.map((row, idx) => {
    const mapped = mapEnumValue(col, row?.[col], row);
    const comp = toComparable(mapped);
    return { row, idx, comp };
  });

  decorated.sort((a, b) => {
    const res = compareValues(a.comp, b.comp);
    // 'desc' means high→low first
    return dir === "desc" ? -res : res;
  });

  return decorated.map(d => d.row);
}

// Convert displayed (mapped) value into a comparable form
function toComparable(v) {
  if (v == null) return null;

  // Try number
  if (typeof v === "number") return { t: "n", v };
  if (typeof v === "string") {
    const num = parseFloat(v);
    const numericLike = v.trim().match(/^[-+]?\d+(\.\d+)?$/);
    if (numericLike && Number.isFinite(num)) return { t: "n", v: num };

    // Optional: treat ISO-ish dates as dates (uncomment if you want date sorting)
    // const ts = Date.parse(v);
    // if (!Number.isNaN(ts)) return { t: "d", v: ts };

    return { t: "s", v: v.toLowerCase() };
  }

  // Objects/arrays: compare by JSON text
  return { t: "s", v: JSON.stringify(v).toLowerCase() };
}

// Order: numbers > strings > others; then by value; nulls last
function compareValues(a, b) {
  // Handle nulls/undefined uniformly
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  // Type order
  const order = { "n": 2, "s": 1, "d": 3 }; // if you enable 'd'ates, adjust order as you like
  const ao = order[a.t] ?? 0;
  const bo = order[b.t] ?? 0;
  if (ao !== bo) return ao - bo;

  // Same type → compare value
  if (a.v < b.v) return -1;
  if (a.v > b.v) return 1;
  return 0;
}




function valueToString(v) {
  if (v == null) return "";                   // null/undefined → blank
  if (typeof v === "object") return JSON.stringify(v);
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

function setStatus(msg) { statusEl.textContent = msg; statusEl.className = "status"; }
function setError(msg) { statusEl.textContent = msg; statusEl.className = "status error"; }

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
