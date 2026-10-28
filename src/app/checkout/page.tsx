'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../features/cart/CartContext';
import { ShoppingBag, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { cart } = useCart();

  return (
    <div className="bg-[#FAFBFB] min-h-[80vh] py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 p-8 sm:p-12 shadow-xs">
        <Link
          href="/jewelry"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Boutique</span>
        </Link>

        <div className="flex items-center space-x-3 mb-6">
          <ShoppingBag className="w-6 h-6 text-neutral-900" />
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900">
            Checkout Demonstration
          </h1>
        </div>

        {/* Demo Warning Banner */}
        <div className="bg-[#fff8f0] border border-[#f5dfc6] p-5 rounded-xs mb-8 flex items-start space-x-3.5 text-xs text-[#7c440b] leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-[#b45309] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold uppercase tracking-wider text-[11px] mb-1">
              Storefront in Demonstration Mode (COMMERCE_MODE=mock)
            </p>
            <p>
              Real payment processing is deliberately disabled because live MedusaJS backend credentials (URL, publishable key, payment provider) are not yet configured. No payment details will be requested and no real financial transaction will occur.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-neutral-200 pt-6">
          <h2 className="font-serif text-lg font-medium text-neutral-900 mb-4">
            Bag Summary ({cart.itemCount} items)
          </h2>

          {cart.items.length === 0 ? (
            <p className="text-xs text-neutral-500 py-4">Your bag is currently empty.</p>
          ) : (
            <div className="divide-y divide-neutral-100 mb-6">
              {cart.items.map(item => (
                <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-medium text-neutral-900">{item.product.title}</span>
                    <span className="text-neutral-500 block">{item.variant.material} &times; {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-neutral-900">
                    ${(item.variant.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="py-4 flex justify-between items-center text-sm font-semibold border-t border-neutral-200">
                <span>Subtotal</span>
                <span>{cart.formattedSubtotal}</span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-neutral-200 text-center">
            <button
              disabled
              className="w-full py-4 bg-neutral-300 text-neutral-500 text-xs uppercase tracking-widest font-semibold cursor-not-allowed"
            >
              Payment Disabled in Demo Mode
            </button>
            <p className="text-[11px] text-neutral-400 mt-3">
              To enable live order processing, configure `COMMERCE_MODE=medusa` with a verified Medusa v2 server and payment gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
