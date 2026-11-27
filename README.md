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

## Routes

- `#/` — Dashboard: headline indicators, GDP and inflation charts, provincial snapshot
- `#/economy` — Economy: GDP, growth, sectors, trade, fiscal figures
- `#/people` — People: population, age structure, employment, poverty, education
- `#/prices` — Prices: CPI, inflation by group, food prices
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
