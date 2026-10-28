import { describe, it, expect } from 'vitest';
import { mapMedusaProductToStorefront } from '../../src/lib/medusa/adapter';

describe('Medusa Commerce Adapter', () => {
  it('correctly maps raw Medusa v2 product to StorefrontProduct model', () => {
    const rawMedusaProduct = {
      id: 'prod_medusa_001',
      title: 'Solitaire Platinum Ring',
      handle: 'solitaire-platinum-ring',
      subtitle: 'Handcrafted in Platinum',
      description: 'Iconic six-prong diamond solitaire setting.',
      thumbnail: 'https://images.example.com/ring-thumb.jpg',
      images: [
        { url: 'https://images.example.com/ring-thumb.jpg' },
        { url: 'https://images.example.com/ring-sec.jpg' },
      ],
      categories: [{ handle: 'rings' }],
      collection: { title: 'Carpediam Knot' },
      variants: [
        {
          id: 'variant_01',
          title: 'Platinum / Size 6.0',
          calculated_price: { calculated_amount: 18500 },
          options: [
            { option: { title: 'Material' }, value: 'Platinum' },
            { option: { title: 'Size' }, value: '6.0' },
          ],
          inventory_quantity: 5,
        },
        {
          id: 'variant_02',
          title: '18k Yellow Gold / Size 6.0',
          calculated_price: { calculated_amount: 17200 },
          options: [
            { option: { title: 'Material' }, value: '18k Yellow Gold' },
            { option: { title: 'Size' }, value: '6.0' },
          ],
          inventory_quantity: 0,
        },
      ],
      metadata: {
        isFeatured: true,
        details: ['Six-prong setting', 'Triple Excellent cut'],
      },
    };

    const storefrontProduct = mapMedusaProductToStorefront(rawMedusaProduct, 'USD');

    expect(storefrontProduct.id).toBe('prod_medusa_001');
    expect(storefrontProduct.handle).toBe('solitaire-platinum-ring');
    expect(storefrontProduct.title).toBe('Solitaire Platinum Ring');
    expect(storefrontProduct.category).toBe('rings');
    expect(storefrontProduct.collection).toBe('Carpediam Knot');
    expect(storefrontProduct.price).toBe(18500);
    expect(storefrontProduct.formattedPrice).toBe('$18,500.00');
    expect(storefrontProduct.images).toHaveLength(2);
    expect(storefrontProduct.materials).toContain('Platinum');
    expect(storefrontProduct.materials).toContain('18k Yellow Gold');
    expect(storefrontProduct.sizes).toContain('6.0');
    expect(storefrontProduct.details).toHaveLength(2);

    // Variant mapping checks
    expect(storefrontProduct.variants).toHaveLength(2);
    expect(storefrontProduct.variants[0].inStock).toBe(true);
    expect(storefrontProduct.variants[1].inStock).toBe(false);
    expect(storefrontProduct.variants[1].price).toBe(17200);
  });

  it('handles empty options, prices, and missing image fallbacks gracefully', () => {
    const rawMinimal = {
      id: 'prod_min_002',
      title: 'Minimal Pendant',
    };

    const mapped = mapMedusaProductToStorefront(rawMinimal);

    expect(mapped.id).toBe('prod_min_002');
    expect(mapped.handle).toBe('prod_min_002');
    expect(mapped.title).toBe('Minimal Pendant');
    expect(mapped.price).toBe(0);
    expect(mapped.formattedPrice).toBe('$0.00');
    expect(mapped.thumbnail).toBe('/images/img_26.jpg');
    expect(mapped.variants).toEqual([]);
    expect(mapped.isFeatured).toBe(false);
  });
});
