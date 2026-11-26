// NusaStat — verified data module
// Data verified 26 Nov 2026 against BPS (Statistics Indonesia), World Bank
// (World Development Indicators / WITS) and IMF (WEO). See
// ~/workspace/makefun/work/best-national-statistics-site-verified-data.md
// for sources and corrections. All numeric fields are plain numbers;
// display strings are separate. No figure here is invented: anything that
// could not be verified was omitted (see the verification notes file).

export const META = {
  title: "NusaStat: Indonesia in Numbers",
  verified: "2026-11-26",
  sources: ["BPS — Statistics Indonesia", "World Bank", "IMF", "Ministry of Finance", "Bank Indonesia"],
  note: "Inflation KPI is the December year-on-year rate (BPS); the annual-average CPI series is a separate World Bank series. Unemployment is the BPS Sakernas August open unemployment rate, not the ILO modelled estimate (3.3%)."
};

export const KPIS = [
  { id: "population", label: "Population", value: 283.488, display: "283.5 million", change: 0.82, changeLabel: "+0.8% vs 2023", unit: "million people", source: "World Bank", year: 2024 },
  { id: "gdp", label: "GDP", value: 22139, display: "Rp 22,139 trillion", change: 5.03, changeLabel: "+5.03% real growth", unit: "Rp trillion", source: "BPS", year: 2024 },
  { id: "gdp-per-capita", label: "GDP per capita", value: 4925.43, display: "US$ 4,925", change: 1.0, changeLabel: "+1.0% vs 2023 (US$ 4,876)", unit: "US$", source: "World Bank", year: 2024 },
  { id: "inflation", label: "Inflation (Dec, yoy)", value: 1.57, display: "1.57%", change: -1.04, changeLabel: "vs 2.61% in Dec 2023", unit: "%", source: "BPS", year: 2024 },
  { id: "unemployment", label: "Unemployment (Aug)", value: 4.91, display: "4.91%", change: -0.41, changeLabel: "vs 5.32% in Aug 2023", unit: "% of labour force", source: "BPS", year: 2024 },
  { id: "poverty", label: "Poverty rate (Sep)", value: 8.57, display: "8.57%", change: -0.46, changeLabel: "vs 9.03% in Mar 2024", unit: "% of population", source: "BPS", year: 2024 }
];

// Real GDP growth, % yoy (BPS, c-to-c)
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 }, { year: 2017, value: 5.07 },
  { year: 2018, value: 5.17 }, { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.69 }, { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 }, { year: 2025, value: 5.11 }
];

// CPI inflation, annual average % (World Bank FP.CPI.TOTL.ZG).
// NOT the December yoy rate (1.57% in 2024) — see META.note.
export const INFLATION_SERIES = [
  { year: 2015, value: 6.4 }, { year: 2016, value: 3.5 }, { year: 2017, value: 3.8 },
  { year: 2018, value: 3.2 }, { year: 2019, value: 3.0 }, { year: 2020, value: 1.9 },
  { year: 2021, value: 1.6 }, { year: 2022, value: 4.2 }, { year: 2023, value: 3.7 },
  { year: 2024, value: 2.2 }, { year: 2025, value: 1.9 }
];

// Open unemployment rate, % of labour force, August Sakernas (BPS)
export const UNEMPLOYMENT_SERIES = [
  { year: 2015, value: 6.18 }, { year: 2016, value: 5.61 }, { year: 2017, value: 5.5 },
  { year: 2018, value: 5.34 }, { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 }, { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 }, { year: 2025, value: 4.85 }
];

// Population, millions (World Bank SP.POP.TOTL)
export const POPULATION_SERIES = [
  { year: 2015, value: 261.8 }, { year: 2016, value: 264.6 }, { year: 2017, value: 267.3 },
  { year: 2018, value: 270.0 }, { year: 2019, value: 272.5 }, { year: 2020, value: 274.8 },
  { year: 2021, value: 276.8 }, { year: 2022, value: 278.8 }, { year: 2023, value: 281.2 },
  { year: 2024, value: 283.5 }, { year: 2025, value: 285.7 }
];

// GDP shares by industry, % of GDP (BPS release No. 17/02/Th. XXVIII, 5 Feb 2025)
export const SECTORS = [
  { name: "Manufacturing", share: 18.98, growth: 4.43 },
  { name: "Wholesale & retail trade", share: 13.07, growth: 4.86 },
  { name: "Agriculture, forestry & fishing", share: 12.61, growth: 0.67 },
  { name: "Construction", share: 10.09, growth: 5.06 },
  { name: "Mining & quarrying", share: 9.15, growth: 4.9 },
  { name: "All other industries", share: 36.1, growth: null }
];

// Merchandise trade, US$ billion (UN Comtrade / World Bank WDI; 2024-25 BPS/WITS)
export const TRADE_SERIES = [
  { year: 2015, exports: 150.4, imports: 142.7 }, { year: 2016, exports: 144.5, imports: 135.7 },
  { year: 2017, exports: 168.8, imports: 157.0 }, { year: 2018, exports: 180.2, imports: 188.7 },
  { year: 2019, exports: 167.7, imports: 171.3 }, { year: 2020, exports: 163.2, imports: 141.6 },
  { year: 2021, exports: 231.5, imports: 196.2 }, { year: 2022, exports: 292.0, imports: 237.4 },
  { year: 2023, exports: 258.8, imports: 221.9 }, { year: 2024, exports: 264.7, imports: 233.7 },
  { year: 2025, exports: 281.7, imports: 241.8 }
];

// Top 10 provinces by population, mid-2024 (BPS, via Wikipedia Provinces table)
export const PROVINCES = [
  { name: "West Java", population: 50.345, share: 17.76 },
  { name: "East Java", population: 41.815, share: 14.75 },
  { name: "Central Java", population: 37.892, share: 13.37 },
  { name: "North Sumatra", population: 15.589, share: 5.5 },
  { name: "Banten", population: 12.431, share: 4.39 },
  { name: "Jakarta", population: 10.685, share: 3.77 },
  { name: "South Sulawesi", population: 9.463, share: 3.34 },
  { name: "Lampung", population: 9.42, share: 3.32 },
  { name: "South Sumatra", population: 8.837, share: 3.12 },
  { name: "Riau", population: 6.728, share: 2.37 }
];

// Age structure, % of population (World Bank, 2024; 15-64 is the residual)
export const AGE_STRUCTURE = [
  { group: "0–14 years", share: 24.6 },
  { group: "15–64 years", share: 68.1 },
  { group: "65+ years", share: 7.3 }
];

// Employment by sector, % of employed (BPS Sakernas Aug 2026; "Other" is the residual)
export const EMPLOYMENT_SECTORS = [
  { name: "Agriculture, forestry & fishing", share: 28.2 },
  { name: "Wholesale & retail trade", share: 17.86 },
  { name: "Manufacturing", share: 13.75 },
  { name: "Accommodation & food services", share: 8.11 },
  { name: "Construction", share: 6.66 },
  { name: "All other sectors", share: 25.42 }
];

// CPI by expenditure group, Dec 2024 yoy % and contribution in pp (BPS CPI release
// No. 01/01/Th. XXVIII, 2 Jan 2025; CPI 2022=100). Basket weights were not
// published in the release, so rate + contribution are shown instead.
export const CPI_GROUPS = [
  { group: "Food, beverages & tobacco", rate: 1.9, contribution: 0.55 },
  { group: "Personal care & other services", rate: 7.02, contribution: 0.43 },
  { group: "Restaurants & food services", rate: 2.48, contribution: 0.25 },
  { group: "Education", rate: 1.94, contribution: 0.11 },
  { group: "Housing, water, electricity & fuel", rate: 0.59, contribution: 0.09 },
  { group: "Clothing & footwear", rate: 1.16, contribution: 0.06 },
  { group: "Furnishings & household maintenance", rate: 1.04, contribution: 0.06 },
  { group: "Health", rate: 1.93, contribution: 0.06 },
  { group: "Recreation, sport & culture", rate: 1.17, contribution: 0.02 },
  { group: "Information, communication & finance", rate: -0.27, contribution: -0.02 },
  { group: "Transport", rate: -0.3, contribution: -0.04 }
];

export const CPI_COMPONENTS = [
  { component: "Core inflation", rate: 2.26, contribution: 1.44 },
  { component: "Administered prices", rate: 0.56, contribution: 0.11 },
  { component: "Volatile food", rate: 0.12, contribution: 0.02 }
];

// National average retail prices (Bank Indonesia PIHPS, Sep 2026)
export const FOOD_PRICES = [
  { item: "Rice (medium)", price: 16600, unit: "Rp/kg" },
  { item: "Rice (super quality)", price: 17850, unit: "Rp/kg" },
  { item: "Chicken eggs", price: 29800, unit: "Rp/kg" },
  { item: "Chicken meat", price: 42600, unit: "Rp/kg" },
  { item: "Cooking oil (bulk)", price: 20450, unit: "Rp/litre" },
  { item: "Cooking oil (packaged)", price: 24350, unit: "Rp/litre" },
  { item: "Red chilli (large)", price: 54900, unit: "Rp/kg" },
  { item: "Shallots", price: 37950, unit: "Rp/kg" },
  { item: "Garlic", price: 39350, unit: "Rp/kg" }
];

// State budget (APBN) realisation, Rp trillion (Ministry of Finance, 2024)
export const GOVERNMENT = {
  revenue: 2842.5, spending: 3350.3, deficit: 507.8, deficitPct: 2.29,
  year: 2024, source: "Ministry of Finance"
};

// Rupiah per US dollar, 12-month average (Bank Indonesia)
export const EXCHANGE_RATE = {
  value: 15859, display: "Rp 15,859 per US$", year: 2024,
  note: "Year-end Rp 16,267; 2024 range Rp 15,125–16,490",
  source: "Bank Indonesia"
};

// Verified BPS releases, newest first
export const LATEST_RELEASES = [
  { date: "2026-11-05", title: "Economy grew 5.47% yoy in Q3 2026; Jan–Sep growth 5.45%", source: "BPS" },
  { date: "2026-11-05", title: "Open unemployment fell to 4.75% in August 2026, from 4.85% a year earlier", source: "BPS" },
  { date: "2026-11-05", title: "Agriculture employed 41.73 million people (28.2% of workers) in August 2026", source: "BPS" },
  { date: "2026-11-02", title: "October 2026 inflation 3.23% yoy, near the top of the 1.5–3.5% target range", source: "BPS" },
  { date: "2026-08-05", title: "Poverty fell to 8.07% in March 2026 — 22.93 million people", source: "BPS" },
  { date: "2026-02-05", title: "Full-year 2025 GDP growth 5.11%; GDP reached Rp 23,821.1 trillion", source: "BPS" },
  { date: "2025-11-05", title: "Open unemployment 4.85% in August 2025; 7.46 million people unemployed", source: "BPS" },
  { date: "2025-07-25", title: "Gini ratio 0.375 in March 2025, down from 0.379 in March 2024", source: "BPS" }
];

// Data explorer: every row verified, with source and year.
export const INDICATORS = [
  { name: "GDP (current prices)", group: "Economy", value: 22139, unit: "Rp trillion", year: 2024, source: "BPS" },
  { name: "GDP (current US$)", group: "Economy", value: 1396.3, unit: "US$ billion", year: 2024, source: "World Bank" },
  { name: "GDP per capita", group: "Economy", value: 4925.43, unit: "US$", year: 2024, source: "World Bank" },
  { name: "GDP per capita (rupiah)", group: "Economy", value: 78.62, unit: "Rp million", year: 2024, source: "BPS" },
  { name: "GDP growth (real)", group: "Economy", value: 5.03, unit: "%", year: 2024, source: "BPS" },
  { name: "GDP growth (real)", group: "Economy", value: 5.11, unit: "%", year: 2025, source: "BPS" },
  { name: "GDP growth Q3 (yoy)", group: "Economy", value: 5.47, unit: "%", year: 2026, source: "BPS" },
  { name: "GDP (PPP)", group: "Economy", value: 4676.8, unit: "US$ billion", year: 2024, source: "IMF" },
  { name: "GDP per capita (PPP)", group: "Economy", value: 16448, unit: "US$", year: 2024, source: "IMF" },
  { name: "GNI per capita", group: "Economy", value: 4910, unit: "US$", year: 2024, source: "World Bank" },
  { name: "FDI inflows", group: "Economy", value: 24.2, unit: "US$ billion", year: 2024, source: "UNCTAD" },
  { name: "FDI inward stock", group: "Economy", value: 305.7, unit: "US$ billion", year: 2024, source: "UNCTAD" },
  { name: "Government revenue", group: "Economy", value: 2842.5, unit: "Rp trillion", year: 2024, source: "Ministry of Finance" },
  { name: "Government spending", group: "Economy", value: 3350.3, unit: "Rp trillion", year: 2024, source: "Ministry of Finance" },
  { name: "Budget deficit", group: "Economy", value: 507.8, unit: "Rp trillion", year: 2024, source: "Ministry of Finance" },
  { name: "Budget deficit", group: "Economy", value: 2.29, unit: "% of GDP", year: 2024, source: "Ministry of Finance" },
  { name: "Exchange rate (average)", group: "Economy", value: 15859, unit: "Rp per US$", year: 2024, source: "Bank Indonesia" },
  { name: "Household consumption", group: "Economy", value: 55.4, unit: "% of GDP", year: 2024, source: "CIA World Factbook" },
  { name: "Gross fixed investment", group: "Economy", value: 29.1, unit: "% of GDP", year: 2024, source: "CIA World Factbook" },
  { name: "Exports of goods & services", group: "Economy", value: 22.2, unit: "% of GDP", year: 2024, source: "World Bank" },
  { name: "Manufacturing share of GDP", group: "Economy", value: 18.98, unit: "% of GDP", year: 2024, source: "BPS" },
  { name: "Agriculture share of GDP", group: "Economy", value: 12.61, unit: "% of GDP", year: 2024, source: "BPS" },
  { name: "Services share of GDP", group: "Economy", value: 43.8, unit: "% of GDP", year: 2024, source: "World Bank" },
  { name: "Industry share of GDP", group: "Economy", value: 39.3, unit: "% of GDP", year: 2024, source: "World Bank" },
  { name: "Population", group: "People", value: 283.488, unit: "million", year: 2024, source: "World Bank" },
  { name: "Population", group: "People", value: 285.721, unit: "million", year: 2025, source: "World Bank" },
  { name: "Population growth", group: "People", value: 0.82, unit: "%", year: 2024, source: "World Bank" },
  { name: "Median age", group: "People", value: 30.1, unit: "years", year: 2024, source: "UN World Population Prospects" },
  { name: "Population aged 0–14", group: "People", value: 24.6, unit: "%", year: 2024, source: "World Bank" },
  { name: "Population aged 65+", group: "People", value: 7.3, unit: "%", year: 2024, source: "World Bank" },
  { name: "Urban population", group: "People", value: 58.8, unit: "%", year: 2024, source: "World Bank" },
  { name: "Fertility rate", group: "People", value: 2.12, unit: "children per woman", year: 2024, source: "World Bank" },
  { name: "Population density", group: "People", value: 149, unit: "people per km²", year: 2024, source: "World Bank" },
  { name: "Labour force participation rate", group: "People", value: 71, unit: "%", year: 2024, source: "BPS / IZA" },
  { name: "Female labour force participation", group: "People", value: 56.4, unit: "%", year: 2024, source: "IZA World of Labour" },
  { name: "Employed persons", group: "People", value: 145, unit: "million", year: 2024, source: "BPS / IZA" },
  { name: "Informal employment", group: "People", value: 58, unit: "% of employed", year: 2024, source: "BPS / IZA" },
  { name: "Open unemployment rate (Aug)", group: "People", value: 4.91, unit: "%", year: 2024, source: "BPS" },
  { name: "Youth unemployment, ages 15–24 (Aug)", group: "People", value: 16.89, unit: "%", year: 2025, source: "BPS" },
  { name: "Poverty rate (Sep)", group: "People", value: 8.57, unit: "%", year: 2024, source: "BPS" },
  { name: "Poverty rate (Mar)", group: "People", value: 8.07, unit: "%", year: 2026, source: "BPS" },
  { name: "Gini ratio (Mar)", group: "People", value: 0.379, unit: "index 0–1", year: 2024, source: "BPS" },
  { name: "Gini ratio (Mar)", group: "People", value: 0.375, unit: "index 0–1", year: 2025, source: "BPS" },
  { name: "Average employee wage (Aug)", group: "People", value: 3.33, unit: "Rp million/month", year: 2025, source: "BPS" },
  { name: "Poverty line (Mar)", group: "People", value: 669235, unit: "Rp per person/month", year: 2026, source: "BPS" },
  { name: "Gender Inequality Index", group: "People", value: 0.421, unit: "index 0–1", year: 2024, source: "BPS" },
  { name: "CPI inflation (Dec, yoy)", group: "Prices", value: 1.57, unit: "%", year: 2024, source: "BPS" },
  { name: "CPI inflation (annual average)", group: "Prices", value: 2.18, unit: "%", year: 2024, source: "World Bank" },
  { name: "CPI index (Dec)", group: "Prices", value: 106.8, unit: "index 2022=100", year: 2024, source: "BPS" },
  { name: "CPI inflation (Oct, yoy)", group: "Prices", value: 3.23, unit: "%", year: 2026, source: "BPS" },
  { name: "Core inflation (Dec, yoy)", group: "Prices", value: 2.26, unit: "%", year: 2024, source: "BPS" },
  { name: "BI policy rate (Nov)", group: "Prices", value: 6.0, unit: "%", year: 2026, source: "Bank Indonesia" },
  { name: "Exports of goods", group: "Trade", value: 264.7, unit: "US$ billion", year: 2024, source: "BPS" },
  { name: "Imports of goods", group: "Trade", value: 233.7, unit: "US$ billion", year: 2024, source: "BPS" },
  { name: "Goods trade surplus", group: "Trade", value: 31.0, unit: "US$ billion", year: 2024, source: "BPS" },
  { name: "Exports of goods", group: "Trade", value: 281.7, unit: "US$ billion", year: 2025, source: "World Bank WITS" },
  { name: "Imports of goods", group: "Trade", value: 241.8, unit: "US$ billion", year: 2025, source: "World Bank WITS" },
  { name: "Current account balance", group: "Trade", value: -8.47, unit: "US$ billion", year: 2024, source: "CIA World Factbook" },
  { name: "Foreign tourist arrivals (Jan–Nov)", group: "Trade", value: 12.66, unit: "million", year: 2024, source: "BPS" },
  { name: "Life expectancy at birth", group: "Health", value: 71.3, unit: "years", year: 2024, source: "World Bank" },
  { name: "Life expectancy, female", group: "Health", value: 73.4, unit: "years", year: 2024, source: "World Bank" },
  { name: "Life expectancy, male", group: "Health", value: 69.2, unit: "years", year: 2024, source: "World Bank" },
  { name: "Infant mortality rate", group: "Health", value: 15.2, unit: "per 1,000 live births", year: 2024, source: "World Bank" },
  { name: "Under-5 mortality rate", group: "Health", value: 17.7, unit: "per 1,000", year: 2024, source: "World Bank" },
  { name: "Maternal mortality ratio", group: "Health", value: 140, unit: "per 100,000 live births", year: 2023, source: "World Bank" },
  { name: "Stunting prevalence (under 5)", group: "Health", value: 22, unit: "%", year: 2023, source: "World Bank" }
];
