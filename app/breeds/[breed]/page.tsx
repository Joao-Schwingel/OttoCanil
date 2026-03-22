import { notFound } from 'next/navigation';
import { RatingDisplay } from '@/components/rating-display';
import { PuppyCarousel } from '@/components/puppy-carousel';
import { BreedImage } from '@/components/breed-image';
import { Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return [
    { breed: 'shih-tzu' },
    { breed: 'golden-retriver' },
    { breed: 'bulldog-frances' },
    { breed: 'samoieda' },
    { breed: 'chihuahua' },
    { breed: 'husky-siberiano' },
    { breed: 'spitz-alemao' }
  ];
}

export async function generateMetadata({
  params
}: {
  params: { breed: string };
}) {
  const breed = breedData[params.breed];

  if (!breed) {
    return {
      title: 'Raça não encontrada | Otto Canil',
      description:
        'Desculpe, a raça solicitada não foi encontrada no Otto Canil.'
    };
  }

  const shortDesc = breed.description.replace(/\n/g, ' ').slice(0, 155);

  return {
    title: `Filhotes de ${breed.name} a Venda em Porto Alegre | Comprar ${breed.name}`,
    description: `Compre filhotes de ${breed.name} saudáveis e de raça pura em Porto Alegre. ${shortDesc}`,
    openGraph: {
      title: `Filhotes de ${breed.name} a Venda | Otto Canil Porto Alegre`,
      description: `Filhotes de ${breed.name} vacinados, vermifugados e com acompanhamento veterinário. Criação responsável em Porto Alegre.`,
      url: `https://www.ottocanil.com/breeds/${params.breed}`,
      siteName: 'Otto Canil',
      images: [
        {
          url: `https://www.ottocanil.com${breed.image}`,
          width: 1200,
          height: 630,
          alt: `Filhotes de ${breed.name} - Otto Canil Porto Alegre`
        }
      ],
      locale: 'pt_BR',
      type: 'website'
    },
    alternates: {
      canonical: `https://www.ottocanil.com/breeds/${params.breed}`
    }
  };
}

interface BreedData {
  name: string;
  description: string;
  image: string;
  characteristics: {
    label: string;
    rating: number;
  }[];
  specs: {
    label: string;
    value: string;
  }[];
}

const breedData: Record<string, BreedData> = {
  'shih-tzu': {
    name: 'Shih Tzu',
    description: `O Shih Tzu é uma raça de cães pequenos e adoráveis, reconhecida por sua beleza e temperamento afetuoso. Com um porte compacto, esses cães têm altura entre 20 a 28 cm e peso que varia de 4,5 a 8 kg. Sua pelagem longa, densa e sedosa é uma de suas características mais marcantes.

Esses cães são conhecidos por seu temperamento dócil e sociável. Extremamente apegados à família, adoram estar na companhia de seus tutores e geralmente se dão bem com crianças e outros animais. Uma excelente escolha para quem busca um cão de pequeno porte e extremamente afetuoso.`,
    image: '/images/shihtzu.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outros cães', rating: 5 },
      { label: 'Atividade com crianças', rating: 5 },
      { label: 'Proteção', rating: 2 },
      { label: 'Tolerância ao calor', rating: 2 },
      { label: 'Tolerância ao frio', rating: 3 },
      { label: 'Necessidade de exercício', rating: 2 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 4 },
      { label: 'Cuidados com a higiene', rating: 4 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '10 a 16 anos' },
      { label: 'Tamanho adulto', value: 'Pequeno' },
      { label: 'Cor', value: 'Pretos, cinza, marrom ou branco' },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Altura', value: '20-28cm' },
      { label: 'Peso', value: '4kg - 7,5kg' },
      { label: 'Frequência de banho', value: '7 a 15 dias' }
    ]
  },
  'golden-retriver': {
    name: 'Golden Retriever',
    description: `Com sua aparência amigável e personalidade brincalhona, eles conquistam corações onde quer que vão. O Golden Retriever é um cão de porte médio a grande, com altura que varia entre 51 e 61 cm e peso entre 25 e 40 kg.

Uma de suas qualidades mais marcantes é seu temperamento extremamente amigável, brincalhão, leal e sociável. É um cão que ama a companhia humana e se dá bem com crianças, outros cães e até mesmo estranhos. Além disso, é uma raça inteligente e fácil de treinar.`,
    image: '/images/golden.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outros cães', rating: 5 },
      { label: 'Atividade com crianças', rating: 5 },
      { label: 'Proteção', rating: 2 },
      { label: 'Tolerância ao calor', rating: 2 },
      { label: 'Tolerância ao frio', rating: 4 },
      { label: 'Necessidade de exercício', rating: 5 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 5 },
      { label: 'Cuidados com a higiene', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '10 a 12 anos' },
      { label: 'Tamanho adulto', value: 'Grande' },
      { label: 'Cor', value: 'Dourado em várias tonalidades' },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Altura', value: '51-61cm' },
      { label: 'Peso', value: '25-40kg' }
    ]
  },
  'bulldog-frances': {
    name: 'Bulldog Francês',
    description: `O Buldogue Francês é um cão de pequeno porte, mas com uma presença marcante e cativante. Reconhecido por suas orelhas eretas e pelo rosto achatado e expressivo, essa raça é encantadora. Possuem um corpo musculoso e bem proporcionado.

Uma das características mais adoráveis do Buldogue Francês é seu temperamento. São cães sociáveis e companheiros, conhecidos por sua lealdade. São brincalhões, mas equilibrados, o que os torna excelentes para famílias, inclusive aquelas com crianças. Essa raça é uma escolha maravilhosa para quem busca um cão carinhoso que se adapta bem a ambientes pequenos.`,
    image: '/images/buldogue.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outros cães', rating: 5 },
      { label: 'Atividade com crianças', rating: 5 },
      { label: 'Proteção', rating: 2 },
      { label: 'Tolerância ao calor', rating: 1 },
      { label: 'Tolerância ao frio', rating: 4 },
      { label: 'Necessidade de exercício', rating: 4 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 5 },
      { label: 'Cuidados com a higiene', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '10 a 12 anos' },
      { label: 'Tamanho adulto', value: 'Médio' },
      { label: 'Cor', value: 'Fulvo, tigrado, branco, creme e preto' },
      { label: 'Pelo', value: 'Curto, liso e denso' },
      { label: 'Altura', value: '30-35cm' },
      { label: 'Peso', value: '8-14kg' }
    ]
  },
  'spitz-alemao': {
    name: 'Spitz Alemão',
    description: `O Lulu da Pomerânia, também conhecido como Spitz Alemão Anão, é uma das raças de cães mais encantadoras e populares, reconhecidos por seu tamanho pequeno e aparência fofa. Pesando entre 1,8 e 3,5 kg, com altura entre 18 e 22 cm.

No que diz respeito ao temperamento, o Lulu da Pomerânia é incrivelmente animado, inteligente e afetuoso. É um cão cheio de energia e muito curioso. O Lulu adora estar perto de sua família e é um cão brincalhão e carinhoso, tornando-se uma ótima companhia para adultos e crianças.`,
    image: '/images/lulu.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outros cães', rating: 4 },
      { label: 'Atividade com crianças', rating: 3 },
      { label: 'Proteção', rating: 2 },
      { label: 'Tolerância ao calor', rating: 2 },
      { label: 'Tolerância ao frio', rating: 4 },
      { label: 'Necessidade de exercício', rating: 2 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 3 },
      { label: 'Cuidados com a higiene', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '12 a 16 anos' },
      { label: 'Tamanho adulto', value: 'Pequeno' },
      { label: 'Cor', value: 'Branco, preto, laranja, marrom, azul e creme' },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Altura', value: '18-24cm' },
      { label: 'Peso', value: '1,5kg-3,5kg' }
    ]
  },
  chihuahua: {
    name: 'Chihuahua',
    description: `O Chihuahua é uma das menores raças de cães do mundo, mas o tamanho reduzido é compensado por uma personalidade vibrante e destemida. Esses cães possuem uma altura que varia entre 15 a 23 cm e peso de até 3 kg.

Apesar do pequeno tamanho, o Chihuahua tem uma personalidade marcante. São extremamente leais e apegados aos seus tutores. Sua coragem é notável, e eles frequentemente se comportam como se fossem muito maiores do que realmente são. Ideal para a vida em apartamentos, com sua combinação de charme, inteligência e apego.`,
    image: '/images/Chihuahua.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outros cães', rating: 3 },
      { label: 'Atividade com crianças', rating: 3 },
      { label: 'Proteção', rating: 4 },
      { label: 'Tolerância ao calor', rating: 3 },
      { label: 'Tolerância ao frio', rating: 2 },
      { label: 'Necessidade de exercício', rating: 2 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 4 },
      { label: 'Cuidados com a higiene', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '12 a 20 anos' },
      { label: 'Tamanho adulto', value: 'Pequeno' },
      { label: 'Cor', value: 'Preto, branco, marrom, creme' },
      { label: 'Pelo', value: 'Curto ou longo' },
      { label: 'Altura', value: '15-23cm' },
      { label: 'Peso', value: '1,5-3kg' }
    ]
  },
  samoieda: {
    name: 'Samoieda',
    description: `O Samoieda é uma raça encantadora. Esse cão de porte grande apresenta um corpo robusto, com altura entre 50 e 60 cm e peso variando de 20 a 40 kg. Sua pelagem é densa, dupla, incrivelmente macia e branca como a neve. Seus olhos escuros e vivos, combinados com uma boca curvada para cima, dão a eles a expressão característica de "cão sorridente".

A personalidade do Samoieda é tão notável quanto sua aparência. É um cão extrovertido, gentil e sociável, que adora estar em companhia de pessoas. Ideal para famílias que buscam um companheiro sociável e energético, é uma escolha que traz alegria e beleza a qualquer lar.`,
    image: '/images/samoieda.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outros cães', rating: 5 },
      { label: 'Atividade com crianças', rating: 5 },
      { label: 'Proteção', rating: 4 },
      { label: 'Tolerância ao calor', rating: 1 },
      { label: 'Tolerância ao frio', rating: 5 },
      { label: 'Necessidade de exercício', rating: 5 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 3 },
      { label: 'Cuidados com a higiene', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '12 a 16 anos' },
      { label: 'Tamanho adulto', value: 'Grande' },
      { label: 'Cor', value: 'Branco' },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Altura', value: '53-60cm' },
      { label: 'Peso', value: '23-35kg' }
    ]
  },
  'husky-siberiano': {
    name: 'Husky Siberiano',
    description: `Com sua aparência marcante e temperamento energético, o Husky é hoje uma escolha popular como animal de companhia. É um cão de porte grande, com altura variando entre 50 e 60 cm e peso entre 16 e 37 kg. Seus olhos podem ser azuis, verdes, castanhos ou apresentar heterocromia, o que contribui para sua aparência fascinante.

Em termos de personalidade, o Husky Siberiano é um cão energético, independente e amigável. Apesar de sua aparência autoritária, é uma raça bastante carinhosa e sociável. Seu entusiasmo e energia o tornam um excelente companheiro para famílias ativas que apreciam aventuras ao ar livre.`,
    image: '/images/husky.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outros cães', rating: 4 },
      { label: 'Atividade com crianças', rating: 3 },
      { label: 'Proteção', rating: 4 },
      { label: 'Tolerância ao calor', rating: 2 },
      { label: 'Tolerância ao frio', rating: 5 },
      { label: 'Necessidade de exercício', rating: 5 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 5 },
      { label: 'Cuidados com a higiene', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '12 a 15 anos' },
      { label: 'Tamanho adulto', value: 'Grande' },
      {
        label: 'Cor',
        value: 'Cinza e branco, preto e branco, marrom e branco'
      },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Altura', value: '53-60cm' },
      { label: 'Peso', value: '20-30kg' }
    ]
  }
};

export default function BreedPage({ params }: { params: { breed: string } }) {
  const breed = breedData[params.breed];

  if (!breed) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Filhotes de ${breed.name}`,
    description: breed.description.replace(/\n/g, ' ').slice(0, 200),
    image: `https://www.ottocanil.com${breed.image}`,
    brand: {
      '@type': 'Brand',
      name: 'Otto Canil'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'BRL',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Otto Canil',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Porto Alegre',
          addressRegion: 'RS',
          addressCountry: 'BR'
        }
      }
    },
    additionalProperty: breed.specs.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value
    }))
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://www.ottocanil.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Filhotes de ${breed.name}`,
        item: `https://www.ottocanil.com/breeds/${params.breed}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="bg-brand-cream-dark border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-brown transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Voltar para todas as raças
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Image + Puppies */}
          <div className="space-y-8">
            <BreedImage
              src={breed.image}
              alt={`${breed.name} - Otto Canil`}
              priority
              className="aspect-square rounded-xl shadow-md"
            />
            <PuppyCarousel breed={params.breed} />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-playfair text-brand-brown mb-2">
                {breed.name}
              </h1>
              <div className="w-12 h-1 bg-brand-gold rounded-full" />
            </div>

            <div className="prose max-w-none">
              {breed.description.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm md:text-base text-foreground/70 leading-relaxed mb-3"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Specs */}
            <div className="bg-brand-cream-dark rounded-xl p-5">
              <h3 className="text-base font-semibold text-brand-brown mb-3">
                Informações da Raça
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {breed.specs.map((spec) => (
                  <div key={spec.label}>
                    <span className="text-xs text-muted-foreground">
                      {spec.label}
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Characteristics */}
            <div>
              <h3 className="text-base font-semibold text-brand-brown mb-3">
                Características
              </h3>
              <div className="space-y-2">
                {breed.characteristics.map((char) => (
                  <div key={char.label} className="flex items-center gap-4">
                    <span className="text-xs md:text-sm w-40 md:w-48 text-foreground/70">
                      {char.label}
                    </span>
                    <RatingDisplay rating={char.rating} />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-brand-brown rounded-xl p-6 text-center space-y-3">
              <h3 className="text-lg font-playfair text-white">
                Quer levar um {breed.name} para casa?
              </h3>
              <p className="text-sm text-white/70">
                Fale conosco e descubra os filhotes disponíveis agora.
              </p>
              <a
                href={`https://wa.me/5551999965953?text=Ol%C3%A1!%20Tenho%20interesse%20em%20filhotes%20de%20${encodeURIComponent(breed.name)}.%20Quais%20est%C3%A3o%20dispon%C3%ADveis%3F`}
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white hover:text-brand-brown px-8 py-3 rounded-full text-base font-bold transition-[background-color,color,transform] duration-200 hover:scale-105 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Quero Meu {breed.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
