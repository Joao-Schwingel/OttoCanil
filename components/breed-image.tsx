'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BreedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function BreedImage({
  src,
  alt,
  priority = false,
  className = ''
}: BreedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-brand-cream-dark animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        priority={priority}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
