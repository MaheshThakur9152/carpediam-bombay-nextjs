'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck } from 'lucide-react';

export const ShoppingBagDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Focus trap inside drawer when open
  useEffect(() => {
    if (isCartOpen) {
      drawerRef.current?.focus();
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 outline-none animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-neutral-800" />
            <h2 className="font-serif text-lg tracking-wider uppercase font-medium">
              Shopping Bag ({cart.itemCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-neutral-400 hover:text-black transition-colors"
            aria-label="Close shopping bag"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Announcement */}
        <div className="bg-[#f0f9f8] px-5 py-2.5 text-xs text-[#002a2c] flex items-center justify-between border-b border-[#d8ecea]">
          <span>Complimentary shipping & returns</span>
          <span className="font-semibold uppercase tracking-wider text-[10px]">Applied</span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.items.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-neutral-300 mb-3" />
              <p className="font-serif text-lg text-neutral-900">Your shopping bag is empty.</p>
              <p className="text-xs text-neutral-400 mt-1">Discover iconic Carpediam Bombay collections.</p>
              <Link
                href="/jewelry"
                onClick={() => setIsCartOpen(false)}
                className="inline-block mt-6 px-6 py-2.5 bg-black text-white text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors"
              >
                Explore Jewelry
              </Link>
            </div>
          ) : (
            cart.items.map(item => (
              <div key={item.id} className="flex space-x-4 border-b border-neutral-100 pb-5">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover bg-neutral-50 border border-neutral-100 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/products/${item.product.handle}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-serif text-sm font-medium hover:underline leading-tight text-neutral-900"
                      >
                        {item.product.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors ml-2"
                        title="Remove item"
                        aria-label={`Remove ${item.product.title} from bag`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-500 mt-0.5">{item.variant.material}</p>
                    {item.variant.size && (
                      <p className="text-xs text-neutral-400">Size: {item.variant.size}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-neutral-300 rounded-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-neutral-100 transition-colors"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5 text-neutral-600" />
                      </button>
                      <span className="px-2 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-neutral-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 text-neutral-600" />
                      </button>
                    </div>

                    <span className="font-serif text-sm font-semibold text-neutral-900">
                      ${(item.variant.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout */}
        {cart.items.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-600 uppercase tracking-wider text-xs">Estimated Subtotal</span>
              <span className="font-serif text-lg font-bold text-neutral-900">
                {cart.formattedSubtotal}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-[#008080]" />
              <span>Complimentary signature Carpediam Blue Box® packaging</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors text-center cursor-pointer shadow-sm"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
