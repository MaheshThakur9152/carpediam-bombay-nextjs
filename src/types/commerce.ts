export interface StorefrontVariant {
  id: string;
  title: string;
  material: string;
  size?: string;
  price: number;
  formattedPrice: string;
  inStock: boolean;
}

export interface StorefrontProduct {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'necklaces-pendants' | 'bracelets' | 'rings' | 'earrings' | string;
  collection: string;
  price: number;
  formattedPrice: string;
  currencyCode: string;
  thumbnail: string;
  images: string[];
  variants: StorefrontVariant[];
  materials: string[];
  sizes?: string[];
  details: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface StorefrontCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
}

export interface StorefrontCollection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: string;
}

export interface CartLineItem {
  id: string;
  productId: string;
  variantId: string;
  product: StorefrontProduct;
  variant: StorefrontVariant;
  quantity: number;
}

export interface StorefrontCart {
  id: string;
  items: CartLineItem[];
  subtotal: number;
  formattedSubtotal: string;
  currencyCode: string;
  itemCount: number;
}
