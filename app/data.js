// NusaStat — Indonesia in Numbers (Round 4 data layer)
// ------------------------------------------------------
// Sources: BPS (Statistics Indonesia), World Bank (WDI / WITS),
// IMF (World Economic Outlook), Ministry of Finance, Bank Indonesia,
// UNCTAD, UN World Population Prospects, CIA World Factbook.
// Every figure verified 26 Nov 2026 against the verified-data notes
// (best-national-statistics-site-verified-data.md), and the 38-province
// dataset verified 28 Nov 2026 against the BPS tables named below.
// Nothing here is estimated or invented: figures that could not be
// verified were omitted (no HDI, no Education-group indicators,
// no CPI weights). No province field is null: all 38 poverty and
// unemployment figures were verified to a named BPS table.
// Two 2024 inflation concepts are kept apart on purpose: the KPI uses
// the BPS December year-on-year rate (1.57%); INFLATION_SERIES uses
// the World Bank annual-average series and is labelled as such.
// Unemployment uses BPS Sakernas (August), not the ILO modelled rate.
// Trade uses the BPS merchandise figures; the 2025 trade figures are
// from UN WITS. "Other (residual)" / "All other (residual)" shares are
// computed as 100 minus the named shares and labelled as such.
// This file contains no network references of any kind.
//
// ROUND 4 changes (28 Nov 2026): the headline KPIs were refreshed to
// the newest verified releases — population 2025 (World Bank WDI,
// 285,721,236), GDP 2025 and GDP per capita 2025 (BPS Official
// Statistics News No. 18/02/Th. XXIX, 5 Feb 2026: GDP Rp 23,821.1tn,
// growth 5.11%, GDP per capita Rp 83.7m / US$5,083.4), unemployment
// Aug 2026 (BPS Sakernas release, 5 Nov 2026: 4.75%, vs 4.85% Aug 2025),
// poverty Mar 2026 (BPS Official Statistics News No. 80/08/Th. XXIX,
// 5 Aug 2026: 8.07%, vs 8.25% Sep 2025 and 8.47% Mar 2025). The
// inflation KPI stays on the BPS December year-on-year concept (1.57%,
// Dec 2024): the October 2026 yoy figure (3.23%) is a different month
// and is already carried in the releases list.
// New in round 4: GDP_LEVEL_SERIES, GDP_PER_CAPITA_SERIES and
// POVERTY_SERIES — short series built ONLY from figures already
// verified in this file or in the two BPS releases above (the Mar 2025
// and Sep 2025 poverty points are the arithmetic implied by the Aug
// 2026 BPS release: 8.07% down 0.40pp from Mar 2025 and 0.18pp from
// Sep 2025). KPI_SPARKLINES maps each KPI card to its series.
// The data explorer holds 66 indicators (the "78" figure in the
// 28 Nov leader analysis was a miscount — this file has always listed
// 66 rows across 5 groups, verified by counting INDICATORS).

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

export const NATIONAL_POP = 285.721; // millions, 2025, World Bank (285,721,236)

export const KPI = [
  {
    label: "Population",
    value: "285.721m",
    change: "+0.79% yoy",
    changeNote: "vs 283.488m in 2024",
    source: "World Bank",
    year: 2025,
  },
  {
    label: "GDP",
    value: "Rp 23,821tn",
    change: "+5.11% yoy",
    changeNote: "Real growth 2025, vs 5.03% in 2024",
    source: "BPS",
    year: 2025,
  },
  {
    label: "GDP per capita",
    value: "US$5,083",
    change: "",
    changeNote: "BPS figure Rp 83.7m",
    source: "BPS",
    year: 2025,
  },
  {
    label: "Inflation",
    value: "1.57% Dec yoy",
    change: "-1.5pp",
    changeNote: "Annual avg 3.7% → 2.2%",
    source: "BPS",
    year: 2024,
  },
  {
    label: "Unemployment",
    value: "4.75% Aug",
    change: "-0.10pp",
    changeNote: "vs 4.85% in Aug 2025",
    source: "BPS",
    year: 2026,
  },
  {
    label: "Poverty",
    value: "8.07% Mar",
    change: "-0.18pp",
    changeNote: "vs 8.25% in Sep 2025",
    source: "BPS",
    year: 2026,
  },
];

export const GDP_GROWTH = {
  years: YEARS,
  values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.69, 5.31, 5.05, 5.03, 5.11],
}; // BPS; 2025 = 5.11%

export const INFLATION_SERIES = {
  years: YEARS,
  values: [6.4, 3.5, 3.8, 3.2, 3.0, 1.9, 1.6, 4.2, 3.7, 2.2, 1.9],
}; // World Bank annual-average CPI inflation, %

export const UNEMPLOYMENT_SERIES = {
  years: YEARS,
  values: [6.18, 5.61, 5.5, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91, 4.85],
}; // BPS Sakernas, August, %

export const POPULATION_SERIES = {
  years: YEARS,
  values: [261.8, 264.6, 267.3, 270.0, 272.5, 274.8, 276.8, 278.8, 281.2, 283.5, 285.7],
}; // World Bank, millions

export const TRADE_SERIES = {
  years: YEARS,
  exports: [150.4, 144.5, 168.8, 180.2, 167.7, 163.2, 231.5, 292.0, 258.8, 264.7, 281.7],
  imports: [142.7, 135.7, 157.0, 188.7, 171.3, 141.6, 196.2, 237.4, 221.9, 233.7, 241.8],
}; // US$bn, UN Comtrade / WDI merchandise; 2025 from UN WITS

export const SECTORS = [
  { name: "Manufacturing", share: 18.98 },
  { name: "Trade", share: 13.07 },
  { name: "Agriculture", share: 12.61 },
  { name: "Construction", share: 10.09 },
  { name: "Mining", share: 9.15 },
  { name: "Transport & storage", share: 6.13 },
  { name: "Other (residual)", share: 29.97 },
]; // BPS, share of GDP 2024, %; residual = 100 minus named shares

// Short series for the KPI sparklines, from verified figures only.
// GDP level: BPS, GDP at current prices — Rp 22,139tn in 2024 and
// Rp 23,821.1tn in 2025 (BPS release No. 18/02/Th. XXIX, 5 Feb 2026).
export const GDP_LEVEL_SERIES = {
  years: [2024, 2025],
  values: [22139, 23821.1],
};

// GDP per capita: World Bank US$4,925 in 2024; BPS US$5,083.4 in 2025
// (same BPS release as above; BPS figure Rp 83.7m).
export const GDP_PER_CAPITA_SERIES = {
  years: [2024, 2025],
  values: [4925, 5083.4],
};

// Poverty rate, half-yearly: Mar 2024 9.03% and Sep 2024 8.57% (BPS);
// Mar 2025 8.47% and Sep 2025 8.25% (implied by BPS release
// No. 80/08/Th. XXIX, 5 Aug 2026: 8.07% is down 0.40pp from Mar 2025
// and 0.18pp from Sep 2025); Mar 2026 8.07% (same release).
export const POVERTY_SERIES = {
  labels: ["Mar 2024", "Sep 2024", "Mar 2025", "Sep 2025", "Mar 2026"],
  values: [9.03, 8.57, 8.47, 8.25, 8.07],
};

// One sparkline series per KPI card, keyed by KPI label.
// The inflation sparkline is the World Bank annual-average series —
// the card's headline value stays the BPS December year-on-year rate,
// and the sparkline's own title says which series it draws.
export const KPI_SPARKLINES = {
  "Population": { labels: YEARS, values: POPULATION_SERIES.values, unit: "m", title: "Population, 2015–2025 (millions, World Bank)" },
  "GDP": { labels: GDP_LEVEL_SERIES.years, values: GDP_LEVEL_SERIES.values, unit: "Rp tn", title: "GDP at current prices, 2024–2025 (Rp trillion, BPS)" },
  "GDP per capita": { labels: GDP_PER_CAPITA_SERIES.years, values: GDP_PER_CAPITA_SERIES.values, unit: "US$", title: "GDP per capita, 2024–2025 (US$, BPS / World Bank)" },
  "Inflation": { labels: YEARS, values: INFLATION_SERIES.values, unit: "%", title: "Annual-average inflation, 2015–2025 (%, World Bank)" },
  "Unemployment": { labels: YEARS, values: UNEMPLOYMENT_SERIES.values, unit: "%", title: "Unemployment rate, August, 2015–2025 (%, BPS Sakernas)" },
  "Poverty": { labels: POVERTY_SERIES.labels, values: POVERTY_SERIES.values, unit: "%", title: "Poverty rate, Mar 2024–Mar 2026 (%, BPS)" },
};

// All 38 provinces, sorted by population descending.
// Population: BPS, mid-2024 (June), Hasil Proyeksi Penduduk Interim
// 2020-2023 — Tabel 2, "Jumlah dan Persentase Penduduk Menurut Provinsi
// di Indonesia (000) Jiwa 2024", in BPS Provinsi Jawa Barat,
// "Indikator Strategis Provinsi Jawa Barat di Peringkat Nasional 2024".
// The 38 pops sum to 281.604m, the BPS projection total; share is
// pop / 283.488 (World Bank national total, as in round 2), so the
// shares sum to 99.35%, not 100 — the 0.65pp gap is the difference
// between the two national totals, not a data error.
export const PROVINCES = [
  { name: "West Java", pop: 50.3452, share: 17.76 },
  { name: "East Java", pop: 41.8145, share: 14.75 },
  { name: "Central Java", pop: 37.8923, share: 13.37 },
  { name: "North Sumatra", pop: 15.5885, share: 5.5 },
  { name: "Banten", pop: 12.4314, share: 4.39 },
  { name: "Jakarta", pop: 10.6849, share: 3.77 },
  { name: "South Sulawesi", pop: 9.4634, share: 3.34 },
  { name: "Lampung", pop: 9.4196, share: 3.32 },
  { name: "South Sumatra", pop: 8.8373, share: 3.12 },
  { name: "Riau", pop: 6.7281, share: 2.37 },
  { name: "West Sumatra", pop: 5.8362, share: 2.06 },
  { name: "West Kalimantan", pop: 5.6955, share: 2.01 },
  { name: "East Nusa Tenggara", pop: 5.656, share: 2.0 },
  { name: "West Nusa Tenggara", pop: 5.646, share: 1.99 },
  { name: "Aceh", pop: 5.5548, share: 1.96 },
  { name: "Bali", pop: 4.4333, share: 1.56 },
  { name: "South Kalimantan", pop: 4.2734, share: 1.51 },
  { name: "East Kalimantan", pop: 4.0459, share: 1.43 },
  { name: "Yogyakarta", pop: 3.7595, share: 1.33 },
  { name: "Jambi", pop: 3.7243, share: 1.31 },
  { name: "Central Sulawesi", pop: 3.1218, share: 1.1 },
  { name: "Central Kalimantan", pop: 2.8097, share: 0.99 },
  { name: "Southeast Sulawesi", pop: 2.7931, share: 0.99 },
  { name: "North Sulawesi", pop: 2.7018, share: 0.95 },
  { name: "Riau Islands", pop: 2.1833, share: 0.77 },
  { name: "Bengkulu", pop: 2.1122, share: 0.75 },
  { name: "Maluku", pop: 1.9456, share: 0.69 },
  { name: "Bangka Belitung Islands", pop: 1.5315, share: 0.54 },
  { name: "West Sulawesi", pop: 1.5032, share: 0.53 },
  { name: "Central Papua", pop: 1.4729, share: 0.52 },
  { name: "Highland Papua", pop: 1.467, share: 0.52 },
  { name: "North Maluku", pop: 1.3556, share: 0.48 },
  { name: "Gorontalo", pop: 1.2278, share: 0.43 },
  { name: "Papua", pop: 1.0606, share: 0.37 },
  { name: "North Kalimantan", pop: 0.7398, share: 0.26 },
  { name: "Southwest Papua", pop: 0.6271, share: 0.22 },
  { name: "West Papua", pop: 0.5787, share: 0.2 },
  { name: "South Papua", pop: 0.5421, share: 0.19 },
]; // All 38 provinces, mid-2024, BPS; pop in millions, share of national population %

// Per-province detail for the map route, in geographic order
// (west to east, as in the interface contract).
// pop: millions, BPS mid-2024 (same table as PROVINCES above).
// poverty: % — BPS, "Profil Kemiskinan Provinsi Papua Maret 2024"
// (BRS No. 130/07/94/Th. XXVII, 1 Jul 2024), Tabel 7, "Persentase
// Penduduk Miskin Menurut Provinsi, Maret 2024" (national 9.03%).
// unemployment: % — BPS, "Tingkat Pengangguran Terbuka Menurut
// Provinsi (Persen)", Sakernas Agustus 2024 (national 4.91%,
// BRS No. 83/11/Th. XXVII, 5 Nov 2024).
// Rates are kept at the two decimals BPS publishes, so ranks and
// legend breaks use the published precision.
export const PROVINCE_DETAIL = [
  { name: "Aceh", pop: 5.5548, poverty: 14.23, unemployment: 5.75 },
  { name: "North Sumatra", pop: 15.5885, poverty: 7.99, unemployment: 5.6 },
  { name: "West Sumatra", pop: 5.8362, poverty: 5.97, unemployment: 5.75 },
  { name: "Riau", pop: 6.7281, poverty: 6.67, unemployment: 3.7 },
  { name: "Jambi", pop: 3.7243, poverty: 7.1, unemployment: 4.48 },
  { name: "South Sumatra", pop: 8.8373, poverty: 10.97, unemployment: 3.86 },
  { name: "Bengkulu", pop: 2.1122, poverty: 13.56, unemployment: 3.11 },
  { name: "Lampung", pop: 9.4196, poverty: 10.69, unemployment: 4.19 },
  { name: "Bangka Belitung Islands", pop: 1.5315, poverty: 4.55, unemployment: 4.63 },
  { name: "Riau Islands", pop: 2.1833, poverty: 5.37, unemployment: 6.39 },
  { name: "Jakarta", pop: 10.6849, poverty: 4.3, unemployment: 6.21 },
  { name: "West Java", pop: 50.3452, poverty: 7.46, unemployment: 6.75 },
  { name: "Central Java", pop: 37.8923, poverty: 10.47, unemployment: 4.78 },
  { name: "Yogyakarta", pop: 3.7595, poverty: 10.83, unemployment: 3.48 },
  { name: "East Java", pop: 41.8145, poverty: 9.79, unemployment: 4.19 },
  { name: "Banten", pop: 12.4314, poverty: 5.84, unemployment: 6.68 },
  { name: "Bali", pop: 4.4333, poverty: 4.0, unemployment: 1.79 },
  { name: "West Nusa Tenggara", pop: 5.646, poverty: 12.91, unemployment: 2.73 },
  { name: "East Nusa Tenggara", pop: 5.656, poverty: 19.48, unemployment: 3.02 },
  { name: "West Kalimantan", pop: 5.6955, poverty: 6.32, unemployment: 4.86 },
  { name: "Central Kalimantan", pop: 2.8097, poverty: 5.17, unemployment: 4.01 },
  { name: "South Kalimantan", pop: 4.2734, poverty: 4.11, unemployment: 4.2 },
  { name: "East Kalimantan", pop: 4.0459, poverty: 5.78, unemployment: 5.14 },
  { name: "North Kalimantan", pop: 0.7398, poverty: 6.32, unemployment: 3.9 },
  { name: "North Sulawesi", pop: 2.7018, poverty: 7.25, unemployment: 5.85 },
  { name: "Central Sulawesi", pop: 3.1218, poverty: 11.77, unemployment: 2.94 },
  { name: "South Sulawesi", pop: 9.4634, poverty: 8.06, unemployment: 4.19 },
  { name: "Southeast Sulawesi", pop: 2.7931, poverty: 11.21, unemployment: 3.09 },
  { name: "Gorontalo", pop: 1.2278, poverty: 14.57, unemployment: 3.13 },
  { name: "West Sulawesi", pop: 1.5032, poverty: 11.21, unemployment: 2.68 },
  { name: "Maluku", pop: 1.9456, poverty: 16.05, unemployment: 6.11 },
  { name: "North Maluku", pop: 1.3556, poverty: 6.32, unemployment: 4.03 },
  { name: "West Papua", pop: 0.5787, poverty: 21.66, unemployment: 4.13 },
  { name: "Southwest Papua", pop: 0.6271, poverty: 18.13, unemployment: 6.48 },
  { name: "Papua", pop: 1.0606, poverty: 17.26, unemployment: 6.48 },
  { name: "South Papua", pop: 0.5421, poverty: 17.44, unemployment: 4.05 },
  { name: "Central Papua", pop: 1.4729, poverty: 29.76, unemployment: 2.75 },
  { name: "Highland Papua", pop: 1.467, poverty: 32.97, unemployment: 1.32 },
];

export const AGE_STRUCTURE = [
  { label: "0–14 years", pct: 24.6 },
  { label: "15–64 years", pct: 68.1 },
  { label: "65+ years", pct: 7.3 },
]; // World Bank, 2024, %

export const EMPLOYMENT = [
  { sector: "Agriculture", pct: 28.2, workers: 41.73 },
  { sector: "Trade", pct: 17.86, workers: 26.42 },
  { sector: "Manufacturing", pct: 13.75, workers: 20.34 },
  { sector: "Accommodation & food", pct: 8.11, workers: 12.0 },
  { sector: "Construction", pct: 6.66, workers: 9.86 },
  { sector: "All other (residual)", pct: 25.42, workers: null },
]; // BPS Sakernas, Aug 2026; pct of workers, workers in millions.
   // Residual worker count is null: no total employed figure for Aug 2026
   // was verified, so the residual headcount is not derived.

export const CPI_GROUPS = [
  { group: "Food, beverages & tobacco", rate: 1.9, contrib: 0.55 },
  { group: "Personal care", rate: 7.02, contrib: 0.43 },
  { group: "Restaurants", rate: 2.48, contrib: 0.25 },
  { group: "Education", rate: 1.94, contrib: 0.11 },
  { group: "Housing", rate: 0.59, contrib: 0.09 },
  { group: "Clothing", rate: 1.16, contrib: 0.06 },
  { group: "Furnishings", rate: 1.04, contrib: 0.06 },
  { group: "Health", rate: 1.93, contrib: 0.06 },
  { group: "Recreation", rate: 1.17, contrib: 0.02 },
  { group: "Information / communication / finance", rate: -0.27, contrib: -0.02 },
  { group: "Transport", rate: -0.3, contrib: -0.04 },
]; // BPS, Dec 2024 yoy, CPI 2022=100; rate %, contrib in percentage points

export const FOOD_PRICES = [
  { item: "Rice (medium)", price: 16600, unit: "/kg" },
  { item: "Rice (super)", price: 17850, unit: "/kg" },
  { item: "Eggs", price: 29800, unit: "/kg" },
  { item: "Chicken meat", price: 42600, unit: "/kg" },
  { item: "Cooking oil (bulk)", price: 20450, unit: "/litre" },
  { item: "Cooking oil (packaged)", price: 24350, unit: "/litre" },
  { item: "Large red chilli", price: 54900, unit: "/kg" },
  { item: "Shallots", price: 37950, unit: "/kg" },
  { item: "Garlic", price: 39350, unit: "/kg" },
]; // Bank Indonesia PIHPS national average, Sep 2026; prices in rupiah

export const GOVERNMENT = {
  revenue: "Rp 2,842.5tn",
  spending: "Rp 3,350.3tn",
  deficit: "Rp 507.8tn",
  deficitPct: "2.29% of GDP",
  primaryDeficit: "Rp 19.4tn",
  revenueChange: "+2.1% yoy",
  spendingChange: "+7.3% yoy",
  year: 2024,
  source: "Ministry of Finance, APBN realisation",
};

export const RELEASES = [
  {
    date: "2026-11-05",
    title: "GDP Q3 2026 grows 5.47% yoy",
    detail: "Jan–Sep 2026 growth 5.45% (BPS)",
  },
  {
    date: "2026-11-05",
    title: "Unemployment falls to 4.75% (Aug 2026)",
    detail: "BPS Sakernas, August 2026",
  },
  {
    date: "2026-11-05",
    title: "Agriculture employs 41.73 million workers",
    detail: "28.20% of all workers, Aug 2026 (BPS Sakernas)",
  },
  {
    date: "2026-11-02",
    title: "October 2026 inflation 3.23% yoy",
    detail: "BPS CPI release",
  },
  {
    date: "2026-08-05",
    title: "Poverty falls to 8.07% (Mar 2026)",
    detail: "22.93 million people; poverty line Rp 669,235/person/month (BPS)",
  },
  {
    date: "2026-02-05",
    title: "GDP 2025 grows 5.11% to Rp 23,821.1tn",
    detail: "BPS full-year release",
  },
  {
    date: "2025-11-05",
    title: "Unemployment 4.85% (Aug 2025)",
    detail: "7.46 million unemployed (BPS Sakernas)",
  },
  {
    date: "2025-07-25",
    title: "Gini coefficient 0.375 (Mar 2025)",
    detail: "BPS",
  },
];

// 66 rows across 5 groups: Economy 22, People 20, Prices 10, Trade 8, Health 6.
// No Education rows and no HDI row: neither met the verification bar (see methodology.md).
export const INDICATORS = [
  // Economy (22)
  { group: "Economy", name: "GDP (nominal)", value: "Rp 22,139 trillion", year: 2024, source: "BPS" },
  { group: "Economy", name: "GDP (US$)", value: "US$1,396.3bn", year: 2024, source: "World Bank" },
  { group: "Economy", name: "GDP per capita", value: "US$4,925", year: 2024, source: "World Bank" },
  { group: "Economy", name: "GDP per capita (BPS)", value: "Rp 78.62m", year: 2024, source: "BPS" },
  { group: "Economy", name: "GDP growth", value: "5.03%", year: 2024, source: "BPS" },
  { group: "Economy", name: "GDP (nominal, 2025)", value: "Rp 23,821.1 trillion", year: 2025, source: "BPS" },
  { group: "Economy", name: "GDP growth (2025)", value: "5.11%", year: 2025, source: "BPS" },
  { group: "Economy", name: "GDP growth (Q3 2026)", value: "5.47% yoy", year: 2026, source: "BPS" },
  { group: "Economy", name: "GDP (PPP)", value: "US$4,676.8bn", year: 2024, source: "IMF" },
  { group: "Economy", name: "GDP per capita (PPP)", value: "US$16,448", year: 2024, source: "IMF" },
  { group: "Economy", name: "GNI per capita", value: "US$4,910", year: 2024, source: "World Bank" },
  { group: "Economy", name: "Household consumption", value: "55.4% of GDP", year: 2024, source: "CIA World Factbook" },
  { group: "Economy", name: "Fixed investment", value: "29.1% of GDP", year: 2024, source: "CIA World Factbook" },
  { group: "Economy", name: "Services share of GDP", value: "43.8%", year: 2024, source: "World Bank" },
  { group: "Economy", name: "Industry share of GDP", value: "39.3%", year: 2024, source: "World Bank" },
  { group: "Economy", name: "Manufacturing share of GDP", value: "18.98%", year: 2024, source: "BPS" },
  { group: "Economy", name: "Trade share of GDP", value: "13.07%", year: 2024, source: "BPS" },
  { group: "Economy", name: "Agriculture share of GDP", value: "12.61%", year: 2024, source: "BPS" },
  { group: "Economy", name: "Construction share of GDP", value: "10.09%", year: 2024, source: "BPS" },
  { group: "Economy", name: "Mining share of GDP", value: "9.15%", year: 2024, source: "BPS" },
  { group: "Economy", name: "Government revenue", value: "Rp 2,842.5tn", year: 2024, source: "Ministry of Finance" },
  { group: "Economy", name: "Government spending", value: "Rp 3,350.3tn", year: 2024, source: "Ministry of Finance" },
  // People (20)
  { group: "People", name: "Population", value: "283.488m", year: 2024, source: "World Bank" },
  { group: "People", name: "Population growth", value: "0.82%", year: 2024, source: "World Bank" },
  { group: "People", name: "Median age", value: "30.1 years", year: 2024, source: "UN WPP" },
  { group: "People", name: "Urban population", value: "58.8%", year: 2024, source: "World Bank" },
  { group: "People", name: "Fertility rate", value: "2.12", year: 2024, source: "World Bank" },
  { group: "People", name: "Population aged 0–14", value: "24.6%", year: 2024, source: "World Bank" },
  { group: "People", name: "Population aged 15–64", value: "68.1%", year: 2024, source: "World Bank" },
  { group: "People", name: "Population aged 65+", value: "7.3%", year: 2024, source: "World Bank" },
  { group: "People", name: "Labour force participation rate", value: "~71%", year: 2024, source: "BPS" },
  { group: "People", name: "Female labour force participation rate", value: "56.4%", year: 2024, source: "BPS" },
  { group: "People", name: "Employed persons", value: "145 million", year: 2024, source: "BPS" },
  { group: "People", name: "Informal employment", value: "58%", year: 2024, source: "BPS" },
  { group: "People", name: "Unemployment rate (Aug)", value: "4.91%", year: 2024, source: "BPS" },
  { group: "People", name: "Unemployment rate (Aug 2025)", value: "4.85%", year: 2025, source: "BPS" },
  { group: "People", name: "Unemployment rate (Aug 2026)", value: "4.75%", year: 2026, source: "BPS" },
  { group: "People", name: "Youth unemployment (Aug 2025)", value: "16.89%", year: 2025, source: "BPS" },
  { group: "People", name: "Average wage (Aug 2025)", value: "Rp 3.33m/month", year: 2025, source: "BPS" },
  { group: "People", name: "Poverty rate (Sep)", value: "8.57%", year: 2024, source: "BPS" },
  { group: "People", name: "Poverty rate (Mar 2026)", value: "8.07%", year: 2026, source: "BPS" },
  { group: "People", name: "Gini coefficient (Mar 2025)", value: "0.375", year: 2025, source: "BPS" },
  // Prices (10)
  { group: "Prices", name: "Inflation (Dec yoy)", value: "1.57%", year: 2024, source: "BPS" },
  { group: "Prices", name: "Inflation (annual average)", value: "2.18%", year: 2024, source: "World Bank" },
  { group: "Prices", name: "Inflation (annual average, 2025)", value: "1.91%", year: 2025, source: "World Bank" },
  { group: "Prices", name: "Inflation (Oct 2026 yoy)", value: "3.23%", year: 2026, source: "BPS" },
  { group: "Prices", name: "CPI (Dec 2024, 2022=100)", value: "106.80", year: 2024, source: "BPS" },
  { group: "Prices", name: "Core inflation (Dec yoy)", value: "2.26%", year: 2024, source: "BPS" },
  { group: "Prices", name: "BI rate", value: "6.00%", year: 2026, source: "Bank Indonesia" },
  { group: "Prices", name: "Exchange rate (average)", value: "Rp 15,859 per US$", year: 2024, source: "Bank Indonesia" },
  { group: "Prices", name: "Exchange rate (year-end)", value: "Rp 16,267 per US$", year: 2024, source: "Bank Indonesia" },
  { group: "Prices", name: "Rice (medium, PIHPS Sep 2026)", value: "Rp 16,600/kg", year: 2026, source: "Bank Indonesia" },
  // Trade (8)
  { group: "Trade", name: "Exports (goods)", value: "US$264.71bn", year: 2024, source: "BPS" },
  { group: "Trade", name: "Imports (goods)", value: "US$233.67bn", year: 2024, source: "BPS" },
  { group: "Trade", name: "Trade surplus", value: "US$31.04bn", year: 2024, source: "BPS" },
  { group: "Trade", name: "Exports (goods, 2025)", value: "US$281.7bn", year: 2025, source: "UN WITS" },
  { group: "Trade", name: "Imports (goods, 2025)", value: "US$241.8bn", year: 2025, source: "UN WITS" },
  { group: "Trade", name: "FDI inflows", value: "US$24.2bn", year: 2024, source: "UNCTAD" },
  { group: "Trade", name: "FDI stock", value: "US$305.7bn", year: 2024, source: "UNCTAD" },
  { group: "Trade", name: "Current account balance", value: "−US$8.47bn", year: 2024, source: "CIA World Factbook" },
  // Health (6)
  { group: "Health", name: "Life expectancy", value: "71.3 years", year: 2024, source: "World Bank" },
  { group: "Health", name: "Life expectancy (female)", value: "73.4 years", year: 2024, source: "World Bank" },
  { group: "Health", name: "Life expectancy (male)", value: "69.2 years", year: 2024, source: "World Bank" },
  { group: "Health", name: "Infant mortality", value: "15.2 per 1,000 live births", year: 2024, source: "World Bank" },
  { group: "Health", name: "Under-5 mortality", value: "17.7 per 1,000 live births", year: 2024, source: "World Bank" },
  { group: "Health", name: "Maternal mortality", value: "140 per 100,000 live births", year: 2023, source: "World Bank" },
];

export const HIGHLIGHTS = [
  {
    label: "GDP growth",
    from: "5.03% (2024)",
    to: "5.11% (2025)",
    delta: "+0.08pp",
    direction: "up",
    source: "BPS",
    note: "Full-year real GDP growth",
  },
  {
    label: "Inflation (yoy)",
    from: "1.57% (Dec 2024)",
    to: "3.23% (Oct 2026)",
    delta: "+1.66pp",
    direction: "up",
    source: "BPS",
    note: "December 2024 yoy vs October 2026 yoy",
  },
  {
    label: "Unemployment (Aug)",
    from: "4.91% (Aug 2024)",
    to: "4.75% (Aug 2026)",
    delta: "−0.16pp",
    direction: "down",
    source: "BPS Sakernas",
    note: "August Sakernas rate",
  },
  {
    label: "Poverty rate",
    from: "8.57% (Sep 2024)",
    to: "8.07% (Mar 2026)",
    delta: "−0.50pp",
    direction: "down",
    source: "BPS",
    note: "September 2024 vs March 2026",
  },
  {
    label: "Exports (goods)",
    from: "US$264.7bn (2024)",
    to: "US$281.7bn (2025)",
    delta: "+US$17.0bn",
    direction: "up",
    source: "BPS / UN WITS",
    note: "Merchandise exports",
  },
];

export const SOURCES = [
  { name: "BPS — Statistics Indonesia", note: "GDP, CPI, Sakernas labour, poverty, Gini, provinces, sector shares" },
  { name: "World Bank", note: "WDI population, GDP, life expectancy, mortality; annual-average inflation" },
  { name: "IMF", note: "World Economic Outlook — GDP (PPP) and GDP per capita (PPP)" },
  { name: "Ministry of Finance", note: "APBN 2024 realisation — revenue, spending, deficit" },
  { name: "Bank Indonesia", note: "PIHPS food prices, BI rate, exchange rate" },
  { name: "UNCTAD", note: "FDI inflows and stock, 2024" },
  { name: "UN World Population Prospects", note: "Median age, 2024" },
];
