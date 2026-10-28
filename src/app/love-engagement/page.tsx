import type { Metadata } from 'next';
import { getProducts } from '../../lib/commerce';
import { LoveEngagementClient } from '../../components/editorial/LoveEngagementClient';

export const metadata: Metadata = {
  title: 'Love & Engagement Rings',
  description: 'Explore the world’s most celebrated engagement rings, diamond bands, and bespoke bridal jewelry by Carpediam Bombay.',
  alternates: {
    canonical: '/love-engagement',
  },
  openGraph: {
    title: 'Love & Engagement Rings | Carpediam Bombay',
    description: 'Explore the world’s most celebrated engagement rings and diamond bands.',
    url: '/love-engagement',
  },
};

export default async function LoveEngagementPage() {
  const allProducts = await getProducts();
  const engagementRings = allProducts.filter(p => p.category === 'rings' || p.collection === 'Carpediam Knot' || p.collection === 'Jean Schlumberger');

  return <LoveEngagementClient engagementRings={engagementRings} />;
}
