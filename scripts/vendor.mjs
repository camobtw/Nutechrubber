import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
await mkdir(new URL('assets/vendor/', root), { recursive: true });
for (const file of ['gsap.min.js', 'ScrollTrigger.min.js']) {
  await copyFile(new URL(`node_modules/gsap/dist/${file}`, root), new URL(`assets/vendor/${file}`, root));
}
await copyFile(new URL('node_modules/gsap/README.md', root), new URL('assets/vendor/GSAP-README.md', root));
const metadata = JSON.parse(await readFile(new URL('node_modules/gsap/package.json', root), 'utf8'));
await writeFile(new URL('assets/vendor/NOTICE.txt', root), `GSAP ${metadata.version}\nCopyright (c) 2008-2026 GreenSock. All rights reserved.\n${metadata.license}\nOriginal license banners are preserved in both distributed JavaScript files.\n`);
console.log('GSAP and ScrollTrigger copied to the self-hosted assets directory.');
