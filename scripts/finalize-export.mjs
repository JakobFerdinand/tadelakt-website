import { copyFile, mkdir } from 'node:fs/promises';

// Support the event's trailing-slash URL without changing existing flat routes.
const eventRoute = 'tage-des-offenen-ateliers';
await mkdir(`out/${eventRoute}`, { recursive: true });
await copyFile(`out/${eventRoute}.html`, `out/${eventRoute}/index.html`);

await copyFile('apache/.htaccess', 'out/.htaccess');
