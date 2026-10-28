'use client';

import React, { useRef } from 'react';
import type { StorefrontProduct } from '../../types/commerce';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: StorefrontProduct[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, subtitle, products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 max-w-[1440px] mx-auto px-6 sm:px-12 border-t border-neutral-100">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs text-neutral-500 font-light tracking-wide">{subtitle}</p>
          )}
        </div>

        {/* Carousel Arrows */}
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 border border-neutral-200 rounded-full hover:border-black transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 border border-neutral-200 rounded-full hover:border-black transition-colors"
            aria-label="Next products"
          >
            <ChevronRight className="w-4 h-4 text-neutral-700" />
          </button>
        </div>
      </div>

      {/* Scrolling Strip */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
      >
        {products.map(prod => (
          <div key={prod.id} className="w-[280px] flex-shrink-0">
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </section>
  );
};
