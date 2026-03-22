import type React from 'react';
import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ottocanil.com'),
  title: {
    default: 'Otto Canil - Filhotes de Raça Pura em Porto Alegre',
    template: '%s | Otto Canil'
  },
  description:
    'Canil em Porto Alegre especializado em filhotes de raça pura. Shih Tzu, Golden Retriever, Bulldog Francês, Samoieda, Chihuahua, Husky Siberiano e Spitz Alemão. Criação responsável desde 2019.',
  keywords: [
    'filhotes porto alegre',
    'canil porto alegre',
    'comprar filhote',
    'shih tzu filhote',
    'golden retriever filhote',
    'bulldog frances filhote',
    'samoieda filhote',
    'chihuahua filhote',
    'husky siberiano filhote',
    'spitz alemao filhote',
    'cães de raça pura',
    'canil rio grande do sul',
    'otto canil'
  ],
  authors: [{ name: 'Otto Canil' }],
  creator: 'Otto Canil',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.ottocanil.com',
    siteName: 'Otto Canil',
    title: 'Otto Canil - Filhotes de Raça Pura em Porto Alegre',
    description:
      'Encontre seu companheiro perfeito. Filhotes saudáveis, vacinados e criados com amor.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otto Canil - Filhotes de Raça Pura'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Otto Canil - Filhotes de Raça Pura em Porto Alegre',
    description:
      'Encontre seu companheiro perfeito. Filhotes saudáveis, vacinados e criados com amor.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://www.ottocanil.com'
  },
  verification: {
    // google: 'SEU_CODIGO_AQUI' // Adicionar apos verificar no Google Search Console
  },
  other: {
    'theme-color': '#4A290D'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${montserrat.variable} ${playfair.variable} font-montserrat`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-brand-brown focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Pular para o conteúdo principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
