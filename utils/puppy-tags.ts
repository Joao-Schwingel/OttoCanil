import { normalizeBreedSlug } from '@/lib/breeds';

export type Sexo = 'M' | 'F';

export function getSexo(tags: string[] | undefined): Sexo | undefined {
  if (!tags) return undefined;
  if (tags.includes('M')) return 'M';
  if (tags.includes('F')) return 'F';
  return undefined;
}

export function getBreed(tags: string[] | undefined): string | undefined {
  const raw = tags?.find((t) => t !== 'M' && t !== 'F');
  return normalizeBreedSlug(raw);
}
