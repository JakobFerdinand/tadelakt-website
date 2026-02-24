import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export type GalleryCategory =
  | 'arbeit'
  | 'tadelakt'
  | 'lehmputz'
  | 'herstellung-und-restaurierung';

export type GalleryItem = {
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
};

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const titleFromFilename = (filename: string): string =>
  filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
);

const buildWorkItems = (category: GalleryCategory): GalleryItem[] => {
  const directory = path.join(projectRoot, 'public', 'images', category);
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs
    .readdirSync(directory)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map((file) => ({
    title: titleFromFilename(file),
    description: '',
    imageUrl: `/images/${category}/${file}`,
    thumbnailUrl: `/images/${category}/${file}`,
  }));
};

export const getWork = (category: GalleryCategory): GalleryItem[] =>
  buildWorkItems(category);

// Backwards-compatible helpers mirroring web/lib/api.js
export const fetchWork = async (): Promise<{ work: GalleryItem[] }> => ({
  work: buildWorkItems('arbeit'),
});

export const fetchTadelakt = async (): Promise<{ work: GalleryItem[] }> => ({
  work: buildWorkItems('tadelakt'),
});

export const fetchLehmputz = async (): Promise<{ work: GalleryItem[] }> => ({
  work: buildWorkItems('lehmputz'),
});

export const fetchHerstellungUndRestaurierung = async (): Promise<{
  work: GalleryItem[];
}> => ({
  work: buildWorkItems('herstellung-und-restaurierung'),
});
