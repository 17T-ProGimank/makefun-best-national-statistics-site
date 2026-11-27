# NusaStat — Methodology

Indonesia in Numbers. All figures in `app/data.js` were verified on
26 November 2026 against the project's verified-data notes. No figure
on this site is estimated, modelled by us, or invented: anything that
could not be verified to a named official source was omitted (see
"Omitted, not guessed" below).

## Data sources

| Source | What it supplies here |
|---|---|
| BPS — Statistics Indonesia | GDP and GDP growth, CPI and CPI groups, Sakernas unemployment and employment, poverty and poverty line, Gini, provincial populations, sector shares of GDP, foreign tourists (not in the explorer) |
| World Bank (WDI / WITS) | Population, GDP in US$, GDP per capita, annual-average CPI inflation, age structure, urban share, fertility, life expectancy and mortality, trade series, GNI per capita |
| IMF (World Economic Outlook) | GDP (PPP) and GDP per capita (PPP) |
| Ministry of Finance | APBN 2024 realisation: revenue, spending, deficit, primary deficit |
| Bank Indonesia | PIHPS food prices (national average, Sep 2026), BI rate, exchange rate |
| UNCTAD | FDI inflows and stock, 2024 |
| UN World Population Prospects | Median age, 2024 |
| CIA World Factbook | Household consumption and fixed investment shares of GDP, current-account estimate (labelled as estimates where they are estimates) |

Every indicator row in the data explorer carries its own source and
year. The full source list is also exported as `SOURCES` in
`app/data.js`.

## Verification method

1. **Start from the release, not the round-up.** Each headline figure
   was checked against the publishing release (e.g. BPS GDP release
   No. 17/02/Th. XXVIII, 5 Feb 2025; BPS CPI release No. 01/01/Th.
   XXVIII, 2 Jan 2025) or the World Bank / IMF indicator value, and
   the published precision was kept (population 283.488m, GDP
   Rp 22,138.96tn, GDP per capita US$4,925.43).
2. **One concept, one series.** Where two published numbers describe
   different concepts they are never mixed:
   - Inflation: the KPI uses the BPS December year-on-year rate
     (1.57%); the 2015–2025 series uses the World Bank annual-average
     CPI inflation (2.18% for 2024) and is labelled as such.
   - Unemployment: BPS Sakernas (August) only. The World Bank / ILO
     modelled estimate (3.30% for 2024) is a different concept and is
     not used anywhere.
   - GDP per capita: the World Bank US$4,925 is the headline; the BPS
     figure (Rp 78.62m = US$4,960.33 at BPS's implied rate) is listed
     as a separate indicator row.
   - Life expectancy: the World Bank 2024 value (71.3 years, both
     sexes; female 73.4, male 69.2) is used. An earlier ~74-year figure
     did not match any official source and was corrected.
   - Trade: the headline 2024 figures are the BPS merchandise values
     (exports US$264.71bn, imports US$233.67bn); the 2015–2025 series
     is the consistent UN Comtrade / WDI merchandise series, with 2025
     from UN WITS.
3. **Corrections recorded, not hidden.** Sector shares were corrected
   to the BPS 2024 release (manufacturing 18.98%, trade 13.07%,
   agriculture 12.61%, construction 10.09%, mining 9.15%); Jakarta's
   mid-2024 population is 10.685m (the 11.1m figure is a 2025 value).
4. **Residuals labelled.** "Other (residual)" in sector shares (29.97%)
   and "All other (residual)" in employment (25.42%) are computed as
   100 minus the named shares and are labelled as residuals. The
   residual employment headcount is not published: `workers` is null
   for that row rather than derived.
5. **Dated, not timeless.** Food prices are Bank Indonesia PIHPS
   national averages for September 2026 and are dated as such; the
   2024 BPS food-price averages were not extractable and are not used.
   Each release in "Latest releases" carries its publication date.

## Chart methods

- **Time series (2015–2025)** are drawn directly from the arrays in
  `app/data.js` (GDP growth, inflation, unemployment, population,
  trade). No smoothing, no interpolation, no trend line is fitted:
  the 2020 COVID dip (GDP growth −2.07%) is shown as published.
- **Shares** (sectors of GDP, age structure, employment) are shown as
  published percentages that sum to 100%; the residual slices are
  labelled "residual" so the reader can see what is named and what is
  grouped.
- **Provinces** are ranked by mid-2024 population (BPS); each bar
  shows both the headcount (millions) and the share of the national
  population. The top 10 cover 71.7% of the population.
- **CPI groups** plot the December 2024 year-on-year rate per group
  with its contribution in percentage points; the contributions sum
  to the headline rate. Rates and contributions are different
  measures and are never added together as if they were the same.
- **KPI change labels** are computed only from the published series
  in the same file (e.g. unemployment −0.41pp vs August 2023;
  poverty −0.46pp vs March 2024). Where no comparable prior value was
  verified, the change field is left blank rather than estimated.
- **Sorotan (highlights)** compare two published values of the same
  indicator only, and each card states both endpoints, the change,
  and the source, so the comparison can be checked in seconds.
- **Currency and units** are shown as published: rupiah figures in
  trillions (tn) or millions (m), trade in US$ billions, food prices
  in rupiah per kg or per litre. Nothing is converted between
  currencies on the site.

## Omitted, not guessed

- **HDI:** conflicting vintages (0.713 for 2022 vs 0.728 for 2023)
  could not be pinned to a single verified UNDP release, so no HDI
  figure appears anywhere on the site.
- **Education-group indicators:** no Education rows met the same
  verification bar, so the explorer has five groups (Economy, People,
  Prices, Trade, Health), not six.
- **CPI basket weights:** the BPS December 2024 release publishes
  rates and contributions per group, not weights, so groups carry
  rate + contribution only.
- **2024 average food prices (BPS):** the BPS publication exists but
  its table values were not extractable, so food prices use the
  dated Bank Indonesia PIHPS averages instead.
- **Provincial populations beyond the top 10** were not needed for
  the top-10 table and are not listed.

## Round 2 changes

- **New Province Compare route.** A dedicated page for comparing
  provinces side by side on population and population share, built
  from the same verified top-10 BPS table as round 1 — no new figures.
- **Sorotan highlights strip.** A new strip on the home page showing
  the five fastest-moving verified indicators (GDP growth, inflation,
  unemployment, poverty, exports), each with both endpoints, the
  change, and its source. Every highlight is computed only from
  figures already in the verified data set.
- **Upgraded data explorer.** The indicator explorer now covers all
  66 verified rows across the five groups (Economy 22, People 20,
  Prices 10, Trade 8, Health 6), with per-row source and year, and
  the same group filter as round 1.
- **Data refresh.** Series extended with the verified 2025 and 2026
  releases where available: GDP 2025 (+5.11%, Rp 23,821.1tn), GDP
  Q3 2026 (+5.47% yoy), unemployment August 2026 (4.75%), poverty
  March 2026 (8.07%), October 2026 inflation (3.23% yoy), 2025 trade
  (exports US$281.7bn, imports US$241.8bn), and Bank Indonesia PIHPS
  food prices for September 2026. All other figures re-verified
  against the 26 November 2026 notes; no figure was carried over
  unverified.
