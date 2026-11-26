// NusaStat — hand-rolled SVG chart builders (no library, no network).
// Each function returns an SVG string with axis labels, value labels and
// an accessible <title>. Series rows are {year, value} unless noted.

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function niceTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const step = (max - min) / count;
  const ticks = [];
  for (let i = 0; i <= count; i++) ticks.push(min + step * i);
  return ticks;
}

function fmtNum(v, digits) {
  const d = digits === undefined ? (Math.abs(v) < 10 ? 1 : 0) : digits;
  return v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

// Line chart. series: [{year, value}]. opts: {title, color, width, height,
// yLabel, second: [{year, value}] (optional second line), label, label2, digits}
export function lineChart(series, opts) {
  const o = opts || {};
  const W = o.width || 640, H = o.height || 280;
  const padL = 52, padR = 16, padT = 14, padB = 30;
  const iw = W - padL - padR, ih = H - padT - padB;
  const all = series.concat(o.second || []);
  let min = Math.min.apply(null, all.map(function (r) { return r.value; }));
  let max = Math.max.apply(null, all.map(function (r) { return r.value; }));
  const span = max - min || 1;
  min -= span * 0.12; max += span * 0.12;
  const ticks = niceTicks(min, max, 4);
  const x = function (i) { return padL + (i / (series.length - 1)) * iw; };
  const y = function (v) { return padT + (1 - (v - min) / (max - min)) * ih; };
  function pathOf(rows) {
    return rows.map(function (r, i) {
      return (i === 0 ? "M" : "L") + x(i).toFixed(1) + "," + y(r.value).toFixed(1);
    }).join(" ");
  }
  function dots(rows, color) {
    return rows.map(function (r, i) {
      return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(r.value).toFixed(1) +
        '" r="3.2" fill="' + color + '"><title>' + r.year + ": " + fmtNum(r.value, o.digits) +
        (o.yLabel || "") + "</title></circle>";
    }).join("");
  }
  const grid = ticks.map(function (t) {
    return '<line x1="' + padL + '" y1="' + y(t).toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y(t).toFixed(1) +
      '" stroke="#e3e9e7" stroke-width="1"/>' +
      '<text x="' + (padL - 6) + '" y="' + (y(t) + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#5b6d6a">' +
      fmtNum(t, o.digits) + "</text>";
  }).join("");
  const xlabels = series.map(function (r, i) {
    return '<text x="' + x(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="#5b6d6a">' + r.year + "</text>";
  }).join("");
  const last = series[series.length - 1];
  const lastLabel = '<text x="' + (x(series.length - 1) - 4).toFixed(1) + '" y="' + (y(last.value) - 9).toFixed(1) +
    '" text-anchor="end" font-size="12" font-weight="700" fill="' + (o.color || "#0d4f4a") + '">' +
    fmtNum(last.value, o.digits) + (o.yLabel || "") + "</text>";
  const second = o.second
    ? '<path d="' + pathOf(o.second) + '" fill="none" stroke="' + (o.color2 || "#e39a2d") + '" stroke-width="2.5"/>' + dots(o.second, o.color2 || "#e39a2d")
    : "";
  return '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.title || "Line chart") + '">' +
    "<title>" + esc(o.title || "Line chart") + "</title>" + grid +
    '<path d="' + pathOf(series) + '" fill="none" stroke="' + (o.color || "#0d4f4a") + '" stroke-width="2.5"/>' +
    second + dots(series, o.color || "#0d4f4a") + lastLabel + xlabels + "</svg>";
}

// Vertical bar chart. series: [{year, value}]. opts: {title, color, width, height, yLabel, digits}
export function barChart(series, opts) {
  const o = opts || {};
  const W = o.width || 640, H = o.height || 280;
  const padL = 52, padR = 10, padT = 22, padB = 30;
  const iw = W - padL - padR, ih = H - padT - padB;
  let min = Math.min(0, Math.min.apply(null, series.map(function (r) { return r.value; })));
  let max = Math.max.apply(null, series.map(function (r) { return r.value; }));
  if (max <= 0) max = 1;
  min -= (max - min) * 0.05; max += (max - min) * 0.08;
  const ticks = niceTicks(min, max, 4);
  const slot = iw / series.length;
  const bw = Math.min(34, slot * 0.62);
  const y = function (v) { return padT + (1 - (v - min) / (max - min)) * ih; };
  const zeroY = y(0);
  const grid = ticks.map(function (t) {
    return '<line x1="' + padL + '" y1="' + y(t).toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y(t).toFixed(1) +
      '" stroke="#e3e9e7" stroke-width="1"/>' +
      '<text x="' + (padL - 6) + '" y="' + (y(t) + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#5b6d6a">' +
      fmtNum(t, o.digits) + "</text>";
  }).join("");
  const bars = series.map(function (r, i) {
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(r.value, 0)), bot = r.value < 0 ? zeroY : y(r.value);
    const by = r.value < 0 ? zeroY : top;
    const bh = Math.max(1, Math.abs(bot - top));
    return '<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) +
      '" height="' + bh.toFixed(1) + '" rx="3" fill="' + (r.value < 0 ? "#b3402e" : (o.color || "#0d4f4a")) + '">' +
      "<title>" + r.year + ": " + fmtNum(r.value, o.digits) + (o.yLabel || "") + "</title></rect>" +
      '<text x="' + cx.toFixed(1) + '" y="' + (r.value < 0 ? (zeroY + 15) : (top - 5)).toFixed(1) +
      '" text-anchor="middle" font-size="11" font-weight="600" fill="#1d2a28">' + fmtNum(r.value, o.digits) + "</text>" +
      '<text x="' + cx.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="#5b6d6a">' + r.year + "</text>";
  }).join("");
  return '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.title || "Bar chart") + '">' +
    "<title>" + esc(o.title || "Bar chart") + "</title>" + grid + bars + "</svg>";
}

// Horizontal bar chart. rows: [{name, share}] or [{name, value}].
// opts: {title, color, width, height, unit, digits, valueKey}
export function hbarChart(rows, opts) {
  const o = opts || {};
  const key = o.valueKey || "share";
  const W = o.width || 640;
  const rowH = 34, padT = 8, padB = 8;
  const H = padT + padB + rows.length * rowH;
  const labelW = o.labelWidth || 190, padR = 64;
  const max = Math.max.apply(null, rows.map(function (r) { return r[key]; }));
  const bars = rows.map(function (r, i) {
    const y0 = padT + i * rowH;
    const bw = Math.max(2, ((W - labelW - padR) * r[key]) / max);
    return '<text x="0" y="' + (y0 + 19) + '" font-size="12.5" fill="#1d2a28">' + esc(r.name) + "</text>" +
      '<rect x="' + labelW + '" y="' + (y0 + 6) + '" width="' + bw.toFixed(1) + '" height="15" rx="3" fill="' +
      (r.color || o.color || "#0d4f4a") + '"><title>' + esc(r.name) + ": " + fmtNum(r[key], o.digits) +
      (o.unit || "%") + "</title></rect>" +
      '<text x="' + (labelW + bw + 7).toFixed(1) + '" y="' + (y0 + 19) + '" font-size="12.5" font-weight="700" fill="#093936">' +
      fmtNum(r[key], o.digits) + (o.unit || "%") + "</text>";
  }).join("");
  return '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.title || "Horizontal bar chart") + '">' +
    "<title>" + esc(o.title || "Horizontal bar chart") + "</title>" + bars + "</svg>";
}

// Donut chart. rows: [{group, share}] or [{label, value}].
// opts: {title, width, height, unit, digits, colors}
export function donutChart(rows, opts) {
  const o = opts || {};
  const W = o.width || 300, H = o.height || 300;
  const cx = W / 2, cy = H / 2, R = 96, C = 2 * Math.PI * R;
  const colors = o.colors || ["#0d4f4a", "#e39a2d", "#7fb3ac"];
  const key = o.valueKey || "share";
  const total = rows.reduce(function (s, r) { return s + r[key]; }, 0);
  let offset = 0.25; // start at top
  const segs = rows.map(function (r, i) {
    const frac = r[key] / total;
    const len = frac * C;
    const dash = Math.max(0, len - 2).toFixed(1) + " " + (C - Math.max(0, len - 2)).toFixed(1);
    const off = (-offset * C).toFixed(1);
    offset += frac;
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + colors[i % colors.length] +
      '" stroke-width="34" stroke-dasharray="' + dash + '" stroke-dashoffset="' + off + '">' +
      "<title>" + esc(r.group || r.label || r.name) + ": " + fmtNum(r[key], o.digits) + (o.unit || "%") + "</title></circle>";
  }).join("");
  const totalLabel = '<text x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle" font-size="26" font-weight="800" fill="#093936">' +
    fmtNum(total, o.digits) + (o.unit || "%") + "</text>" +
    '<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" font-size="11.5" fill="#5b6d6a">total</text>';
  return '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.title || "Donut chart") + '">' +
    "<title>" + esc(o.title || "Donut chart") + "</title>" + segs + totalLabel + "</svg>";
}
