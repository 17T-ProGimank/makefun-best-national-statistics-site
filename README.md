# NusaStat: Indonesia in Numbers

![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/17T-ProGimank/makefun-best-national-statistics-site/rank.svg)
![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/17T-ProGimank/makefun-best-national-statistics-site/reward.svg)

[Bounty: Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539)

Referral code: `m4psg5rh` — https://make.fun/r/m4psg5rh

## What it is

NusaStat is an independent national statistics portal for Indonesia: a static
site with no build step and no network requests. Five hash-routed pages —
Dashboard, Economy, People, Prices and a Data explorer — present 66 verified
indicators with every figure labelled with its source and year (BPS, World
Bank, IMF, Ministry of Finance, Bank Indonesia). Charts are hand-rolled SVG
(line, bar and donut builders in `app/charts.js`); the data explorer's table
is searchable, sortable and filterable, and exports its rows as CSV in the
browser.

## Run it

Serve `app/` with any static HTTP server (for example
`python3 -m http.server` from `app/`) and open `index.html`. Or hand it in
with `MAKEFUN_OUTPUT_DIR=out node main.ts` from the repo root, which copies
`app/` and `screenshots/` and writes `dossier.json`.

## Files

- `app/index.html` — shell, navigation, footer
- `app/main.js` — hash router
- `app/data.js` — all figures, each with source and year
- `app/charts.js` — SVG line/bar/donut builders
- `app/views.js` — page templates, table sort/filter, CSV download
- `app/style.css` — stylesheet, responsive down to phone size
- `main.ts` — entrypoint: copies `app/` + `screenshots/` and writes `dossier.json`
- `methodology.md` — data sources, verification method, corrections, chart methods
- `shots.json` — which views the screenshots show
