const ignored = new Set(["_rid", "_self", "_etag", "_attachments", "_ts", "id"]);

const $ = (s) => document.querySelector(s);
const urlInput = $("#urlInput");
const searchInput = $("#searchInput");
const statusEl = $("#status");
const output = $("#output");
const endpointRadios = document.querySelectorAll('input[name="endpoint"]');

const SharedEnums = window.SharedEnums || {};
const {
  AcrylicTouchableEnum = {},
  InstrumentEnum = {},
  PlatformEnum = {},
  PracticeCategoriesEnum = {},
  IntervalsPracticeModeEnum = {},
  MusicTheoryCategoryEnum = {},
  AuralCategoryEnum = {},
  ScaleModeEnum = {},
  MinorScaleTypeEnum = {},
  ChordTypeEnum = {},
  RhythmTypeSelectionEnum = {},
  RhythmNoteTypeEnum = {},
  RhythmRestTypeEnum = {},
  DottedNoteTypeEnum = {},
  RhythmTimeSignatureEnum = {},
  ToolsEnum = {},
  ViolinTypeEnum = {},
  ClarinetTypeEnum = {},
  FrenchHornTypeEnum = {},
  TrumpetTypeEnum = {},
  TromboneTypeEnum = {},
  SaxophoneTypeEnum = {},
  BookEnum = {},
  StaffSelectionEnum = {},
  SongOrganisationModeEnum = {},
  HintTypeEnum = {},
  PitchPrecisionLevelEnum = {},
} = SharedEnums;

// Flag-based enum for language (bitwise combination)
const LangaugeRegionEnum =
  (window.SharedEnums && window.SharedEnums.LangaugeRegionEnum) || {};



// Helper to decode bit flags for LangaugeRegion
function decodeLangFlags(value) {
  if (typeof value !== "number") return value;
  const result = Object.entries(LangaugeRegionEnum)
    .filter(([bit]) => (value & bit) !== 0)
    .map(([, name]) => name);
  return result.length ? result.join(", ") : value;
}

function extractQueryString(value) {
  if (!value) return "";
  const question = value.indexOf("?");
  return question >= 0 ? value.slice(question) : "";
}

function setUrlFromBase(baseUrl) {
  if (!baseUrl || !urlInput) return;
  const query = extractQueryString(urlInput.value.trim());
  urlInput.value = `${baseUrl}${query}`;
}

function syncEndpointRadios() {
  if (!endpointRadios.length || !urlInput) return;
  const base = urlInput.value.trim().split("?")[0];
  endpointRadios.forEach((radio) => {
    radio.checked = radio.value === base;
  });
}

endpointRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) setUrlFromBase(radio.value);
  });
});
syncEndpointRadios();

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
  if (keyLower === "intervalspracticemode") {
    return IntervalsPracticeModeEnum[value] ?? value;
  }
  if (keyLower === "musictheorycategory") {
    return MusicTheoryCategoryEnum[value] ?? value;
  }
  if (keyLower === "auralcategory") {
    return AuralCategoryEnum[value] ?? value;
  }
  if (keyLower === "scalemode") {
    return ScaleModeEnum[value] ?? value;
  }
  if (keyLower === "minorscaletype") {
    return MinorScaleTypeEnum[value] ?? value;
  }
  if (keyLower === "chordtype") {
    return ChordTypeEnum[value] ?? value;
  }
  if (keyLower === "rhythmtypeselection") {
    return RhythmTypeSelectionEnum[value] ?? value;
  }
  if (keyLower === "rhythmnotetype") {
    return RhythmNoteTypeEnum[value] ?? value;
  }
  if (keyLower === "rhythmresttype") {
    return RhythmRestTypeEnum[value] ?? value;
  }
  if (keyLower === "dottednotetype") {
    return DottedNoteTypeEnum[value] ?? value;
  }
  if (keyLower === "rhythmtimesignature") {
    return RhythmTimeSignatureEnum[value] ?? value;
  }
  if (keyLower === "tool") {
    return ToolsEnum[value] ?? value;
  }
  if (keyLower === "instrumenttype") {
    return mapInstrumentType(row, value);
  }
  if (keyLower === "book") {
    return BookEnum[value] ?? value;
  }
  if (keyLower === "staff" || keyLower === "staffselection") {
    return StaffSelectionEnum[value] ?? value;
  }
  if (keyLower === "searchby") {
    return SongOrganisationModeEnum[value] ?? value;
  }
  if (keyLower === "hinttype") {
    return HintTypeEnum[value] ?? value;
  }
  if (keyLower === "pitchprecisionlevel") {
    return PitchPrecisionLevelEnum[value] ?? value;
  }
  if (keyLower === "language" || keyLower === "languageregion") {
    return decodeLangFlags(value);
  }

  // Apply AcrylicTouchableEnum for multiple fields
  if (["clef", "key", "keysignature", "numberofnotes", "ccleftype"].includes(keyLower)) {
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
  CURRENT_ROWS = [];
  setFilterText("");
  window.dispatchEvent(new CustomEvent("tableviewer:clear"));
});

// --- NEW: sort state (module-level)
let SORT_STATE = { col: null, dir: null }; // dir: 'desc' | 'asc'
let CURRENT_ROWS = []; // original data (array of objects)
let CURRENT_COLS = []; // union of columns being shown

// --- NEW: multi-column search state
let FILTER_TERMS = []; // lowercase terms; a row must match every one of them
const SEARCH_INDEX = new WeakMap(); // row object -> cached lowercase search tokens

function setFilterText(text) {
  FILTER_TERMS = String(text || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (searchInput && searchInput.value !== text) searchInput.value = text;
}

// Tokens searched for a row: each displayed cell value, plus each word inside it,
// so "Vio" matches "Violin"/"Viola" and "pitch" matches "Practice Mode: Pitch Only".
function rowSearchTokens(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return [valueToString(row).toLowerCase()];
  }

  let tokens = SEARCH_INDEX.get(row);
  if (tokens) return tokens;

  tokens = [];
  for (const col of CURRENT_COLS) {
    const text = valueToString(mapEnumValue(col, row[col], row)).toLowerCase();
    if (!text) continue;
    tokens.push(text);
    for (const word of text.split(/[^a-z0-9#+.]+/)) {
      if (word && word !== text) tokens.push(word);
    }
  }
  SEARCH_INDEX.set(row, tokens);
  return tokens;
}

function matchesFilter(row) {
  if (!FILTER_TERMS.length) return true;
  const tokens = rowSearchTokens(row);
  return FILTER_TERMS.every((term) => tokens.some((t) => t.startsWith(term)));
}

if (searchInput) {
  let debounce = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      setFilterText(searchInput.value);
      if (CURRENT_ROWS.length) renderTable(CURRENT_ROWS);
    }, 120);
  });
  searchInput.addEventListener("search", () => {
    // native clear (×) on type="search"
    clearTimeout(debounce);
    setFilterText(searchInput.value);
    if (CURRENT_ROWS.length) renderTable(CURRENT_ROWS);
  });
}

// Replace your existing fetchAndRender's success section with this:
async function fetchAndRender() {
  const url = urlInput.value.trim();
  if (!url) return;

  setStatus(`Fetching ${url} ...`);
  output.innerHTML = "";
  window.dispatchEvent(new CustomEvent("tableviewer:clear"));

  try {
    const resp = await fetch(url, { headers: { "Accept": "application/json" }});
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    const data = await resp.json();
    if (!Array.isArray(data)) throw new Error("Response is not a JSON array.");

    // NEW: set globals, reset sort
    CURRENT_ROWS = data.slice();
    SORT_STATE = { col: null, dir: null };

    renderTable(CURRENT_ROWS); // sets the status line (incl. filter counts)
    window.dispatchEvent(new CustomEvent("tableviewer:data", {
      detail: { items: CURRENT_ROWS, url }
    }));
  } catch (e) {
    setError(`Error: ${e.message}. ${corsHint(url)}`);
  }
}

// --- Unchanged helpers: valueToString, escapeHtml, mapEnumValue, decodeLangFlags, etc.

// Replace your renderTable with the enhanced version:
function renderTable(rows) {
  // Derive columns (union), exclude ignored.
  // Always from the full data set so columns stay stable while filtering.
  const cols = Array.from(
    (CURRENT_ROWS.length ? CURRENT_ROWS : rows).reduce((set, obj) => {
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

  // Filter first (needs CURRENT_COLS), then apply the current sort
  const filtered = FILTER_TERMS.length ? rows.filter(matchesFilter) : rows;
  const rowsToDraw = sortIfNeeded(filtered);

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

  const tbody = rowsToDraw.length === 0 ? `
    <tbody>
      <tr><td colspan="${cols.length}">No records match the search.</td></tr>
    </tbody>` : `
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

  setStatus(
    FILTER_TERMS.length
      ? `Showing ${rowsToDraw.length} of ${rows.length} item(s) matching "${FILTER_TERMS.join(" ")}".`
      : `Loaded ${rows.length} item(s).`
  );

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

