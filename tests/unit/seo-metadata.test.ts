import { describe, it, expect } from 'vitest';
import robots from '../../src/app/robots';
import sitemap from '../../src/app/sitemap';

describe('SEO Foundations: Robots and Sitemap Generators', () => {
  it('generates robots.txt with appropriate disallow rules for private/transactional paths', () => {
    const rules = robots();

    expect(rules.rules).toBeDefined();
    const defaultRule = Array.isArray(rules.rules) ? rules.rules[0] : rules.rules;

    expect(defaultRule?.allow).toBe('/');
    expect(defaultRule?.disallow).toContain('/cart');
    expect(defaultRule?.disallow).toContain('/checkout');
    expect(defaultRule?.disallow).toContain('/favorites');
    expect(defaultRule?.disallow).toContain('/search');
    expect(rules.sitemap).toMatch(/sitemap\.xml$/);
  });

  it('generates comprehensive sitemap with all key public pages and products', async () => {
    const map = await sitemap();

    expect(map.length).toBeGreaterThanOrEqual(18); // 4 static + 4 categories + 11 products - etc

    const urls = map.map(entry => entry.url);
    expect(urls.some(u => u === 'http://localhost:3000' || u.endsWith('/'))).toBe(true);
    expect(urls.some(u => u.endsWith('/jewelry'))).toBe(true);
    expect(urls.some(u => u.endsWith('/jewelry/necklaces-pendants'))).toBe(true);
    expect(urls.some(u => u.endsWith('/products/smile-pendant-gold'))).toBe(true);
    expect(urls.some(u => u.endsWith('/love-engagement'))).toBe(true);
    expect(urls.some(u => u.endsWith('/stores'))).toBe(true);
  });
});
