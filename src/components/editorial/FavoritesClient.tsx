'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '../../features/wishlist/WishlistContext';
import { MOCK_PRODUCTS } from '../../lib/data/mock-products';
import { ProductCard } from '../product/ProductCard';
import { Heart } from 'lucide-react';

export const FavoritesClient: React.FC = () => {
  const { favorites } = useWishlist();

  const favoriteProducts = MOCK_PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="pt-12 pb-8 text-center max-w-4xl mx-auto px-4 border-b border-neutral-100">
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-900 tracking-tight">
          Client Wishlist
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto">
          Your saved Carpediam Bombay designs. Keep track of your most cherished pieces for special celebrations or future acquisitions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 stroke-1 text-neutral-300 mx-auto mb-4" />
            <h2 className="font-serif text-xl text-neutral-900">Your wishlist is currently empty</h2>
            <p className="text-xs text-neutral-400 mt-2 max-w-sm mx-auto">
              Save your favorite rings, necklaces, and iconic high jewelry creations by clicking the heart icon on any product.
            </p>
            <Link
              href="/jewelry"
              className="inline-block mt-6 px-8 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Discover Fine Jewelry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
