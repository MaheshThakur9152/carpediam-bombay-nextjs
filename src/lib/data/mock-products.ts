import type { StorefrontProduct, StorefrontCategory, StorefrontCollection } from '../../types/commerce';

/**
 * Deterministic local mock fixtures for Carpediam Bombay.
 * Used exclusively when COMMERCE_MODE=mock.
 * Preserves exact asset references and product catalog from approved visual design.
 */
export const MOCK_PRODUCTS: StorefrontProduct[] = [
  {
    id: 'smile-pendant-gold',
    handle: 'smile-pendant-gold',
    title: 'Carpediam T Smile Pendant',
    subtitle: 'in 18k Yellow Gold, Small',
    description: 'Simple and elegant, this curved pendant has a modern yet timeless aesthetic. The Carpediam T collection’s smile motif embodies the world’s most universal gesture for happiness and the connections it creates. Layer this delicate pendant with other Carpediam pendants of varying sizes and lengths for a unique look.',
    category: 'necklaces-pendants',
    collection: 'Carpediam T',
    price: 1350,
    formattedPrice: '$1,350',
    currencyCode: 'USD',
    thumbnail: '/images/img_29.jpg',
    images: ['/images/img_29.jpg', '/images/img_26.jpg'],
    materials: ['18k Yellow Gold', '18k Rose Gold', '18k White Gold'],
    sizes: ['16-18" Adjustable'],
    details: [
      '18k yellow gold',
      'Size small',
      'On a 16–18" adjustable chain',
      'Signature Carpediam T silhouette',
      'Includes complimentary iconic Carpediam Blue Box®'
    ],
    variants: [
      { id: 'var_smile_yg', title: '18k Yellow Gold / 16-18"', material: '18k Yellow Gold', size: '16-18" Adjustable', price: 1350, formattedPrice: '$1,350', inStock: true },
      { id: 'var_smile_rg', title: '18k Rose Gold / 16-18"', material: '18k Rose Gold', size: '16-18" Adjustable', price: 1350, formattedPrice: '$1,350', inStock: true },
      { id: 'var_smile_wg', title: '18k White Gold / 16-18"', material: '18k White Gold', size: '16-18" Adjustable', price: 1350, formattedPrice: '$1,350', inStock: true },
    ],
    isFeatured: true
  },
  {
    id: 'smile-earrings-gold',
    handle: 'smile-earrings-gold',
    title: 'Carpediam T Smile Mini Earrings',
    subtitle: 'in 18k Yellow Gold',
    description: 'Delicate smiles curved in lustrous 18k yellow gold create these radiant mini earrings. Designed to capture positive energy and eternal grace.',
    category: 'earrings',
    collection: 'Carpediam T',
    price: 1150,
    formattedPrice: '$1,150',
    currencyCode: 'USD',
    thumbnail: '/images/img_28.jpg',
    images: ['/images/img_28.jpg', '/images/img_29.jpg'],
    materials: ['18k Yellow Gold', '18k Rose Gold', '18k White Gold with Diamonds'],
    details: [
      '18k yellow gold',
      'Mini curved smile silhouette',
      'Post back closure for pierced ears',
      'Crafted in New York'
    ],
    variants: [
      { id: 'var_ear_yg', title: '18k Yellow Gold', material: '18k Yellow Gold', price: 1150, formattedPrice: '$1,150', inStock: true },
      { id: 'var_ear_rg', title: '18k Rose Gold', material: '18k Rose Gold', price: 1150, formattedPrice: '$1,150', inStock: true },
      { id: 'var_ear_wg', title: '18k White Gold with Diamonds', material: '18k White Gold with Diamonds', price: 1650, formattedPrice: '$1,650', inStock: true },
    ],
    isFeatured: true
  },
  {
    id: 'smile-bracelet-gold',
    handle: 'smile-bracelet-gold',
    title: 'Carpediam T Smile Bracelet',
    subtitle: 'in 18k Yellow Gold',
    description: 'Graphic angles and clean lines blend to create the beautiful clarity of the Carpediam T collection. This delicate chain bracelet showcases the distinctive smile motif.',
    category: 'bracelets',
    collection: 'Carpediam T',
    price: 1550,
    formattedPrice: '$1,550',
    currencyCode: 'USD',
    thumbnail: '/images/img_27.jpg',
    images: ['/images/img_27.jpg', '/images/img_29.jpg'],
    materials: ['18k Yellow Gold', '18k Rose Gold', '18k White Gold'],
    sizes: ['Small (6.25")', 'Medium (6.75")', 'Large (7.25")'],
    details: [
      '18k yellow gold',
      'Size medium fits wrists up to 6.25"',
      'Spring clasp closure',
      'Delicate link chain'
    ],
    variants: [
      { id: 'var_brac_yg_s', title: '18k Yellow Gold / Small', material: '18k Yellow Gold', size: 'Small (6.25")', price: 1550, formattedPrice: '$1,550', inStock: true },
      { id: 'var_brac_yg_m', title: '18k Yellow Gold / Medium', material: '18k Yellow Gold', size: 'Medium (6.75")', price: 1550, formattedPrice: '$1,550', inStock: true },
      { id: 'var_brac_rg_m', title: '18k Rose Gold / Medium', material: '18k Rose Gold', size: 'Medium (6.75")', price: 1550, formattedPrice: '$1,550', inStock: true },
    ],
    isFeatured: true
  },
  {
    id: 'sixteen-stone-ring',
    handle: 'sixteen-stone-ring',
    title: 'Schlumberger Sixteen Stone Ring',
    subtitle: 'in Platinum and 18k Yellow Gold with Diamonds',
    description: 'Jean Schlumberger’s visionary designs feature dazzling gemstones and intricate goldwork. This legendary cross-stitch motif ring alternates brilliant diamonds with iconic golden X motifs.',
    category: 'rings',
    collection: 'Jean Schlumberger',
    price: 14200,
    formattedPrice: '$14,200',
    currencyCode: 'USD',
    thumbnail: '/images/img_1.jpg',
    images: ['/images/img_1.jpg', '/images/img_2.jpg'],
    materials: ['Platinum & 18k Gold', '18k Rose Gold', 'Platinum'],
    sizes: ['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'],
    details: [
      'Platinum and 18k yellow gold with round brilliant diamonds',
      'Carat total weight 1.14',
      'Legendary Jean Schlumberger design',
      'Delivered in the signature blue box'
    ],
    variants: [
      { id: 'var_16stone_pt_6', title: 'Platinum & 18k Gold / 6.0', material: 'Platinum & 18k Gold', size: '6.0', price: 14200, formattedPrice: '$14,200', inStock: true },
      { id: 'var_16stone_pt_7', title: 'Platinum & 18k Gold / 7.0', material: 'Platinum & 18k Gold', size: '7.0', price: 14200, formattedPrice: '$14,200', inStock: true },
    ],
    isFeatured: true
  },
  {
    id: 'carpediam-setting-solitaire',
    handle: 'carpediam-setting-solitaire',
    title: 'The Carpediam® Setting Engagement Ring',
    subtitle: 'in Platinum',
    description: 'The iconic six-prong setting that redefined engagement rings over a century ago. Engineered to lift the round brilliant diamond above the band into the light for unmatched brilliance.',
    category: 'rings',
    collection: 'Carpediam Knot',
    price: 18500,
    formattedPrice: '$18,500',
    currencyCode: 'USD',
    thumbnail: '/images/img_2.jpg',
    images: ['/images/img_2.jpg', '/images/img_1.jpg'],
    materials: ['Platinum', '18k Yellow Gold'],
    sizes: ['4.5', '5.0', '5.5', '6.0', '6.5', '7.0'],
    details: [
      'Six-prong platinum setting',
      'Center round brilliant diamond from 1.00 carat',
      'Triple Excellent cut grade certification',
      'Signature Carpediam diamond certificate'
    ],
    variants: [
      { id: 'var_solitaire_pt_6', title: 'Platinum / 6.0', material: 'Platinum', size: '6.0', price: 18500, formattedPrice: '$18,500', inStock: true },
      { id: 'var_solitaire_yg_6', title: '18k Yellow Gold / 6.0', material: '18k Yellow Gold', size: '6.0', price: 18500, formattedPrice: '$18,500', inStock: true },
    ],
    isFeatured: true
  },
  {
    id: 'carpediam-true-ring',
    handle: 'carpediam-true-ring',
    title: 'Carpediam True Wide Ring',
    subtitle: 'in 18k Yellow Gold',
    description: 'Beveled edges and an architectural T-pattern interlock cleanly in this bold wide band. Designed for stackable expression or standalone presence.',
    category: 'rings',
    collection: 'Carpediam T',
    price: 2200,
    formattedPrice: '$2,200',
    currencyCode: 'USD',
    thumbnail: '/images/img_3.jpg',
    images: ['/images/img_3.jpg', '/images/img_1.jpg'],
    materials: ['18k Yellow Gold', '18k White Gold', '18k Rose Gold'],
    sizes: ['5.0', '6.0', '7.0', '8.0', '9.0'],
    details: ['18k yellow gold', '5.5mm width', 'Graphic beveled silhouette'],
    variants: [
      { id: 'var_true_yg_6', title: '18k Yellow Gold / 6.0', material: '18k Yellow Gold', size: '6.0', price: 2200, formattedPrice: '$2,200', inStock: true },
      { id: 'var_true_wg_6', title: '18k White Gold / 6.0', material: '18k White Gold', size: '6.0', price: 2200, formattedPrice: '$2,200', inStock: true },
    ]
  },
  {
    id: 'carpediam-forever-band',
    handle: 'carpediam-forever-band',
    title: 'Carpediam Forever Wedding Band',
    subtitle: 'in Platinum with Pavé Diamonds',
    description: 'A timeless continuous band set with scintillating pavé diamonds. A symbol of eternal connection, crafted to sit flush alongside engagement rings.',
    category: 'rings',
    collection: 'Carpediam Lock',
    price: 3400,
    formattedPrice: '$3,400',
    currencyCode: 'USD',
    thumbnail: '/images/img_4.jpg',
    images: ['/images/img_4.jpg', '/images/img_2.jpg'],
    materials: ['Platinum with Diamonds', '18k Rose Gold with Diamonds'],
    sizes: ['5.0', '5.5', '6.0', '6.5', '7.0'],
    details: ['Platinum', 'Round brilliant diamonds', 'Carat total weight 0.28'],
    variants: [
      { id: 'var_forever_pt_6', title: 'Platinum / 6.0', material: 'Platinum with Diamonds', size: '6.0', price: 3400, formattedPrice: '$3,400', inStock: true },
    ]
  },
  {
    id: 'carpediam-soleste-halo',
    handle: 'carpediam-soleste-halo',
    title: 'Carpediam Soleste Cushion Halo Ring',
    subtitle: 'in Platinum with Double Diamond Halo',
    description: 'Surrounded by brilliant double halos of pavé diamonds, the cushion-cut center stone blazes with luminous fire. Hand-finished with beaded platinum milgrain.',
    category: 'rings',
    collection: 'Carpediam Knot',
    price: 24500,
    formattedPrice: '$24,500',
    currencyCode: 'USD',
    thumbnail: '/images/img_5.jpg',
    images: ['/images/img_5.jpg', '/images/img_1.jpg'],
    materials: ['Platinum & Diamonds'],
    sizes: ['5.0', '5.5', '6.0', '6.5', '7.0'],
    details: ['Platinum', 'Cushion-cut center diamond', 'Double diamond halo surround'],
    variants: [
      { id: 'var_soleste_pt_6', title: 'Platinum / 6.0', material: 'Platinum & Diamonds', size: '6.0', price: 24500, formattedPrice: '$24,500', inStock: true },
    ]
  },
  {
    id: 'hardwear-graduated-necklace',
    handle: 'hardwear-graduated-necklace',
    title: 'Carpediam HardWear Graduated Link Necklace',
    subtitle: 'in 18k Yellow Gold',
    description: 'Elegantly subversive, Carpediam HardWear captures the spirit and energy of New York City. Heavy gauge interlocking links graduate seamlessly to rest elegantly along the neckline.',
    category: 'necklaces-pendants',
    collection: 'Carpediam HardWear',
    price: 16500,
    formattedPrice: '$16,500',
    currencyCode: 'USD',
    thumbnail: '/images/img_6.jpg',
    images: ['/images/img_6.jpg', '/images/img_26.jpg'],
    materials: ['18k Yellow Gold', '18k Rose Gold', 'Sterling Silver'],
    sizes: ['16"', '18"'],
    details: ['18k yellow gold', '18" length', 'Graduated gauge links', 'Concealed clasp closure'],
    variants: [
      { id: 'var_hw_yg_18', title: '18k Yellow Gold / 18"', material: '18k Yellow Gold', size: '18"', price: 16500, formattedPrice: '$16,500', inStock: true },
      { id: 'var_hw_rg_18', title: '18k Rose Gold / 18"', material: '18k Rose Gold', size: '18"', price: 16500, formattedPrice: '$16,500', inStock: true },
    ],
    isFeatured: true
  },
  {
    id: 'lock-couples-ring',
    handle: 'lock-couples-ring',
    title: 'Carpediam Lock Ring',
    subtitle: 'in 18k Yellow and White Gold with Half Pavé Diamonds',
    description: 'Inspired by the power of togetherness and inclusivity, Carpediam Lock is a bold visual statement about personal bonds. Contrasting precious metals meet shimmering pavé diamonds.',
    category: 'rings',
    collection: 'Carpediam Lock',
    price: 4900,
    formattedPrice: '$4,900',
    currencyCode: 'USD',
    thumbnail: '/images/img_13.jpg',
    images: ['/images/img_13.jpg', '/images/img_1.jpg'],
    materials: ['18k Yellow & White Gold with Diamonds', '18k Rose Gold'],
    sizes: ['5.0', '6.0', '7.0', '8.0'],
    details: ['18k yellow gold and white gold', 'Round brilliant diamonds', '4mm width'],
    variants: [
      { id: 'var_lock_yg_6', title: 'Yellow & White Gold / 6.0', material: '18k Yellow & White Gold with Diamonds', size: '6.0', price: 4900, formattedPrice: '$4,900', inStock: true },
    ]
  },
  {
    id: 'mens-wedding-band',
    handle: 'mens-wedding-band',
    title: 'Carpediam Classic Band 4.5mm',
    subtitle: 'in Platinum',
    description: 'A benchmark of understated masculine sophistication. Clean, polished platinum engineered with a comfort-fit interior profile for lifetime daily wear.',
    category: 'rings',
    collection: 'Carpediam Lock',
    price: 1950,
    formattedPrice: '$1,950',
    currencyCode: 'USD',
    thumbnail: '/images/img_14.jpg',
    images: ['/images/img_14.jpg', '/images/img_2.jpg'],
    materials: ['Platinum', '18k Yellow Gold'],
    sizes: ['8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0'],
    details: ['Platinum', '4.5mm width', 'Comfort-fit interior curved profile'],
    variants: [
      { id: 'var_mens_pt_10', title: 'Platinum / 10.0', material: 'Platinum', size: '10.0', price: 1950, formattedPrice: '$1,950', inStock: true },
      { id: 'var_mens_yg_10', title: '18k Yellow Gold / 10.0', material: '18k Yellow Gold', size: '10.0', price: 1950, formattedPrice: '$1,950', inStock: true },
    ]
  }
];

export const MOCK_CATEGORIES: StorefrontCategory[] = [
  { id: 'cat-necklaces', slug: 'necklaces-pendants', name: 'Necklaces & Pendants', image: '/images/img_26.jpg' },
  { id: 'cat-bracelets', slug: 'bracelets', name: 'Bracelets', image: '/images/img_27.jpg' },
  { id: 'cat-earrings', slug: 'earrings', name: 'Earrings', image: '/images/img_28.jpg' },
  { id: 'cat-rings', slug: 'rings', name: 'Rings', image: '/images/img_1.jpg' }
];

export const MOCK_COLLECTIONS: StorefrontCollection[] = [
  { id: 'col-t', handle: 'carpediam-t', title: 'Carpediam T', description: 'Graphic angles and clean lines blend to create clarity.', image: '/images/img_27.jpg' },
  { id: 'col-hardwear', handle: 'carpediam-hardwear', title: 'Carpediam HardWear', description: 'Elegantly subversive, capturing the spirit of modern city energy.', image: '/images/img_6.jpg' },
  { id: 'col-knot', handle: 'carpediam-knot', title: 'Carpediam Knot', description: 'Entwined ends symbolize the power of rare connections.', image: '/images/img_29.jpg' },
  { id: 'col-lock', handle: 'carpediam-lock', title: 'Carpediam Lock', description: 'A bold visual statement about personal bonds.', image: '/images/img_13.jpg' },
  { id: 'col-schlumberger', handle: 'jean-schlumberger', title: 'Jean Schlumberger', description: 'Visionary designs featuring dazzling gemstones and intricate goldwork.', image: '/images/img_1.jpg' }
];
