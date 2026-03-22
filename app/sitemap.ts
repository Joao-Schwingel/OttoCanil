import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ottocanil.com';

  const breeds = [
    'shih-tzu',
    'golden-retriver',
    'bulldog-frances',
    'samoieda',
    'chihuahua',
    'husky-siberiano',
    'spitz-alemao'
  ];

  const breedPages = breeds.map((breed) => ({
    url: `${baseUrl}/breeds/${breed}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    ...breedPages
  ];
}
