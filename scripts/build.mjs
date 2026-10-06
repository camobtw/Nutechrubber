import { cp, mkdir, readdir, readFile, rm, stat } from 'node:fs/promises';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const output = resolve(root, 'dist');
const entries = await readdir(root, { withFileTypes: true });
const pages = entries.filter(entry => entry.isFile() && entry.name.endsWith('.html')).map(entry => entry.name);
const publicFiles = entries.filter(entry => entry.isFile() && /\.(html|css|js)$/.test(entry.name)).map(entry => entry.name);
if (!pages.includes('index.html')) throw new Error('The website must include index.html.');

// Check local references before publishing the same static files used in preview.
const documents = new Map(await Promise.all(pages.map(async file => [file, await readFile(resolve(root, file), 'utf8')])));
const ids = new Map([...documents].map(([file, html]) => [file, new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]))]));
const failures = [];
async function checkReference(source, reference) {
  if (!reference || /^(?:[a-z][\w+.-]*:|\/\/)/i.test(reference)) return;
  let pathPart, fragment;
  try {
    const [path, hash] = reference.split('#', 2);
    pathPart = decodeURIComponent(path.split('?', 1)[0]);
    fragment = hash ? decodeURIComponent(hash) : '';
  } catch { failures.push(`${source}: invalid URL ${reference}`); return; }
  const target = pathPart.startsWith('/') ? resolve(root, `.${pathPart}`) : resolve(root, dirname(source), pathPart || source.split('/').at(-1));
  if (!target.startsWith(root + sep) && target !== root) { failures.push(`${source}: reference leaves the website: ${reference}`); return; }
  let file = target;
  try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); await stat(file); }
  catch { failures.push(`${source}: missing ${reference}`); return; }
  const destination = relative(root, file);
  if (fragment && ids.has(destination) && !ids.get(destination).has(fragment)) failures.push(`${source}: missing section ${reference}`);
  if (pathPart && !publicFiles.includes(destination) && !destination.startsWith(`assets${sep}`)) failures.push(`${source}: ${reference} is outside the production output`);
}
for (const [file, html] of documents) {
  const refs = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map(match => match[1]);
  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/g)) refs.push(...match[1].split(',').map(candidate => candidate.trim().split(/\s+/)[0]));
  for (const reference of refs) await checkReference(file, reference);
}
for (const file of publicFiles.filter(file => extname(file) === '.css')) {
  const css = await readFile(resolve(root, file), 'utf8');
  for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) await checkReference(file, match[1]);
}
if (failures.length) throw new Error(`Production reference checks failed:\n${failures.join('\n')}`);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of publicFiles) await cp(resolve(root, file), resolve(output, file));
await cp(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });
console.log(`Production build ready: ${pages.length} pages, ${publicFiles.length} root files and assets in dist/. Local links and assets checked.`);
