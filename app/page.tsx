/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Phone, Star, Shield, Heart } from 'lucide-react';
import { ScrollToBreeds } from '@/components/scroll-to-breeds';

export const metadata = {
  title:
    'Otto Canil - Filhotes de Raça Pura em Porto Alegre | Compre com Segurança',
  description:
    'Filhotes saudáveis e de raça pura em Porto Alegre. Shih Tzu, Golden Retriever, Bulldog Francês, Samoieda, Chihuahua, Husky Siberiano e Spitz Alemão. Vacinados, vermifugados e criados com amor desde 2019. Entrega em toda região metropolitana.',
  alternates: {
    canonical: 'https://www.ottocanil.com'
  }
};

const breeds = [
  {
    name: 'Shih Tzu',
    slug: 'shih-tzu',
    image: 'shihtzu',
    tag: 'Companheiro ideal'
  },
  {
    name: 'Golden Retriever',
    slug: 'golden-retriver',
    image: 'goldenretriver',
    tag: 'Amigo da família'
  },
  {
    name: 'Bulldog Francês',
    slug: 'bulldog-frances',
    image: 'bulldogfrances',
    tag: 'Perfeito p/ apto'
  },
  {
    name: 'Samoieda',
    slug: 'samoieda',
    image: 'samoieda',
    tag: 'Sorriso encantador'
  },
  {
    name: 'Chihuahua',
    slug: 'chihuahua',
    image: 'chihuahua',
    tag: 'Pequeno e valente'
  },
  {
    name: 'Husky Siberiano',
    slug: 'husky-siberiano',
    image: 'huskysiberiano',
    tag: 'Aventureiro nato'
  },
  {
    name: 'Spitz Alemão',
    slug: 'spitz-alemao',
    image: 'spitzalemao',
    tag: 'Fofo e animado'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.ottocanil.com',
  name: 'Otto Canil',
  alternateName: 'Otto Hundehütte',
  description:
    'Canil em Porto Alegre especializado em filhotes de raça pura. Criação responsável desde 2019.',
  url: 'https://www.ottocanil.com',
  telephone: '+5551999965953',
  email: 'maluc.schwingel@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Porto Alegre',
    addressRegion: 'RS',
    addressCountry: 'BR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -30.0346,
    longitude: -51.2177
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00'
    }
  ],
  image: 'https://www.ottocanil.com/images/logoCanil.png',
  priceRange: '$$',
  sameAs: ['https://www.instagram.com/ottocanil_/'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '3'
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative bg-brand-brown">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-3xl md:text-5xl font-playfair text-white leading-tight">
                Encontre o{' '}
                <span className="text-brand-gold">companheiro perfeito</span>{' '}
                para sua família
              </h1>
              <p className="text-white/80 text-base md:text-lg max-w-lg">
                Filhotes saudáveis, de raça pura, criados com amor e
                responsabilidade. Todos vacinados, vermifugados e com
                acompanhamento veterinário.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://wa.me/5551999965953?text=Ol%C3%A1!%20Quero%20conhecer%20os%20filhotes%20dispon%C3%ADveis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white hover:text-brand-brown px-8 py-4 rounded-full text-base font-bold transition-[background-color,color,transform] duration-200 hover:scale-105 cursor-pointer"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Quero Meu Filhote
                </a>
                <ScrollToBreeds />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]">
                <div className="absolute inset-0 rounded-full scale-110" />
                <Image
                  src="/images/logoCanil.png"
                  alt="Otto Canil - Criação com amor"
                  width={280}
                  height={280}
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-brand-cream-dark border-y border-brand-gold/20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-6 h-6 text-brand-gold" aria-hidden="true" />
              <span className="text-xs md:text-sm font-medium text-brand-brown">
                Saúde Garantida
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Heart className="w-6 h-6 text-brand-gold" aria-hidden="true" />
              <span className="text-xs md:text-sm font-medium text-brand-brown">
                Criação com Amor
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-6 h-6 text-brand-gold" aria-hidden="true" />
              <span className="text-xs md:text-sm font-medium text-brand-brown">
                Raça Pura
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-6 h-6 text-brand-gold" aria-hidden="true" />
              <span className="text-xs md:text-sm font-medium text-brand-brown">
                Suporte Pós-Venda
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <section
        id="racas"
        className="container mx-auto px-4 py-12 md:py-16 scroll-mt-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-playfair text-brand-brown mb-3">
            Nossas Raças
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Escolha a raça ideal para o seu estilo de vida. Clique para ver os
            filhotes disponíveis e saber mais sobre cada raça.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {breeds.map((breed) => (
            <Link key={breed.slug} href={`/breeds/${breed.slug}`}>
              <Card className="group border-none shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer bg-white">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={`/images/breeds/${breed.image}.jpg`}
                      alt={`Filhotes de ${breed.name} - Otto Canil`}
                      width={400}
                      height={400}
                      className="aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      Ver filhotes
                    </span>
                  </div>
                  <div className="p-3 md:p-4 text-center">
                    <h3 className="text-sm md:text-base font-semibold text-brand-brown">
                      {breed.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {breed.tag}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-brown">
        <div className="container mx-auto px-4 py-10 md:py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair text-white mb-3">
            Apaixonou-se por uma raça?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Entre em contato agora mesmo e descubra quais filhotes estão
            disponíveis. Atendemos Porto Alegre e região metropolitana.
          </p>
          <a
            href="https://wa.me/5551999965953?text=Ol%C3%A1!%20Vi%20o%20site%20e%20quero%20saber%20sobre%20filhotes%20dispon%C3%ADveis."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white hover:text-brand-brown px-8 py-4 rounded-full text-base font-bold transition-[background-color,color,transform] duration-200 hover:scale-105 cursor-pointer"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Consultar Filhotes Disponíveis
          </a>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="relative h-[200px] md:h-[350px] w-full">
        <Image
          src="/images/fullImage.jpg"
          alt="Cães felizes e saudáveis no Otto Canil"
          fill
          sizes="100vw"
          loading="lazy"
          style={{ objectFit: 'cover', objectPosition: '50% 70%' }}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-playfair text-brand-brown mb-3">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-muted-foreground">
            A satisfação de quem já levou um filhote para casa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4 fill-brand-gold text-brand-gold"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm md:text-base text-foreground/80 italic mb-4">
              "Hoje levei a BB no veterinário, e ele me falou pra eu dar
              parabéns a vcs pq a BB está em excelente saúde física, mental...
              Elogiou muito!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-cream-dark flex items-center justify-center">
                <span className="text-brand-brown font-semibold text-sm">
                  C
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-brown">
                  Cliente Satisfeito
                </p>
                <p className="text-xs text-muted-foreground">
                  Tutor de Shih Tzu
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4 fill-brand-gold text-brand-gold"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm md:text-base text-foreground/80 italic mb-4">
              "Lugar incrível, onde os animais são muito bem cuidados e recebem
              muito amor e carinho, recomendo 100%!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-cream-dark flex items-center justify-center">
                <span className="text-brand-brown font-semibold text-sm">
                  C
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-brown">
                  Cliente Satisfeito
                </p>
                <p className="text-xs text-muted-foreground">
                  Visitante do Canil
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4 fill-brand-gold text-brand-gold"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm md:text-base text-foreground/80 italic mb-4">
              "A veterinária ficou impressionada com a pureza... disse que fazia
              tempo que não via um Shih Tzu tão perfeito!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-cream-dark flex items-center justify-center">
                <span className="text-brand-brown font-semibold text-sm">
                  C
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-brown">
                  Cliente Satisfeito
                </p>
                <p className="text-xs text-muted-foreground">
                  Tutor de Shih Tzu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="bg-brand-cream-dark overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-brand-gold font-semibold text-sm uppercase tracking-widest">
              Desde 2019
            </span>
            <h2 className="text-3xl md:text-5xl font-playfair text-brand-brown mt-2 mb-4">
              Nossa História
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
              Uma família unida pelo amor aos animais e pela dedicação à criação
              responsável.
            </p>
          </div>

          {/* Featured Image + Story */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
            {/* Featured Image - Marcos with Samoiedas */}
            <div className="lg:col-span-3 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/nossa_historia3.jpg"
                  alt="Marcos, fundador do Otto Canil, com filhotes de Samoieda"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full h-[300px] md:h-[450px] object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <p className="text-white/90 text-sm md:text-base font-medium">
                    Marcos, fundador do Otto Canil, com seus Samoiedas
                  </p>
                  <p className="text-white/60 text-xs md:text-sm mt-1">
                    O sonho que deu início a tudo
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Story */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative pl-6 border-l-2 border-brand-gold/30">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-brand-gold" />
                <span className="text-brand-gold font-bold text-sm">2019</span>
                <h3 className="text-base md:text-lg font-playfair text-brand-brown mt-1 mb-2">
                  O Início do Sonho
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Marcos inaugurou o Otto Canil, fruto da sua paixão pelos
                  animais e do objetivo de preservar as raças puras, criando um
                  espaço dedicado ao bem-estar e à criação responsável.
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-brand-gold/30">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-brand-gold/60" />
                <span className="text-brand-gold font-bold text-sm">2021</span>
                <h3 className="text-base md:text-lg font-playfair text-brand-brown mt-1 mb-2">
                  Um Legado de Amor
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Marcos faleceu, mas deixou um legado de carinho pelos cães.
                  Seus filhos, igualmente apaixonados, assumiram o canil com o
                  desejo de honrar a memória do pai.
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-brand-gold/30">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-brand-gold" />
                <span className="text-brand-gold font-bold text-sm">Hoje</span>
                <h3 className="text-base md:text-lg font-playfair text-brand-brown mt-1 mb-2">
                  Continuando a Missão
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Determinados a preservar o compromisso com o cuidado e a
                  criação responsável, a família segue tornando o Otto Canil
                  referência para todos os amantes de cães.
                </p>
              </div>
            </div>
          </div>

          {/* Photo Mosaic */}
          <div className="grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4">
            {/* Image 4 - Daughter at farm - wide landscape */}
            <div className="col-span-6 md:col-span-7 relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/images/nossa_historia4.jpg"
                alt="Família cuidando dos filhotes de Samoieda no canil"
                width={700}
                height={400}
                loading="lazy"
                className="w-full h-[200px] md:h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Image 2 - Woman with dog - tall portrait */}
            <div className="col-span-3 md:col-span-2 relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/images/nossa_historia2.jpg"
                alt="Família do Otto Canil com seus cães"
                width={300}
                height={400}
                loading="lazy"
                className="w-full h-[200px] md:h-[280px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Image 1 - Boy relaxing with dogs */}
            <div className="col-span-3 md:col-span-3 relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/images/nossa_historia.jpg"
                alt="Convivência com os cães no espaço do canil"
                width={400}
                height={400}
                loading="lazy"
                className="w-full h-[200px] md:h-[280px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-playfair text-brand-brown mb-3">
          Pronto para encontrar seu novo melhor amigo?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Fale com a gente pelo WhatsApp e tire todas as suas dúvidas. Estamos
          prontos para ajudar você a escolher o filhote ideal.
        </p>
        <a
          href="https://wa.me/5551999965953?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20os%20filhotes%20dispon%C3%ADveis."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand-brown hover:bg-brand-brown-light text-white px-8 py-4 rounded-full text-base font-bold transition-[background-color,transform] duration-200 hover:scale-105 cursor-pointer"
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          Falar com o Otto Canil
        </a>
      </section>
    </div>
  );
}
