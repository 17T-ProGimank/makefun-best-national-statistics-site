import {
  YEARS,
  NATIONAL_POP,
  KPI,
  KPI_SPARKLINES,
  GDP_GROWTH,
  INFLATION_SERIES,
  UNEMPLOYMENT_SERIES,
  POPULATION_SERIES,
  TRADE_SERIES,
  SECTORS,
  PROVINCES,
  PROVINCE_DETAIL,
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
import { lineChart, barChart, hbarChart, donutChart, sparkline, buildPyramid, buildTileMap, TILE_POS, TILE_COLORS, TILE_NULL_COLOR } from "./charts.js";

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

// One KPI card: number + delta + sparkline + source line.
function kpiCard(k) {
  const series = KPI_SPARKLINES[k.label] || null;
  const spark = series
    ? "<div class=\"kpi-spark\">" + sparkline(series.values, {
        width: 300, height: 30, color: "#0e5f57",
        unit: series.unit, title: series.title, labels: series.labels
      }) + "</div>"
    : "";
  return "<article class=\"kpi-card\"><p class=\"kpi-label\">" + escapeHtml(k.label) + "</p>" +
    "<p class=\"kpi-value\">" + escapeHtml(k.value) + "</p>" +
    "<p class=\"kpi-change\">" + escapeHtml(changeArrow(k.change)) + " " + escapeHtml(k.change) +
    (k.changeNote ? " <span class=\"kpi-note\">" + escapeHtml(k.changeNote) + "</span>" : "") + "</p>" +
    spark +
    "<p class=\"kpi-source\">Source: " + escapeHtml(k.source) + " · " + escapeHtml(k.year) + "</p></article>";
}

export function renderDashboard() {
  const kpiCards = KPI.map(kpiCard).join("");

  const highlights = HIGHLIGHTS.map(function (h) {
    return "<article class=\"highlight-card\"><p class=\"highlight-label\">" + escapeHtml(h.label) + "</p>" +
      "<p class=\"highlight-move\">" + escapeHtml(h.from) + " → " + escapeHtml(h.to) + "</p>" +
      "<p class=\"highlight-delta\">" + escapeHtml(highlightArrow(h.direction)) + " " + escapeHtml(h.delta) + "</p>" +
      "<p class=\"highlight-source\">Source: " + escapeHtml(h.source) +
      (h.note ? " · " + escapeHtml(h.note) : "") + "</p></article>";
  }).join("");

  // Long-series chart on the cover: GDP growth 2015–2025. ymin -3 so the
  // 2020 contraction (−2.07%) draws inside the chart instead of below it.
  const gdpChart = lineChart({
    width: 600, height: 150,
    labels: GDP_GROWTH.years, values: GDP_GROWTH.values,
    color: "#2563eb", unit: "%", ymin: -3, ymax: 6
  });
  const inflationChart = barChart({
    width: 600, height: 150,
    labels: INFLATION_SERIES.years, values: INFLATION_SERIES.values,
    color: "#0ea5e9", unit: "%"
  });

  // Second block on the cover: top 5 provinces by population.
  const top5 = PROVINCES.slice().sort(function (a, b) { return Number(b.pop) - Number(a.pop); }).slice(0, 5);
  const top5Chart = hbarChart({
    width: 380, height: 146,
    items: top5.map(function (p) { return { label: p.name, value: p.pop }; }),
    color: "#2563eb", unit: "m", rowH: 24
  });
  const top3Pop = top5.slice(0, 3).reduce(function (sum, p) { return sum + Number(p.pop); }, 0);
  const top3Share = top5.slice(0, 3).reduce(function (sum, p) { return sum + Number(p.share); }, 0);

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
    ["Gini coefficient", "0.375", "Mar 2025", "BPS"],
    ["Life expectancy", "71.3 years", "2024", "World Bank"],
    ["Median age", "30.1 years", "2024", "World Bank"]
  ].map(function (row) {
    return "<tr><td>" + escapeHtml(row[0]) + "</td><td>" + escapeHtml(row[1]) + "</td>" +
      "<td>" + escapeHtml(row[2]) + "</td><td>" + escapeHtml(row[3]) + "</td></tr>";
  }).join("");

  return "<section class=\"page dashboard\">" +
    "<header class=\"page-head\"><h1>Indonesia in Numbers</h1>" +
    "<p class=\"cred-strip\">38/38 provinces · " + escapeHtml(INDICATORS.length) + " indicators · series 2015–2025 · 0 placeholders</p>" +
    "<p>National statistics at a glance — population " + escapeHtml(fmtDec(NATIONAL_POP, 3)) +
    " million (2025, World Bank).</p></header>" +
    "<div class=\"kpi-grid\">" + kpiCards + "</div>" +
    "<div class=\"chart-grid dash-cover-grid\">" +
    "<figure class=\"chart-card\">" + gdpChart +
    "<figcaption><strong>Growth stayed above 5% in 2024 and 2025</strong> after the 2020 contraction to −2.07% — four straight years at 5% or better. Source: BPS, 2015–2025.</figcaption></figure>" +
    "<figure class=\"chart-card\"><h2 class=\"chart-title\">Top 5 provinces by population</h2>" + top5Chart +
    "<figcaption><strong>Java holds nearly half the country.</strong> West, East and Central Java together hold " + escapeHtml(fmtDec(top3Pop, 1)) + " million people — " + escapeHtml(fmtDec(top3Share, 0)) + "% of Indonesia. Source: BPS, mid-2024.</figcaption></figure>" +
    "</div>" +
    sectionHead("Sorotan", "Biggest moves in the latest data") +
    "<div class=\"highlight-strip\">" + highlights + "</div>" +
    "<div class=\"chart-grid\">" +
    "<figure class=\"chart-card\">" + inflationChart +
    "<figcaption><strong>Inflation eased to 1.9% in 2025</strong> after the 2022 spike to 4.2% — back below the 2019 level of 3.0%. Annual average, source: World Bank, 2015–2025.</figcaption></figure>" +
    "<article class=\"card map-teaser\"><h2>Province Map</h2>" +
    "<p>All 38 provinces on one tile map — colour it by population, poverty or unemployment, and click any province for its numbers.</p>" +
    "<a class=\"btn\" href=\"#/map\">Explore all 38 provinces on the map</a></article>" +
    "</div>" +
    renderReleaseDigest() +
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
    "<figure class=\"chart-card\">" + sectorChart +
    "<figcaption><strong>Manufacturing is the largest single sector at 19.0% of GDP</strong> — nearly a fifth of the economy — followed by trade at 13.1% and agriculture at 12.6%. Source: BPS, 2024.</figcaption></figure>" +
    sectionHead("Trade", "Exports vs imports, 2015–2025 (US$bn) — source: BPS / World Bank") +
    "<div class=\"chart-grid\"><figure class=\"chart-card\">" + exportsChart +
    "<figcaption><strong>Exports recovered to US$281.7bn in 2025</strong>, near the 2022 peak of US$292.0bn, after two softer years. Source: BPS / UN WITS.</figcaption></figure>" +
    "<figure class=\"chart-card\">" + importsChart +
    "<figcaption><strong>Imports hit a new high of US$241.8bn in 2025</strong>, above the 2022 peak of US$237.4bn. Source: BPS / UN WITS.</figcaption></figure></div>" +
    "<p class=\"legend\"><span class=\"legend-swatch\" style=\"background:#2563eb\"></span> Exports " +
    "<span class=\"legend-swatch\" style=\"background:#f59e0b\"></span> Imports</p>" +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Year</th><th>Exports (US$bn)</th><th>Imports (US$bn)</th><th>Balance (US$bn)</th></tr></thead>" +
    "<tbody>" + tradeRows + "</tbody></table></div>" +
    "<p class=\"page-note\"><strong>Exports beat imports in every year shown</strong> — the surplus widened to US$39.9bn in 2025. Trade surplus 2024: US$31.04 billion (BPS).</p>" +
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

// PROVINCES merged with PROVINCE_DETAIL, so the People table can show
// poverty and unemployment next to population and share. Missing detail
// rows stay null and render as "—", never as an invented figure.
function peopleRows() {
  const detailByName = {};
  (Array.isArray(PROVINCE_DETAIL) ? PROVINCE_DETAIL : []).forEach(function (d) {
    detailByName[d.name] = d;
  });
  return PROVINCES.map(function (p) {
    const d = detailByName[p.name] || {};
    return {
      name: p.name,
      pop: p.pop,
      share: p.share,
      poverty: d.poverty === undefined ? null : d.poverty,
      unemployment: d.unemployment === undefined ? null : d.unemployment
    };
  });
}

export function sortProvinces(rows, key, dir) {
  const k = key || "pop";
  const d = dir === undefined || dir === null ? -1 : dir;
  return rows.slice().sort(function (a, b) {
    const av = a[k];
    const bv = b[k];
    const aNull = av === null || av === undefined;
    const bNull = bv === null || bv === undefined;
    if (aNull && bNull) return 0;
    if (aNull) return 1;
    if (bNull) return -1;
    const an = Number(av);
    const bn = Number(bv);
    if (!Number.isNaN(an) && !Number.isNaN(bn)) return (an - bn) * d;
    return String(av).localeCompare(String(bv)) * d;
  });
}

function provinceRows(rows) {
  return rows.map(function (p) {
    return "<tr><td>" + escapeHtml(p.name) + "</td><td>" + escapeHtml(fmtDec(p.pop, 2)) + "</td>" +
      "<td>" + escapeHtml(fmtDec(p.share, 1)) + "%</td>" +
      "<td>" + escapeHtml(fmtDec(p.poverty, 1)) + (p.poverty === null || p.poverty === undefined ? "" : "%") + "</td>" +
      "<td>" + escapeHtml(fmtDec(p.unemployment, 1)) + (p.unemployment === null || p.unemployment === undefined ? "" : "%") + "</td></tr>";
  }).join("");
}

function refreshProvinceTable() {
  if (typeof document === "undefined") return;
  const body = document.getElementById("province-body");
  if (!body) return;
  const sorted = sortProvinces(peopleRows(), provinceSortState.key, provinceSortState.dir);
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

// One-sentence reading of the age bands, computed at runtime from
// AGE_STRUCTURE so the words can never disagree with the pyramid
// above them: the largest band, and how many dependants each 100
// working-age people support. Bands are matched by label, so the
// sentence survives a reordered or relabelled input.
function pyramidTakeaway(bands) {
  const pick = function (re) {
    const hit = (bands || []).find(function (d) { return re.test(String(d.label)); });
    return hit ? { label: hit.label, pct: Number(hit.pct) } : null;
  };
  const young = pick(/^0/);
  const working = pick(/^15/);
  const old = pick(/^65/);
  if (!young || !working || !old) {
    return "Age structure shown as published; the dependency ratio needs all three bands.";
  }
  const largest = [young, working, old].reduce(function (a, b) {
    return b.pct > a.pct ? b : a;
  });
  const ratio = Math.round(((young.pct + old.pct) / working.pct) * 1000) / 10;
  return "The " + largest.label + " band is the largest at " + fmtDec(largest.pct, 1) +
    "% of the population, and every 100 working-age Indonesians support " +
    fmtDec(ratio, 1) + " dependants — " + fmtDec(young.pct, 1) + "% children and " +
    fmtDec(old.pct, 1) + "% aged 65 and over. Source: World Bank, 2024.";
}

export function renderPeople() {
  const all = sortProvinces(peopleRows(), "pop", -1);
  const ageChart = donutChart({
    width: 360, height: 360,
    items: AGE_STRUCTURE.map(function (a, i) {
      return { label: a.label, value: a.pct, color: AGE_COLORS[i % AGE_COLORS.length] };
    }),
    unit: "%"
  });
  const pyramid = buildPyramid(AGE_STRUCTURE, { width: 640, height: 300 });
  const pyramidNote = pyramidTakeaway(AGE_STRUCTURE);
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
    "<p>Population " + escapeHtml(fmtDec(NATIONAL_POP, 3)) + " million (2025, World Bank). Click a column heading to sort the province table.</p></header>" +
    sectionHead("Population by province", "All 38 provinces — population in millions (BPS, mid-2024), poverty (BPS, Mar 2024), unemployment (BPS Sakernas, Aug 2024)") +
    "<div class=\"table-wrap\"><table class=\"data-table\" id=\"province-table\"><thead><tr>" +
    "<th class=\"sortable\" data-key=\"name\">Province</th>" +
    "<th class=\"sortable\" data-key=\"pop\">Population (m)</th>" +
    "<th class=\"sortable\" data-key=\"share\">Share of Indonesia</th>" +
    "<th class=\"sortable\" data-key=\"poverty\">Poverty (%)</th>" +
    "<th class=\"sortable\" data-key=\"unemployment\">Unemployment (%)</th>" +
    "</tr></thead><tbody id=\"province-body\">" + provinceRows(all) + "</tbody></table></div>" +
    "<p class=\"page-note\">“—” means the figure was not published for that province and is omitted rather than estimated. See the Province Map for the same data as a tile map.</p>" +
    sectionHead("Age structure", "Share of population by age group (%) — source: BPS / World Bank, 2024") +
    "<figure class=\"chart-card\">" + ageChart +
    "<figcaption><strong>Two in three Indonesians are of working age (15–64)</strong> — the demographic dividend is still open, with only 7.3% aged 65 and over. Source: World Bank, 2024.</figcaption></figure>" +
    sectionHead("Population pyramid", "Three age bands, widest bar in the middle — source: World Bank, 2024") +
    "<figure class=\"chart-card pyramid-card\">" + pyramid +
    "<figcaption>" + pyramidNote + " No male/female split is published for these bands, so the pyramid shows age only.</figcaption></figure>" +
    sectionHead("Employment by sector", "Share of employment and workers — source: BPS Sakernas, Aug 2026") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Sector</th><th>Share</th><th>Workers</th></tr></thead>" +
    "<tbody>" + employmentRows + "</tbody></table></div>" +
    "<p class=\"page-note\"><strong>Agriculture still employs the most Indonesians</strong> — 41.73 million workers, 28.2% of all jobs — ahead of trade at 17.9%. Source: BPS Sakernas, Aug 2026.</p>" +
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
    "<figure class=\"chart-card\">" + cpiChart +
    "<figcaption><strong>The post-pandemic price spike has fully unwound</strong> — annual-average inflation fell from 4.2% in 2022 to 1.9% in 2025, below the 2019 level of 3.0%. Source: World Bank, 2015–2025.</figcaption></figure>" +
    "<p class=\"page-note\">Two 2024 inflation numbers, both correct: the World Bank annual-average series shown in the chart is " +
    escapeHtml(fmtDec(series2024, 1)) + "% for 2024, while the BPS December year-on-year rate — the headline KPI — is 1.57%. " +
    "The annual average covers all twelve months; the December figure compares December 2024 with December 2023 only.</p>" +
    sectionHead("CPI by expenditure group", "Year-on-year % and contribution in percentage points — source: BPS, Dec 2024") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Expenditure group</th><th>YoY (%)</th><th>Contribution (pp)</th></tr></thead>" +
    "<tbody>" + cpiRows + "</tbody></table></div>" +
    "<p class=\"page-note\"><strong>Personal care drove the 2024 price rises</strong> — up 7.02% year on year, the fastest of any group — while transport prices fell 0.3%. Source: BPS, Dec 2024.</p>" +
    sectionHead("Food prices", "Average retail price — source: Bank Indonesia (PIHPS), Sep 2026") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr><th>Item</th><th>Price</th><th>Unit</th></tr></thead>" +
    "<tbody>" + foodRows + "</tbody></table></div>" +
    "<p class=\"page-note\"><strong>Large red chilli cost more per kilo than chicken meat</strong> — Rp 54,900/kg against Rp 42,600/kg in September 2026. Source: Bank Indonesia (PIHPS), Sep 2026.</p>" +
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

// ---------- Compare (all 38 provinces) ----------

function provincesByPopDesc() {
  return PROVINCES.slice().sort(function (a, b) { return Number(b.pop) - Number(a.pop); });
}

function compareOptions(selectedName) {
  return provincesByPopDesc().map(function (p) {
    return "<option value=\"" + escapeHtml(p.name) + "\"" + (p.name === selectedName ? " selected" : "") + ">" + escapeHtml(p.name) + "</option>";
  }).join("");
}

function findProvince(name, fallbackIndex) {
  const found = PROVINCES.find(function (p) { return p.name === name; });
  if (found) return found;
  return provincesByPopDesc()[fallbackIndex] || PROVINCES[0];
}

function renderCompareResult(aName, bName) {
  const a = findProvince(aName, 0);
  const b = findProvince(bName, 1);
  const ranked = provincesByPopDesc();
  const rankA = ranked.indexOf(a) + 1;
  const rankB = ranked.indexOf(b) + 1;
  const aPctOfB = Number(b.pop) ? (Number(a.pop) / Number(b.pop)) * 100 : 0;
  const bPctOfA = Number(a.pop) ? (Number(b.pop) / Number(a.pop)) * 100 : 0;
  const bigger = Number(a.pop) >= Number(b.pop) ? a : b;
  const smaller = Number(a.pop) >= Number(b.pop) ? b : a;
  const ratio = Number(smaller.pop) ? Number(bigger.pop) / Number(smaller.pop) : 0;
  const gap = Math.abs(Number(a.pop) - Number(b.pop));
  const twoChart = barChart({
    width: 370, height: 260,
    labels: [a.name, b.name], values: [Number(a.pop), Number(b.pop)],
    color: "#2563eb", unit: "m"
  });
  const top10 = ranked.slice(0, 10);
  const top10Chart = hbarChart({
    width: 760, height: 320,
    items: top10.map(function (p) { return { label: p.name, value: p.share }; }),
    color: "#2563eb", unit: "%"
  });
  const top10Share = top10.reduce(function (sum, p) { return sum + (Number(p.share) || 0); }, 0);
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
    "<div class=\"chart-grid\"><figure class=\"chart-card\">" + twoChart +
    "<figcaption><strong>" + escapeHtml(bigger.name) + " has " + escapeHtml(fmtDec(ratio, 2)) + "× the population of " + escapeHtml(smaller.name) + "</strong> — a gap of " + escapeHtml(fmtDec(gap, 1)) + " million people. Source: BPS, mid-2024.</figcaption></figure>" +
    "<figure class=\"chart-card\"><figcaption>Selected provinces highlighted</figcaption><p class=\"page-note\">Selected: <strong>" + escapeHtml(a.name) + "</strong> and <strong>" + escapeHtml(b.name) + "</strong> — shown in the two-province chart and named here; the chart below shows all top 10.</p></figure></div>" +
    "<figure class=\"chart-card\">" + top10Chart +
    "<figcaption><strong>Java dominates the top 10</strong> — the three Java provinces alone hold 46% of Indonesia, and the top 10 together hold " + escapeHtml(fmtDec(top10Share, 1)) + "%. Source: BPS, mid-2024.</figcaption></figure>" +
    "<p class=\"page-note\">Context: national population " + escapeHtml(fmtDec(NATIONAL_POP, 3)) + " million, 2025, World Bank. " +
    "The top 10 provinces together hold " + escapeHtml(fmtDec(top10Share, 1)) + "% of Indonesia's population. Population figures: BPS, 2024.</p>" + renderCompareTakeaway(a, b);
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
    "<p>Pick two provinces and compare them side by side — all 38 provinces available. Population figures: BPS, 2024.</p></header>" +
    "<div class=\"compare-controls\">" +
    "<label>Province A <select id=\"compare-a\">" + compareOptions(defaultA) + "</select></label>" +
    "<label>Province B <select id=\"compare-b\">" + compareOptions(defaultB) + "</select></label>" +
    "</div>" +
    "<div id=\"compare-result\">" + renderCompareResult(defaultA, defaultB) + "</div>" +
    "</section>";
}

// ---------- Province Map (round 3) ----------

// Short tile labels (full names live in aria-labels and the detail panel).
const SHORT_LABELS = {
  "Aceh": "Aceh",
  "North Sumatra": "Sumut",
  "West Sumatra": "Sumbar",
  "Riau": "Riau",
  "Jambi": "Jambi",
  "South Sumatra": "Sumsel",
  "Bengkulu": "Bengkulu",
  "Lampung": "Lampung",
  "Bangka Belitung Islands": "Babel",
  "Riau Islands": "Kepri",
  "Jakarta": "Jakarta",
  "West Java": "Jabar",
  "Central Java": "Jateng",
  "Yogyakarta": "DIY",
  "East Java": "Jatim",
  "Banten": "Banten",
  "Bali": "Bali",
  "West Nusa Tenggara": "NTB",
  "East Nusa Tenggara": "NTT",
  "West Kalimantan": "Kalbar",
  "Central Kalimantan": "Kalteng",
  "South Kalimantan": "Kalsel",
  "East Kalimantan": "Kaltim",
  "North Kalimantan": "Kaltara",
  "North Sulawesi": "Sulut",
  "Central Sulawesi": "Sulteng",
  "South Sulawesi": "Sulsel",
  "Southeast Sulawesi": "Sultra",
  "Gorontalo": "Gorontalo",
  "West Sulawesi": "Sulbar",
  "Maluku": "Maluku",
  "North Maluku": "Malut",
  "West Papua": "Papua Barat",
  "Southwest Papua": "Papua BD",
  "Papua": "Papua",
  "Central Papua": "Papua Tengah",
  "Highland Papua": "Papua Peg.",
  "South Papua": "Papua Selatan"
};

const MAP_METRICS = {
  pop: { label: "Population", unit: "m", sourceNote: "BPS, mid-2024" },
  poverty: { label: "Poverty rate", unit: "%", sourceNote: "BPS, Mar 2024" },
  unemployment: { label: "Unemployment", unit: "%", sourceNote: "BPS Sakernas, Aug 2024" }
};

const mapState = { metric: "pop", selected: null };

// Set the map's selected province from outside the map route (the
// header search uses this so a province hit opens the map with that
// province's detail panel already showing). The next renderMap() call
// keeps the selection instead of falling back to the largest province.
export function setMapSelection(name) {
  if (typeof name === "string" && name) mapState.selected = name;
}

function mapDetails() {
  return Array.isArray(PROVINCE_DETAIL) ? PROVINCE_DETAIL : [];
}

function mapMetricValue(detail, key) {
  if (!detail) return null;
  const v = detail[key];
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// Quintile breaks: the 20/40/60/80% cut points of the ranked values.
function computeBreaks(values) {
  const sorted = values.slice().sort(function (a, b) { return a - b; });
  if (sorted.length < 2) return sorted;
  const breaks = [];
  [0.2, 0.4, 0.6, 0.8].forEach(function (q) {
    const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * q));
    breaks.push(sorted[idx]);
  });
  return breaks;
}

function formatBreak(value, metric) {
  if (metric.unit === "%") return fmtDec(value, 1) + "%";
  return fmtDec(value, 1) + "m";
}

function mapLegendHtml(breaks, metric, hasNulls) {
  const steps = [];
  for (let i = 0; i < TILE_COLORS.length; i++) {
    let range;
    if (i === 0) range = "≤ " + formatBreak(breaks[0], metric);
    else if (i === TILE_COLORS.length - 1) range = "> " + formatBreak(breaks[breaks.length - 1], metric);
    else range = formatBreak(breaks[i - 1], metric) + " – " + formatBreak(breaks[i], metric);
    steps.push("<span class=\"legend-item\"><span class=\"swatch\" style=\"background:" + TILE_COLORS[i] + "\"></span>" + escapeHtml(range) + "</span>");
  }
  if (hasNulls) {
    steps.push("<span class=\"legend-item\"><span class=\"swatch\" style=\"background:" + TILE_NULL_COLOR + "\"></span>No data</span>");
  }
  return "<p class=\"map-legend-title\">" + escapeHtml(metric.label) + " — " + escapeHtml(metric.sourceNote) + "</p>" +
    "<div class=\"map-legend\">" + steps.join("") + "</div>";
}

function mapRank(name, key) {
  const ranked = mapDetails()
    .map(function (d) { return { name: d.name, value: mapMetricValue(d, key) }; })
    .filter(function (d) { return d.value !== null; })
    .sort(function (a, b) { return b.value - a.value; });
  const idx = ranked.findIndex(function (d) { return d.name === name; });
  if (idx < 0) return null;
  return { rank: idx + 1, of: ranked.length };
}

function mapDetailHtml() {
  const detail = mapDetails().find(function (d) { return d.name === mapState.selected; });
  const metric = MAP_METRICS[mapState.metric];
  if (!detail) {
    return "<h2>No province selected</h2><p>Click a tile on the map to see its numbers.</p>";
  }
  const province = PROVINCES.find(function (p) { return p.name === detail.name; });
  const pop = mapMetricValue(detail, "pop");
  const poverty = mapMetricValue(detail, "poverty");
  const unemployment = mapMetricValue(detail, "unemployment");
  const rank = mapRank(detail.name, mapState.metric);
  const rankLine = rank
    ? "<p class=\"map-detail-rank\">" + escapeHtml(metric.label) + " rank <strong>" + rank.rank + " of " + rank.of + "</strong></p>"
    : "<p class=\"map-detail-rank\">No " + escapeHtml(metric.label.toLowerCase()) + " data for this province.</p>";
  return "<h2>" + escapeHtml(detail.name) + "</h2>" +
    rankLine +
    "<dl class=\"detail-list\">" +
    "<dt>Population</dt><dd>" + (pop === null ? "—" : escapeHtml(fmtDec(pop, 1)) + " million") + "</dd>" +
    "<dt>Share of Indonesia</dt><dd>" + (province ? escapeHtml(fmtDec(province.share, 1)) + "%" : "—") + "</dd>" +
    "<dt>Poverty rate</dt><dd>" + (poverty === null ? "—" : escapeHtml(fmtDec(poverty, 1)) + "%") + "</dd>" +
    "<dt>Unemployment</dt><dd>" + (unemployment === null ? "—" : escapeHtml(fmtDec(unemployment, 1)) + "%") + "</dd>" +
    "</dl>" +
    "<p class=\"map-detail-source\">Population: BPS, mid-2024. Poverty: BPS, Mar 2024. Unemployment: BPS Sakernas, Aug 2024.</p>";
}

// Builds the three dynamic regions of the map page (SVG, legend, detail).
// Used both by renderMap (first paint) and by refreshMap (interactions).
function mapRegionsHtml() {
  const metric = MAP_METRICS[mapState.metric];
  const details = mapDetails();
  if (mapState.selected === null) {
    const byPop = details
      .map(function (d) { return { name: d.name, value: mapMetricValue(d, "pop") }; })
      .filter(function (d) { return d.value !== null; })
      .sort(function (a, b) { return b.value - a.value; });
    if (byPop.length) mapState.selected = byPop[0].name;
  }
  const tiles = details
    .filter(function (d) { return Object.prototype.hasOwnProperty.call(TILE_POS, d.name); })
    .map(function (d) {
      const pos = TILE_POS[d.name];
      return {
        name: d.name,
        value: mapMetricValue(d, mapState.metric),
        col: pos.col,
        row: pos.row,
        label: SHORT_LABELS[d.name] || d.name
      };
    });
  const values = tiles.map(function (t) { return t.value; }).filter(function (v) { return v !== null; });
  const hasNulls = tiles.some(function (t) { return t.value === null; });
  const breaks = computeBreaks(values);
  return {
    svg: buildTileMap(tiles, { breaks: breaks, selectedName: mapState.selected }),
    legend: mapLegendHtml(breaks, metric, hasNulls),
    detail: mapDetailHtml()
  };
}

function refreshMap(restoreFocus) {
  if (typeof document === "undefined") return;
  const regions = mapRegionsHtml();
  const svgWrap = document.getElementById("map-svg");
  const legendWrap = document.getElementById("map-legend");
  const detailWrap = document.getElementById("map-detail");
  if (svgWrap) svgWrap.innerHTML = regions.svg;
  if (legendWrap) legendWrap.innerHTML = regions.legend;
  if (detailWrap) detailWrap.innerHTML = regions.detail;
  document.querySelectorAll(".metric-switcher [data-metric]").forEach(function (btn) {
    btn.setAttribute("aria-pressed", btn.getAttribute("data-metric") === mapState.metric ? "true" : "false");
  });
  if (restoreFocus && mapState.selected) {
    const tile = document.querySelector('.map-tile[data-name="' + mapState.selected.replace(/"/g, "") + '"]');
    if (tile && typeof tile.focus === "function") tile.focus();
  }
}

export function bindMap() {
  if (typeof document === "undefined") return;
  const switcher = document.querySelector(".metric-switcher");
  if (switcher) {
    switcher.addEventListener("click", function (event) {
      const btn = event.target.closest("[data-metric]");
      if (!btn) return;
      mapState.metric = btn.getAttribute("data-metric");
      refreshMap(false);
    });
  }
  const svgWrap = document.getElementById("map-svg");
  if (svgWrap) {
    svgWrap.addEventListener("click", function (event) {
      const tile = event.target.closest(".map-tile");
      if (!tile) return;
      mapState.selected = tile.getAttribute("data-name");
      refreshMap(false);
    });
    svgWrap.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      const tile = event.target.closest(".map-tile");
      if (!tile) return;
      event.preventDefault();
      mapState.selected = tile.getAttribute("data-name");
      refreshMap(true);
    });
  }
}

export function renderMap() {
  const regions = mapRegionsHtml();
  const switcher = Object.keys(MAP_METRICS).map(function (key) {
    const m = MAP_METRICS[key];
    return "<button type=\"button\" class=\"metric-btn\" data-metric=\"" + key + "\" aria-pressed=\"" + (key === mapState.metric ? "true" : "false") + "\">" + escapeHtml(m.label) + "</button>";
  }).join("");
  return "<section class=\"page map\">" +
    "<header class=\"page-head\"><h1>Province Map</h1>" +
    "<p>All 38 provinces on one tile map. Pick a metric to colour the tiles, then click a province — or tab to it and press Enter — to see its numbers.</p></header>" +
    "<div class=\"metric-switcher\" role=\"group\" aria-label=\"Colour the map by\">" + switcher + "</div>" +
    "<div class=\"map-layout\">" +
    "<div class=\"card map-card\"><div id=\"map-svg\">" + regions.svg + "</div>" +
    "<div id=\"map-legend\">" + regions.legend + "</div></div>" +
    "<aside class=\"card map-detail\" id=\"map-detail\" aria-live=\"polite\">" + regions.detail + "</aside>" +
    "</div>" +
    "<p class=\"page-note\">Each tile is one province, placed to roughly mirror Indonesia's geography: Sumatra on the diagonal at top left, Java in a row below it, Kalimantan in the centre, Sulawesi to its east, Maluku and Papua at the far east. Darker tiles mean a higher value on the selected metric. Population: BPS, mid-2024. Poverty: BPS, Mar 2024. Unemployment: BPS Sakernas, Aug 2024.</p>" +
    "</section>";
}

// ---------------------------------------------------------------------------
// Sources & method. A page that names the authority behind every figure:
// the publication or release, its vintage, and which part of the site it
// feeds — grouped by theme so a reader can check any number in one hop.
// The "Omitted, not guessed" list is the other half of the method: the
// figures we could not verify to a named release, and why they are absent
// instead of estimated. Release names and dates come from the verified
// data notes; the counts in the intro are computed at runtime from the
// data.js exports.
// ---------------------------------------------------------------------------

// One entry = one publication behind one corner of the site. "covers"
// says what the release feeds here, in plain words, without restating
// the figures themselves — the figures live on their own pages.
const SOURCE_GROUPS = [
  {
    theme: "Economy",
    blurb: "Output, growth and living standards — the headline economy pages.",
    entries: [
      { authority: "BPS — Statistics Indonesia", release: "Berita Resmi Statistik No. 18/02/Th. XXIX", vintage: "5 February 2026",
        covers: "Gross domestic product for 2025: full-year growth and the rupiah level." },
      { authority: "BPS — Statistics Indonesia", release: "Berita Resmi Statistik No. 17/02/Th. XXVIII", vintage: "5 February 2025",
        covers: "Gross domestic product for 2024, including the sector shares." },
      { authority: "World Bank", release: "World Development Indicators", vintage: "2024 vintage",
        covers: "Population, GDP in US dollars, GDP per capita and life expectancy." },
      { authority: "IMF", release: "World Economic Outlook", vintage: "2024 vintage",
        covers: "GDP in purchasing-power terms, total and per capita." }
    ]
  },
  {
    theme: "People",
    blurb: "Who lives here, who works, and who is counted as poor.",
    entries: [
      { authority: "BPS — Statistics Indonesia", release: "Sakernas (National Labour Force Survey)", vintage: "Release 5 November 2026",
        covers: "Unemployment and employment by sector, August survey round." },
      { authority: "BPS — Statistics Indonesia", release: "Berita Resmi Statistik No. 80/08/Th. XXIX", vintage: "5 August 2026",
        covers: "Poverty rate and the poverty line, March 2026 round." },
      { authority: "BPS — Statistics Indonesia", release: "Provincial population release", vintage: "Mid-2024",
        covers: "Population of all 38 provinces and their shares of the national total." },
      { authority: "UN World Population Prospects", release: "World Population Prospects", vintage: "2024 vintage",
        covers: "Median age of the population." },
      { authority: "World Bank", release: "World Development Indicators", vintage: "2024 vintage",
        covers: "Age structure, fertility, urban share and population growth." }
    ]
  },
  {
    theme: "Prices",
    blurb: "What things cost, and how fast those costs move.",
    entries: [
      { authority: "BPS — Statistics Indonesia", release: "Berita Resmi Statistik No. 01/01/Th. XXVIII", vintage: "2 January 2025",
        covers: "Consumer prices and December year-on-year inflation, CPI base 2022 = 100." },
      { authority: "Bank Indonesia", release: "PIHPS (Strategic Food Price Information Centre)", vintage: "National average, September 2026",
        covers: "Food prices: rice, eggs, chicken, cooking oil, chilli, shallots and garlic." },
      { authority: "World Bank", release: "World Development Indicators", vintage: "2024 vintage",
        covers: "Annual-average consumer-price inflation series, 2015–2025." }
    ]
  },
  {
    theme: "Trade",
    blurb: "What Indonesia sells abroad, buys in, and earns from investment.",
    entries: [
      { authority: "BPS / EIU", release: "Foreign trade statistics", vintage: "2024",
        covers: "Merchandise exports, imports and the trade surplus for 2024." },
      { authority: "UN Comtrade / World Bank", release: "Merchandise trade series", vintage: "2015–2025",
        covers: "The consistent exports and imports series behind the trade charts." },
      { authority: "UNCTAD", release: "World Investment Report data", vintage: "2024",
        covers: "Foreign direct investment inflows and stock." }
    ]
  },
  {
    theme: "Government & money",
    blurb: "The state budget and the rupiah — the public purse and the currency.",
    entries: [
      { authority: "Ministry of Finance", release: "APBN realisation", vintage: "2024",
        covers: "Government revenue, spending, the budget deficit and the primary deficit." },
      { authority: "Bank Indonesia", release: "Policy rate and exchange-rate data", vintage: "November 2026",
        covers: "The BI policy rate and the average rupiah–US dollar rate." }
    ]
  }
];

// Figures that were looked for, could not be verified to a named
// release, and were left out instead of estimated. Each entry says
// what is missing and why — a reader should be able to tell the
// difference between "not published" and "not checked".
const OMITTED_ITEMS = [
  { what: "Human Development Index",
    why: "published values conflict across vintages and could not be pinned to a single release, so no HDI figure appears anywhere on the site." },
  { what: "2024 average food prices (BPS publication 06200.25004)",
    why: "the publication exists but its table values could not be extracted, so food prices use Bank Indonesia PIHPS, September 2026, clearly dated." },
  { what: "CPI basket weights",
    why: "the December 2024 release publishes inflation rates and contributions per group, not weights, so the site shows rates and contributions only." },
  { what: "Education indicators",
    why: "no Education-group row met the same verification bar as the other five groups, so the data explorer carries five groups, not six." }
];

function sourceGroupHtml(group) {
  const rows = group.entries.map(function (e) {
    return "<tr><td>" + escapeHtml(e.authority) + "</td><td>" + escapeHtml(e.release) +
      "</td><td>" + escapeHtml(e.vintage) + "</td><td>" + escapeHtml(e.covers) + "</td></tr>";
  }).join("");
  return sectionHead(group.theme, group.blurb) +
    "<div class=\"table-wrap\"><table class=\"data-table sources-table\"><thead><tr>" +
    "<th>Authority</th><th>Publication / release</th><th>Vintage</th><th>What it feeds on this site</th>" +
    "</tr></thead><tbody>" + rows + "</tbody></table></div>";
}

function omittedHtml(items) {
  const rows = items.map(function (o) {
    return "<li><strong>" + escapeHtml(o.what) + "</strong> — " + escapeHtml(o.why) + "</li>";
  }).join("");
  return "<ul class=\"omitted-list\">" + rows + "</ul>";
}

export function renderSources() {
  const authorityCount = SOURCES.length;
  const indicatorCount = INDICATORS.length;
  const groupCount = SOURCE_GROUPS.length;
  const omittedCount = OMITTED_ITEMS.length;
  const groups = SOURCE_GROUPS.map(sourceGroupHtml).join("");
  return "<section class=\"page sources\">" +
    "<header class=\"page-head\"><h1>Sources &amp; method</h1>" +
    "<p>Every figure on NusaStat comes from " + authorityCount + " named authorities, " +
    "across " + groupCount + " themes and " + indicatorCount + " indicator rows in the data explorer. " +
    "This page lists the publication or release behind each theme, its vintage, and what it feeds — " +
    "so any number on this site can be checked in one hop. Figures were verified 26 November 2026; " +
    "newer releases are added as they are published.</p></header>" +
    sectionHead("How to read this site", "Four habits that keep the numbers honest") +
    "<div class=\"card sources-howto\"><ol>" +
    "<li><strong>Source and year travel with the figure.</strong> A number without a source line is a number you should not trust — including here.</li>" +
    "<li><strong>Two different numbers can both be right.</strong> Inflation as a December year-on-year rate (BPS) and as an annual average (World Bank) are different measures of the same prices; unemployment from BPS Sakernas and the ILO modelled estimate count different things. The site says which one it uses, every time.</li>" +
    "<li><strong>Residuals are labelled as residuals.</strong> An “all other” slice is 100 minus the named shares — computed, not measured — and the page says so.</li>" +
    "<li><strong>A newer release replaces an older one only when it covers the same thing.</strong> Vintages are shown so a reader can tell whether two figures are comparable at all.</li>" +
    "</ol></div>" +
    groups +
    sectionHead("Omitted, not guessed", omittedCount + " figures we could not verify — left out instead of estimated") +
    omittedHtml(OMITTED_ITEMS) +
    "<p class=\"page-note\">If a figure you expected is missing, it is almost certainly on this list. " +
    "Nothing on this site is filled in by guessing, interpolating between years, or borrowing another country's number.</p>" +
    "</section>";
}

// ---------------------------------------------------------------------------
// Round 4 additions: release digest, purchasing-power calculator and the
// compare takeaway. Every figure below is computed at runtime from the
// data.js exports — no number in this block is typed in by hand.
// ---------------------------------------------------------------------------

// "2026-11-05" -> "5 November 2026". Parsed by splitting the ISO date
// (never via Date parsing, so no timezone can shift the day). The month
// names are the only literal in this helper; the date itself comes
// from RELEASES.
function formatReleaseDate(iso) {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const parts = String(iso || "").split("-");
  if (parts.length !== 3) return String(iso || "");
  const month = months[Number(parts[1]) - 1];
  if (!month) return String(iso || "");
  return Number(parts[2]) + " " + month + " " + parts[0];
}

// Release digest: a spotlight on the single newest dated release, plus
// a per-year count of releases. It sits on the dashboard just above
// the full "Latest releases" list, so the cover shows the freshest
// number first and the volume of recent releases second. Nothing here
// is a forecast or a scheduled date — only published releases.
export function renderReleaseDigest() {
  const rows = (Array.isArray(RELEASES) ? RELEASES : []).slice();
  if (!rows.length) return "";
  rows.sort(function (a, b) {
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
  const newest = rows[0];

  // How many releases fell in each year, newest year first.
  const perYear = {};
  rows.forEach(function (r) {
    const year = String(r.date || "").slice(0, 4);
    if (!year) return;
    perYear[year] = (perYear[year] || 0) + 1;
  });
  const years = Object.keys(perYear).sort().reverse();
  const maxCount = Math.max.apply(null, years.map(function (y) {
    return perYear[y];
  }));
  const bars = years.map(function (y) {
    const count = perYear[y];
    const width = Math.max(8, Math.round((count / maxCount) * 100));
    return "<li><span class=\"digest-year\">" + escapeHtml(y) + "</span>" +
      "<span class=\"digest-bar\" style=\"width:" + width + "%\"></span>" +
      "<span class=\"digest-count\">" + count + " release" +
      (count === 1 ? "" : "s") + "</span></li>";
  }).join("");

  // How long ago the newest release landed, from the reader's clock.
  // Guarded: a future-dated entry (or a clock set early) falls back
  // to a plain "latest dated release" line instead of a negative age.
  const parts = String(newest.date || "").split("-");
  const newestMs = Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  const now = new Date();
  const todayMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const daysAgo = Math.floor((todayMs - newestMs) / 86400000);
  const ageLine = daysAgo === 0
    ? "Published today."
    : daysAgo === 1
      ? "Published yesterday."
      : daysAgo > 1
        ? "Published " + daysAgo + " days ago."
        : "Latest dated release.";

  // Release cadence: the average gap between consecutive releases,
  // from the sorted dates. One release says little about tempo; the
  // average gap across all of them does. Gaps are counted in whole
  // days between publication dates.
  let cadenceLine = "";
  if (rows.length > 1) {
    let gapTotal = 0;
    for (let i = 1; i < rows.length; i++) {
      const newer = String(rows[i - 1].date || "").split("-");
      const older = String(rows[i].date || "").split("-");
      const newerMs = Date.UTC(Number(newer[0]), Number(newer[1]) - 1, Number(newer[2]));
      const olderMs = Date.UTC(Number(older[0]), Number(older[1]) - 1, Number(older[2]));
      gapTotal += (newerMs - olderMs) / 86400000;
    }
    const avgGap = Math.round(gapTotal / (rows.length - 1));
    cadenceLine = " Releases here arrive about every " + avgGap +
      " days on average.";
  }

  return sectionHead("Release digest", "The newest numbers, at a glance") +
    "<div class=\"release-digest\">" +
    "<article class=\"card digest-spotlight\"><p class=\"digest-kicker\">Newest release · " +
    escapeHtml(formatReleaseDate(newest.date)) + "</p>" +
    "<h3>" + escapeHtml(newest.title) + "</h3>" +
    "<p>" + escapeHtml(newest.detail) + "</p>" +
    "<p class=\"digest-age\">" + escapeHtml(ageLine) + "</p></article>" +
    "<ul class=\"digest-years\">" + bars + "</ul>" +
    "<p class=\"page-note\">" + rows.length + " dated releases in total." + cadenceLine + " Every item is a " +
    "published BPS announcement — nothing here is a forecast or a scheduled date.</p>" +
    "</div>";
}

// ---------------------------------------------------------------------------
// Purchasing-power calculator.
// ---------------------------------------------------------------------------

// Cumulative price index from the annual inflation series: 100 in the
// first year, each later year compounded by that year's annual average
// inflation. The ratio of two years' index values is the conversion
// factor between rupiah amounts in those years.
function priceIndex() {
  const years = INFLATION_SERIES.years || [];
  const values = INFLATION_SERIES.values || [];
  const index = [];
  let level = 100;
  for (let i = 0; i < years.length; i++) {
    if (i > 0) level = level * (1 + Number(values[i]) / 100);
    index.push(level);
  }
  return { years: years, index: index };
}

// Amounts are formatted with the existing fmtRp helper above; the
// calculator rounds converted values to the nearest thousand before
// formatting, so the sentence never claims rupiah precision.

// What `amount` rupiah in `fromYear` is worth in `toYear`, from the
// price index. Returns null when either year is outside the series.
function convertAmount(amount, fromYear, toYear) {
  const series = priceIndex();
  const fromIdx = series.years.indexOf(fromYear);
  const toIdx = series.years.indexOf(toYear);
  if (fromIdx < 0 || toIdx < 0) return null;
  return amount * series.index[toIdx] / series.index[fromIdx];
}

// Year options for the two selects, built from the series so the
// calculator always covers exactly the years the data covers.
function calculatorYearOptions(selected) {
  return (INFLATION_SERIES.years || []).map(function (y) {
    return "<option value=\"" + y + "\"" + (y === selected ? " selected" : "") +
      ">" + y + "</option>";
  }).join("");
}

// One plain sentence for a conversion, in both directions: forward in
// time ("buys what … buys") and backward ("would have cost").
// Returns null when the years are outside the series.
function calculatorSentence(amount, fromYear, toYear) {
  const converted = convertAmount(amount, fromYear, toYear);
  if (converted === null) return null;
  const shown = Math.round(converted / 1000) * 1000;
  if (fromYear === toYear) {
    return fmtRp(amount) + " in " + fromYear + " is worth " + fmtRp(amount) +
      " in " + toYear + " — the same year, so nothing changed.";
  }
  const pct = Math.abs(converted / amount - 1) * 100;
  if (toYear > fromYear) {
    return fmtRp(amount) + " in " + fromYear + " buys what " + fmtRp(shown) +
      " buys in " + toYear + " — prices rose " + fmtDec(pct, 1) + "% in between.";
  }
  return fmtRp(amount) + " in " + fromYear + " would have cost " + fmtRp(shown) +
    " in " + toYear + " — prices were " + fmtDec(pct, 1) + "% lower then.";
}

// Takeaway for the selected span: the overall rise plus the sharpest
// single year inside it, both read off the series at render time.
function calculatorTakeaway(fromYear, toYear) {
  const lo = Math.min(fromYear, toYear);
  const hi = Math.max(fromYear, toYear);
  const years = INFLATION_SERIES.years || [];
  const values = INFLATION_SERIES.values || [];
  let peakYear = null;
  let peakValue = null;
  for (let i = 0; i < years.length; i++) {
    if (years[i] <= lo || years[i] > hi) continue;
    if (peakValue === null || Number(values[i]) > peakValue) {
      peakValue = Number(values[i]);
      peakYear = years[i];
    }
  }
  const overall = convertAmount(100, lo, hi);
  if (overall === null || peakYear === null) return "";
  const rise = (overall / 100 - 1) * 100;
  return "Between " + lo + " and " + hi + " the price level rose " +
    fmtDec(rise, 1) + "% overall. The sharpest single year in that span was " +
    peakYear + " at " + fmtDec(peakValue, 1) + "% inflation — the rest of the " +
    "rise is slow compounding, year after year.";
}

// Year-by-year rows for the selected span: inflation and the running
// price index, so the reader can see where the conversion comes from.
function calculatorYearRows(fromYear, toYear) {
  const lo = Math.min(fromYear, toYear);
  const hi = Math.max(fromYear, toYear);
  const series = priceIndex();
  const rows = [];
  for (let i = 0; i < series.years.length; i++) {
    const y = series.years[i];
    if (y < lo || y > hi) continue;
    const inflation = i === 0
      ? "—"
      : fmtDec(Number(INFLATION_SERIES.values[i]), 1) + "%";
    rows.push("<tr><td>" + y + "</td><td>" + inflation + "</td><td>" +
      fmtDec(series.index[i], 1) + "</td></tr>");
  }
  return rows.join("");
}

// Price-level chart for the selected span, drawn with the shared
// barChart builder. The chart is re-drawn by bindCalculator whenever
// the years change.
function calculatorChartHtml(fromYear, toYear) {
  const lo = Math.min(fromYear, toYear);
  const hi = Math.max(fromYear, toYear);
  const series = priceIndex();
  const labels = [];
  const values = [];
  for (let i = 0; i < series.years.length; i++) {
    if (series.years[i] < lo || series.years[i] > hi) continue;
    labels.push(String(series.years[i]));
    values.push(Math.round(series.index[i] * 10) / 10);
  }
  return barChart({ labels: labels, values: values, unit: "" });
}

// Quick-amount chips under the amount field: common round amounts
// the reader can tap instead of typing. Labels are UI shorthand
// ("Rp 1jt" = one million rupiah); the value carried is exact.
function calculatorChipsHtml() {
  const amounts = [100000, 500000, 1000000, 5000000, 10000000];
  const labels = ["Rp 100rb", "Rp 500rb", "Rp 1jt", "Rp 5jt", "Rp 10jt"];
  return amounts.map(function (amount, i) {
    return "<button type=\"button\" class=\"calc-chip\" data-amount=\"" + amount +
      "\">" + labels[i] + "</button>";
  }).join("");
}

export function renderCalculator() {
  const years = INFLATION_SERIES.years || [];
  const firstYear = years[0];
  const lastYear = years[years.length - 1];
  const defaultAmount = 1000000;
  const sentence = calculatorSentence(defaultAmount, firstYear, lastYear);
  const takeaway = calculatorTakeaway(firstYear, lastYear);

  return "<section class=\"page calculator\">" +
    "<header class=\"page-head\"><h1>Purchasing-power calculator</h1>" +
    "<p>What is Rp X in one year worth in another? The answer comes from " +
    "the annual inflation series — each year's inflation compounds on " +
    "the last, so the gap grows faster than any single year's rate.</p></header>" +
    sectionHead("Try it", "Pick an amount and two years") +
    "<div class=\"card calculator-form\">" +
    "<label class=\"calc-field\">Amount (rupiah)" +
    "<input id=\"calc-amount\" type=\"text\" inputmode=\"numeric\" value=\"1000000\" aria-label=\"Amount in rupiah\"></label>" +
    "<label class=\"calc-field\">From year" +
    "<select id=\"calc-from\" aria-label=\"From year\">" + calculatorYearOptions(firstYear) + "</select></label>" +
    "<label class=\"calc-field\">To year" +
    "<select id=\"calc-to\" aria-label=\"To year\">" + calculatorYearOptions(lastYear) + "</select></label>" +
    "<p class=\"calc-chips\">Quick amounts: " + calculatorChipsHtml() + "</p>" +
    "<p id=\"calc-result\" class=\"calc-result\" aria-live=\"polite\">" +
    escapeHtml(sentence || "Pick two years inside the series to see the conversion.") + "</p>" +
    "<p class=\"page-note\">Type any amount — the result updates as you type. " +
    "Commas are fine; they are stripped before the maths.</p>" +
    "</div>" +
    sectionHead("The price level", "Index, 2015 = 100 — each bar is one year") +
    "<figure class=\"chart-card\"><div id=\"calc-chart\">" +
    calculatorChartHtml(firstYear, lastYear) + "</div>" +
    "<figcaption><strong>Prices compound.</strong> <span id=\"calc-takeaway\">" +
    escapeHtml(takeaway) + "</span></figcaption></figure>" +
    sectionHead("Year by year", "Inflation and the running price index") +
    "<div class=\"table-wrap\"><table class=\"data-table\"><thead><tr>" +
    "<th>Year</th><th>Inflation</th><th>Price index (2015 = 100)</th>" +
    "</tr></thead><tbody id=\"calc-years\">" +
    calculatorYearRows(firstYear, lastYear) + "</tbody></table></div>" +
    "<p class=\"page-note\">Source: World Bank, annual average inflation " +
    escapeHtml(String(years[0])) + "–" + escapeHtml(String(years[years.length - 1])) +
    ". The index starts at 100 in the first year and compounds each year's " +
    "inflation; the conversion is the ratio of the two years' index values.</p>" +
    "</section>";
}

export function bindCalculator() {
  if (typeof document === "undefined") return;
  const amountEl = document.getElementById("calc-amount");
  const fromEl = document.getElementById("calc-from");
  const toEl = document.getElementById("calc-to");
  const resultEl = document.getElementById("calc-result");
  const chartEl = document.getElementById("calc-chart");
  const takeawayEl = document.getElementById("calc-takeaway");
  const yearsEl = document.getElementById("calc-years");
  if (!amountEl || !fromEl || !toEl || !resultEl) return;

  function update() {
    const raw = String(amountEl.value || "").replace(/[^0-9.]/g, "");
    const amount = Number(raw);
    const fromYear = Number(fromEl.value);
    const toYear = Number(toEl.value);
    if (!raw || !isFinite(amount) || amount <= 0 || amount > 1e15) {
      resultEl.textContent = "Enter a positive amount to see the conversion.";
      return;
    }
    const sentence = calculatorSentence(amount, fromYear, toYear);
    resultEl.textContent = sentence ||
      "Those years sit outside the inflation series.";
    if (takeawayEl) {
      takeawayEl.textContent = calculatorTakeaway(fromYear, toYear);
    }
    if (chartEl) chartEl.innerHTML = calculatorChartHtml(fromYear, toYear);
    if (yearsEl) yearsEl.innerHTML = calculatorYearRows(fromYear, toYear);
  }

  amountEl.addEventListener("input", update);
  fromEl.addEventListener("change", update);
  toEl.addEventListener("change", update);

  // Quick-amount chips fill the amount field and recompute at once.
  const chips = document.querySelectorAll(".calc-chip");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      amountEl.value = chip.getAttribute("data-amount");
      update();
      amountEl.focus();
    });
  });
}

// ---------------------------------------------------------------------------
// Compare takeaway.
// ---------------------------------------------------------------------------

// Plain-language takeaway at the foot of the Compare route. Everything
// is computed from PROVINCE_DETAIL at render time: how many times
// larger one province is than the other, the poverty and unemployment
// gaps between them, and the extremes across all 38 provinces. No
// ratio here is typed in — the numbers move when the selection does.
export function renderCompareTakeaway(a, b) {
  const details = Array.isArray(PROVINCE_DETAIL) ? PROVINCE_DETAIL : [];
  if (!a || !b || !details.length) return "";

  // a and b carry population (they come from the compare's province
  // list), but poverty and unemployment live in PROVINCE_DETAIL, so
  // look the full rows up by name instead of assuming the fields.
  const detailOf = function (name) {
    return details.find(function (d) { return d.name === name; }) || null;
  };
  const da = detailOf(a.name);
  const db = detailOf(b.name);

  let most = details[0];
  let least = details[0];
  let poorest = null;
  let leastPoor = null;
  details.forEach(function (d) {
    if (Number(d.pop) > Number(most.pop)) most = d;
    if (Number(d.pop) < Number(least.pop)) least = d;
    if (d.poverty !== null && d.poverty !== undefined) {
      if (!poorest || Number(d.poverty) > Number(poorest.poverty)) poorest = d;
      if (!leastPoor || Number(d.poverty) < Number(leastPoor.poverty)) leastPoor = d;
    }
  });

  const sentences = [];
  const bigger = Number(a.pop) >= Number(b.pop) ? a : b;
  const smaller = bigger === a ? b : a;
  const popMultiple = Number(bigger.pop) / Number(smaller.pop);
  sentences.push(escapeHtml(bigger.name) + " is home to " +
    fmtDec(popMultiple, 1) + "× as many people as " + escapeHtml(smaller.name) +
    " (" + fmtDec(Number(bigger.pop), 1) + " million vs " +
    fmtDec(Number(smaller.pop), 1) + " million).");

  if (da && db && da.poverty !== null && db.poverty !== null &&
      da.poverty !== undefined && db.poverty !== undefined) {
    const higher = Number(da.poverty) >= Number(db.poverty) ? da : db;
    const lower = higher === da ? db : da;
    sentences.push("Poverty runs " +
      fmtDec(Math.abs(Number(da.poverty) - Number(db.poverty)), 1) +
      " points higher in " + escapeHtml(higher.name) + " (" +
      fmtDec(Number(higher.poverty), 1) + "% vs " +
      fmtDec(Number(lower.poverty), 1) + "%).");
  }

  if (da && db && da.unemployment !== null && db.unemployment !== null &&
      da.unemployment !== undefined && db.unemployment !== undefined) {
    const higher = Number(da.unemployment) >= Number(db.unemployment) ? da : db;
    const lower = higher === da ? db : da;
    sentences.push("Unemployment runs " +
      fmtDec(Math.abs(Number(da.unemployment) - Number(db.unemployment)), 1) +
      " points higher in " + escapeHtml(higher.name) + " (" +
      fmtDec(Number(higher.unemployment), 1) + "% vs " +
      fmtDec(Number(lower.unemployment), 1) + "%).");
  }

  if (poorest && leastPoor && Number(least.pop) > 0) {
    sentences.push("Across all 38 provinces, " + escapeHtml(most.name) +
      " holds " + fmtDec(Number(most.pop) / Number(least.pop), 0) +
      "× the people of " + escapeHtml(least.name) + ", and poverty runs from " +
      fmtDec(Number(leastPoor.poverty), 1) + "% in " + escapeHtml(leastPoor.name) +
      " to " + fmtDec(Number(poorest.poverty), 1) + "% in " +
      escapeHtml(poorest.name) + ".");
  }

  return "<aside class=\"compare-takeaway\"><h2>The takeaway</h2><p>" +
    sentences.join(" ") + "</p>" +
    "<p class=\"page-note\">Population: BPS, mid-2024. Poverty: BPS, Mar 2024. " +
    "Unemployment: BPS Sakernas, Aug 2024.</p></aside>";
}
