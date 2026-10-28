'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { StorefrontProduct } from '../../types/commerce';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';

interface CategoryPageClientProps {
  categorySlug?: string;
  categoryTitle: string;
  products: StorefrontProduct[];
}

export const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  categorySlug,
  categoryTitle,
  products
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const curationTiles = [
    { title: 'EVERYDAY DIAMONDS', image: '/images/img_29.jpg' },
    { title: 'CHAIN', image: '/images/img_26.jpg' },
    { title: 'LAYERING', image: '/images/img_27.jpg' },
    { title: 'BOLD', image: '/images/img_26.jpg' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(prod => {
      if (selectedMaterial !== 'All') {
        const hasMat = prod.materials.some(m => m.toLowerCase().includes(selectedMaterial.toLowerCase()));
        if (!hasMat) return false;
      }
      if (selectedCollection !== 'All') {
        if (prod.collection !== selectedCollection) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedMaterial, selectedCollection, sortBy]);

  const materialsList = ['All', 'Yellow Gold', 'Platinum', 'Rose Gold', 'Diamonds'];
  const collectionsList = ['All', 'Carpediam HardWear', 'Carpediam T', 'Carpediam Knot', 'Carpediam Lock', 'Jean Schlumberger'];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header */}
      <div className="pt-12 pb-8 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-900 tracking-tight">
          {categoryTitle}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto">
          Exceptional pieces crafted with legendary attention to detail. Discover iconic signatures and timeless luxury designs.
        </p>

        {/* Subcategory Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-wider font-medium">
          <Link
            href="/jewelry"
            className={`px-4 py-2 border transition-colors ${
              !categorySlug ? 'border-black bg-black text-white' : 'border-neutral-200 text-neutral-700 hover:border-black'
            }`}
          >
            All Jewelry
          </Link>
          <Link
            href="/jewelry/necklaces-pendants"
            className={`px-4 py-2 border transition-colors ${
              categorySlug === 'necklaces-pendants' ? 'border-black bg-black text-white' : 'border-neutral-200 text-neutral-700 hover:border-black'
            }`}
          >
            Necklaces & Pendants
          </Link>
          <Link
            href="/jewelry/bracelets"
            className={`px-4 py-2 border transition-colors ${
              categorySlug === 'bracelets' ? 'border-black bg-black text-white' : 'border-neutral-200 text-neutral-700 hover:border-black'
            }`}
          >
            Bracelets
          </Link>
          <Link
            href="/jewelry/rings"
            className={`px-4 py-2 border transition-colors ${
              categorySlug === 'rings' ? 'border-black bg-black text-white' : 'border-neutral-200 text-neutral-700 hover:border-black'
            }`}
          >
            Rings
          </Link>
          <Link
            href="/jewelry/earrings"
            className={`px-4 py-2 border transition-colors ${
              categorySlug === 'earrings' ? 'border-black bg-black text-white' : 'border-neutral-200 text-neutral-700 hover:border-black'
            }`}
          >
            Earrings
          </Link>
        </div>
      </div>

      {/* Curation Visual Tiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {curationTiles.map(tile => (
            <div key={tile.title} className="relative aspect-square overflow-hidden group cursor-pointer border border-neutral-100">
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                <span className="text-white font-serif text-xs sm:text-sm tracking-widest font-medium uppercase drop-shadow-xs">
                  {tile.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-xs border-y border-neutral-200 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs tracking-wider uppercase font-medium">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="flex items-center space-x-2 text-neutral-800 hover:text-black"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter ({selectedMaterial !== 'All' || selectedCollection !== 'All' ? 'Active' : 'All'})</span>
            </button>
            <span className="text-neutral-400 hidden sm:inline">|</span>
            <span className="text-neutral-500 font-normal hidden sm:inline">
              {filteredProducts.length} Designs
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-neutral-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs uppercase tracking-wider font-medium text-neutral-800 border-none outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Collapsible Filter Tray */}
        {filterDrawerOpen && (
          <div className="max-w-7xl mx-auto pt-4 pb-2 border-t border-neutral-100 mt-3 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                Material / Metal
              </span>
              <div className="flex flex-wrap gap-2">
                {materialsList.map(mat => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-3 py-1.5 text-[11px] border transition-colors ${
                      selectedMaterial === mat
                        ? 'border-black bg-black text-white font-medium'
                        : 'border-neutral-200 text-neutral-600 hover:border-black'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                Collection
              </span>
              <div className="flex flex-wrap gap-2">
                {collectionsList.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={`px-3 py-1.5 text-[11px] border transition-colors ${
                      selectedCollection === col
                        ? 'border-black bg-black text-white font-medium'
                        : 'border-neutral-200 text-neutral-600 hover:border-black'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-serif text-xl text-neutral-900">No matching designs found</h3>
            <p className="text-xs text-neutral-500 mt-2">Try adjusting or clearing your filters to view more items.</p>
            <button
              onClick={() => {
                setSelectedMaterial('All');
                setSelectedCollection('All');
              }}
              className="mt-6 px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
