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

function mapEnumValue(key, value) {
  if (value == null) return "";

  const keyLower = key.toLowerCase();

  if (keyLower === "instrument") {
    return InstrumentEnum[value] ?? value;
  }
  if (keyLower === "platform") {
    return PlatformEnum[value] ?? value;
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
    renderTable(data);
    setStatus(`Loaded ${data.length} item(s).`);
  } catch (e) {
    setError(`Error: ${e.message}. ${corsHint(url)}`);
  }
}

function renderTable(rows) {
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

  const thead = `
    <thead>
      <tr>${cols.map(c => `<th>${escapeHtml(c)}</th>`).join("")}</tr>
    </thead>`;

  const tbody = `
    <tbody>
      ${rows.map(obj => {
        if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
          return `<tr><td colspan="${cols.length}">${escapeHtml(String(obj))}</td></tr>`;
        }
        return `<tr>${
          cols.map(c => {
            const mapped = mapEnumValue(c, obj[c]);
            return `<td>${escapeHtml(valueToString(mapped))}</td>`;
          }).join("")
        }</tr>`;
      }).join("")}
    </tbody>`;

  output.innerHTML = `<table>${thead}${tbody}</table>`;
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
