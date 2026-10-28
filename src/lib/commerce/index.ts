import { getConfig } from '../config/env';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS } from '../data/mock-products';
import { getMedusaClient } from '../medusa/client';
import { mapMedusaProductToStorefront } from '../medusa/adapter';
import type { StorefrontProduct, StorefrontCategory, StorefrontCollection } from '../../types/commerce';

export interface ProductQueryParams {
  category?: string;
  collection?: string;
  search?: string;
  limit?: number;
}

export async function getProducts(params?: ProductQueryParams): Promise<StorefrontProduct[]> {
  const config = getConfig();

  if (config.commerceMode === 'medusa') {
    const medusa = getMedusaClient();
    try {
      const response = await medusa.store.product.list({
        limit: params?.limit || 50,
        q: params?.search,
        category_id: params?.category ? [params.category] : undefined,
      });
      return (response.products || []).map((p: any) => mapMedusaProductToStorefront(p));
    } catch (error) {
      console.error('[Medusa API Error] Failed to list products:', error);
      throw error;
    }
  }

  // COMMERCE_MODE=mock
  let products = [...MOCK_PRODUCTS];

  if (params?.category) {
    products = products.filter(p => p.category === params.category);
  }

  if (params?.collection) {
    products = products.filter(p => p.collection.toLowerCase().includes(params.collection!.toLowerCase()));
  }

  if (params?.search) {
    const query = params.search.toLowerCase().trim();
    products = products.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.collection.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  if (params?.limit) {
    products = products.slice(0, params.limit);
  }

  return products;
}

export async function getProductByHandle(handle: string): Promise<StorefrontProduct | null> {
  const config = getConfig();

  if (config.commerceMode === 'medusa') {
    const medusa = getMedusaClient();
    try {
      const response = await medusa.store.product.list({
        handle: handle,
        limit: 1,
      });
      const raw = response.products?.[0];
      return raw ? mapMedusaProductToStorefront(raw) : null;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to get product "${handle}":`, error);
      throw error;
    }
  }

  const found = MOCK_PRODUCTS.find(p => p.handle === handle || p.id === handle);
  return found || null;
}

export async function getCategories(): Promise<StorefrontCategory[]> {
  const config = getConfig();

  if (config.commerceMode === 'medusa') {
    const medusa = getMedusaClient();
    try {
      const response = await medusa.store.category.list({});
      return (response.product_categories || []).map((c: any) => ({
        id: c.id,
        slug: c.handle,
        name: c.name,
        description: c.description,
      }));
    } catch (error) {
      console.error('[Medusa API Error] Failed to get categories:', error);
      throw error;
    }
  }

  return MOCK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<StorefrontCategory | null> {
  const categories = await getCategories();
  return categories.find(c => c.slug === slug) || null;
}

export async function getCollections(): Promise<StorefrontCollection[]> {
  const config = getConfig();

  if (config.commerceMode === 'medusa') {
    const medusa = getMedusaClient();
    try {
      const response = await medusa.store.collection.list({});
      return (response.collections || []).map((c: any) => ({
        id: c.id,
        handle: c.handle,
        title: c.title,
      }));
    } catch (error) {
      console.error('[Medusa API Error] Failed to get collections:', error);
      throw error;
    }
  }

  return MOCK_COLLECTIONS;
}
