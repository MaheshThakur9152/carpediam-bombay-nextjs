import { describe, it, expect } from 'vitest';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS } from '../../src/lib/data/mock-products';
import { getProductByHandle, getProducts } from '../../src/lib/commerce';

describe('Catalog Integrity & Mock Commerce Provider', () => {
  it('contains exactly 11 verified luxury jewelry products', () => {
    expect(MOCK_PRODUCTS).toHaveLength(11);
  });

  it('guarantees unique IDs and valid handles across all products', () => {
    const ids = MOCK_PRODUCTS.map(p => p.id);
    const handles = MOCK_PRODUCTS.map(p => p.handle);

    expect(new Set(ids).size).toBe(MOCK_PRODUCTS.length);
    expect(new Set(handles).size).toBe(MOCK_PRODUCTS.length);
  });

  it('ensures every product has at least one selectable variant with positive pricing', () => {
    for (const product of MOCK_PRODUCTS) {
      expect(product.price).toBeGreaterThan(0);
      expect(product.variants.length).toBeGreaterThanOrEqual(1);
      expect(product.thumbnail).toMatch(/^\/images\//);
      expect(product.images.length).toBeGreaterThanOrEqual(1);
      for (const variant of product.variants) {
        expect(variant.id).toBeDefined();
        expect(variant.price).toBeGreaterThan(0);
        expect(variant.material).toBeTruthy();
      }
    }
  });

  it('retrieves products by handle accurately', async () => {
    const prod = await getProductByHandle('smile-pendant-gold');
    expect(prod).not.toBeNull();
    expect(prod?.title).toBe('Carpediam T Smile Pendant');
    expect(prod?.category).toBe('necklaces-pendants');

    const notFound = await getProductByHandle('unknown-handle-xyz');
    expect(notFound).toBeNull();
  });

  it('filters products by category accurately', async () => {
    const rings = await getProducts({ category: 'rings' });
    expect(rings.length).toBeGreaterThan(0);
    for (const r of rings) {
      expect(r.category).toBe('rings');
    }
  });

  it('provides all 4 core jewelry categories and 5 collections', () => {
    expect(MOCK_CATEGORIES).toHaveLength(4);
    expect(MOCK_COLLECTIONS).toHaveLength(5);
  });
});
