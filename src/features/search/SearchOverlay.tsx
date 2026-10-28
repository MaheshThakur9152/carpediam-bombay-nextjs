'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearch } from './SearchContext';
import { Search, X } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../lib/data/mock-products';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Smile', 'HardWear', 'Diamond Ring', 'Gold', 'Wedding Bands', 'Schlumberger'];

  const results = searchQuery.trim() === '' ? [] : MOCK_PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
    >
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center pb-6 border-b border-neutral-300">
          <div className="flex items-center space-x-3 flex-1">
            <Search className="w-6 h-6 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for jewelry, gifts, or collections..."
              className="w-full text-xl sm:text-2xl font-serif outline-none placeholder-neutral-400 bg-transparent text-neutral-900"
              aria-label="Search query"
            />
          </div>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
            className="p-2 text-neutral-500 hover:text-black transition-colors"
            aria-label="Close search overlay"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Quick searches */}
        {searchQuery.trim() === '' && (
          <div className="mt-8">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-4">
              Trending Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(term => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 border border-neutral-200 text-xs tracking-wider rounded-full hover:border-black hover:bg-neutral-50 transition-colors text-neutral-800"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {searchQuery.trim() !== '' && (
          <div className="mt-8">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-6">
              Search Results ({results.length})
            </p>

            {results.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                <p className="font-serif text-lg">No results found for &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs text-neutral-400 mt-2">Try checking your spelling or searching for a collection like &ldquo;HardWear&rdquo; or &ldquo;T&rdquo;.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map(prod => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.handle}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex space-x-4 p-3 border border-neutral-100 hover:border-neutral-300 transition-colors group bg-white"
                  >
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="w-16 h-16 object-cover bg-neutral-50 border border-neutral-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block truncate">
                        {prod.collection}
                      </span>
                      <h4 className="font-serif text-xs font-medium text-neutral-900 group-hover:underline truncate mt-0.5">
                        {prod.title}
                      </h4>
                      <p className="text-xs font-semibold text-neutral-900 mt-1">
                        {prod.formattedPrice}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
