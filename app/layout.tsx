import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ADU Cost Matcher',
  description: 'Reverse ADU cost calculator - set your budget, see what you can build',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
