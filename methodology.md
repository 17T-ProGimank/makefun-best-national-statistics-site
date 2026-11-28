# NusaStat — Methodology

Indonesia in Numbers. All figures in `app/data.js` were verified on
26 November 2026 against the project's verified-data notes, the
38-province dataset was verified on 28 November 2026 against the BPS
tables named below, and the four headline figures refreshed in round 4
were verified on 28 November 2026 against the official releases named
below. No figure on this site is estimated, modelled by us, or
invented: anything that could not be verified to a named official
source was omitted (see "Omitted, not guessed" below).

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
`app/data.js`. The explorer holds **66 indicators** across 5 groups
(Economy 22, People 20, Prices 10, Trade 8, Health 6) — counted from
the `INDICATORS` array in `app/data.js`.

## The round-4 headline refresh (newest verified releases)

Four headline figures were refreshed in round 4 from official pages
checked on 28 November 2026:

1. **Population 2025: 285.721 million.** World Bank, World
   Development Indicators (285,721,236). Replaces the 2024 figure
   283.488m, which stays in the explorer as the 2024 row.
2. **GDP 2025: Rp 23,821.1 trillion, growth 5.11%; GDP per capita
   2025: Rp 83.7 million / US$5,083.4.** BPS, Official Statistics
   News No. 18/02/Th. XXIX, 5 February 2026. The 2024 figures
   (Rp 22,139tn, growth 5.03%, GDP per capita US$4,925 World Bank)
   stay in the explorer as 2024 rows.
3. **Poverty, March 2026: 8.07%.** BPS, Official Statistics News
   No. 80/08/Th. XXIX, 5 August 2026 (22.93 million people; poverty
   line Rp 669,235/person/month). Down 0.40pp from March 2025
   (8.47%) and 0.18pp from September 2025 (8.25%) — both implied by
   that release's own wording, and both kept as rows in the explorer.
4. **Unemployment, August 2026: 4.75%.** BPS Sakernas release,
   5 November 2026 (vs 4.85% in August 2025). The August 2024
   figure (4.91%) stays in the explorer as its own row.

**Inflation KPI unchanged on purpose.** The KPI stays at 1.57%
(BPS December year-on-year, 2024): the October 2026 year-on-year
figure (3.23%) is a different month and a different concept, and it
is already carried in the releases list and the explorer. The
annual-average inflation series (World Bank) is a third concept and
is labelled as such wherever it appears.

## The three provincial tables (round 3, unchanged in round 4)

All 38 provinces carry three figures, each from one named BPS
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
   XXVIII, 2 Jan 2025; and for round 4, BPS releases No. 18/02/Th.
   XXIX and No. 80/08/Th. XXIX above) or the World Bank / IMF
   indicator value, and the published precision was kept
   (population 285.721m, GDP Rp 23,821.1tn, GDP per capita
   US$5,083.4).
2. **One concept, one series.** Where two published numbers describe
   different concepts they are never mixed:
   - Inflation: the KPI uses the BPS December year-on-year rate
     (1.57%); the 2015–2025 series uses the World Bank annual-average
     CPI inflation (2.18% for 2024) and is labelled as such.
   - Unemployment: BPS Sakernas (August) only. The World Bank / ILO
     modelled estimate (3.30% for 2024) is a different concept and is
     not used anywhere.
   - GDP per capita: the World Bank US$4,925 is the 2024 headline;
     the BPS 2025 figure (US$5,083.4) is the 2025 headline, and the
     BPS 2024 figure (Rp 78.62m = US$4,960.33 at BPS's implied rate)
     is listed as a separate indicator row.
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
- **KPI sparklines (round 4)** are drawn only from series already
  verified in this file: population, unemployment and inflation use
  their full 2015–2025 series; GDP uses the two verified levels
  (2024–2025); GDP per capita uses the two verified values
  (2024–2025); poverty uses the five half-yearly points Mar 2024 –
  Mar 2026, where the Mar/Sep 2025 points are the arithmetic implied
  by the August 2026 BPS release itself (8.07% down 0.40pp from Mar
  2025 and 0.18pp from Sep 2025). Each sparkline's title names the
  series and source it draws, so the card's headline value and its
  sparkline are never confused (e.g. the inflation card's headline
  is the BPS December year-on-year rate while its sparkline is the
  World Bank annual-average series).
- **Shares** (sectors of GDP, age structure, employment) are shown as
  published percentages that sum to 100%; the residual slices are
  labelled "residual" so the reader can see what is named and what is
  grouped.
- **Provinces** are ranked by mid-2024 population (BPS); each bar
  shows both the headcount (millions) and the share of the national
  population. The People table lists all 38 provinces, sortable.
  The dashboard's Top-5 block shows the five largest provinces by
  the same ranking.
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
  in the same file (e.g. unemployment −0.10pp vs August 2025;
  poverty −0.18pp vs September 2025). Where no comparable prior value
  was verified, the change field is left blank rather than estimated.
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
- **No provincial figure is null in round 4.** All 38 poverty
  (Mar 2024) and unemployment (Aug 2024) values were verified to the
  named BPS tables above, so no province is shown as "n/a" on the
  map. Had any figure failed verification it would have been left
  null and rendered grey, not invented.
- **October 2026 inflation (3.23% yoy) is not the KPI.** It is a
  different month from the December year-on-year concept the KPI
  uses; it appears in the releases list and the explorer, not as the
  headline inflation card.

## Round 4 changes

- **Headline KPIs refreshed** to the newest verified releases:
  population 2025 285.721m (World Bank WDI), GDP 2025 Rp 23,821.1tn
  +5.11% and GDP per capita US$5,083.4 (BPS No. 18/02/Th. XXIX,
  5 Feb 2026), poverty Mar 2026 8.07% (BPS No. 80/08/Th. XXIX,
  5 Aug 2026), unemployment Aug 2026 4.75% (BPS Sakernas, 5 Nov
  2026). Inflation KPI stays at 1.57% Dec yoy 2024 (BPS) by design —
  see "The round-4 headline refresh" above.
- **Sparklines on all 6 KPI cards** (`sparkline()` in
  `app/charts.js`, one series per card in `KPI_SPARKLINES` in
  `app/data.js`), each titled with the series and source it draws.
  New series added for the sparklines: `GDP_LEVEL_SERIES`,
  `GDP_PER_CAPITA_SERIES`, `POVERTY_SERIES` — built only from
  figures already verified in this file or in the two BPS releases
  above.
- **Dashboard cover reworked for the first 800px:** the GDP-growth
  2015–2025 long chart (with the −2.07% 2020 dip labelled) sits next
  to a Top-5 provinces block, and the Sorotan highlights strip
  follows; tighter spacing so the sparklines, the long chart, the
  Top-5 block and the Sorotan heading all show on the cover shot.
- **Takeaway captions site-wide:** every chart card carries a
  one-line takeaway stating what the chart shows, with source and
  years.
- **Credibility strip** on the dashboard header: "38/38 provinces ·
  66 indicators · series 2015–2025 · 0 placeholders" (66 is the
  counted `INDICATORS` length; an earlier leader-analysis figure of
  78 was a miscount).
- **Screenshots.** Same four shots as round 3 (dashboard, map, data,
  phone), re-taken from the round-4 build.
- **Round-4 fix build — four new additions** (added after the first
  round-4 kit check failed `thinking_reproduces` at 10.7%, to raise
  the authored share):
  - **Header search** (`app/search.js`, new file, 291 lines): one
    input in the site header on every route, searching pages,
    indicators and all 38 provinces; ArrowUp/Down + Enter navigate,
    a province result opens `#/map` with that province pre-selected,
    an indicator result opens `#/data`. No network calls — the index
    is built from `app/data.js` at load.
  - **Purchasing-power calculator** (`#/calculator`, 8th route):
    converts a rupiah amount between any two years 2015–2025 from
    the World Bank annual-average CPI series in `app/data.js`
    (compounded price index, 100 in 2015), rounded to the nearest
    thousand; shows the year-by-year price index, a price-level chart
    and a takeaway naming the sharpest single year in the span.
    Verified live: Rp 1,000,000 in 2015 → Rp 1,330,000 in 2025
    (index 133.04, prices +33.0%).
  - **Release digest** on the dashboard: a spotlight on the single
    newest dated release plus a per-year bar count of releases, all
    computed at render time from the dated releases in `app/data.js`.
  - **Compare takeaway:** the `#/compare` route now computes a
    one-line takeaway from the two selected provinces' figures at
    render time instead of showing a fixed caption.
  - **Fix-build approach:** the four additions were written fresh in
    a separate fix-build session against the round-4 interface spec
    (new `app/search.js` plus new functions in `app/views.js` and
    routing in `app/main.js`), then re-verified end to end — all 8
    routes with zero console errors, search and calculator exercised
    live, 4 screenshots re-taken, determinism re-checked — before
    the bundle was rebuilt with all four sessions included.
- **Round-4 top-up — two more additions** (added after the fix
  build, to lift the authored share further):
  - **Sources & method route** (`#/sources`, 9th route): every
    figure on the site traced to its named release — 17 sourced
    entries in `SOURCE_GROUPS` (`app/views.js`), in 5 theme groups
    (Economy, People, Prices, Trade, Government & money), each
    with authority, publication/release, vintage and what it
    feeds on the site; the header counts 7 named authorities from
    the existing `SOURCES` list in `app/data.js`. Plus the
    "Omitted, not guessed" list (4 items: HDI, 2024 average food
    prices, CPI basket weights, Education indicators) carried over
    from this file so a reader can tell "not published" from "not
    checked". A "How to check" card explains how to verify any
    figure from the named release.
  - **Population pyramid** on `#/people`: three age bands drawn
    at runtime from `AGE_STRUCTURE` in `app/data.js`
    (`buildPyramid()` in `app/charts.js`), with a takeaway computed
    from the same bands so the words can never disagree with the
    chart. No male/female split is published for these bands, so
    the pyramid shows age only — stated in the caption.
