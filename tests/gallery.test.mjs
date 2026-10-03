import assert from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';
import { getGalleryImages } from '../lib/gallery.ts';
import {
  galleries,
  generateThumbnails,
} from '../scripts/generate-thumbnails.mjs';

test('all 94 gallery entries retain sorted filenames and their original titles', () => {
  const counts = {
    arbeit: 56,
    tadelakt: 14,
    lehmputz: 10,
    'herstellung-und-restaurierung': 14,
  };
  for (const gallery of galleries) {
    const images = getGalleryImages(gallery);
    assert.equal(images.length, counts[gallery]);
    assert.deepEqual(
      images.map((image) => image.src),
      images.map((image) => image.src).sort(),
    );
    for (const image of images) {
      assert.equal(image.title, path.basename(image.src).split('---')[0]);
      assert.equal(
        image.thumbnail,
        `${image.src.replace('/images/', '/thumbnails/')}.webp`,
      );
    }
  }
});

test('thumbnail generation handles spaces, ignores non-images and preserves originals', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tadelakt-images-'));
  try {
    const original = await sharp({
      create: { width: 800, height: 400, channels: 3, background: '#7b2614' },
    })
      .jpeg()
      .toBuffer();
    for (const gallery of galleries) {
      const source = path.join(root, 'public/images', gallery);
      await mkdir(source, { recursive: true });
      await writeFile(path.join(source, 'Bad mit Wand---1.JPG'), original);
      await writeFile(path.join(source, '.DS_Store'), 'ignored');
    }
    await generateThumbnails(root);
    await generateThumbnails(root);
    for (const gallery of galleries) {
      const destination = path.join(root, 'public/thumbnails', gallery);
      assert.deepEqual(await readdir(destination), [
        'Bad mit Wand---1.JPG.webp',
      ]);
      const metadata = await sharp(
        path.join(destination, 'Bad mit Wand---1.JPG.webp'),
      ).metadata();
      assert.equal(metadata.format, 'webp');
      assert.equal(metadata.width, 200);
      assert.equal(metadata.height, 100);
      assert.deepEqual(
        await readFile(
          path.join(root, 'public/images', gallery, 'Bad mit Wand---1.JPG'),
        ),
        original,
      );
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
