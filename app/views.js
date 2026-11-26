// NusaStat — page templates and rendering. Imports verified data + SVG charts.
import {
  META, KPIS, GDP_GROWTH, INFLATION_SERIES, UNEMPLOYMENT_SERIES, POPULATION_SERIES,
  SECTORS, TRADE_SERIES, PROVINCES, AGE_STRUCTURE, EMPLOYMENT_SECTORS,
  CPI_GROUPS, CPI_COMPONENTS, FOOD_PRICES, GOVERNMENT, EXCHANGE_RATE,
  LATEST_RELEASES, INDICATORS
} from "./data.js";
import { lineChart, barChart, hbarChart, donutChart } from "./charts.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fmt(v, digits) {
  const d = digits === undefined ? 2 : digits;
  return Number(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

function srcLine(source, year) {
  return '<p class="src">Source: <strong>' + esc(source) + "</strong> · " + esc(year) + "</p>";
}

function changeClass(change) {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "flat";
}

// ---------- Dashboard ----------
export function renderDashboard() {
  const kpis = KPIS.map(function (k) {
    const arrow = k.change > 0 ? "▲" : k.change < 0 ? "▼" : "—";
    return '<article class="kpi"><div class="kpi-label">' + esc(k.label) + '</div>' +
      '<div class="kpi-value">' + esc(k.display) + "</div>" +
      '<div class="kpi-change ' + changeClass(k.change) + '">' + arrow + " " + esc(k.changeLabel) + "</div>" +
      '<div class="kpi-unit">' + esc(k.unit) + " · " + esc(k.source) + " " + esc(k.year) + "</div></article>";
  }).join("");

  const releases = LATEST_RELEASES.map(function (r) {
    return '<li><span class="rel-date">' + esc(r.date) + "</span><span>" + esc(r.title) +
      ' <span class="src">(' + esc(r.source) + ")</span></span></li>";
  }).join("");

  const keyRows = [
    ["GDP growth Q3 2026 (yoy)", "5.47%", "BPS, 2026"],
    ["Exports of goods 2024", "US$ 264.7 billion", "BPS, 2024"],
    ["Imports of goods 2024", "US$ 233.7 billion", "BPS, 2024"],
    ["Trade surplus 2024", "US$ 31.0 billion", "BPS, 2024"],
    ["Life expectancy 2024", "71.3 years", "World Bank, 2024"],
    ["Median age 2024", "30.1 years", "UN World Population Prospects, 2024"],
    ["Gini ratio, Mar 2024", "0.379", "BPS, 2024"],
    ["Exchange rate, 2024 average", "Rp 15,859 per US$", "Bank Indonesia, 2024"]
  ].map(function (r) {
    return "<tr><td>" + esc(r[0]) + "</td><td class=\"num\">" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>";
  }).join("");

  return '<p class="kicker">National statistics portal · Indonesia</p>' +
    "<h1>Indonesia in Numbers</h1>" +
    '<p class="lede">The headline figures for the world\u2019s fourth-largest country — economy, people and prices — each labelled with its source and year. All figures verified ' + esc(META.verified) + ".</p>" +
    '<div class="kpi-grid">' + kpis + "</div>" +
    '<section class="grid-2">' +
    '<div class="chart-box"><h2>Real GDP growth, 2015–2025</h2>' +
    lineChart(GDP_GROWTH, { title: "Real GDP growth 2015 to 2025, percent per year", yLabel: "%", digits: 2, height: 240 }) +
    '<p class="src">Annual real GDP growth, % yoy. The 2020 dip (−2.07%) is the pandemic recession. Source: <strong>BPS</strong> · 2015–2025</p></div>' +
    '<div class="chart-box"><h2>CPI inflation, 2015–2025</h2>' +
    barChart(INFLATION_SERIES, { title: "CPI inflation, annual average, 2015 to 2025", yLabel: "%", digits: 1, height: 240 }) +
    '<p class="src">Annual-average CPI inflation, %. Not the December yoy rate (1.57% in 2024). Source: <strong>World Bank</strong> · 2015–2025</p></div>' +
    "</section>" +
    '<section class="grid-2">' +
    '<div class="card"><h2>Latest releases</h2><ul class="releases">' + releases + "</ul>" +
    srcLine("BPS", "2025–2026") + "</div>" +
    '<div class="card"><h2>Key figures at a glance</h2><div class="table-wrap"><table>' +
    "<thead><tr><th>Indicator</th><th class=\"num\">Value</th><th>Source</th></tr></thead><tbody>" + keyRows + "</tbody></table></div>" +
    '<p class="src">Full table with all 66 verified indicators: see the <a href="#/data">Data explorer</a>.</p></div>' +
    "</section>";
}

// ---------- Economy ----------
export function renderEconomy() {
  const sectorRows = SECTORS.map(function (s, i) {
    return { name: s.name + (s.growth === null ? " (residual)" : ""), share: s.share, color: i === 0 ? "#0d4f4a" : i === 5 ? "#c9d8d4" : "#2e7d74" };
  });
  const tradeTable = TRADE_SERIES.map(function (t) {
    const bal = (t.exports - t.imports).toFixed(1);
    return "<tr><td>" + t.year + "</td><td class=\"num\">" + fmt(t.exports, 1) + "</td><td class=\"num\">" + fmt(t.imports, 1) +
      "</td><td class=\"num\">" + (bal >= 0 ? "+" : "") + bal + "</td></tr>";
  }).join("");
  const expSeries = TRADE_SERIES.map(function (t) { return { year: t.year, value: t.exports }; });
  const impSeries = TRADE_SERIES.map(function (t) { return { year: t.year, value: t.imports }; });

  return '<p class="kicker">Economy</p><h1>Growth, trade and the budget</h1>' +
    '<p class="lede">Indonesia\u2019s economy grew 5.03% in 2024 and 5.11% in 2025, with manufacturing the largest single industry at 18.98% of GDP.</p>' +
    '<section class="grid-2">' +
    '<div class="chart-box"><h2>GDP by industry, 2024</h2>' +
    hbarChart(sectorRows, { title: "Share of GDP by industry, 2024", unit: "%", digits: 2 }) +
    '<p class="src">Share of GDP, %. Top five industries = 63.90% of GDP; \u201cAll other industries\u201d is the computed residual. Source: <strong>BPS</strong> · 2024</p></div>' +
    '<div class="chart-box"><h2>Exports vs imports, 2015–2025</h2>' +
    lineChart(expSeries, { title: "Merchandise exports and imports 2015 to 2025, US dollars billion", yLabel: " US$bn", digits: 0, second: impSeries, color2: "#e39a2d", label: "Exports", label2: "Imports" }) +
    '<div class="legend"><span><span class="sw" style="background:#0d4f4a"></span>Exports</span><span><span class="sw" style="background:#e39a2d"></span>Imports</span></div>' +
    '<p class="src">Merchandise trade, US$ billion. 2024: exports 264.7, imports 233.7, surplus 31.0. Source: <strong>BPS / World Bank WITS</strong> · 2015–2025</p></div>' +
    "</section>" +
    '<section class="card"><h2>Trade balance by year</h2><div class="table-wrap"><table>' +
    "<thead><tr><th>Year</th><th class=\"num\">Exports (US$bn)</th><th class=\"num\">Imports (US$bn)</th><th class=\"num\">Balance (US$bn)</th></tr></thead><tbody>" + tradeTable + "</tbody></table></div>" +
    srcLine("BPS / World Bank WITS", "2015–2025") + "</section>" +
    '<section class="grid-2">' +
    '<div class="card"><h2>Government budget, ' + GOVERNMENT.year + '</h2><div class="stat-row">' +
    '<div class="stat-block"><div class="lbl">Revenue</div><div class="big">Rp ' + fmt(GOVERNMENT.revenue, 1) + 'tn</div><div class="src">+2.1% yoy</div></div>' +
    '<div class="stat-block amber"><div class="lbl">Spending</div><div class="big">Rp ' + fmt(GOVERNMENT.spending, 1) + 'tn</div><div class="src">+7.3% yoy</div></div>' +
    '<div class="stat-block"><div class="lbl">Deficit</div><div class="big">Rp ' + fmt(GOVERNMENT.deficit, 1) + 'tn</div><div class="src">' + fmt(GOVERNMENT.deficitPct, 2) + "% of GDP · primary deficit Rp 19.4tn</div></div>" +
    "</div>" + srcLine(GOVERNMENT.source, GOVERNMENT.year) + "</div>" +
    '<div class="card"><h2>Exchange rate</h2><div class="stat-block"><div class="lbl">Rupiah per US dollar, average</div>' +
    '<div class="big">' + esc(EXCHANGE_RATE.display) + "</div>" +
    '<div class="src">' + esc(EXCHANGE_RATE.note) + "</div></div>" +
    srcLine(EXCHANGE_RATE.source, EXCHANGE_RATE.year) + "</div>" +
    "</section>";
}

// ---------- People ----------
export function renderPeople() {
  const provRows = PROVINCES.map(function (p) {
    return "<tr><td>" + esc(p.name) + "</td><td class=\"num\">" + fmt(p.population, 3) + "</td><td class=\"num\">" + fmt(p.share, 2) + "%</td></tr>";
  }).join("");
  const ageLegend = AGE_STRUCTURE.map(function (a, i) {
    const colors = ["#0d4f4a", "#e39a2d", "#7fb3ac"];
    return '<li><span><span class="sw" style="background:' + colors[i] + '"></span>' + esc(a.group) + "</span><strong>" + fmt(a.share, 1) + "%</strong></li>";
  }).join("");
  const health = INDICATORS.filter(function (r) { return r.group === "Health"; });
  const healthRows = health.map(function (r) {
    return "<tr><td>" + esc(r.name) + "</td><td class=\"num\">" + fmt(r.value, 1) + "</td><td>" + esc(r.unit) + "</td><td>" + r.year + "</td></tr>";
  }).join("");
  const unemp = UNEMPLOYMENT_SERIES.map(function (r) { return { year: r.year, value: r.value }; });
  const pop = POPULATION_SERIES.map(function (r) { return { year: r.year, value: r.value }; });

  return '<p class="kicker">People</p><h1>283.5 million people, 38 provinces</h1>' +
    '<p class="lede">More than two-thirds of Indonesians live on Java. The median age is 30.1 years and 68.1% of the population is of working age.</p>' +
    '<section class="grid-2">' +
    '<div class="card"><h2>Population by province — top 10</h2><div class="table-wrap"><table id="prov-table">' +
    "<thead><tr><th class=\"sortable\" data-key=\"name\">Province</th><th class=\"sortable num\" data-key=\"population\">Population (m)</th><th class=\"sortable num\" data-key=\"share\">Share</th></tr></thead><tbody>" + provRows + "</tbody></table></div>" +
    '<p class="src">Click a column heading to sort. Mid-2024 population. Top 10 = 71.7% of the population. Source: <strong>BPS</strong> · 2024</p></div>' +
    '<div class="chart-box"><h2>Age structure, 2024</h2><div style="max-width:300px;margin:0 auto">' +
    donutChart(AGE_STRUCTURE, { title: "Age structure of Indonesia, 2024", unit: "%", digits: 1 }) + "</div>" +
    '<ul class="donut-legend">' + ageLegend + "</ul>" +
    '<p class="src">Share of population. 15–64 is the residual. Source: <strong>World Bank</strong> · 2024</p></div>' +
    "</section>" +
    '<section class="grid-2">' +
    '<div class="chart-box"><h2>Employment by sector</h2>' +
    hbarChart(EMPLOYMENT_SECTORS, { title: "Employment by sector, August 2026", unit: "%", digits: 2 }) +
    '<p class="src">Share of employed persons. Agriculture still employs 28.2% (41.73m people). \u201cAll other sectors\u201d is the residual. Source: <strong>BPS Sakernas</strong> · Aug 2026</p></div>' +
    '<div class="chart-box"><h2>Unemployment, 2015–2025</h2>' +
    lineChart(unemp, { title: "Open unemployment rate, August, 2015 to 2025", yLabel: "%", digits: 2 }) +
    '<p class="src">Open unemployment rate, % of labour force, August Sakernas. 2020 peak 7.07% (pandemic). Source: <strong>BPS</strong> · 2015–2025</p></div>' +
    "</section>" +
    '<section class="grid-2">' +
    '<div class="chart-box"><h2>Population, 2015–2025</h2>' +
    lineChart(pop, { title: "Population 2015 to 2025, millions", yLabel: "m", digits: 1 }) +
    '<p class="src">Total population, millions. Growth 0.82% in 2024; urban share 58.8%. Source: <strong>World Bank</strong> · 2015–2025</p></div>' +
    '<div class="card"><h2>Health indicators</h2><div class="table-wrap"><table>' +
    "<thead><tr><th>Indicator</th><th class=\"num\">Value</th><th>Unit</th><th>Year</th></tr></thead><tbody>" + healthRows + "</tbody></table></div>" +
    srcLine("World Bank", "2023–2024") + "</div>" +
    "</section>";
}

// ---------- Prices ----------
export function renderPrices() {
  const cpiRows = CPI_GROUPS.map(function (g) {
    return "<tr><td>" + esc(g.group) + "</td><td class=\"num\">" + fmt(g.rate, 2) + "%</td><td class=\"num\">" + (g.contribution >= 0 ? "+" : "") + fmt(g.contribution, 2) + "</td></tr>";
  }).join("");
  const compRows = CPI_COMPONENTS.map(function (c) {
    return "<tr><td>" + esc(c.component) + "</td><td class=\"num\">" + fmt(c.rate, 2) + "%</td><td class=\"num\">+" + fmt(c.contribution, 2) + "</td></tr>";
  }).join("");
  const foodRows = FOOD_PRICES.map(function (f) {
    return "<tr><td>" + esc(f.item) + "</td><td class=\"num\">Rp " + fmt(f.price, 0) + "</td><td>" + esc(f.unit) + "</td></tr>";
  }).join("");

  return '<p class="kicker">Prices</p><h1>Inflation and the cost of living</h1>' +
    '<p class="lede">December 2024 inflation was 1.57% year on year — the lowest December rate in years — while the annual-average rate was 2.18%.</p>' +
    '<section class="grid-2">' +
    '<div class="chart-box"><h2>CPI inflation, annual average, 2015–2025</h2>' +
    barChart(INFLATION_SERIES, { title: "CPI inflation, annual average, 2015 to 2025", yLabel: "%", digits: 1, color: "#e39a2d" }) +
    '<p class="src">Annual-average CPI inflation, %. The December yoy rate differs (1.57% in 2024). Source: <strong>World Bank</strong> · 2015–2025</p></div>' +
    '<div class="card"><h2>CPI components, Dec 2024</h2><div class="table-wrap"><table>' +
    "<thead><tr><th>Component</th><th class=\"num\">Rate (yoy)</th><th class=\"num\">Contribution (pp)</th></tr></thead><tbody>" + compRows + "</tbody></table></div>" +
    '<p class="src">CPI December 2024 = 106.80 (2022=100); December 2023 = 105.15. Source: <strong>BPS</strong> · Dec 2024</p>' +
    '<p class="note">Core inflation (2.26%) drove most of the 1.57% headline rate; volatile food added only 0.02 points.</p></div>' +
    "</section>" +
    '<section class="grid-2">' +
    '<div class="card"><h2>CPI by expenditure group, Dec 2024</h2><div class="table-wrap"><table>' +
    "<thead><tr><th>Group</th><th class=\"num\">Rate (yoy)</th><th class=\"num\">Contribution (pp)</th></tr></thead><tbody>" + cpiRows + "</tbody></table></div>" +
    '<p class="src">Year-on-year rates, December 2024. Basket weights were not published in the release, so rate + contribution are shown. Source: <strong>BPS</strong> · Dec 2024</p></div>' +
    '<div class="card"><h2>Food prices, national average</h2><div class="table-wrap"><table>' +
    "<thead><tr><th>Item</th><th class=\"num\">Price</th><th>Unit</th></tr></thead><tbody>" + foodRows + "</tbody></table></div>" +
    '<p class="src">Retail prices, national average. Source: <strong>Bank Indonesia (PIHPS)</strong> · Sep 2026</p></div>' +
    "</section>";
}

// ---------- Data explorer ----------
let explorerState = { query: "", group: "All", sortKey: "name", sortDir: 1 };

function explorerRows() {
  let rows = INDICATORS.filter(function (r) {
    const q = explorerState.query.trim().toLowerCase();
    const matchQ = !q || r.name.toLowerCase().indexOf(q) !== -1 || r.source.toLowerCase().indexOf(q) !== -1 || r.unit.toLowerCase().indexOf(q) !== -1;
    const matchG = explorerState.group === "All" || r.group === explorerState.group;
    return matchQ && matchG;
  });
  const k = explorerState.sortKey, d = explorerState.sortDir;
  rows.sort(function (a, b) {
    const av = a[k], bv = b[k];
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * d;
    return String(av).localeCompare(String(bv)) * d;
  });
  return rows;
}

function explorerTableHtml() {
  const rows = explorerRows();
  const body = rows.map(function (r) {
    return "<tr><td>" + esc(r.name) + "</td><td>" + esc(r.group) + "</td><td class=\"num\">" + fmt(r.value, 2) +
      "</td><td>" + esc(r.unit) + "</td><td class=\"num\">" + r.year + "</td><td>" + esc(r.source) + "</td></tr>";
  }).join("");
  return { count: rows.length, body: body };
}

export function renderData() {
  const groups = ["All"].concat(Array.from(new Set(INDICATORS.map(function (r) { return r.group; }))));
  const opts = groups.map(function (g) {
    return '<option value="' + esc(g) + '"' + (explorerState.group === g ? " selected" : "") + ">" + esc(g) + "</option>";
  }).join("");
  const t = explorerTableHtml();
  const sources = Array.from(new Set(INDICATORS.map(function (r) { return r.source; }))).sort();
  const sourceList = sources.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");

  return '<p class="kicker">Data explorer</p><h1>All 66 indicators</h1>' +
    '<p class="lede">Every verified indicator in one table. Search, filter by group, sort any column, and download the result as CSV. Each row carries its source and year.</p>' +
    '<section class="card"><div class="controls">' +
    '<input type="search" id="explorer-search" placeholder="Search indicators, sources, units…" value="' + esc(explorerState.query) + '" aria-label="Search indicators">' +
    '<select id="explorer-group" aria-label="Filter by group">' + opts + "</select>" +
    '<button class="btn amber" id="explorer-csv" type="button">Download CSV</button>' +
    '<span class="result-count" id="explorer-count">Showing ' + t.count + " of " + INDICATORS.length + " indicators</span>" +
    "</div><div class=\"table-wrap\"><table id=\"explorer-table\">" +
    "<thead><tr>" +
    '<th class="sortable" data-key="name">Indicator</th>' +
    '<th class="sortable" data-key="group">Group</th>' +
    '<th class="sortable num" data-key="value">Value</th>' +
    "<th>Unit</th>" +
    '<th class="sortable num" data-key="year">Year</th>' +
    '<th class="sortable" data-key="source">Source</th>' +
    "</tr></thead><tbody id=\"explorer-body\">" + t.body + "</tbody></table></div></section>" +
    '<section class="grid-2"><div class="card"><h2>Methodology</h2>' +
    "<p>Figures are taken from official releases — BPS (Statistics Indonesia), the World Bank, the IMF, the Ministry of Finance and Bank Indonesia — and cross-checked against a second source where one was available. Figures that could not be verified were omitted rather than estimated.</p>" +
    "<p>Two 2024 inflation numbers appear on this site and both are correct: the BPS December year-on-year rate (1.57%) and the World Bank annual-average rate (2.18%). Unemployment is the BPS Sakernas August open rate, not the ILO modelled estimate. \u201cAll other industries\u201d and \u201cAll other sectors\u201d are computed residuals (100 minus the named shares).</p></div>" +
    '<div class="card"><h2>Sources</h2><ul>' + sourceList + "</ul>" +
    '<p class="src">Full release references (release numbers and dates) are listed in the site methodology document. Data verified ' + esc(META.verified) + ".</p></div></section>";
}

// Re-render only the explorer table body + count (keeps focus in the search box).
export function refreshExplorer() {
  const body = document.getElementById("explorer-body");
  const count = document.getElementById("explorer-count");
  if (!body) return;
  const t = explorerTableHtml();
  body.innerHTML = t.body;
  if (count) count.textContent = "Showing " + t.count + " of " + INDICATORS.length + " indicators";
}

export function setExplorerState(patch) {
  Object.assign(explorerState, patch);
}

export function getExplorerState() {
  return explorerState;
}

export function downloadExplorerCsv() {
  const rows = explorerRows();
  const head = "Indicator,Group,Value,Unit,Year,Source";
  const lines = rows.map(function (r) {
    const cells = [r.name, r.group, String(r.value), r.unit, String(r.year), r.source];
    return cells.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(",");
  });
  const csv = head + "\n" + lines.join("\n");
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

// Province table sorting (People page).
export function sortProvinces(key) {
  const table = document.getElementById("prov-table");
  if (!table) return;
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const idx = key === "name" ? 0 : key === "population" ? 1 : 2;
  const numeric = idx !== 0;
  const dir = table.dataset.sortKey === key ? (table.dataset.sortDir === "1" ? -1 : 1) : 1;
  table.dataset.sortKey = key;
  table.dataset.sortDir = String(dir);
  rows.sort(function (a, b) {
    const av = a.children[idx].textContent.trim();
    const bv = b.children[idx].textContent.trim();
    if (numeric) return (parseFloat(av.replace(/,/g, "")) - parseFloat(bv.replace(/,/g, ""))) * dir;
    return av.localeCompare(bv) * dir;
  });
  rows.forEach(function (r) { tbody.appendChild(r); });
}
