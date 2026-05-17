export interface Breed {
  slug: string;
  label: string;
}

export const BREEDS: Breed[] = [
  { slug: 'shih-tzu', label: 'Shih Tzu' },
  { slug: 'golden-retriver', label: 'Golden Retriever' },
  { slug: 'bulldog-frances', label: 'Bulldog Francês' },
  { slug: 'samoieda', label: 'Samoieda' },
  { slug: 'chihuahua', label: 'Chihuahua' },
  { slug: 'husky-siberiano', label: 'Husky Siberiano' },
  { slug: 'spitz-alemao', label: 'Spitz Alemão' }
];

const SLUG_BY_ALIAS: Record<string, string> = {
  Chihuahua: 'chihuahua',
  'Golden Retriver': 'golden-retriver'
};

export function normalizeBreedSlug(
  value: string | undefined
): string | undefined {
  if (!value) return undefined;
  if (SLUG_BY_ALIAS[value]) return SLUG_BY_ALIAS[value];
  return value;
}

export function breedLabel(value: string | undefined): string {
  const slug = normalizeBreedSlug(value);
  return BREEDS.find((b) => b.slug === slug)?.label ?? value ?? '';
}
