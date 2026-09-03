import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nandini Ghee Admin Console | Operations & Quality Portal',
  description: 'Enterprise operational dashboard for Nandini Ghee e-commerce brand, Vedic purity certification, orders, catalog and analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080e0a] text-[#f4eee1] antialiased">
        {children}
      </body>
    </html>
  );
}
