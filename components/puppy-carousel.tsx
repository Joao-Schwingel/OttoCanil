'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Dog, Phone } from 'lucide-react';

interface Puppy {
  tags: string[];
  url: string;
  public_id: string;
}

interface PuppyCarouselProps {
  breed: string;
}

function PuppyImage({
  src,
  alt,
  fill = false,
  sizes,
  priority = false,
  className = ''
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-brand-cream-dark animate-pulse rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        style={{ objectFit: 'cover' }}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export function PuppyCarousel({ breed }: PuppyCarouselProps) {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationKey = useRef(0);
  const autoplayDuration = 4000;

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    animationKey.current += 1;
    setCurrentIndex((prev) => (prev === puppies.length - 1 ? 0 : prev + 1));
  }, [puppies.length, isAnimating]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    animationKey.current += 1;
    setCurrentIndex((prev) => (prev === 0 ? puppies.length - 1 : prev - 1));
  }, [puppies.length, isAnimating]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setDirection(index > currentIndex ? 'right' : 'left');
      setIsAnimating(true);
      animationKey.current += 1;
      setCurrentIndex(index);
    },
    [isAnimating, currentIndex]
  );

  useEffect(() => {
    if (!isAutoPlaying || puppies.length <= 1) return;
    const interval = setInterval(goToNext, autoplayDuration);
    return () => clearInterval(interval);
  }, [isAutoPlaying, puppies.length, goToNext]);

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const response = await fetch(`/api/puppies?breed=${breed}`);
        if (response.ok) {
          const data = await response.json();
          const breedPuppies = (data.resources || []).filter((puppy: Puppy) =>
            puppy.tags.some(
              (tag) =>
                tag.toLowerCase().replace(/\s+/g, '-') === breed.toLowerCase()
            )
          );
          setPuppies(breedPuppies);
        }
      } catch (error) {
        console.error('Error fetching puppies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPuppies();
  }, [breed]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
        <div className="text-center mb-5">
          <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-28 bg-gray-100 rounded-lg animate-pulse mx-auto mt-2" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="hidden sm:block w-1/5">
            <div className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
          </div>
          <div className="w-full sm:w-3/5">
            <div className="aspect-square rounded-xl bg-gray-200 animate-pulse" />
          </div>
          <div className="hidden sm:block w-1/5">
            <div className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (puppies.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-border text-center">
        <Dog
          className="w-12 h-12 text-brand-gold mx-auto mb-3"
          aria-hidden="true"
        />
        <h3 className="text-lg font-playfair text-brand-brown mb-2">
          Novos Filhotes em Breve!
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Estamos aguardando novos filhotes desta raça. Cadastre-se para ser
          avisado!
        </p>
        <a
          href={`https://wa.me/5551999965953?text=Ol%C3%A1!%20Quero%20ser%20avisado%20quando%20tiverem%20filhotes%20de%20${breed}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand-brown text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-brown-light transition-colors cursor-pointer"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Avise-me
        </a>
      </div>
    );
  }

  const getPuppyIndex = (index: number) => {
    if (index < 0) return puppies.length - 1;
    if (index >= puppies.length) return 0;
    return index;
  };

  const mainSlideClass = isAnimating
    ? direction === 'right'
      ? 'animate-[slideInRight_0.5s_cubic-bezier(0.16,1,0.3,1)]'
      : 'animate-[slideInLeft_0.5s_cubic-bezier(0.16,1,0.3,1)]'
    : '';

  const badgeClass = isAnimating
    ? 'animate-[badgePop_0.4s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]'
    : '';

  const counterClass = isAnimating
    ? 'animate-[countUp_0.3s_ease-out_0.1s_both]'
    : '';

  return (
    <div
      className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-border/50 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h3 className="text-xl font-playfair text-brand-brown">
          Filhotes Disponíveis
        </h3>
        <p
          key={`count-${currentIndex}`}
          className={`text-xs text-muted-foreground mt-1 ${counterClass}`}
        >
          {currentIndex + 1} de {puppies.length} filhote
          {puppies.length !== 1 ? 's' : ''} desta raça
        </p>
      </div>

      <div className="relative">
        {/* Main carousel area */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {/* Previous thumbnail */}
          {puppies.length > 1 && (
            <button
              onClick={goToPrevious}
              className="hidden sm:block w-1/5 cursor-pointer group"
              aria-label="Filhote anterior"
            >
              <div className="aspect-square relative rounded-xl overflow-hidden opacity-40 group-hover:opacity-70 scale-90 group-hover:scale-95 transition-[opacity,transform] duration-300 shadow-sm">
                <PuppyImage
                  src={puppies[getPuppyIndex(currentIndex - 1)].url}
                  alt="Filhote anterior"
                  fill
                  sizes="15vw"
                  className="rounded-xl"
                />
              </div>
            </button>
          )}

          {/* Main image */}
          <div
            className={`${puppies.length > 1 ? 'w-full sm:w-3/5' : 'w-full sm:w-4/5 mx-auto'} overflow-hidden rounded-xl`}
          >
            <div
              key={animationKey.current}
              className={`aspect-square relative rounded-xl overflow-hidden shadow-md ${mainSlideClass}`}
            >
              <PuppyImage
                src={puppies[currentIndex].url}
                alt="Filhote disponível"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

              {/* Gender badge */}
              <div
                className={`flex absolute left-2.5 top-2.5 items-center px-3 py-1.5 rounded-full backdrop-blur-md z-10 shadow-sm ${
                  puppies[currentIndex].tags[1] === 'M'
                    ? 'bg-blue-500/80 text-white'
                    : 'bg-pink-500/80 text-white'
                } ${badgeClass}`}
              >
                <Dog className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="ml-1.5 text-xs font-semibold">
                  {puppies[currentIndex].tags[1] === 'M' ? 'Macho' : 'Fêmea'}
                </span>
              </div>

              {/* Available badge */}
              <div
                className={`absolute bottom-2.5 right-2.5 bg-brand-gold text-white text-xs font-bold px-3.5 py-1.5 rounded-full z-10 shadow-sm ${badgeClass}`}
              >
                Disponível
              </div>
            </div>
          </div>

          {/* Next thumbnail */}
          {puppies.length > 1 && (
            <button
              onClick={goToNext}
              className="hidden sm:block w-1/5 cursor-pointer group"
              aria-label="Próximo filhote"
            >
              <div className="aspect-square relative rounded-xl overflow-hidden opacity-40 group-hover:opacity-70 scale-90 group-hover:scale-95 transition-[opacity,transform] duration-300 shadow-sm">
                <PuppyImage
                  src={puppies[getPuppyIndex(currentIndex + 1)].url}
                  alt="Próximo filhote"
                  fill
                  sizes="15vw"
                  className="rounded-xl"
                />
              </div>
            </button>
          )}
        </div>

        {/* Arrow buttons (mobile + overlay on desktop) */}
        {puppies.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="sm:hidden absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-[background-color,transform] duration-200 cursor-pointer z-10"
              aria-label="Filhote anterior"
            >
              <ChevronLeft className="w-5 h-5 text-brand-brown" />
            </button>
            <button
              onClick={goToNext}
              className="sm:hidden absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-[background-color,transform] duration-200 cursor-pointer z-10"
              aria-label="Próximo filhote"
            >
              <ChevronRight className="w-5 h-5 text-brand-brown" />
            </button>
          </>
        )}
      </div>

      {/* Dots with progress indicator */}
      {puppies.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-5">
          {puppies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`relative h-2 rounded-full cursor-pointer transition-[width,background-color] duration-300 ${
                index === currentIndex
                  ? 'bg-brand-gold/30 w-8'
                  : 'bg-brand-brown/15 w-2 hover:bg-brand-brown/30'
              }`}
              aria-label={`Ver filhote ${index + 1}`}
            >
              {index === currentIndex && isAutoPlaying && (
                <span
                  key={`progress-${animationKey.current}`}
                  className="absolute inset-y-0 left-0 bg-brand-gold rounded-full"
                  style={{
                    animation: `progressBar ${autoplayDuration}ms linear forwards`
                  }}
                />
              )}
              {index === currentIndex && !isAutoPlaying && (
                <span className="absolute inset-y-0 left-0 right-0 bg-brand-gold rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
