import { readdirSync } from 'node:fs';
import path from 'node:path';

export type GalleryImage = {
  src: string;
  thumbnail: string;
  title: string;
  description?: string;
};

export function getGalleryImages(gallery: string): GalleryImage[] {
  return readdirSync(path.join(process.cwd(), 'public', 'images', gallery))
    .filter((filename) => /\.(jpe?g|png|gif|svg)$/i.test(filename))
    .sort()
    .map((filename) => ({
      src: `/images/${gallery}/${filename}`,
      thumbnail: `/thumbnails/${gallery}/${filename}.webp`,
      title: filename.split('---')[0],
    }));
}
