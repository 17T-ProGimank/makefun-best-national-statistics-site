# NusaStat — Methodology

Indonesia in Numbers. All figures in `app/data.js` were verified on
26 November 2026 against the project's verified-data notes, and the
38-province dataset was verified on 28 November 2026 against the BPS
tables named below. No figure on this site is estimated, modelled by
us, or invented: anything that could not be verified to a named
official source was omitted (see "Omitted, not guessed" below).

## Data sources

| Source | What it supplies here |
|---|---|
| BPS — Statistics Indonesia | GDP and GDP growth, CPI and CPI groups, Sakernas unemployment and employment, poverty and poverty line, Gini, provincial populations, provincial poverty and unemployment, sector shares of GDP, foreign tourists (not in the explorer) |
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

## The three new provincial tables (round 3)

All 38 provinces now carry three figures, each from one named BPS
table, with one vintage per figure:

1. **Population, mid-2024 (June).** BPS, Hasil Proyeksi Penduduk
   Interim 2020–2023 — Tabel 2, "Jumlah dan Persentase Penduduk
   Menurut Provinsi di Indonesia (000) Jiwa 2024" (as reproduced in
   BPS Provinsi Jawa Barat, "Indikator Strategis Provinsi Jawa Barat
   di Peringkat Nasional 2024"). Populations are kept at the 4
   decimals BPS publishes (e.g. West Java 50.3452m). The 38 pops sum
   to 281.604m, the BPS projection total.
2. **Poverty rate, March 2024.** BPS, "Profil Kemiskinan Provinsi
   Papua Maret 2024" (BRS No. 130/07/94/Th. XXVII, 1 Jul 2024),
   Tabel 7, "Persentase Penduduk Miskin Menurut Provinsi, Maret
   2024" (national 9.03%). No province field is null: all 38 rates
   were verified to this table.
3. **Unemployment rate, August 2024.** BPS, "Tingkat Pengangguran
   Terbuka Menurut Provinsi (Persen)", Sakernas Agustus 2024
   (national 4.91%, BRS No. 83/11/Th. XXVII, 5 Nov 2024). No
   province field is null: all 38 rates were verified to this table.

**Precision.** Poverty and unemployment are kept at the two decimals
BPS publishes (e.g. Aceh poverty 14.23%, unemployment 5.75%);
populations at four decimals. Ranks and legend breaks use the
published precision; the map rounds to one decimal only for display.

**The 99.35% share sum.** Province shares are computed as pop /
283.488 (the World Bank national total, as in rounds 1–2), so they
sum to 99.35%, not 100. The 0.65pp gap is the difference between the
BPS provincial projection total (281.604m) and the World Bank
national total (283.488m) — two different published totals, not a
data error. The gap is stated in the data file's comments.

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
   Two round-2 bugs were fixed in round 3: the People/Data controls
   no longer double-bind their handlers, and the stylesheet now
   includes the view classes round 2's CSS was missing.
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
  population. The People table lists all 38 provinces, sortable.
- **Province map.** A tile-grid cartogram: one tile per province,
  placed to roughly mirror Indonesia's geography (Sumatra on the
  diagonal at top left, Java in a row below it, Kalimantan in the
  centre, Sulawesi to its east, Maluku and Papua at the far east).
  Tiles are coloured by the selected metric (population, poverty
  rate, unemployment) on a 5-step colourblind-safe sequential scale;
  the legend shows the real computed breaks for the selected metric
  (quantile-ish breaks from the data, labelled with the metric unit).
  Clicking or keyboard-activating a tile shows the province's three
  values and its rank on the selected metric. Default metric is
  population; default selected province is the largest (West Java).
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
- **No provincial figure is null in round 3.** All 38 poverty
  (Mar 2024) and unemployment (Aug 2024) values were verified to the
  named BPS tables above, so no province is shown as "n/a" on the
  map. Had any figure failed verification it would have been left
  null and rendered grey, not invented.

## Round 3 changes

- **New Province Map route (`#/map`).** A tile-grid cartogram of all
  38 provinces, colourable by population (BPS mid-2024), poverty rate
  (BPS Mar 2024) or unemployment (BPS Sakernas Aug 2024), with a
  5-step legend from real computed breaks and a detail panel showing
  the selected province's three values plus its rank on the selected
  metric. Tiles are keyboard-accessible.
- **All 38 provinces everywhere.** The People page table lists all 38
  provinces (sortable; was top 10). The Compare route works with the
  full 38-province dataset.
- **New province dataset.** Population (BPS mid-2024), poverty rate
  (BPS Mar 2024) and unemployment (BPS Sakernas Aug 2024) for all 38
  provinces — see "The three new provincial tables" above.
- **Dashboard teaser.** A card on the dashboard links to the map
  ("Explore all 38 provinces on the map").
- **Bug fixes from round 2.** The People/Data controls no longer
  double-bind their handlers, and the stylesheet now includes the
  view classes round 2's CSS was missing.
- **Screenshots.** The map shot replaces round 2's compare shot as
  shot 2 (dashboard, map, data, phone).
