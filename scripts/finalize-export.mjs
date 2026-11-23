import { copyFile, mkdir } from 'node:fs/promises';

// Trailing-slash URLs for standalone sub pages, without changing existing
// flat routes.
const subPages = ['tage-des-offenen-ateliers', 'flyer'];
for (const subPage of subPages) {
  await mkdir(`out/${subPage}`, { recursive: true });
  await copyFile(`out/${subPage}.html`, `out/${subPage}/index.html`);
}

await copyFile('apache/.htaccess', 'out/.htaccess');
