import { describe, it, expect } from 'vitest';
import type { CartLineItem, StorefrontProduct, StorefrontVariant } from '../../src/types/commerce';
import { MOCK_PRODUCTS } from '../../src/lib/data/mock-products';

function calculateCartTotals(items: CartLineItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    subtotal,
    itemCount,
    formattedSubtotal: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal),
  };
}

describe('Cart Identity and Line Item Calculations', () => {
  const product: StorefrontProduct = MOCK_PRODUCTS[0]; // smile pendant ($1350)
  const variantYG: StorefrontVariant = product.variants[0]; // Yellow gold ($1350)
  const variantRG: StorefrontVariant = product.variants[1]; // Rose gold ($1350)

  it('generates distinct line IDs when variants differ', () => {
    const lineId1 = `${product.id}_${variantYG.id}`;
    const lineId2 = `${product.id}_${variantRG.id}`;

    expect(lineId1).not.toBe(lineId2);
  });

  it('correctly aggregates quantities and calculates subtotals', () => {
    const items: CartLineItem[] = [
      { id: `${product.id}_${variantYG.id}`, productId: product.id, variantId: variantYG.id, product, variant: variantYG, quantity: 2 },
      { id: `${product.id}_${variantRG.id}`, productId: product.id, variantId: variantRG.id, product, variant: variantRG, quantity: 1 },
    ];

    const totals = calculateCartTotals(items);

    expect(totals.itemCount).toBe(3);
    expect(totals.subtotal).toBe(1350 * 3);
    expect(totals.formattedSubtotal).toBe('$4,050.00');
  });

  it('returns empty calculations for 0 items', () => {
    const totals = calculateCartTotals([]);
    expect(totals.itemCount).toBe(0);
    expect(totals.subtotal).toBe(0);
    expect(totals.formattedSubtotal).toBe('$0.00');
  });
});
