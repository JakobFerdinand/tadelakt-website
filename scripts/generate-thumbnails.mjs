import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const galleries = [
  'arbeit',
  'tadelakt',
  'lehmputz',
  'herstellung-und-restaurierung',
];

export async function generateThumbnails(root = process.cwd()) {
  for (const gallery of galleries) {
    const source = path.join(root, 'public/images', gallery);
    const destination = path.join(root, 'public/thumbnails', gallery);
    await mkdir(destination, { recursive: true });
    for (const filename of (await readdir(source)).sort()) {
      if (!/\.(jpe?g|png|gif|svg)$/i.test(filename)) continue;
      await sharp(path.join(source, filename))
        .resize({ width: 200 })
        .toFile(path.join(destination, `${filename}.webp`));
    }
  }
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  await generateThumbnails();
}
