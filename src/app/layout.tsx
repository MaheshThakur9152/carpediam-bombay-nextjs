import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { CartProvider } from '../features/cart/CartContext';
import { WishlistProvider } from '../features/wishlist/WishlistContext';
import { SearchProvider } from '../features/search/SearchContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ShoppingBagDrawer } from '../features/cart/ShoppingBagDrawer';
import { SearchOverlay } from '../features/search/SearchOverlay';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Carpediam Bombay | Fine Jewelry, High Craft & Bespoke Luxury',
    template: '%s | Carpediam Bombay',
  },
  description: 'Explore Carpediam Bombay fine jewelry, legendary diamonds, and iconic designs crafted with peerless artisan mastery.',
  icons: {
    icon: '/images/carpediam-logo.svg',
  },
  openGraph: {
    title: 'Carpediam Bombay | Fine Jewelry & Bespoke Luxury',
    description: 'Explore Carpediam Bombay fine jewelry, legendary diamonds, and iconic designs.',
    siteName: 'Carpediam Bombay',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#002a2c',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#81D8D0] selection:text-[#002a2c] relative overflow-x-hidden">
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <ShoppingBagDrawer />
              <SearchOverlay />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
