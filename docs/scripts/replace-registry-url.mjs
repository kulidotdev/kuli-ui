/**
 * Replaces REGISTRY_URL placeholder in all MDX files under content/docs/.
 *
 * Usage:
 *   node scripts/replace-registry-url.mjs          → replace (before build)
 *   node scripts/replace-registry-url.mjs --restore → restore (after build)
 *
 * The placeholder value is read from lib/registry-url.mjs — change the URL
 * there and every doc page updates automatically on the next build.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { registryUrl } from '../lib/registry-url.mjs';

const PLACEHOLDER = 'REGISTRY_URL';
const CONTENT_DIR = new URL('../content/docs', import.meta.url).pathname;
const restore = process.argv.includes('--restore');

async function* walkMdx(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMdx(full);
    else if (entry.name.endsWith('.mdx')) yield full;
  }
}

let count = 0;
for await (const file of walkMdx(CONTENT_DIR)) {
  const original = await readFile(file, 'utf8');
  const updated = restore
    ? original.replaceAll(registryUrl, PLACEHOLDER)
    : original.replaceAll(PLACEHOLDER, registryUrl);

  if (updated !== original) {
    await writeFile(file, updated);
    count++;
  }
}

console.log(
  restore
    ? `✓ Restored REGISTRY_URL placeholder in ${count} file(s)`
    : `✓ Replaced REGISTRY_URL → ${registryUrl} in ${count} file(s)`,
);
