import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StructuredData, FAQStructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'ADU Cost Matcher - Reverse ADU Cost Calculator',
  description: 'Calculate ADU costs in seconds. Set your budget per sqft and see exactly what features, materials, and finishes you can build. No design surprises.',
  keywords: ['ADU', 'ADU calculator', 'accessory dwelling unit', 'cost calculator', 'construction cost', 'home addition'],
  authors: [{ name: 'ADU Cost Matcher' }],
  openGraph: {
    type: 'website',
    url: 'https://adu-cost-matcher.vercel.app',
    title: 'ADU Cost Matcher - Reverse ADU Cost Calculator',
    description: 'Calculate ADU costs in seconds. Set your budget per sqft and see exactly what features, materials, and finishes you can build.',
    images: [
      {
        url: 'https://adu-cost-matcher.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ADU Cost Matcher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADU Cost Matcher - Reverse ADU Cost Calculator',
    description: 'Calculate ADU costs in seconds. Set your budget per sqft and see exactly what features and finishes you can build.',
    images: ['https://adu-cost-matcher.vercel.app/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <FAQStructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
