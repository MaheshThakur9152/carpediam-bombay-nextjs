import type { Metadata } from 'next';
import { FavoritesClient } from '../../components/editorial/FavoritesClient';

export const metadata: Metadata = {
  title: 'Client Wishlist',
  description: 'View your saved Carpediam Bombay fine jewelry creations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
