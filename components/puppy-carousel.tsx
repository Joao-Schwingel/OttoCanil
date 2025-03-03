'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Puppy {
  tags: string[]
  url: string
  public_id: string
}

interface PuppyCarouselProps {
  breed: string
}

export function PuppyCarousel({ breed }: PuppyCarouselProps) {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const response = await fetch('/api/puppies');
        if (response.ok) {
          const data = await response.json();
          const breedPuppies = data.resources.filter((puppy: Puppy) => 
            puppy.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === breed.toLowerCase())
          );
          setPuppies(breedPuppies);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch puppies:', errorData);
        }
      } catch (error) {
        console.error('Error fetching puppies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPuppies();
  }, []); // Removed unnecessary breed dependency

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? puppies.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === puppies.length - 1 ? 0 : prevIndex + 1));
  };

  if (isLoading) {
    return (
      <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Carregando filhotes...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && puppies.length === 0) {
    return (
      <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Filhotes em Breve!</h3>
          <p className="text-gray-500">Estamos aguardando novos filhotes desta raça.</p>
        </div>
      </div>
    );
  }

  const getPuppyIndex = (index: number) => {
    if (index < 0) {
      return puppies.length - 1;
    }
    if (index >= puppies.length) {
      return 0;
    }
    return index;
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="relative w-full">
          <div className='flex items-center w-full justify-center'>
            <div className='absolute h-1 w-full bg-[#253c3c]'></div>
            <h3 className='relative justify-self-center font-serif text-2xl bg-white'>FILHOTES</h3>
          </div>
          <div className="flex items-center justify-center gap-4">
            {/* Previous Puppy (Partially Visible) */}
            <div className="block w-1/4 opacity-50">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={puppies[getPuppyIndex(currentIndex - 1)].url || '/placeholder.svg'}
                  alt={`${breed} puppy`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transform scale-95 rounded-lg "
                />
              </div>
            </div>

            {/* Current Puppy */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="w-full md:w-1/2"
              >
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={puppies[currentIndex].url || '/placeholder.svg'}
                    alt={`${breed} puppy`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next Puppy (Partially Visible) */}
            <div className="block w-1/4 opacity-50">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={puppies[getPuppyIndex(currentIndex + 1)].url || '/placeholder.svg'}
                  alt={`${breed} puppy`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transform scale-95 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {puppies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

