import Link from 'next/link';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const MobileNav = dynamic(
  () => import('@/components/mobile-nav').then((mod) => mod.MobileNav),
  {
    loading: () => (
      <div className="lg:hidden w-10 h-10 rounded-md bg-white/10 animate-pulse" />
    ),
    ssr: false
  }
);

const navLinks = [
  { href: '/breeds/shih-tzu', label: 'Shih Tzu' },
  { href: '/breeds/golden-retriver', label: 'Golden Retriever' },
  { href: '/breeds/bulldog-frances', label: 'Bulldog Francês' },
  { href: '/breeds/samoieda', label: 'Samoieda' },
  { href: '/breeds/chihuahua', label: 'Chihuahua' },
  { href: '/breeds/husky-siberiano', label: 'Husky Siberiano' },
  { href: '/breeds/spitz-alemao', label: 'Spitz Alemão' }
];

export function Header() {
  return (
    <header className="bg-brand-brown text-white sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl md:text-2xl font-playfair hover:text-brand-gold-light transition-colors flex items-center justify-start gap-2 cursor-pointer"
          >
            <Image
              src="/images/logoCanil.png"
              alt="Otto Canil logo"
              width={44}
              height={44}
            />
            <span className="hidden sm:inline">Otto Hundeh&uuml;tte</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/80 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5551999965953?text=Ol%C3%A1!%20Tenho%20interesse%20em%20filhotes."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white hover:text-brand-brown px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Contato
            </a>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
