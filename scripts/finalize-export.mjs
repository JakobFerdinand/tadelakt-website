import { copyFile } from 'node:fs/promises';

await copyFile('apache/.htaccess', 'out/.htaccess');
