import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getCategoryBySlug, getCategories } from '../../../lib/commerce';
import { CategoryPageClient } from '../../../components/product/CategoryPageClient';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(cat => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return {};

  return {
    title: cat.name,
    description: `Discover Carpediam Bombay ${cat.name.toLowerCase()}, handcrafted in gold, platinum, and brilliant diamonds.`,
    alternates: {
      canonical: `/jewelry/${cat.slug}`,
    },
    openGraph: {
      title: `${cat.name} | Carpediam Bombay`,
      description: `Discover Carpediam Bombay ${cat.name.toLowerCase()}.`,
      url: `/jewelry/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);

  if (!cat) {
    notFound();
  }

  const products = await getProducts({ category });

  return (
    <CategoryPageClient
      categorySlug={category}
      categoryTitle={cat.name}
      products={products}
    />
  );
}
