import type { Metadata } from 'next';
import { getProducts } from '../../lib/commerce';
import { CategoryPageClient } from '../../components/product/CategoryPageClient';

export const metadata: Metadata = {
  title: 'Fine Jewelry & Luxury Collections',
  description: 'Explore the full Carpediam Bombay fine jewelry catalog, including iconic gold necklaces, diamond rings, and artisan bracelets.',
  alternates: {
    canonical: '/jewelry',
  },
  openGraph: {
    title: 'Fine Jewelry & Luxury Collections | Carpediam Bombay',
    description: 'Explore the full Carpediam Bombay fine jewelry catalog.',
    url: '/jewelry',
  },
};

export default async function JewelryPage() {
  const products = await getProducts();

  return (
    <CategoryPageClient
      categoryTitle="Fine Jewelry"
      products={products}
    />
  );
}
