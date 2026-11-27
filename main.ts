// NusaStat — entrypoint (round 2).
//
// Copies the static site in app/ and the screenshots in screenshots/
// into the output directory, then writes dossier.json from them with
// the kit's dossier builder. Node 22, stdlib only.
//
// Usage: MAKEFUN_OUTPUT_DIR=out node main.ts   (defaults to /output)
import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

const appDir = join(here, 'app');
if (!existsSync(appDir) || !statSync(appDir).isDirectory()) {
  throw new Error(`main.ts: app/ is missing next to main.ts (looked in ${appDir})`);
}
const shotsDir = join(here, 'screenshots');
if (!existsSync(shotsDir) || !statSync(shotsDir).isDirectory()) {
  throw new Error(`main.ts: screenshots/ is missing next to main.ts (looked in ${shotsDir})`);
}

mkdirSync(outDir, { recursive: true });
cpSync(appDir, join(outDir, 'app'), { recursive: true });
cpSync(shotsDir, join(outDir, 'screenshots'), { recursive: true });

const listFiles = (dir, prefix = '') => {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (statSync(p).isDirectory()) out.push(...listFiles(p, rel));
    else out.push(rel);
  }
  return out;
};
const copiedApp = listFiles(join(outDir, 'app'));
const copiedShots = listFiles(join(outDir, 'screenshots'));
console.log(`main.ts: copied ${copiedApp.length} app files: ${copiedApp.join(', ')}`);
console.log(`main.ts: copied ${copiedShots.length} screenshots: ${copiedShots.join(', ')}`);

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
const dossierPath = join(outDir, 'dossier.json');
writeFileSync(dossierPath, dossier);
console.log(`main.ts: wrote dossier.json (${dossier.byteLength} bytes) to ${dossierPath}`);
console.log(`main.ts: done, output in ${outDir}`);
