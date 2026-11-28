// NusaStat charts — hand-rolled SVG builders, no dependencies, no randomness.
// Every builder returns a deterministic SVG string with a <title> for accessibility.
// Round 4 adds sparkline(): a small label-free trend line for the KPI cards.

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtNum(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1000) {
    return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 100) / 100);
}

function fmtVal(value, unit) {
  const base = fmtNum(value);
  if (!unit) return base;
  if (unit === "%") return base + "%";
  return base + " " + unit;
}

function niceTicks(lo, hi, count) {
  const span = hi - lo || 1;
  const stepRaw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
  const norm = stepRaw / mag;
  const step = norm < 1.5 ? mag : norm < 3.5 ? 2 * mag : norm < 7.5 ? 5 * mag : 10 * mag;
  const start = Math.ceil(lo / step) * step;
  const ticks = [];
  for (let v = start; v <= hi + step * 0.001; v += step) {
    ticks.push(Math.round(v * 1000000) / 1000000);
  }
  if (ticks.length < 2) ticks.push(lo, hi);
  return { ticks, step };
}

function svgOpen(width, height, title) {
  // No xmlns attribute: inline SVG in HTML needs none, and this keeps the
  // entry free of network-reference strings.
  return (
    '<svg viewBox="0 0 ' +
    width + " " + height + '" width="' + width + '" height="' + height +
    '" role="img" aria-label="' + esc(title) + '"><title>' + esc(title) + "</title>"
  );
}

const GRID = "#e6ecea";
const AXIS = "#8a9a96";
const TEXT = "#33413e";
const TEXT_MUTED = "#6b7d78";

// Small label-free trend line for KPI cards. values = array of numbers;
// opts: { width, height, color, unit, title, labels }. The polyline gets
// a faint area fill and an amber dot on the last point. Works with as few
// as two points (the GDP level / GDP per capita series). No axis, no
// labels — the full series lives in the <title> for screen readers.
export function sparkline(values, opts = {}) {
  const width = opts.width || 300;
  const height = opts.height || 34;
  const color = opts.color || "#0e5f57";
  const unit = opts.unit || "";
  const labels = Array.isArray(opts.labels) ? opts.labels : [];
  const title = opts.title || "Sparkline";
  const vals = (Array.isArray(values) ? values : []).map(Number).filter(Number.isFinite);
  if (vals.length === 0) {
    return svgOpen(width, height, title + " — no data") + "</svg>";
  }
  const detail = vals.map((v, i) => {
    const lab = labels[i] !== undefined ? labels[i] + " " : "";
    return lab + fmtVal(v, unit);
  }).join(", ");
  const fullTitle = title + ": " + detail;
  const n = vals.length;
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  if (lo === hi) { lo -= 1; hi += 1; }
  const pad = (hi - lo) * 0.12;
  lo -= pad; hi += pad;
  const padX = 3;
  const padT = 4;
  const padB = 4;
  const plotW = width - padX * 2;
  const plotH = height - padT - padB;
  const x = (i) => padX + (n === 1 ? plotW / 2 : (i * plotW) / (n - 1));
  const y = (v) => padT + ((hi - v) / (hi - lo)) * plotH;
  const pts = vals.map((v, i) => x(i).toFixed(1) + "," + y(v).toFixed(1));
  const line = pts.map((p, i) => (i === 0 ? "M" : "L") + p).join(" ");
  const area = line + " L" + x(n - 1).toFixed(1) + "," + (padT + plotH).toFixed(1) +
    " L" + x(0).toFixed(1) + "," + (padT + plotH).toFixed(1) + " Z";
  let s = svgOpen(width, height, fullTitle);
  s += '<path d="' + area + '" fill="' + esc(color) + '" fill-opacity="0.10" stroke="none"/>';
  s += '<path d="' + line + '" fill="none" stroke="' + esc(color) + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
  s += '<circle cx="' + x(n - 1).toFixed(1) + '" cy="' + y(vals[n - 1]).toFixed(1) + '" r="3.5" fill="#e8a317" stroke="#ffffff" stroke-width="1.5"/>';
  s += "</svg>";
  return s;
}

export function lineChart({ width = 640, height = 300, labels = [], values = [], color = "#0e5f57", unit = "", ymin, ymax } = {}) {
  const title = "Line chart: " + labels.map((l, i) => l + " " + fmtVal(values[i], unit)).join(", ");
  if (!labels.length || !values.length) {
    return svgOpen(width, height, "Line chart — no data") + '<text x="16" y="30" fill="' + TEXT_MUTED + '" font-size="13">No data</text></svg>';
  }
  const n = Math.min(labels.length, values.length);
  const vals = values.slice(0, n);
  const labs = labels.slice(0, n);
  let lo = ymin !== undefined && ymin !== null ? Number(ymin) : Math.min(...vals);
  let hi = ymax !== undefined && ymax !== null ? Number(ymax) : Math.max(...vals);
  if (lo === hi) { lo -= 1; hi += 1; }
  const pad = (hi - lo) * 0.08;
  lo -= pad; hi += pad;
  const padL = 58, padR = 18, padT = 26, padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const x = (i) => padL + (n === 1 ? plotW / 2 : (i * plotW) / (n - 1));
  const y = (v) => padT + ((hi - v) / (hi - lo)) * plotH;
  const { ticks } = niceTicks(lo, hi, 4);
  let s = svgOpen(width, height, title);
  for (const t of ticks) {
    const ty = y(t);
    if (ty < padT - 1 || ty > padT + plotH + 1) continue;
    s += '<line x1="' + padL + '" y1="' + ty.toFixed(1) + '" x2="' + (width - padR) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
    s += '<text x="' + (padL - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + TEXT_MUTED + '">' + esc(fmtNum(t)) + "</text>";
  }
  s += '<line x1="' + padL + '" y1="' + (padT + plotH) + '" x2="' + (width - padR) + '" y2="' + (padT + plotH) + '" stroke="' + AXIS + '" stroke-width="1"/>';
  const d = vals.map((v, i) => (i === 0 ? "M" : "L") + x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
  s += '<path d="' + d + '" fill="none" stroke="' + esc(color) + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
  vals.forEach((v, i) => {
    s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="4" fill="#ffffff" stroke="' + esc(color) + '" stroke-width="2.5"/>';
    s += '<text x="' + x(i).toFixed(1) + '" y="' + (y(v) - 10).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="' + TEXT + '">' + esc(fmtVal(v, unit)) + "</text>";
    s += '<text x="' + x(i).toFixed(1) + '" y="' + (padT + plotH + 20).toFixed(1) + '" text-anchor="middle" font-size="11" fill="' + TEXT_MUTED + '">' + esc(labs[i]) + "</text>";
  });
  s += "</svg>";
  return s;
}

export function barChart({ width = 640, height = 300, labels = [], values = [], color = "#0e5f57", unit = "" } = {}) {
  const title = "Bar chart: " + labels.map((l, i) => l + " " + fmtVal(values[i], unit)).join(", ");
  if (!labels.length || !values.length) {
    return svgOpen(width, height, "Bar chart — no data") + '<text x="16" y="30" fill="' + TEXT_MUTED + '" font-size="13">No data</text></svg>';
  }
  const n = Math.min(labels.length, values.length);
  const vals = values.slice(0, n);
  const labs = labels.slice(0, n);
  const max = Math.max(...vals, 0);
  const hi = max === 0 ? 1 : max * 1.12;
  const lo = Math.min(0, Math.min(...vals));
  const padL = 58, padR = 14, padT = 26, padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const zeroY = padT + ((hi - 0) / (hi - lo)) * plotH;
  const y = (v) => padT + ((hi - v) / (hi - lo)) * plotH;
  const { ticks } = niceTicks(lo, hi, 4);
  let s = svgOpen(width, height, title);
  for (const t of ticks) {
    const ty = y(t);
    if (ty < padT - 1 || ty > padT + plotH + 1) continue;
    s += '<line x1="' + padL + '" y1="' + ty.toFixed(1) + '" x2="' + (width - padR) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
    s += '<text x="' + (padL - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + TEXT_MUTED + '">' + esc(fmtNum(t)) + "</text>";
  }
  s += '<line x1="' + padL + '" y1="' + zeroY.toFixed(1) + '" x2="' + (width - padR) + '" y2="' + zeroY.toFixed(1) + '" stroke="' + AXIS + '" stroke-width="1"/>';
  const slot = plotW / n;
  const barW = Math.max(8, Math.min(64, slot * 0.62));
  // Dense charts (narrow slots) would overlap neighbouring value
  // labels, so only the first, last and largest bars get a label;
  // wide charts label every bar.
  const showAllLabels = slot >= 40;
  const maxV = Math.max(...vals);
  vals.forEach((v, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(v, 0));
    const bottom = v >= 0 ? zeroY : y(Math.min(v, 0));
    const h = Math.max(1, Math.abs(bottom - top));
    const barTop = v >= 0 ? top : zeroY;
    s += '<rect x="' + (cx - barW / 2).toFixed(1) + '" y="' + barTop.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="3" fill="' + esc(color) + '"/>';
    if (showAllLabels || i === 0 || i === n - 1 || v === maxV) {
      s += '<text x="' + cx.toFixed(1) + '" y="' + (barTop - 7).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="' + TEXT + '">' + esc(fmtVal(v, unit)) + "</text>";
    }
    s += '<text x="' + cx.toFixed(1) + '" y="' + (padT + plotH + 20).toFixed(1) + '" text-anchor="middle" font-size="11" fill="' + TEXT_MUTED + '">' + esc(labs[i]) + "</text>";
  });
  s += "</svg>";
  return s;
}

export function hbarChart({ width = 640, height = 300, items = [], color = "#0e5f57", unit = "", rowH = 30 } = {}) {
  const title = "Horizontal bar chart: " + items.map((d) => d.label + " " + fmtVal(d.value, unit)).join(", ");
  if (!items.length) {
    return svgOpen(width, height, "Horizontal bar chart — no data") + '<text x="16" y="30" fill="' + TEXT_MUTED + '" font-size="13">No data</text></svg>';
  }
  const top = 14;
  const bottom = 12;
  const needH = top + items.length * rowH + bottom;
  const h = Math.max(height, needH);
  const labelW = 150;
  const valueW = 64;
  const barX = labelW;
  const barW = width - labelW - valueW - 10;
  const max = Math.max(...items.map((d) => Number(d.value) || 0), 0) || 1;
  let s = svgOpen(width, h, title);
  items.forEach((d, i) => {
    const cy = top + i * rowH + rowH / 2;
    const v = Number(d.value) || 0;
    const w = Math.max(v > 0 ? 3 : 0, (v / max) * barW);
    s += '<text x="' + (labelW - 10) + '" y="' + (cy + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="' + TEXT + '">' + esc(d.label) + "</text>";
    s += '<rect x="' + barX + '" y="' + (cy - 9).toFixed(1) + '" width="' + w.toFixed(1) + '" height="18" rx="4" fill="' + esc(color) + '"/>';
    s += '<text x="' + (barX + w + 8).toFixed(1) + '" y="' + (cy + 4).toFixed(1) + '" font-size="12" font-weight="700" fill="' + TEXT + '">' + esc(fmtVal(v, unit)) + "</text>";
  });
  s += "</svg>";
  return s;
}

export function donutChart({ width = 640, height = 300, items = [], unit = "" } = {}) {
  const total = items.reduce((a, d) => a + (Number(d.value) || 0), 0);
  const title = "Donut chart: " + items.map((d) => d.label + " " + fmtVal(d.value, unit)).join(", ");
  const palette = ["#0e5f57", "#e8a317", "#12766b", "#c97b1e", "#5aa99f", "#8a6d1b", "#2f8f7a", "#d9a441"];
  if (!items.length || total <= 0) {
    return svgOpen(width, height, "Donut chart — no data") + '<text x="16" y="30" fill="' + TEXT_MUTED + '" font-size="13">No data</text></svg>';
  }
  const cx = Math.min(height, 260) / 2 + 8;
  const cy = height / 2;
  const rOuter = Math.min(height / 2 - 10, 130);
  const rInner = rOuter * 0.58;
  const legendX = cx + rOuter + 28;
  let s = svgOpen(width, height, title);
  if (items.length === 1) {
    const c = items[0].color || palette[0];
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rOuter + '" fill="' + esc(c) + '"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rInner + '" fill="#ffffff"/>';
  } else {
    let angle = -Math.PI / 2;
    items.forEach((d, i) => {
      const frac = (Number(d.value) || 0) / total;
      if (frac <= 0) return;
      const sweep = frac * Math.PI * 2;
      const a0 = angle;
      const a1 = angle + sweep;
      const large = sweep > Math.PI ? 1 : 0;
      const x0 = cx + rOuter * Math.cos(a0);
      const y0 = cy + rOuter * Math.sin(a0);
      const x1 = cx + rOuter * Math.cos(a1);
      const y1 = cy + rOuter * Math.sin(a1);
      const xi1 = cx + rInner * Math.cos(a1);
      const yi1 = cy + rInner * Math.sin(a1);
      const xi0 = cx + rInner * Math.cos(a0);
      const yi0 = cy + rInner * Math.sin(a0);
      const c = d.color || palette[i % palette.length];
      s += '<path d="M ' + x0.toFixed(1) + " " + y0.toFixed(1) + " A " + rOuter + " " + rOuter + " 0 " + large + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1) +
        " L " + xi1.toFixed(1) + " " + yi1.toFixed(1) + " A " + rInner + " " + rInner + " 0 " + large + " 0 " + xi0.toFixed(1) + " " + yi0.toFixed(1) +
        ' Z" fill="' + esc(c) + '" stroke="#ffffff" stroke-width="2"/>';
      angle = a1;
    });
  }
  s += '<text x="' + cx + '" y="' + (cy - 2).toFixed(1) + '" text-anchor="middle" font-size="20" font-weight="800" fill="#07332f">' + esc(fmtVal(total, unit)) + "</text>";
  s += '<text x="' + cx + '" y="' + (cy + 16).toFixed(1) + '" text-anchor="middle" font-size="11" fill="' + TEXT_MUTED + '">total</text>';
  items.forEach((d, i) => {
    const ly = 24 + i * 24;
    if (ly > height - 8) return;
    const c = d.color || palette[i % palette.length];
    const pct = total ? ((Number(d.value) || 0) / total) * 100 : 0;
    s += '<rect x="' + legendX + '" y="' + (ly - 10) + '" width="12" height="12" rx="3" fill="' + esc(c) + '"/>';
    s += '<text x="' + (legendX + 20) + '" y="' + ly + '" font-size="12" fill="' + TEXT + '">' + esc(d.label) + " — " + esc(fmtVal(d.value, unit)) + " (" + pct.toFixed(1) + "%)</text>";
  });
  s += "</svg>";
  return s;
}

// ---------- Province tile map (round 3) ----------

// Colourblind-safe sequential palette, light (lowest) to dark (highest).
export const TILE_COLORS = ["#e3f0ee", "#a9d6ce", "#6bb7a9", "#1f7a6d", "#07463e"];
export const TILE_NULL_COLOR = "#d7dee0";

// Tile-grid cartogram of Indonesia: each province is one tile, arranged
// to roughly mirror the country's geography — Sumatra on a NW–SE
// diagonal at the top left, the Java row below it, Kalimantan in the
// centre, Sulawesi to its east, and Maluku / Papua at the far east.
// Columns 1–14, rows 1–7, 1-based.
export const TILE_POS = {
  "Aceh": { col: 1, row: 1 },
  "North Sumatra": { col: 2, row: 2 },
  "West Sumatra": { col: 2, row: 3 },
  "Riau": { col: 3, row: 3 },
  "Riau Islands": { col: 4, row: 3 },
  "Jambi": { col: 3, row: 4 },
  "South Sumatra": { col: 4, row: 4 },
  "Bengkulu": { col: 3, row: 5 },
  "Lampung": { col: 4, row: 5 },
  "Bangka Belitung Islands": { col: 5, row: 4 },
  "Jakarta": { col: 6, row: 6 },
  "West Java": { col: 7, row: 6 },
  "Central Java": { col: 8, row: 6 },
  "Yogyakarta": { col: 9, row: 6 },
  "East Java": { col: 10, row: 6 },
  "Banten": { col: 5, row: 6 },
  "Bali": { col: 11, row: 6 },
  "West Nusa Tenggara": { col: 12, row: 6 },
  "East Nusa Tenggara": { col: 13, row: 6 },
  "West Kalimantan": { col: 7, row: 2 },
  "Central Kalimantan": { col: 8, row: 2 },
  "South Kalimantan": { col: 8, row: 3 },
  "East Kalimantan": { col: 9, row: 2 },
  "North Kalimantan": { col: 8, row: 1 },
  "North Sulawesi": { col: 10, row: 1 },
  "Central Sulawesi": { col: 9, row: 3 },
  "South Sulawesi": { col: 10, row: 5 },
  "Southeast Sulawesi": { col: 11, row: 5 },
  "Gorontalo": { col: 10, row: 2 },
  "West Sulawesi": { col: 9, row: 4 },
  "Maluku": { col: 11, row: 3 },
  "North Maluku": { col: 12, row: 1 },
  "West Papua": { col: 13, row: 2 },
  "Southwest Papua": { col: 12, row: 4 },
  "Papua": { col: 13, row: 3 },
  "Central Papua": { col: 13, row: 4 },
  "Highland Papua": { col: 13, row: 5 },
  "South Papua": { col: 13, row: 7 }
};

// Split a short tile label into at most two lines of at most 9 characters
// each, so it fits inside one tile. A single long word stays whole.
function wrapLabel(label) {
  const words = String(label || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? current + " " + word : word;
    if (next.length <= 9) {
      current = next;
    } else if (!current) {
      current = word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length > 2) {
    const first = lines[0];
    const rest = lines.slice(1).join(" ");
    lines.length = 0;
    lines.push(first, rest.length > 9 ? rest.slice(0, 8) + "…" : rest);
  }
  return lines;
}

// Tile-grid cartogram. tiles = [{ name, value, col, row, label }].
// opts: { colors, breaks, selectedName, nullColor, width, height }.
// breaks = 4 ascending cut points giving 5 colour steps; a null value
// renders grey. Each tile is a focusable group with role="button" so it
// works with keyboard as well as mouse. Returns an SVG string.
export function buildTileMap(tiles, opts = {}) {
  const width = opts.width || 800;
  const height = opts.height || 352;
  const colors = opts.colors || TILE_COLORS;
  const breaks = (opts.breaks || []).slice().sort((a, b) => a - b);
  const selectedName = opts.selectedName || null;
  const nullColor = opts.nullColor || TILE_NULL_COLOR;
  const cols = 14;
  const rows = 7;
  const gap = 4;
  const tileW = (width - gap * (cols - 1)) / cols;
  const tileH = (height - gap * (rows - 1)) / rows;
  const title = "Tile map of Indonesia: " + tiles.map((t) => {
    const v = t.value === null || t.value === undefined ? "no data" : fmtNum(t.value);
    return t.name + " " + v;
  }).join(", ");
  let s = svgOpen(width, height, title);
  for (const t of tiles) {
    const pos = TILE_POS[t.name] || { col: t.col || 1, row: t.row || 1 };
    const x = (pos.col - 1) * (tileW + gap);
    const y = (pos.row - 1) * (tileH + gap);
    const cx = x + tileW / 2;
    const cy = y + tileH / 2;
    const v = t.value === null || t.value === undefined ? null : Number(t.value);
    let fill;
    let step = -1;
    if (v === null || Number.isNaN(v)) {
      fill = nullColor;
    } else {
      step = 0;
      for (const b of breaks) if (v > b) step += 1;
      step = Math.min(step, colors.length - 1);
      fill = colors[step];
    }
    const textFill = step === -1 ? "#45524f" : step <= 2 ? "#07332f" : "#ffffff";
    const valueText = v === null || Number.isNaN(v) ? "no data" : fmtNum(v);
    const label = t.label || t.name;
    const lines = wrapLabel(label);
    const isSelected = selectedName !== null && t.name === selectedName;
    s += '<g class="map-tile' + (isSelected ? " selected" : "") + '" tabindex="0" role="button" data-name="' + esc(t.name) + '" aria-label="' + esc(t.name) + ": " + esc(valueText) + '">' +
      '<title>' + esc(t.name) + ": " + esc(valueText) + "</title>" +
      '<rect class="tile-bg" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + tileW.toFixed(1) + '" height="' + tileH.toFixed(1) + '" rx="5" fill="' + esc(fill) + '"/>';
    if (lines.length === 1) {
      s += '<text x="' + cx.toFixed(1) + '" y="' + (cy + 3.5).toFixed(1) + '" text-anchor="middle" font-size="10" font-weight="700" fill="' + textFill + '">' + esc(lines[0]) + "</text>";
    } else {
      s += '<text x="' + cx.toFixed(1) + '" y="' + (cy - 5).toFixed(1) + '" text-anchor="middle" font-size="10" font-weight="700" fill="' + textFill + '">' + esc(lines[0]) + "</text>";
      s += '<text x="' + cx.toFixed(1) + '" y="' + (cy + 8).toFixed(1) + '" text-anchor="middle" font-size="10" font-weight="700" fill="' + textFill + '">' + esc(lines[1]) + "</text>";
    }
    s += "</g>";
  }
  s += "</svg>";
  return s;
}

// Population pyramid from the three age bands in AGE_STRUCTURE.
// No male/female split is published in the site's data, so the pyramid
// is a single centred column: one bar per band, stacked oldest on top
// and youngest at the bottom (the conventional pyramid order), with
// each bar's width proportional to that band's share of the
// population. The silhouette therefore reads as a pyramid without
// inventing a sex split. The dependency ratio printed under the bars
// — dependants per 100 people of working age — is computed here at
// runtime from the same three numbers, so the figure can never drift
// away from the bars above it.
export function buildPyramid(items, opts = {}) {
  const width = opts.width || 640;
  const height = opts.height || 300;
  const bands = (items || []).filter(function (d) {
    return d && Number.isFinite(Number(d.pct));
  });
  if (!bands.length) {
    return svgOpen(width, height, "Population pyramid — no data") +
      '<text x="16" y="30" fill="' + TEXT_MUTED + '" font-size="13">No data</text></svg>';
  }
  const total = bands.reduce(function (a, d) { return a + Number(d.pct); }, 0);
  const title = "Population pyramid: " + bands.map(function (d) {
    return d.label + " " + fmtVal(d.pct, "%");
  }).join(", ");
  // Oldest band first, so it sits at the top of the stack.
  const ordered = bands.slice().reverse();
  const palette = ["#a86f05", "#0e5f57", "#2f8f7a"];
  const maxPct = Math.max.apply(null, bands.map(function (d) { return Number(d.pct); }));
  const cx = width / 2;
  const labelW = 118;
  const maxHalf = Math.max(40, cx - labelW - 64);
  const top = 34;
  const bottom = height - 52;
  const rowH = (bottom - top) / ordered.length;
  const barH = Math.min(44, rowH - 18);
  let s = svgOpen(width, height, title);
  s += '<line x1="' + cx + '" y1="' + (top - 8) + '" x2="' + cx + '" y2="' + bottom +
    '" stroke="' + AXIS + '" stroke-width="1" stroke-dasharray="3 3" />';
  s += '<text x="' + cx + '" y="20" text-anchor="middle" font-size="12" fill="' +
    TEXT_MUTED + '">Share of population (%) — widest bar is the largest age group</text>';
  ordered.forEach(function (d, i) {
    const pct = Number(d.pct);
    const half = (pct / maxPct) * maxHalf;
    const y = top + i * rowH + (rowH - barH) / 2;
    const color = palette[i % palette.length];
    s += '<text x="' + (cx - half - 10) + '" y="' + (y + barH / 2 + 5).toFixed(1) +
      '" text-anchor="end" font-size="13" fill="' + TEXT + '">' + esc(d.label) + "</text>";
    s += '<rect x="' + (cx - half).toFixed(1) + '" y="' + y.toFixed(1) +
      '" width="' + (half * 2).toFixed(1) + '" height="' + barH.toFixed(1) +
      '" rx="4" fill="' + color + '"><title>' + esc(d.label + ": " + fmtVal(pct, "%")) + "</title></rect>";
    s += '<text x="' + (cx + half + 10) + '" y="' + (y + barH / 2 + 5).toFixed(1) +
      '" text-anchor="start" font-size="13" font-weight="700" fill="' + TEXT + '">' +
      fmtVal(pct, "%") + "</text>";
  });
  // Dependency ratio: (youngest + oldest) per 100 working-age people.
  // Bands are matched by their label, so a reordered input still works.
  const findBand = function (re) {
    const hit = bands.find(function (d) { return re.test(String(d.label)); });
    return hit ? Number(hit.pct) : 0;
  };
  const young = findBand(/^0/);
  const working = findBand(/^15/);
  const old = findBand(/^65/);
  const ratio = working > 0 ? ((young + old) / working) * 100 : 0;
  const ratioText = working > 0
    ? "Dependency ratio: " + fmtNum(Math.round(ratio * 10) / 10) +
      " dependants per 100 people of working age"
    : "Dependency ratio: not computable from these bands";
  s += '<text x="' + cx + '" y="' + (height - 28) + '" text-anchor="middle" font-size="13" font-weight="700" fill="' + TEXT + '">' + esc(ratioText) + "</text>";
  s += '<text x="' + cx + '" y="' + (height - 10) + '" text-anchor="middle" font-size="12" fill="' + TEXT_MUTED + '">' +
    "Bands sum to " + fmtVal(Math.round(total * 10) / 10, "%") + " of the population" + "</text>";
  s += "</svg>";
  return s;
}
