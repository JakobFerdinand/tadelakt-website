import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

export function createExportServer(root = path.resolve('out')) {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      const pathname = decodeURIComponent(url.pathname);
      const filename = path.resolve(root, `.${pathname}`);
      if (!filename.startsWith(`${root}${path.sep}`) && filename !== root) {
        response.writeHead(403).end();
        return;
      }
      let target = filename;
      try {
        if ((await stat(target)).isDirectory())
          target = path.join(target, 'index.html');
      } catch {
        if (!path.extname(target)) target += '.html';
      }
      let body;
      let status = 200;
      try {
        body = await readFile(target);
      } catch {
        status = 404;
        target = path.join(root, '404.html');
        body = await readFile(target);
      }
      response.writeHead(status, {
        'Content-Type':
          contentTypes[path.extname(target)] ?? 'application/octet-stream',
      });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch {
      response.writeHead(400).end();
    }
  });
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  const port = Number(process.env.PORT ?? 3000);
  createExportServer().listen(port, '127.0.0.1', () => {
    console.log(`Static export: http://127.0.0.1:${port}`);
  });
}
