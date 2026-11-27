import {
  YEARS,
  NATIONAL_POP,
  KPI,
  GDP_GROWTH,
  INFLATION_SERIES,
  UNEMPLOYMENT_SERIES,
  POPULATION_SERIES,
  TRADE_SERIES,
  SECTORS,
  PROVINCES,
  AGE_STRUCTURE,
  EMPLOYMENT,
  CPI_GROUPS,
  FOOD_PRICES,
  GOVERNMENT,
  RELEASES,
  INDICATORS,
  HIGHLIGHTS,
  SOURCES
} from "./data.js";
import { lineChart, barChart, hbarChart, donutChart } from "./charts.js";

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmt(n) {
  if (n === null || n === undefined || n === "") return "—";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString("en-US");
}

function fmtDec(n, decimals) {
  const d = decimals === undefined ? 1 : decimals;
  if (n === null || n === undefined || n === "") return "—";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  const fixed = num.toFixed(d);
  const parts = fixed.split(".");
  parts[0] = Number(parts[0]).toLocaleString("en-US");
  return parts.join(".");
}

function fmtRp(n) {
  if (n === null || n === undefined || n === "") return "—";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return "Rp " + Math.round(num).toLocaleString("en-US");
}

function afterRender(fn) {
  if (typeof document !== "undefined") setTimeout(fn, 0);
}

const AGE_COLORS = ["#2563eb", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];
const SECTOR_COLOR = "#2563eb";

function changeArrow(change) {
  const s = String(change === null || change === undefined ? "" : change);
  if (s.trim().startsWith("-")) return "▼";
  if (s.trim().startsWith("+")) return "▲";
  return "";
}

function highlightArrow(direction) {
  if (direction === "down") return "▼";
  if (direction === "up") return "▲";
  return "•";
}

function sectionHead(title, subtitle) {
  return "<div class=\"section-head\"><h2>" + escapeHtml(title) + "</h2>" +
    (subtitle ? "<p>" + escapeHtml(subtitle) + "</p>" : "") + "</div>";
}

export function renderDashboard() {
  const kpiCards = KPI.map(function (k) {
    return "<article class=\"kpi-card\"><p class=\"kpi-label\">" + escapeHtml(k.label) + "</p>" +
      "<p class=\"kpi-value\">" + escapeHtml(k.value) + "</p>" +
      "<p class=\"kpi-change\">" + escapeHtml(changeArrow(k.change)) + " " + escapeHtml(k.change) +
      (k.changeNote ? " <span class=\"kpi-note\">" + escapeHtml(k.changeNote) + "</span>" : "") + "</p>" +
      "<p class=\"kpi-source\">Source: " + escapeHtml(k.source) + " · " + escapeHtml(k.year) + "</p></article>";
  }).join("");

  const highlights = HIGHLIGHTS.map(function (h) {
    return "<article class=\"highlight-card\"><p class=\"highlight-label\">" + escapeHtml(h.label) + "</p>" +
      "<p class=\"highlight-move\">" + escapeHtml(h.from) + " → " + escapeHtml(h.to) + "</p>" +
      "<p class=\"highlight-delta\">" + escapeHtml(highlightArrow(h.direction)) + " " + escapeHtml(h.delta) + "</p>" +
      "<p class=\"highlight-source\">Source: " + escapeHtml(h.source) +
      (h.note ? " · " + escapeHtml(h.note) : "") + "</p></article>";
  }).join("");

  const gdpChart = lineChart({
    width: 760, height: 280,
    labels: GDP_GROWTH.years, values: GDP_GROWTH.values,
    color: "#2563eb", unit: "%", ymin: 0, ymax: 6
  });
  const inflationChart = barChart({
    width: 760, height: 280,
    labels: INFLATION_SERIES.years, values: INFLATION_SERIES.values,
    color: "#0ea5e9", unit: "%"
  });

  const releases = RELEASES.map(function (r) {
    return "<li><span class=\"release-date\">" + escapeHtml(r.date) + "</span>" +
      "<strong>" + escapeHtml(r.title) + "</strong>" +
      "<span class=\"release-detail\">" + escapeHtml(r.detail) + "</span></li>";
  }).join("");

  const keyFigures = [
    ["GDP", "US$1,396 billion", "2024", "World Bank"],
    ["GDP per capita", "US$4,925", "2024", "World Bank"],
    ["Exports", "US$264.70 billion", "2024", "BPS / World Bank"],
    ["Imports", "US$233.66 billion", "2024", "BPS / World Bank"],
    ["Trade surplus", "US$31.04 billion", "2024", "BPS"],
    ["Gini coefficient", "0.379", "Mar 2024", "BPS"],
    ["Life expectancy", "71.3 years", "2024", "World Bank"],
    ["Median age", "30.1 years", "2024", "World Bank"]
  ].map(function (row) {
    return "<tr><td>" + escapeHtml(row[0]) + "</td><td>" + escapeHtml(row[1]) + "</td>" +
      "<td>" + escapeHtml(row[2]) + "</td><td>" + escapeHtml(row[3]) + "</td></tr>";
  }).join("");

  return "<section class=\"page dashboard\">" +
    "<header class=\"page-head\"><h1>Indonesia in Numbers</h1>" +
    "<p>National statistics at a glance — population " + escapeHtml(fmtDec(NATIONAL_POP, 3)) +
    " million (2024, World Bank). Every figure is labelled with its source and year.</p></header>" +
    "<div class=\"kpi-grid\">" + kpiCards + "</div>" +
    sectionHead("Sorotan", "Biggest moves in the latest data") +
    "<div class=\"highlight-strip\">" + highlights + "</div>" +
    "<div class=\"chart-grid\">" +
    "<figure class=\"chart-card\"><figcaption>GDP growth, 2015–2025 (%) — Source: World Bank</figcaption>" + gdpChart + "</figure>" +
    "<figure class=\"chart-card\"><figcaption>Inflation, annual average, 2015–2025 (%) — Source: World Bank</figcaption>" + inflationChart + "</figure>" +
    "</div>" +
    sectionHead("Latest releases", "What just landed") +
    "<ul class=\"release-list\">" + releases + "</ul>" +
    sectionHead("Key figures", "Headline numbers") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>" +
    "<tbody>" + keyFigures + "</tbody></table></div>" +
    "<p class=\"page-note\">Years shown are " + escapeHtml(YEARS[0]) + "–" + escapeHtml(YEARS[YEARS.length - 1]) +
    " unless a row states otherwise. Sources: BPS and World Bank.</p>" +
    "</section>";
}

export function renderEconomy() {
  const sectorChart = hbarChart({
    width: 760, height: 320,
    items: SECTORS.map(function (s) { return { label: s.name, value: s.share }; }),
    color: SECTOR_COLOR, unit: "%"
  });
  const exportsChart = barChart({
    width: 370, height: 260,
    labels: TRADE_SERIES.years, values: TRADE_SERIES.exports,
    color: "#2563eb", unit: "US$bn"
  });
  const importsChart = barChart({
    width: 370, height: 260,
    labels: TRADE_SERIES.years, values: TRADE_SERIES.imports,
    color: "#f59e0b", unit: "US$bn"
  });

  const tradeRows = TRADE_SERIES.years.map(function (year, i) {
    const ex = TRADE_SERIES.exports[i];
    const im = TRADE_SERIES.imports[i];
    const balance = Number(ex) - Number(im);
    return "<tr><td>" + escapeHtml(year) + "</td><td>" + escapeHtml(fmtDec(ex, 2)) + "</td>" +
      "<td>" + escapeHtml(fmtDec(im, 2)) + "</td><td>" + escapeHtml(fmtDec(balance, 1)) + "</td></tr>";
  }).join("");

  const g = GOVERNMENT;
  return "<section class=\"page economy\">" +
    "<header class=\"page-head\"><h1>Economy</h1>" +
    "<p>Growth, trade and public finance — " + escapeHtml(g.year) + ", source: " + escapeHtml(g.source) + ".</p></header>" +
    sectionHead("GDP by sector", "Share of GDP (%) — source: BPS / World Bank, " + escapeHtml(g.year)) +
    "<figure class=\"chart-card\">" + sectorChart + "</figure>" +
    sectionHead("Trade", "Exports vs imports, 2015–2025 (US$bn) — source: BPS / World Bank") +
    "<div class=\"chart-grid\"><figure class=\"chart-card\"><figcaption>Exports (US$bn)</figcaption>" + exportsChart + "</figure>" +
    "<figure class=\"chart-card\"><figcaption>Imports (US$bn)</figcaption>" + importsChart + "</figure></div>" +
    "<p class=\"legend\"><span class=\"legend-swatch\" style=\"background:#2563eb\"></span> Exports " +
    "<span class=\"legend-swatch\" style=\"background:#f59e0b\"></span> Imports</p>" +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Year</th><th>Exports (US$bn)</th><th>Imports (US$bn)</th><th>Balance (US$bn)</th></tr></thead>" +
    "<tbody>" + tradeRows + "</tbody></table></div>" +
    "<p class=\"page-note\">Balance = exports − imports. Trade surplus 2024: US$31.04 billion (BPS).</p>" +
    sectionHead("Government finance", "Source: " + escapeHtml(g.source) + " · " + escapeHtml(g.year)) +
    "<div class=\"gov-grid\">" +
    "<article class=\"kpi-card\"><p class=\"kpi-label\">Revenue</p><p class=\"kpi-value\">" + escapeHtml(g.revenue) + "</p><p class=\"kpi-change\">" + escapeHtml(g.revenueChange) + "</p></article>" +
    "<article class=\"kpi-card\"><p class=\"kpi-label\">Spending</p><p class=\"kpi-value\">" + escapeHtml(g.spending) + "</p><p class=\"kpi-change\">" + escapeHtml(g.spendingChange) + "</p></article>" +
    "<article class=\"kpi-card\"><p class=\"kpi-label\">Deficit</p><p class=\"kpi-value\">" + escapeHtml(g.deficit) + "</p><p class=\"kpi-change\">" + escapeHtml(g.deficitPct) + " of GDP</p></article>" +
    "<article class=\"kpi-card\"><p class=\"kpi-label\">Primary deficit</p><p class=\"kpi-value\">" + escapeHtml(g.primaryDeficit) + "</p><p class=\"kpi-change\">Before interest payments</p></article>" +
    "</div>" +
    sectionHead("Exchange rate", "Rupiah per US dollar — source: Bank Indonesia") +
    "<p class=\"page-note\">Average 2024: Rp 15,859 per US$. Year-end 2024: Rp 16,267. Range in 2024: Rp 15,125–16,490. Source: Bank Indonesia.</p>" +
    "</section>";
}

const provinceSortState = { key: "pop", dir: -1 };

export function sortProvinces(rows, key, dir) {
  const k = key || "pop";
  const d = dir === undefined || dir === null ? -1 : dir;
  return rows.slice().sort(function (a, b) {
    const av = a[k];
    const bv = b[k];
    const an = Number(av);
    const bn = Number(bv);
    if (!Number.isNaN(an) && !Number.isNaN(bn)) return (an - bn) * d;
    return String(av).localeCompare(String(bv)) * d;
  });
}

function provinceRows(rows) {
  return rows.map(function (p) {
    return "<tr><td>" + escapeHtml(p.name) + "</td><td>" + escapeHtml(fmtDec(p.pop, 2)) + "</td>" +
      "<td>" + escapeHtml(fmtDec(p.share, 1)) + "%</td></tr>";
  }).join("");
}

function refreshProvinceTable() {
  if (typeof document === "undefined") return;
  const body = document.getElementById("province-body");
  if (!body) return;
  const sorted = sortProvinces(PROVINCES.slice(0, 10), provinceSortState.key, provinceSortState.dir);
  body.innerHTML = provinceRows(sorted);
  const heads = document.querySelectorAll("#province-table th.sortable");
  heads.forEach(function (th) {
    const key = th.getAttribute("data-key");
    th.setAttribute("aria-sort", key === provinceSortState.key ? (provinceSortState.dir === 1 ? "ascending" : "descending") : "none");
  });
}

function bindProvinceTable() {
  if (typeof document === "undefined") return;
  const heads = document.querySelectorAll("#province-table th.sortable");
  heads.forEach(function (th) {
    th.addEventListener("click", function () {
      const key = th.getAttribute("data-key");
      if (provinceSortState.key === key) provinceSortState.dir = -provinceSortState.dir;
      else { provinceSortState.key = key; provinceSortState.dir = key === "name" ? 1 : -1; }
      refreshProvinceTable();
    });
  });
}

export function renderPeople() {
  const top10 = sortProvinces(PROVINCES.slice(0, 10), "pop", -1);
  const ageChart = donutChart({
    width: 360, height: 360,
    items: AGE_STRUCTURE.map(function (a, i) {
      return { label: a.label, value: a.pct, color: AGE_COLORS[i % AGE_COLORS.length] };
    }),
    unit: "%"
  });
  const employmentRows = EMPLOYMENT.map(function (e) {
    return "<tr><td>" + escapeHtml(e.sector) + "</td><td>" + escapeHtml(fmtDec(e.pct, 1)) + "%</td>" +
      "<td>" + escapeHtml(fmt(e.workers)) + "</td></tr>";
  }).join("");

  const healthRows = [
    ["Life expectancy", "71.3 years", "2024", "World Bank"],
    ["Life expectancy, female", "73.4 years", "2024", "World Bank"],
    ["Life expectancy, male", "69.2 years", "2024", "World Bank"],
    ["Infant mortality", "15.2 per 1,000 live births", "2024", "World Bank"],
    ["Under-5 mortality", "17.7 per 1,000 live births", "2024", "World Bank"],
    ["Maternal mortality", "140 per 100,000 live births", "2023", "World Bank"],
    ["Stunting (children under 5)", "22%", "2023", "BPS"],
    ["Fertility rate", "2.12 births per woman", "2024", "World Bank"],
    ["Urban population", "58.8%", "2024", "World Bank"],
    ["Population growth", "0.82% per year", "2024", "World Bank"]
  ].map(function (row) {
    return "<tr><td>" + escapeHtml(row[0]) + "</td><td>" + escapeHtml(row[1]) + "</td>" +
      "<td>" + escapeHtml(row[2]) + "</td><td>" + escapeHtml(row[3]) + "</td></tr>";
  }).join("");

  afterRender(bindProvinceTable);

  return "<section class=\"page people\">" +
    "<header class=\"page-head\"><h1>People</h1>" +
    "<p>Population " + escapeHtml(fmtDec(NATIONAL_POP, 3)) + " million (2024, World Bank). Click a column heading to sort the province table.</p></header>" +
    sectionHead("Population by province", "Top 10 provinces — population in millions, share of Indonesia (%) — source: BPS, 2024") +
    "<div class=\"table-wrap\"><table class=\"data-table\" id=\"province-table\"><thead><tr>" +
    "<th class=\"sortable\" data-key=\"name\">Province</th>" +
    "<th class=\"sortable\" data-key=\"pop\">Population (m)</th>" +
    "<th class=\"sortable\" data-key=\"share\">Share of Indonesia</th>" +
    "</tr></thead><tbody id=\"province-body\">" + provinceRows(top10) + "</tbody></table></div>" +
    sectionHead("Age structure", "Share of population by age group (%) — source: BPS / World Bank, 2024") +
    "<figure class=\"chart-card\">" + ageChart + "</figure>" +
    sectionHead("Employment by sector", "Share of employment and workers — source: BPS, 2024") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Sector</th><th>Share</th><th>Workers</th></tr></thead>" +
    "<tbody>" + employmentRows + "</tbody></table></div>" +
    sectionHead("Education and health", "Source and year shown per row") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>" +
    "<tbody>" + healthRows + "</tbody></table></div>" +
    "</section>";
}

export function renderPrices() {
  const cpiChart = barChart({
    width: 760, height: 280,
    labels: INFLATION_SERIES.years, values: INFLATION_SERIES.values,
    color: "#0ea5e9", unit: "%"
  });
  const cpiRows = CPI_GROUPS.map(function (c) {
    return "<tr><td>" + escapeHtml(c.group) + "</td><td>" + escapeHtml(fmtDec(c.rate, 2)) + "%</td>" +
      "<td>" + escapeHtml(fmtDec(c.contrib, 2)) + " pp</td></tr>";
  }).join("");
  const foodRows = FOOD_PRICES.map(function (f) {
    return "<tr><td>" + escapeHtml(f.item) + "</td><td>" + escapeHtml(fmtRp(f.price)) + "</td>" +
      "<td>" + escapeHtml(f.unit) + "</td></tr>";
  }).join("");
  const idx2024 = INFLATION_SERIES.years.findIndex(function (y) { return String(y) === "2024"; });
  const series2024 = idx2024 >= 0 ? INFLATION_SERIES.values[idx2024] : null;
  return "<section class=\"page prices\">" +
    "<header class=\"page-head\"><h1>Prices</h1>" +
    "<p>Inflation and what things cost — sources: BPS and World Bank.</p></header>" +
    sectionHead("CPI inflation trend", "Annual average inflation, 2015–2025 (%) — source: World Bank") +
    "<figure class=\"chart-card\">" + cpiChart + "</figure>" +
    "<p class=\"page-note\">Two 2024 inflation numbers, both correct: the World Bank annual-average series shown in the chart is " +
    escapeHtml(fmtDec(series2024, 1)) + "% for 2024, while the BPS December year-on-year rate — the headline KPI — is 1.57%. " +
    "The annual average covers all twelve months; the December figure compares December 2024 with December 2023 only.</p>" +
    sectionHead("CPI by expenditure group", "Year-on-year % and contribution in percentage points — source: BPS, 2024") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Expenditure group</th><th>YoY (%)</th><th>Contribution (pp)</th></tr></thead>" +
    "<tbody>" + cpiRows + "</tbody></table></div>" +
    sectionHead("Food prices", "Average retail price — source: BPS, 2024") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Item</th><th>Price</th><th>Unit</th></tr></thead>" +
    "<tbody>" + foodRows + "</tbody></table></div>" +
    "</section>";
}

const explorerState = { query: "", group: "All", sortKey: "name", sortDir: 1 };

export function getExplorerState() {
  return { query: explorerState.query, group: explorerState.group, sortKey: explorerState.sortKey, sortDir: explorerState.sortDir };
}

export function setExplorerState(partial) {
  if (!partial || typeof partial !== "object") return getExplorerState();
  if (partial.query !== undefined) explorerState.query = String(partial.query);
  if (partial.group !== undefined) explorerState.group = String(partial.group);
  if (partial.sortKey !== undefined) explorerState.sortKey = String(partial.sortKey);
  if (partial.sortDir !== undefined) explorerState.sortDir = Number(partial.sortDir) === -1 ? -1 : 1;
  if (typeof document !== "undefined" && document.getElementById("explorer-body")) refreshExplorer();
  return getExplorerState();
}

function filteredIndicators() {
  const q = explorerState.query.trim().toLowerCase();
  let rows = INDICATORS.filter(function (row) {
    if (explorerState.group !== "All" && row.group !== explorerState.group) return false;
    if (!q) return true;
    return [row.group, row.name, row.value, row.year, row.source].join(" ").toLowerCase().includes(q);
  });
  const key = explorerState.sortKey;
  const dir = explorerState.sortDir;
  rows = rows.slice().sort(function (a, b) {
    const av = a[key];
    const bv = b[key];
    const an = Number(av);
    const bn = Number(bv);
    if (key === "value" || key === "year") {
      if (!Number.isNaN(an) && !Number.isNaN(bn)) return (an - bn) * dir;
    }
    return String(av).localeCompare(String(bv)) * dir;
  });
  return rows;
}

function explorerRowsHtml(rows) {
  return rows.map(function (row) {
    return "<tr><td>" + escapeHtml(row.group) + "</td><td>" + escapeHtml(row.name) + "</td>" +
      "<td>" + escapeHtml(row.value) + "</td><td>" + escapeHtml(row.year) + "</td>" +
      "<td>" + escapeHtml(row.source) + "</td></tr>";
  }).join("");
}

export function refreshExplorer() {
  if (typeof document === "undefined") return;
  const body = document.getElementById("explorer-body");
  const count = document.getElementById("explorer-count");
  if (!body) return;
  const rows = filteredIndicators();
  body.innerHTML = explorerRowsHtml(rows);
  if (count) count.textContent = "Showing " + rows.length + " of " + INDICATORS.length + " indicators";
}

function bindExplorer() {
  if (typeof document === "undefined") return;
  const search = document.getElementById("explorer-search");
  const group = document.getElementById("explorer-group");
  const clear = document.getElementById("explorer-clear");
  const csv = document.getElementById("explorer-csv");
  if (search) search.addEventListener("input", function () { setExplorerState({ query: search.value }); });
  if (group) group.addEventListener("change", function () { setExplorerState({ group: group.value }); });
  if (clear) clear.addEventListener("click", function () {
    explorerState.query = "";
    explorerState.group = "All";
    explorerState.sortKey = "name";
    explorerState.sortDir = 1;
    if (search) search.value = "";
    if (group) group.value = "All";
    refreshExplorer();
  });
  if (csv) csv.addEventListener("click", function () { downloadExplorerCsv(); });
  const heads = document.querySelectorAll("#explorer-table th.sortable");
  heads.forEach(function (th) {
    th.addEventListener("click", function () {
      const key = th.getAttribute("data-key");
      if (explorerState.sortKey === key) explorerState.sortDir = -explorerState.sortDir;
      else { explorerState.sortKey = key; explorerState.sortDir = 1; }
      refreshExplorer();
    });
  });
}

function csvCell(value) {
  const s = String(value === null || value === undefined ? "" : value);
  if (s.includes(",") || s.includes("\"") || s.includes("\n")) return "\"" + s.replace(/"/g, "\"\"") + "\"";
  return s;
}

export function downloadExplorerCsv() {
  const rows = filteredIndicators();
  const lines = ["Group,Indicator,Value,Year,Source"];
  rows.forEach(function (row) {
    lines.push([row.group, row.name, row.value, row.year, row.source].map(csvCell).join(","));
  });
  const csv = lines.join("\n");
  if (typeof document !== "undefined") {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nusastat-indicators.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return csv;
}

export function renderData() {
  const groups = ["All", "Economy", "People", "Prices", "Trade", "Health"];
  const options = groups.map(function (g) {
    return "<option value=\"" + escapeHtml(g) + "\"" + (explorerState.group === g ? " selected" : "") + ">" + escapeHtml(g) + "</option>";
  }).join("");
  const rows = filteredIndicators();
  const sources = SOURCES.map(function (s) {
    return "<li><strong>" + escapeHtml(s.name) + "</strong> — " + escapeHtml(s.note) + "</li>";
  }).join("");

  afterRender(bindExplorer);

  return "<section class=\"page data\">" +
    "<header class=\"page-head\"><h1>Data Explorer</h1>" +
    "<p>Search, filter and sort all " + escapeHtml(INDICATORS.length) + " indicators. Every indicator is verified with a source and a year.</p></header>" +
    "<div class=\"explorer-controls\">" +
    "<input id=\"explorer-search\" type=\"search\" placeholder=\"Search indicators…\" value=\"" + escapeHtml(explorerState.query) + "\" aria-label=\"Search indicators\">" +
    "<select id=\"explorer-group\" aria-label=\"Filter by group\">" + options + "</select>" +
    "<button id=\"explorer-clear\" type=\"button\">Clear filters</button>" +
    "<button id=\"explorer-csv\" type=\"button\">Download CSV</button>" +
    "</div>" +
    "<p id=\"explorer-count\" class=\"page-note\">Showing " + rows.length + " of " + INDICATORS.length + " indicators</p>" +
    "<div class=\"table-wrap\"><table class=\"data-table\" id=\"explorer-table\"><thead><tr>" +
    "<th class=\"sortable\" data-key=\"group\">Group</th>" +
    "<th class=\"sortable\" data-key=\"name\">Indicator</th>" +
    "<th class=\"sortable\" data-key=\"value\">Value</th>" +
    "<th class=\"sortable\" data-key=\"year\">Year</th>" +
    "<th class=\"sortable\" data-key=\"source\">Source</th>" +
    "</tr></thead><tbody id=\"explorer-body\">" + explorerRowsHtml(rows) + "</tbody></table></div>" +
    sectionHead("Methodology and sources", "How these numbers were put together") +
    "<p class=\"page-note\">All " + escapeHtml(INDICATORS.length) + " indicators are verified with a named source and a year. " +
    "Figures come from BPS (Statistics Indonesia), Bank Indonesia and the World Bank; where two official sources differ " +
    "(for example the two 2024 inflation numbers), both are shown and labelled so the difference is visible.</p>" +
    "<ul class=\"source-list\">" + sources + "</ul>" +
    "</section>";
}

function compareOptions(selectedName) {
  return PROVINCES.slice(0, 10).map(function (p) {
    return "<option value=\"" + escapeHtml(p.name) + "\"" + (p.name === selectedName ? " selected" : "") + ">" + escapeHtml(p.name) + "</option>";
  }).join("");
}

function findProvince(name, fallbackIndex) {
  const found = PROVINCES.find(function (p) { return p.name === name; });
  if (found) return found;
  return PROVINCES[fallbackIndex] || PROVINCES[0];
}

function renderCompareResult(aName, bName) {
  const a = findProvince(aName, 0);
  const b = findProvince(bName, 1);
  const rankA = PROVINCES.indexOf(a) + 1;
  const rankB = PROVINCES.indexOf(b) + 1;
  const aPctOfB = Number(b.pop) ? (Number(a.pop) / Number(b.pop)) * 100 : 0;
  const bPctOfA = Number(a.pop) ? (Number(b.pop) / Number(a.pop)) * 100 : 0;
  const twoChart = barChart({
    width: 370, height: 260,
    labels: [a.name, b.name], values: [Number(a.pop), Number(b.pop)],
    color: "#2563eb", unit: "m"
  });
  const top10Chart = hbarChart({
    width: 760, height: 320,
    items: PROVINCES.slice(0, 10).map(function (p) { return { label: p.name, value: p.share }; }),
    color: "#2563eb", unit: "%"
  });
  const rows = [
    ["Population", fmtDec(a.pop, 2) + " million", fmtDec(b.pop, 2) + " million"],
    ["Share of Indonesia", fmtDec(a.share, 1) + "%", fmtDec(b.share, 1) + "%"],
    ["National rank", "#" + rankA, "#" + rankB],
    ["Population as % of the other province", fmtDec(aPctOfB, 1) + "% of " + b.name, fmtDec(bPctOfA, 1) + "% of " + a.name]
  ].map(function (row) {
    return "<tr><td>" + escapeHtml(row[0]) + "</td><td>" + escapeHtml(row[1]) + "</td><td>" + escapeHtml(row[2]) + "</td></tr>";
  }).join("");
  return "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Measure</th><th>" + escapeHtml(a.name) + "</th><th>" + escapeHtml(b.name) + "</th></tr></thead>" +
    "<tbody>" + rows + "</tbody></table></div>" +
    "<div class=\"chart-grid\"><figure class=\"chart-card\"><figcaption>Population compared (millions) — " + escapeHtml(a.name) + " vs " + escapeHtml(b.name) + "</figcaption>" + twoChart + "</figure>" +
    "<figure class=\"chart-card\"><figcaption>Selected provinces highlighted</figcaption><p class=\"page-note\">Selected: <strong>" + escapeHtml(a.name) + "</strong> and <strong>" + escapeHtml(b.name) + "</strong> — shown in the two-province chart and named here; the chart below shows all top 10.</p></figure></div>" +
    "<figure class=\"chart-card\"><figcaption>Top 10 provinces by share of Indonesia (%) — source: BPS, 2024</figcaption>" + top10Chart + "</figure>" +
    "<p class=\"page-note\">Context: national population " + escapeHtml(fmtDec(NATIONAL_POP, 3)) + " million, 2024, World Bank. " +
    "The top 10 provinces together hold 71.7% of Indonesia's population. Population figures: BPS, 2024.</p>";
}

export function bindCompare() {
  if (typeof document === "undefined") return;
  const selA = document.getElementById("compare-a");
  const selB = document.getElementById("compare-b");
  const result = document.getElementById("compare-result");
  if (!selA || !selB || !result) return;
  const update = function () {
    result.innerHTML = renderCompareResult(selA.value, selB.value);
  };
  selA.addEventListener("change", update);
  selB.addEventListener("change", update);
}

export function renderCompare() {
  const defaultA = findProvince("West Java", 0).name;
  const defaultB = findProvince("East Java", 1).name;
  afterRender(bindCompare);
  return "<section class=\"page compare\">" +
    "<header class=\"page-head\"><h1>Province Compare</h1>" +
    "<p>Pick two provinces and compare them side by side — population figures: BPS, 2024.</p></header>" +
    "<div class=\"compare-controls\">" +
    "<label>Province A <select id=\"compare-a\">" + compareOptions(defaultA) + "</select></label>" +
    "<label>Province B <select id=\"compare-b\">" + compareOptions(defaultB) + "</select></label>" +
    "</div>" +
    "<div id=\"compare-result\">" + renderCompareResult(defaultA, defaultB) + "</div>" +
    "</section>";
}
