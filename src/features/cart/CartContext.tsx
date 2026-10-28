'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { StorefrontProduct, StorefrontVariant, CartLineItem, StorefrontCart } from '../../types/commerce';

interface CartContextType {
  cart: StorefrontCart;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: StorefrontProduct, variant: StorefrontVariant, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeFromCart: (lineId: string) => void;
  clearCart: () => void;
}

function calculateCart(items: CartLineItem[]): StorefrontCart {
  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    id: 'cart_local',
    items,
    subtotal,
    formattedSubtotal: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal),
    currencyCode: 'USD',
    itemCount,
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartLineItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('carpediam_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('carpediam_cart_items', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [items]);

  const addToCart = (product: StorefrontProduct, variant: StorefrontVariant, quantity = 1) => {
    setItems(prev => {
      const lineId = `${product.id}_${variant.id}`;
      const existingIdx = prev.findIndex(item => item.id === lineId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { id: lineId, productId: product.id, variantId: variant.id, product, variant, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(lineId);
      return;
    }
    setItems(prev => prev.map(item => item.id === lineId ? { ...item, quantity } : item));
  };

  const removeFromCart = (lineId: string) => {
    setItems(prev => prev.filter(item => item.id !== lineId));
  };

  const clearCart = () => setItems([]);

  const cart = calculateCart(items);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
