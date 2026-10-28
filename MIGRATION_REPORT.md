# Carpediam Bombay Storefront — Migration & Verification Report

**Date:** October 28, 2026  
**Auditor & Migration Engineer:** Senior Frontend / Commerce Architecture Team  
**Repository Branch:** `migration/nextjs-medusa` (branched cleanly from `main`)  
**Commit Baseline:** `57e8809`  
**Target Architecture:** Next.js 16 App Router + Tailwind CSS v4 + Medusa v2 SDK Data Boundary

---

## 1. Executive Summary

The Carpediam Bombay storefront has been migrated end-to-end from a client-only Vite SPA into a modern, production-grade **Next.js 16 App Router** application.

### Key Outcomes:
1. **Visual & Interaction Preservation:** The approved luxury editorial identity, typography, spacing, Cloudinary video hero stream, hover effects, mega menus, and product galleries were retained without visual regression.
2. **Decoupled Architecture:** The previous monolithic `StoreContext` (which bundled routing, cart, wishlist, and search into a single re-render hot path) has been disassembled into modular, domain-driven boundaries (`CartContext`, `WishlistContext`, `SearchContext`).
3. **Commerce Data Boundary:** A unified data-access interface (`src/lib/commerce`) cleanly abstracts data fetching. Two explicit modes are implemented:
   - `COMMERCE_MODE=mock`: Deterministic local fixtures derived from the 11 verified Carpediam products, with zero seeded cart/wishlist items for new visitors.
   - `COMMERCE_MODE=medusa`: Official `@medusajs/js-sdk` client that validates `MEDUSA_BACKEND_URL` and `MEDUSA_PUBLISHABLE_KEY` on startup and throws a descriptive `ConfigurationError` rather than silently degrading.
4. **Verified Quality Gates:**
   - **Production Build:** Next.js App Router static compilation generated 25/25 pages with 0 errors.
   - **Lint:** Oxlint ran across all source files with 0 errors.
   - **Unit Tests:** 16/16 Vitest unit and integration tests passed in 666ms.
   - **E2E Tests:** 18/18 Playwright end-to-end tests passed on Brave across desktop and mobile viewports.
   - **Visual Regression:** Baseline and post-migration screenshots were captured at 1440×1000, 768×1024, and 390×844 across key pages.

---

## 2. Route Mapping & Clean URLs

Legacy hash-based routing (`#/jewelry`, `#/product/:id`) was converted to canonical Next.js App Router paths:

| Old Hash Route | New App Router Route | Entry Point | Rendering Strategy | Status |
|---|---|---|---|---|
| `#/` | `/` | `src/app/page.tsx` | Server Component (RSC) + Client Hero | Verified |
| `#/jewelry` | `/jewelry` | `src/app/jewelry/page.tsx` | Server Component (RSC) + Client Grid | Verified |
| `#/jewelry/:slug` | `/jewelry/[category]` | `src/app/jewelry/[category]/page.tsx` | Static Site Generation (SSG) for 4 categories | Verified |
| `#/product/:id` | `/products/[handle]` | `src/app/products/[handle]/page.tsx` | Static Site Generation (SSG) for 11 handles + JSON-LD | Verified |
| `#/product/:id` | `/product/[handle]` | `src/app/product/[handle]/page.tsx` | HTTP 307 Redirect -> `/products/[handle]` | Verified |
| `#/love-engagement` | `/love-engagement` | `src/app/love-engagement/page.tsx` | Server Component (RSC) + Consultation Form | Verified |
| `#/stores` | `/stores` | `src/app/stores/page.tsx` | Server Component (RSC) + Booking Form | Verified |
| `#/favorites` | `/favorites` | `src/app/favorites/page.tsx` | Client Component (localStorage persistence) | Verified |
| Synthetic Alert | `/checkout` | `src/app/checkout/page.tsx` | Client Component (Demo Preview in mock mode) | Verified |
| Fallback Div | `/_not-found` | `src/app/not-found.tsx` | Server Component (Genuine 404 response) | Verified |
| Absent | `/robots.txt` | `src/app/robots.ts` | Dynamic Route Handler | Verified |
| Absent | `/sitemap.xml` | `src/app/sitemap.ts` | Dynamic Route Handler | Verified |

---

## 3. SEO Implementation & Verification

| Requirement | Implementation Details | Verification Evidence |
|---|---|---|
| **Root & Template Titles** | Configured in `src/app/layout.tsx` using `%s \| Carpediam Bombay`. | Verified in root layout metadata. |
| **Product Metadata** | Dynamic `generateMetadata` in `src/app/products/[handle]/page.tsx` fetching product title, description, and canonical URL. | Tested in Playwright E2E suite (`toHaveTitle(/Carpediam T Smile Pendant/)`). |
| **Category Metadata** | Dynamic `generateMetadata` in `src/app/jewelry/[category]/page.tsx`. | Tested in Playwright E2E suite (`toHaveTitle(/Necklaces & Pendants/)`). |
| **Canonical URLs** | Normalized `alternates.canonical` pointing to canonical path names. | Inspected rendered HTML `<link rel="canonical">`. |
| **Structured Data** | Safe JSON-LD schema (`schema.org/Product` and `schema.org/Offer`) embedded on all PDPs without fabricated review ratings or fake stock counts. | Validated in `src/app/products/[handle]/page.tsx`. |
| **Robots.txt** | Allows public indexing while disallowing `/cart`, `/checkout`, `/favorites`, and `/search`. | Verified in `tests/unit/seo-metadata.test.ts`. |
| **Sitemap.xml** | Generates dynamic list of all indexable routes, categories, and 11 product pages. | Verified in `tests/unit/seo-metadata.test.ts`. |

---

## 4. Quality Gates & Test Results

### 4.1 Production Build (`next build`)
```
▲ Next.js 16.4.3 (Turbopack)
- Environments: .env.local
✓ Compiled successfully in 703ms
✓ Generating static pages using 11 workers (25/25) in 563ms
○ / (Static)
● /jewelry/[category] (SSG - 4 routes)
● /products/[handle] (SSG - 11 routes)
○ /robots.txt
○ /sitemap.xml
Result: SUCCESS (0 errors)
```

### 4.2 Linter (`oxlint src`)
```
Finished in 29ms on 39 files with 116 rules using 12 threads.
Result: SUCCESS (0 errors)
```

### 4.3 Vitest Unit & Integration Suite (`npm test`)
```
 ✓ tests/unit/env-config.test.ts (3 tests)
 ✓ tests/unit/cart-identity.test.ts (3 tests)
 ✓ tests/unit/commerce-adapter.test.ts (2 tests)
 ✓ tests/unit/mock-data.test.ts (6 tests)
 ✓ tests/unit/seo-metadata.test.ts (2 tests)

Test Files: 5 passed (5)
Tests:      16 passed (16)
Duration:   666ms
Result:     SUCCESS (100% pass)
```

### 4.4 Playwright End-to-End Suite (`npm run test:e2e`)
Executed in headless Brave against the production Next.js server on port 3001:
```
  ✓ 1 [desktop-brave] 1. Homepage loads directly with hero video and header (1.7s)
  ✓ 2 [mobile-brave]  1. Homepage loads directly with hero video and header (2.3s)
  ✓ 3 [desktop-brave] 2. Direct navigation to Category page with filters (1.1s)
  ✓ 4 [mobile-brave]  2. Direct navigation to Category page with filters (935ms)
  ✓ 5 [desktop-brave] 3. Direct navigation to Subcategory page (792ms)
  ✓ 6 [mobile-brave]  3. Direct navigation to Subcategory page (1.0s)
  ✓ 7 [desktop-brave] 4. Product Detail Page loads and changes variant dynamically (1.4s)
  ✓ 8 [mobile-brave]  4. Product Detail Page loads and changes variant dynamically (1.3s)
  ✓ 9 [desktop-brave] 5. Unknown product handle returns 404 Not Found (673ms)
  ✓ 10 [mobile-brave] 5. Unknown product handle returns 404 Not Found (580ms)
  ✓ 11 [desktop-brave] 6. Legacy hash/path redirect /product/:handle -> /products/:handle (762ms)
  ✓ 12 [mobile-brave]  6. Legacy hash/path redirect /product/:handle -> /products/:handle (752ms)
  ✓ 13 [desktop-brave] 7. Search overlay opens, filters live, and escapes with Escape key (946ms)
  ✓ 14 [mobile-brave]  7. Search overlay opens, filters live, and escapes with Escape key (1.3s)
  ✓ 15 [desktop-brave] 8. Cart Drawer opens, updates quantities, and respects Escape key (1.1s)
  ✓ 16 [mobile-brave]  8. Cart Drawer opens, updates quantities, and respects Escape key (862ms)
  ✓ 17 [desktop-brave] 9. Mobile viewport renders without horizontal overflow (1.3s)
  ✓ 18 [mobile-brave]  9. Mobile viewport renders without horizontal overflow (1.6s)

Tests:    18 passed (18)
Duration: 12.3s
Result:   SUCCESS (100% pass)
```

---

## 5. Visual Regression & Viewport Comparison

Automated high-resolution screenshots were captured before and after migration across 3 canonical viewport dimensions:
- **Desktop Viewport:** 1440 × 1000
- **Tablet Viewport:** 768 × 1024
- **Mobile Viewport:** 390 × 844

### Screenshot Artifacts Recorded
1. **Baseline (Pre-migration Vite SPA):** `tests/screenshots/baseline/`
   - `desktop-home.png`, `desktop-category.png`, `desktop-pdp.png`, `desktop-cart.png`
   - `tablet-home.png`, `tablet-category.png`, `tablet-pdp.png`, `tablet-cart.png`
   - `mobile-home.png`, `mobile-category.png`, `mobile-pdp.png`, `mobile-cart.png`
2. **Migrated (Next.js App Router):** `tests/screenshots/migrated/`
   - `desktop-home.png`, `desktop-category.png`, `desktop-pdp.png`, `desktop-cart.png`
   - `tablet-home.png`, `tablet-category.png`, `tablet-pdp.png`, `tablet-cart.png`
   - `mobile-home.png`, `mobile-category.png`, `mobile-pdp.png`, `mobile-cart.png`

### Visual Assessment:
- **Hero & First Viewport:** Full-viewport Cloudinary video streaming, brand typography, and utility headers render identically.
- **Product Details & Gallery:** Thumbnail selection and metal variant pills maintain the original high-contrast luxury styling.
- **Mobile Responsiveness:** Overflow inspection verified `scrollWidth <= clientWidth` (390px), resolving previous horizontal margin leaks.

---

## 6. Major Files Created, Modified, and Removed

### Created:
- `next.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`, `playwright.config.ts`
- `.env.example`, `.env.local`
- `src/app/layout.tsx`, `page.tsx`, `not-found.tsx`, `loading.tsx`, `error.tsx`, `robots.ts`, `sitemap.ts`
- `src/app/jewelry/page.tsx`, `src/app/jewelry/[category]/page.tsx`
- `src/app/products/[handle]/page.tsx`, `src/app/product/[handle]/page.tsx`
- `src/app/love-engagement/page.tsx`, `src/app/stores/page.tsx`, `src/app/favorites/page.tsx`, `src/app/checkout/page.tsx`
- `src/types/commerce.ts`
- `src/lib/config/env.ts`
- `src/lib/data/mock-products.ts`
- `src/lib/medusa/client.ts`, `src/lib/medusa/adapter.ts`
- `src/lib/commerce/index.ts`
- `src/features/cart/CartContext.tsx`, `src/features/cart/ShoppingBagDrawer.tsx`
- `src/features/wishlist/WishlistContext.tsx`
- `src/features/search/SearchContext.tsx`, `src/features/search/SearchOverlay.tsx`
- `src/components/layout/Header.tsx`, `Footer.tsx`, `CarpediamLogo.tsx`, `AnnouncementBar.tsx`
- `src/components/product/ProductCard.tsx`, `ProductCarousel.tsx`, `ProductDetailClient.tsx`, `CategoryPageClient.tsx`
- `src/components/editorial/HomeHero.tsx`, `NewsletterSignup.tsx`, `LoveEngagementClient.tsx`, `StoreLocatorClient.tsx`, `FavoritesClient.tsx`
- `src/styles/globals.css`
- `tests/unit/*.test.ts`, `tests/e2e/*.spec.ts`

### Removed (Legacy Vite Artifacts):
- `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`
- `src/context/StoreContext.tsx` (monolithic context)
- `src/pages/*` (superseded by `src/app/*`)
- `src/data/products.ts` (superseded by `src/lib/data/mock-products.ts`)

---

## 7. Unverified Areas & Backend Requirements

The storefront is fully prepared for Medusa v2 integration, but because real backend credentials were not provided, the following items remain unverified and require live connection:

| Area | Status | Requirement from Backend Team |
|---|---|---|
| **Live Store API Connection** | Unverified (Prepared) | Verified `MEDUSA_BACKEND_URL` and `MEDUSA_PUBLISHABLE_KEY`. |
| **Sales Channel Scoping** | Unverified (Prepared) | Publishable key assigned to default sales channel in Medusa Admin. |
| **Multi-Region Pricing** | Unverified (Prepared) | Medusa Region ID (e.g. `reg_...`) and currency configuration. |
| **Live Cart & Payment Sessions** | Unverified (Prepared) | Configured payment provider (e.g. Stripe, Razorpay) in Medusa backend. |
| **Inventory Verification** | Unverified (Prepared) | Real stock quantities managed in Medusa inventory module. |

*Safety Note: In accordance with audit constraints, no mock payments or fake order success states were introduced. When `COMMERCE_MODE=medusa` is configured without credentials, the system immediately fails with an actionable configuration exception.*
