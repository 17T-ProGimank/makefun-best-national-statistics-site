# NusaStat — Methodology

## Data sources

Every figure on the site comes from one of these authorities, and every
figure is labelled on the page with its source and year:

- **BPS — Statistics Indonesia** (releases, Sakernas, CPI, poverty, Gini,
  GDP by industry, provincial populations, latest releases)
- **World Bank** (WDI / WITS — population, GDP and GDP per capita in US$,
  annual-average CPI inflation, age structure, services/industry shares)
- **IMF** (WEO — GDP PPP)
- **Ministry of Finance** (APBN 2024 realisation: revenue, spending, deficit)
- **Bank Indonesia** (exchange rate, BI policy rate, PIHPS food prices)
- Also cited where the primary source is a compilation: UN Comtrade / WDI
  merchandise trade series, UN World Population Prospects (median age),
  UNCTAD (FDI), CIA World Factbook (household consumption, fixed
  investment, current account), IZA World of Labour (labour-force
  participation).

## Verification method

Every headline figure was checked via web search on 26 November 2026
against the primary source's own release before it was put in
`app/data.js`. Figures that could not be verified to that standard were
omitted, not guessed. The full verification log, including the series
tables and the items that were left out, is in the build notes
(`best-national-statistics-site-verified-data.md`).

## Corrections made during verification

1. **Life expectancy ~74 → 71.3 years.** The ~74 figure does not match the
   World Bank 2024 value (71.3; female 73.4, male 69.2). The site uses the
   World Bank figure and labels it.
2. **GDP per capita: two published US$ values.** World Bank: US$4,925.43.
   BPS: Rp 78.62m = US$4,960.33 at BPS's own implied exchange rate. The
   site uses the World Bank US$4,925 as the headline and lists the BPS
   rupiah figure as a separate indicator row.
3. **Sector shares (BPS, 2024):** manufacturing 18.98%, trade 13.07%,
   agriculture 12.61%, construction 10.09%, mining 9.15% (top five =
   63.90% of GDP). "All other industries" (36.10%) is the computed
   residual, labelled as such.
4. **Inflation — two different 2024 numbers, both correct.** BPS December
   yoy = 1.57%. World Bank annual-average CPI inflation = 2.18% (2024).
   The KPI card uses the BPS December rate; the inflation time series uses
   the World Bank annual-average series and is labelled as such.
5. **Unemployment — BPS, not ILO modelled.** BPS Sakernas (August) 4.91%
   (2024), 4.85% (2025). The World Bank/ILO modelled estimate is 3.30%
   (2024) — a different concept; it is not used in the series.
6. **Trade 2024 — source variance noted.** BPS/EIU: exports US$264.71bn,
   imports US$233.67bn. UN Comtrade as-reported: exports 266.3, imports
   235.2. The site uses the BPS figures; the trade series is the
   consistent WDI/Comtrade merchandise series.
7. **Jakarta population 10.685m** (mid-2024, BPS), not 11.1m — that is a
   2025 figure.

## Time series (2015–2025)

- **GDP growth, % (BPS):** 4.88, 5.03, 5.07, 5.17, 5.02, −2.07, 3.69,
  5.31, 5.05, 5.03, 5.11.
- **Inflation, annual average, % (World Bank):** 6.4, 3.5, 3.8, 3.2, 3.0,
  1.9, 1.6, 4.2, 3.7, 2.2, 1.9.
- **Unemployment, August Sakernas, % (BPS):** 6.18, 5.61, 5.50, 5.34,
  5.28, 7.07, 6.49, 5.86, 5.32, 4.91, 4.85.
- **Population, millions (World Bank):** 261.8, 264.6, 267.3, 270.0, 272.5,
  274.8, 276.8, 278.8, 281.2, 283.5, 285.7.
- **Trade, US$bn (UN Comtrade/WDI merchandise; 2025 WITS):** exports
  150.4, 144.5, 168.8, 180.2, 167.7, 163.2, 231.5, 292.0, 258.8, 264.7,
  281.7; imports 142.7, 135.7, 157.0, 188.7, 171.3, 141.6, 196.2, 237.4,
  221.9, 233.7, 241.8.

## Chart methods

All charts are hand-rolled SVG built in `app/charts.js` — no chart library,
no external assets. Line charts plot the series with labelled axes and
value labels; horizontal bar charts show shares of GDP; the age-structure
donut shows 0–14 / 15–64 / 65+ shares. Every chart carries a caption
naming the source, the year range and the definition used, so a figure
cannot be read without its context.

## What was left out

- **2024 average food prices from BPS** — the publication exists but its
  Table 1 values were not extractable via web search, so the food-price
  table uses Bank Indonesia PIHPS national averages (Sep 2026), clearly
  dated, not 2024 averages.
- **CPI basket weights** — the BPS December 2024 release publishes yoy
  rates and contributions per group, not weights; the table carries rate
  plus contribution, not weight.
- **HDI** — conflicting vintages (0.713 for 2022 vs 0.728 for 2023) could
  not be pinned to a single verified UNDP release; omitted. No
  Education-group indicator met the same bar, so the explorer has 5
  groups, not 6.
- **"All other sectors" employment (25.42%)** is a computed residual
  (100 − named shares), labelled as such.

## Build notes

- Static site under `app/` (index.html, main.js, data.js, charts.js,
  views.js, style.css), no build step, no network references: the site
  loads nothing from outside its own files (system font stack, no
  webfonts, no images except SVG drawn in code).
- Screenshots in `screenshots/` are real renders of the site's own code
  in headless Chromium (desktop 1280×800 for Dashboard, Economy and Data;
  phone 390×844 for the Dashboard), converted to JPEG quality 80,
  each under 256 KiB, never edited.
- Entrypoint `main.ts` (Node 22 stdlib only) copies `app/` and
  `screenshots/` to `$MAKEFUN_OUTPUT_DIR` and writes `dossier.json` via
  the kit's `vendor/makefun-frontend.ts`, unchanged.
