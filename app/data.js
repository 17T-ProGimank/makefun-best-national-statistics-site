// NusaStat — Indonesia in Numbers (Round 2 data layer)
// ------------------------------------------------------
// Sources: BPS (Statistics Indonesia), World Bank (WDI / WITS),
// IMF (World Economic Outlook), Ministry of Finance, Bank Indonesia,
// UNCTAD, UN World Population Prospects, CIA World Factbook.
// Every figure verified 26 Nov 2026 against the verified-data notes
// (best-national-statistics-site-verified-data.md). Nothing here is
// estimated or invented: figures that could not be verified were
// omitted (no HDI, no Education-group indicators, no CPI weights).
// Two 2024 inflation concepts are kept apart on purpose: the KPI uses
// the BPS December year-on-year rate (1.57%); INFLATION_SERIES uses
// the World Bank annual-average series and is labelled as such.
// Unemployment uses BPS Sakernas (August), not the ILO modelled rate.
// Trade uses the BPS merchandise figures; the 2025 trade figures are
// from UN WITS. "Other (residual)" / "All other (residual)" shares are
// computed as 100 minus the named shares and labelled as such.
// This file contains no network references of any kind.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

export const NATIONAL_POP = 283.488; // millions, 2024, World Bank

export const KPI = [
  {
    label: "Population",
    value: "283.488m",
    change: "+0.82% yoy",
    changeNote: "vs 281.2m in 2023 (World Bank)",
    source: "World Bank",
    year: 2024,
  },
  {
    label: "GDP",
    value: "Rp 22,139tn / US$1,396.3bn",
    change: "+5.03% yoy",
    changeNote: "Real GDP growth, 2024",
    source: "BPS / World Bank",
    year: 2024,
  },
  {
    label: "GDP per capita",
    value: "US$4,925",
    change: "",
    changeNote: "World Bank; BPS figure Rp 78.62m",
    source: "World Bank",
    year: 2024,
  },
  {
    label: "Inflation",
    value: "1.57% Dec yoy",
    change: "-1.5pp",
    changeNote: "Annual-average inflation 3.7% in 2023 to 2.2% in 2024 (World Bank)",
    source: "BPS",
    year: 2024,
  },
  {
    label: "Unemployment",
    value: "4.91% Aug",
    change: "-0.41pp",
    changeNote: "vs 5.32% in Aug 2023 (BPS Sakernas)",
    source: "BPS",
    year: 2024,
  },
  {
    label: "Poverty",
    value: "8.57% Sep",
    change: "-0.46pp",
    changeNote: "vs 9.03% in Mar 2024",
    source: "BPS",
    year: 2024,
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

export const PROVINCES = [
  { name: "West Java", pop: 50.345, share: 17.76 },
  { name: "East Java", pop: 41.815, share: 14.75 },
  { name: "Central Java", pop: 37.892, share: 13.37 },
  { name: "North Sumatra", pop: 15.589, share: 5.5 },
  { name: "Banten", pop: 12.431, share: 4.39 },
  { name: "Jakarta", pop: 10.685, share: 3.77 },
  { name: "South Sulawesi", pop: 9.463, share: 3.34 },
  { name: "Lampung", pop: 9.42, share: 3.32 },
  { name: "South Sumatra", pop: 8.837, share: 3.12 },
  { name: "Riau", pop: 6.728, share: 2.37 },
]; // Top 10, mid-2024, BPS; pop in millions, share of national population %

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
