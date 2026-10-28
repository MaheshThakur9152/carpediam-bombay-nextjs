# Carpediam Bombay Storefront (Next.js App Router + MedusaJS)

High-craft luxury fine jewelry e-commerce storefront for **Carpediam Bombay**, built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, Lucide React, Vitest, and Playwright.

---

## 1. Architectural Highlights

- **Framework:** Next.js 16 App Router (React Server Components by default, Client Components for interactive drawers/modals/forms).
- **Commerce Data Boundary:** Unified adapter layer (`src/lib/commerce`) supporting deterministic local mock fixtures (`COMMERCE_MODE=mock`) and Medusa v2 Store API (`COMMERCE_MODE=medusa`) using the official `@medusajs/js-sdk`.
- **State Management:** Decoupled, targeted contexts (`CartContext`, `WishlistContext`, `SearchContext`) replacing the previous monolithic store context.
- **SEO & Social Graph:** Server-rendered Open Graph tags, canonical URLs, robots.txt, dynamic sitemap.xml, and schema.org JSON-LD structured data.
- **Accessibility:** Escape key listeners, modal focus trapping, and screen-reader semantics across all drawers and dialogs.

---

## 2. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Commerce Modes

1. **`COMMERCE_MODE=mock` (Default)**
   - Uses local deterministic catalog fixtures (`src/lib/data/mock-products.ts`) containing all 11 verified Carpediam Bombay designs.
   - Requires zero external backend credentials.
   - Checkout is clearly indicated as a demonstration preview.

2. **`COMMERCE_MODE=medusa`**
   - Connects to a live Medusa v2 backend server.
   - Requires:
     - `MEDUSA_BACKEND_URL`: URL of the Medusa server (e.g. `https://api.yourdomain.com`).
     - `MEDUSA_PUBLISHABLE_KEY`: Storefront publishable API key (e.g. `pk_...`).
   - If required variables are missing, the application fails fast with a descriptive `ConfigurationError` rather than silently substituting mock data.

---

## 3. Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 3000 or custom)
npm run dev

# 3. Type check & production build (generates SSG/static routes)
npm run build

# 4. Run production server
npm run start -- -p 3001

# 5. Run static lint checks
npm run lint

# 6. Run Vitest unit & integration tests
npm test

# 7. Run Playwright end-to-end browser tests
npm run test:e2e
```

---

## 4. Route Mapping

| Route Pattern | Page Type | Rendering Strategy |
|---|---|---|
| `/` | Homepage | Static / RSC with Cloudinary Hero Stream |
| `/jewelry` | All Jewelry PLP | Static / RSC + Filterable Client Grid |
| `/jewelry/[category]` | Sub-category PLP | Static Site Generation (SSG) for 4 categories |
| `/products/[handle]` | Product Detail Page | Static Site Generation (SSG) for 11 handles + JSON-LD |
| `/product/[handle]` | Legacy Redirect | Dynamic Server Redirect -> `/products/[handle]` |
| `/love-engagement` | Engagement & Rings | Static / RSC + Consultation Scheduler |
| `/stores` | Boutique Locator | Static / RSC + In-Person Showing Booking |
| `/favorites` | Client Wishlist | Client Component (localStorage persistence) |
| `/checkout` | Checkout Screen | Client Demo Preview (Mock) / Medusa Flow |
| `/robots.txt` | Robots Policy | Static Route Handler |
| `/sitemap.xml` | XML Sitemap | Dynamic Route Handler |
