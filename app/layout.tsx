import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter_Tight, Geist_Mono, Noto_Serif_Malayalam } from 'next/font/google';
import './globals.css';
import { EVENT, SITE_URL } from '@/lib/event';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
});

const inter = Inter_Tight({
  variable: '--font-inter',
  subsets: ['latin'],
});

const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const malayalam = Noto_Serif_Malayalam({
  variable: '--font-ml',
  subsets: ['malayalam'],
  weight: ['400'],
});

const title = `ELEVATE’${EVENT.year}: ${EVENT.kind}, ${EVENT.edition}`;
const description = `${EVENT.theme}: ${EVENT.themeSub}. ${EVENT.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ELEVATE’${EVENT.year}` },
  description,
  keywords: [
    'HR Conclave',
    'ELEVATE26',
    'HR Evolve',
    'Trivandrum',
    'Thiruvananthapuram',
    'Technopark',
    'Human Resources',
    'Future of Work',
    'HR Conference 2026',
  ],
  authors: [{ name: 'HR Evolve' }],
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: `ELEVATE’${EVENT.year}`,
    title,
    description,
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'HR Evolve' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/icon-512.png'] },
  robots: { index: true, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: '#0D0D0F',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `ELEVATE’${EVENT.year}: ${EVENT.kind}, ${EVENT.edition}`,
    description,
    ...(EVENT.startsAt && { startDate: EVENT.startsAt }),
    ...(EVENT.endsAt && { endDate: EVENT.endsAt }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: `${EVENT.venue.hall}, ${EVENT.venue.building}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: EVENT.venue.area,
        addressLocality: 'Thiruvananthapuram',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      },
    },
    organizer: { '@type': 'Organization', name: EVENT.organiser.name, url: EVENT.organiser.url },
    ...(EVENT.registerUrl && {
      offers: {
        '@type': 'Offer',
        url: EVENT.registerUrl,
        price: String(EVENT.ticket.price),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    }),
  };

  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable} ${mono.variable} ${malayalam.variable}`}>
      <head>
        {/* Speaker photos / partner logos (Google image CDN) and the event sheet (CSV export) */}
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://docs.google.com" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
