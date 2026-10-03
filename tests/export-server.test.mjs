import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { createExportServer } from '../scripts/serve-export.mjs';

test('static preview serves clean URLs, explicit HTML, assets and genuine 404 responses', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tadelakt-export-'));
  await writeFile(path.join(root, 'index.html'), 'home');
  await writeFile(path.join(root, 'kontakt.html'), 'contact');
  await writeFile(path.join(root, '404.html'), 'not found');
  await writeFile(path.join(root, 'site.css'), 'body{}');
  const server = createExportServer(root).listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const base = `http://127.0.0.1:${server.address().port}`;
    for (const [route, status, body] of [
      ['/', 200, 'home'],
      ['/kontakt', 200, 'contact'],
      ['/kontakt.html', 200, 'contact'],
      ['/404?code=403', 200, 'not found'],
      ['/missing', 404, 'not found'],
      ['/site.css', 200, 'body{}'],
    ]) {
      const response = await fetch(base + route);
      assert.equal(response.status, status);
      assert.equal(await response.text(), body);
    }
    assert.match(
      (await fetch(`${base}/site.css`)).headers.get('content-type'),
      /text\/css/,
    );
    assert.equal(
      await (await fetch(`${base}/kontakt`, { method: 'HEAD' })).text(),
      '',
    );
    assert.equal((await fetch(`${base}/%2e%2e%2fpackage.json`)).status, 403);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});
