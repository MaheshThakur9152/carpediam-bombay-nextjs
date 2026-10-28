import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByHandle, getProducts } from '../../../lib/commerce';
import { ProductDetailClient } from '../../../components/product/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    alternates: {
      canonical: `/products/${product.handle}`,
    },
    openGraph: {
      title: `${product.title} | Carpediam Bombay`,
      description: product.subtitle || product.description.slice(0, 160),
      url: `/products/${product.handle}`,
      images: [
        {
          url: product.thumbnail,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const related = allProducts.filter(p => p.id !== product.id && p.category === product.category);

  // Truthful JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'Carpediam Bombay',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currencyCode || 'USD',
      availability: 'https://schema.org/InStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products/${product.handle}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={related.length > 0 ? related : allProducts.filter(p => p.id !== product.id).slice(0, 4)}
      />
    </>
  );
}
