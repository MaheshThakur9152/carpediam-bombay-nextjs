import type { StorefrontProduct, StorefrontVariant } from '../../types/commerce';

/**
 * Maps raw Medusa StoreProduct to clean storefront-facing model.
 */
export function mapMedusaProductToStorefront(raw: any, currencyCode = 'USD'): StorefrontProduct {
  const variants: StorefrontVariant[] = (raw.variants || []).map((v: any) => {
    // Medusa v2 calculated_price or prices array
    const calcPrice = v.calculated_price?.calculated_amount ?? v.prices?.[0]?.amount ?? 0;
    const price = typeof calcPrice === 'number' ? calcPrice : 0;
    const materialOption = v.options?.find((o: any) => o.option?.title?.toLowerCase().includes('metal') || o.option?.title?.toLowerCase().includes('material'))?.value;
    const sizeOption = v.options?.find((o: any) => o.option?.title?.toLowerCase().includes('size'))?.value;

    return {
      id: v.id,
      title: v.title || 'Standard',
      material: materialOption || v.title || 'Standard',
      size: sizeOption,
      price: price,
      formattedPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(price),
      inStock: (v.inventory_quantity ?? 1) > 0,
    };
  });

  const basePrice = variants[0]?.price ?? 0;
  const thumbnail = raw.thumbnail || raw.images?.[0]?.url || '/images/img_26.jpg';
  const images = raw.images?.map((img: any) => img.url) || [thumbnail];

  return {
    id: raw.id,
    handle: raw.handle || raw.id,
    title: raw.title,
    subtitle: raw.subtitle || '',
    description: raw.description || '',
    category: raw.categories?.[0]?.handle || 'jewelry',
    collection: raw.collection?.title || 'Carpediam Collection',
    price: basePrice,
    formattedPrice: variants[0]?.formattedPrice || new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(basePrice),
    currencyCode: currencyCode,
    thumbnail: thumbnail,
    images: images.length > 0 ? images : [thumbnail],
    materials: Array.from(new Set(variants.map(v => v.material).filter(Boolean))),
    sizes: Array.from(new Set(variants.map(v => v.size).filter((s): s is string => Boolean(s)))),
    details: raw.metadata?.details ? (Array.isArray(raw.metadata.details) ? raw.metadata.details : [String(raw.metadata.details)]) : [],
    variants: variants,
    isFeatured: Boolean(raw.metadata?.isFeatured),
    isNew: Boolean(raw.metadata?.isNew),
  };
}
