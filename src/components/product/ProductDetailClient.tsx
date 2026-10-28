'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { StorefrontProduct, StorefrontVariant } from '../../types/commerce';
import { useCart } from '../../features/cart/CartContext';
import { useWishlist } from '../../features/wishlist/WishlistContext';
import { ProductCarousel } from './ProductCarousel';
import { Heart, ShoppingBag, ChevronDown, ChevronUp, MapPin, Check } from 'lucide-react';

interface ProductDetailClientProps {
  product: StorefrontProduct;
  relatedProducts: StorefrontProduct[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product, relatedProducts }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();

  const [activeImage, setActiveImage] = useState<string>(product.thumbnail);
  const [selectedVariant, setSelectedVariant] = useState<StorefrontVariant>(product.variants[0] || {
    id: `${product.id}_default`,
    title: 'Standard',
    material: product.materials[0] || 'Standard',
    price: product.price,
    formattedPrice: product.formattedPrice,
    inStock: true,
  });

  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');
  const [addedNotice, setAddedNotice] = useState(false);

  const favorited = isFavorite(product.id);
  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const handleSelectMaterial = (mat: string) => {
    // Find matching variant
    const match = product.variants.find(v => v.material === mat) || product.variants[0];
    if (match) setSelectedVariant(match);
  };

  const handleSelectSize = (sz: string) => {
    const match = product.variants.find(v => v.size === sz && v.material === selectedVariant.material) ||
                  product.variants.find(v => v.size === sz) ||
                  selectedVariant;
    setSelectedVariant(match);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100">
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-widest text-neutral-400 flex items-center space-x-2">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href={`/jewelry/${product.category}`} className="hover:text-black capitalize">
            {product.category.replace('-', ' & ')}
          </Link>
          <span>/</span>
          <span className="text-black font-semibold truncate max-w-xs">{product.title}</span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Gallery (7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 border bg-neutral-50 overflow-hidden flex-shrink-0 transition-all ${
                    activeImage === img ? 'border-black ring-1 ring-black' : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View image thumbnail ${i + 1}`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 bg-[#FAFBFB] border border-neutral-100 aspect-square overflow-hidden relative">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[10px] font-semibold tracking-widest uppercase border border-neutral-200">
                  {product.collection}
                </span>
              </div>
            </div>
          </div>

          {/* Right Product Details Info (5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              {product.collection}
            </span>

            <h1 className="mt-2 font-serif text-2xl sm:text-4xl font-normal text-neutral-900 leading-tight">
              {product.title}
            </h1>

            <p className="mt-1 text-xs text-neutral-500 font-light">{product.subtitle}</p>

            {/* Price dynamically reflects chosen variant */}
            <p className="mt-4 font-serif text-2xl font-semibold text-neutral-900">
              {selectedVariant.formattedPrice}
            </p>

            {/* Metal Variant Selector */}
            {product.materials.length > 0 && (
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <label className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-2">
                  Material: <span className="font-normal text-neutral-900">{selectedVariant.material}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map(mat => (
                    <button
                      key={mat}
                      onClick={() => handleSelectMaterial(mat)}
                      className={`px-3.5 py-2 text-xs border tracking-wider transition-all ${
                        selectedVariant.material === mat
                          ? 'border-black bg-neutral-900 text-white font-medium shadow-xs'
                          : 'border-neutral-300 text-neutral-700 hover:border-black bg-white'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector if available */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-600 font-semibold">
                    Size: <span className="font-normal text-neutral-900">{selectedVariant.size || product.sizes[0]}</span>
                  </label>
                  <Link
                    href="/stores"
                    className="text-[11px] underline text-neutral-500 hover:text-black"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => handleSelectSize(sz)}
                      className={`px-3.5 py-2 text-xs border tracking-wider transition-all ${
                        selectedVariant.size === sz
                          ? 'border-black bg-neutral-900 text-white font-medium shadow-xs'
                          : 'border-neutral-300 text-neutral-700 hover:border-black bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs: Add to Bag + Wishlist */}
            <div className="mt-8 space-y-3">
              <button
                data-testid="add-to-bag-button"
                onClick={handleAddToCart}
                className="w-full py-4 bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center space-x-2"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#81D8D0]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleFavorite(product.id)}
                className={`w-full py-3.5 border text-xs font-medium uppercase tracking-[0.15em] flex items-center justify-center space-x-2 transition-colors ${
                  favorited
                    ? 'border-red-300 text-red-600 bg-red-50/30'
                    : 'border-neutral-300 text-neutral-700 hover:border-black bg-white'
                }`}
                aria-label={favorited ? 'Saved in client wishlist' : 'Save to client wishlist'}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current text-red-500' : ''}`} />
                <span>{favorited ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>

            {/* In-Store Consultation link */}
            <div className="mt-6 p-4 bg-[#f0f9f8] border border-[#d8ecea] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-[#008080]" />
                <span className="text-xs text-neutral-800">Experience this piece at a Carpediam boutique</span>
              </div>
              <Link
                href="/stores"
                className="text-[11px] font-semibold text-[#008080] uppercase tracking-wider hover:underline"
              >
                Book Appointment
              </Link>
            </div>

            {/* Accordions */}
            <div className="mt-8 border-t border-neutral-200 divide-y divide-neutral-200">
              {/* Description Accordion */}
              <div>
                <button
                  onClick={() => toggleAccordion('desc')}
                  className="w-full py-4 flex justify-between items-center text-left text-xs uppercase tracking-wider font-semibold text-neutral-900"
                >
                  <span>Description & Details</span>
                  {openAccordion === 'desc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'desc' && (
                  <div className="pb-4 text-xs text-neutral-600 space-y-3 leading-relaxed">
                    <p>{product.description}</p>
                    {product.details && product.details.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-neutral-500 pt-2">
                        {product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Complimentary Care Accordion */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-4 flex justify-between items-center text-left text-xs uppercase tracking-wider font-semibold text-neutral-900"
                >
                  <span>Complimentary Care & Cleaning</span>
                  {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 text-xs text-neutral-600 space-y-2 leading-relaxed">
                    <p>Carpediam Bombay offers complimentary cleaning services for a lifetime on all jewelry crafted by our master artisans.</p>
                    <p>Clean regularly with a soft polishing cloth. Avoid exposing gemstones to chlorine, salt water, or harsh chemicals.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      <ProductCarousel
        title="You May Also Like"
        subtitle="Complementary designs from the Carpediam ateliers"
        products={relatedProducts}
      />
    </div>
  );
};
