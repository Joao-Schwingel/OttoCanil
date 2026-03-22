'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Phone } from 'lucide-react';

const navLinks = [
  { href: '/breeds/shih-tzu', label: 'Shih Tzu' },
  { href: '/breeds/golden-retriver', label: 'Golden Retriever' },
  { href: '/breeds/bulldog-frances', label: 'Bulldog Francês' },
  { href: '/breeds/samoieda', label: 'Samoieda' },
  { href: '/breeds/chihuahua', label: 'Chihuahua' },
  { href: '/breeds/husky-siberiano', label: 'Husky Siberiano' },
  { href: '/breeds/spitz-alemao', label: 'Spitz Alemão' }
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-white lg:hidden cursor-pointer">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <nav className="flex flex-col gap-2 mt-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg py-2 px-3 rounded-md hover:bg-brand-cream-dark transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5551999965953?text=Ol%C3%A1!%20Tenho%20interesse%20em%20filhotes."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-brand-gold text-white px-4 py-3 rounded-full text-base font-semibold cursor-pointer"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Fale Conosco
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
