# NusaStat — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/17T-ProGimank/makefun-best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/17T-ProGimank/makefun-best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Entry for the make.fun bounty [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539) — see also the [competition page](https://make.fun/c/best-national-statistics-site-20261126-0539).

Referral: [m4psg5rh](https://make.fun/r/m4psg5rh)

## What it is

NusaStat is a national statistics site for Indonesia that runs entirely
offline from its own static files — no network requests, no build step.
Every figure is labelled with its source and year (BPS — Statistics
Indonesia, the World Bank, the IMF, Bank Indonesia and others), and
nothing on the site is estimated or invented: anything that could not be
verified to a named official source was left out. See `methodology.md`
for the verification method and the full source list.

Round 4 refreshes the headline KPIs to the newest verified releases
(population 2025: 285.721 million, World Bank; GDP 2025: Rp 23,821.1
trillion, +5.11%, BPS; GDP per capita 2025: US$5,083.4, BPS; poverty
March 2026: 8.07%, BPS; unemployment August 2026: 4.75%, BPS
Sakernas), adds a sparkline to every KPI card, a 2015–2025 GDP-growth
chart and a Top-5 provinces block to the dashboard, and a Sorotan
(highlights) strip of the biggest moves in the latest data. The site
covers all 38 provinces — including a tile-grid Province Map colourable
by population, poverty rate or unemployment — and 66 indicators across
5 groups in the data explorer.

## Routes

- `#/` — Dashboard: headline indicators with sparklines, GDP-growth chart 2015–2025, Top-5 provinces, Sorotan highlights, latest releases, key figures
- `#/economy` — Economy: GDP, growth, sectors, trade, fiscal figures
- `#/people` — People: population, age structure, employment, poverty; all 38 provinces
- `#/prices` — Prices: CPI, inflation by group, food prices
- `#/map` — Province Map: tile cartogram of all 38 provinces, colour by population / poverty / unemployment
- `#/compare` — Compare: pick any two provinces and compare them side by side
- `#/data` — Data: searchable, sortable, filterable explorer of every indicator, with sources and CSV download

## How to run

```sh
# serve the site locally (any static server works)
python3 -m http.server 8000 --directory app
# open http://localhost:8000/ in a browser
```

Or build the submission output with Node 22:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` into the output directory and
writes `dossier.json` via the kit's `vendor/makefun-frontend.ts`.

## License

MIT — see [LICENSE](LICENSE).
