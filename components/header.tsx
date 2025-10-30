'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#4A290D] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl md:text-2xl font-serif hover:text-gray-200 transition-colors flex items-center justify-start gap-2"
          >
            <Image
              src={'/images/logoCanil.png'}
              alt={'logo'}
              width={52}
              height={52}
            ></Image>
            Otto Hundehütte
          </Link>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/breeds/shih-tzu"
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  Shih Tzu
                </Link>
                <Link
                  href="/breeds/golden"
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  Golden Retriver
                </Link>
                <Link
                  href="/breeds/bulldog-frances"
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  Bulldog Francês
                </Link>
                <Link
                  href="/breeds/samoieda"
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  Samoieda
                </Link>
                <Link
                  href="/breeds/chihuahua"
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  Chihuahua
                </Link>
                <Link
                  href="/breeds/husky-siberiano"
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  Husky Siberiano
                </Link>
                <Link
                  href="/breeds/spitz-alemao"
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  Spitz Alemão
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
