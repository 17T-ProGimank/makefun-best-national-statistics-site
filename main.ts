// NusaStat — Indonesia in Numbers (Node 22, standard library only).
// The site is the plain static files in this directory's app/ folder:
// index.html plus its own modules, stylesheet and data — no build step,
// nothing loaded over the network. This program hands the entry in: it
// copies app/ and screenshots/ from beside this file into the output
// directory and writes /output/dossier.json, the summary the judge reads
// (the screenshots, the first load's files and bytes, and the source),
// using the vendored make.fun library. Leave vendor/makefun-frontend.ts
// untouched: the scorer rebuilds the dossier with its own copy and the
// two must match byte for byte.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly instead of copying an empty or missing site: without app/
// the dossier would describe a broken entry and the scorer would refuse it.
const appDir = join(here, 'app');
if (!existsSync(appDir)) {
  console.error('error: app/ directory not found beside main.ts: ' + appDir);
  process.exit(1);
}

// Count the files actually handed to the output directory, for the run summary.
function countFiles(dir) {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    n += entry.isDirectory() ? countFiles(join(dir, entry.name)) : 1;
  }
  return n;
}

mkdirSync(out, { recursive: true });
cpSync(appDir, join(out, 'app'), { recursive: true });
let copied = countFiles(appDir);
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
  copied += countFiles(join(here, 'screenshots'));
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse (more than
// 4 screenshots or one over 256 KiB; more than 993 files and directories
// in app/ or 16 MiB of app files: app/ counts beside /output's own
// 1000-entry cap, its screenshots/ and dossier.json).
const dossier = buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 });
writeFileSync(join(out, 'dossier.json'), dossier);
console.log('NusaStat: copied ' + copied + ' files to ' + out + '; dossier.json ' + Buffer.byteLength(dossier, 'utf8') + ' bytes');
