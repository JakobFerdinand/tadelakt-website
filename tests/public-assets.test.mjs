import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { test } from 'vitest';

test('public asset paths are compatible with GitHub artifact uploads', async () => {
  // Next.js copies public assets verbatim into the static export.
  const paths = await readdir(new URL('../public/', import.meta.url), {
    recursive: true,
  });
  const invalidPaths = paths.filter((path) => /[":<>|*?\r\n]/.test(path));
  assert.deepEqual(
    invalidPaths,
    [],
    'Public asset paths must not contain characters rejected by upload-artifact',
  );
});
