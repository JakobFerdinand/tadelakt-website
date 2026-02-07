import fs from 'fs';
import path from 'path';

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const titleFromFilename = (filename) =>
  filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const buildWorkItems = (category) => {
  const directory = path.join(process.cwd(), 'public', 'images', category);
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs
    .readdirSync(directory)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  return files.map((file) => ({
    title: titleFromFilename(file),
    description: '',
    imageUrl: `/images/${category}/${file}`,
    thumbnailUrl: `/images/${category}/${file}`,
  }));
};

export const fetchWork = async () => ({
  work: buildWorkItems('arbeit'),
});

export const fetchTadelakt = async () => ({
  work: buildWorkItems('tadelakt'),
});

export const fetchLehmputz = async () => ({
  work: buildWorkItems('lehmputz'),
});

export const fetchHerstellungUndRestaurierung = async () => ({
  work: buildWorkItems('herstellung-und-restaurierung'),
});
