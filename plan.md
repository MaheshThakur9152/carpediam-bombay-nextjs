# Carpediam Bombay Storefront — Migration & Implementation Plan

**Status:** Execution plan for an AI coding agent  
**Date:** 2026-10-28  
**Primary source:** `website.md` (current-state audit; verify material claims against the repository before acting)  
**Target:** Next.js App Router storefront prepared for MedusaJS integration, with automated tests and visual regression checks  
**Constraint:** Medusa backend URL, version, publishable key, region, sales channel, and payment provider are currently unknown/unavailable.

---

## 1. Mission

Migrate the existing Carpediam Bombay React/Vite storefront to a maintainable Next.js App Router application without throwing away the approved visual design. Establish good SEO foundations, a clear commerce integration boundary, reliable tests, and a build that can run without Medusa credentials in an explicitly designated local demo mode.

This is an implementation plan, not a request to merely produce another audit or plan. The coding agent should execute the work end-to-end in one run, including inspecting the prior implementation, implementing the migration, running checks, fixing failures, and reporting verified results.

## 2. Current-state baseline from `website.md`

The audit describes the following baseline. Re-check this against source files, package configuration, Git state, and actual runtime before relying on it:

- Standalone React SPA using React 19, TypeScript, Vite, Tailwind CSS v4, and Oxlint.
- Browser-only rendering with a custom hash-based router and a single `StoreContext` covering routing, cart, wishlist, and search state.
- Pages include Home, Jewelry/Category, Product Detail, Love & Engagement, Store Locator, and Favorites.
- Product catalogue comprises 11 local demo products in `src/data/products.ts`.
- Cart and favorites are stored in localStorage, including default seeded cart/favorite items.
- No Medusa SDK, Store API client, Medusa IDs, region pricing, inventory integration, or real order flow exists.
- Checkout is simulated with a JavaScript `alert()`.
- The audit reports a passing TypeScript build and Oxlint, but no unit/integration test files; Playwright is listed as a dependency.
- SEO metadata is static; product-specific metadata and structured data are absent.
- Some navigation targets are missing, and modal/drawer keyboard focus behavior needs work.
- Existing asset library and Cloudinary hero video contribute significantly to the desired visual design.

Do not present these audit statements as independently verified until you have checked them during implementation. Report any discrepancy you discover.

## 3. Architectural decisions

### 3.1 Application boundary

- Keep the storefront as a standalone frontend application unless the repository contains concrete evidence that a monorepo is required.
- Migrate the storefront to **Next.js App Router with TypeScript**.
- Do not create or claim to implement a Medusa backend. The backend is external and its configuration is not available.
- Use current stable versions compatible with the repository's Node runtime and current official Next.js/Medusa guidance. Check engines and peer dependencies before selecting versions; do not blindly install `latest` packages.
- Keep the existing visual identity, assets, content hierarchy, and useful interactions. This is a controlled framework migration, not a redesign.

### 3.2 Server/client boundaries

- Prefer Server Components for public page composition, product/collection data retrieval, metadata generation, and other work that does not require browser APIs or event handlers.
- Use Client Components only where interaction requires them: menus, galleries, selectors, drawers, search input, wishlist controls, cart interactions, forms, and other genuinely interactive elements.
- Do not mark the entire application with `"use client"` as a shortcut.
- Avoid fetching the same product data independently in several nested components; use a clear page/data-access boundary and deduplicate requests where supported.

### 3.3 Commerce boundary and credential-free development

Create a small data-access boundary so UI components do not call the Medusa SDK directly. UI pages should consume typed, UI-friendly models and not depend on raw SDK response shapes.

Define two explicit modes:

- `COMMERCE_MODE=mock`: deterministic local fixtures for visual development and automated tests. Demo data must be clearly identified in code/docs and must never be confused with live inventory, prices, payment, or order state.
- `COMMERCE_MODE=medusa`: use the official Medusa JS SDK and Store API. Validate required configuration at runtime. If backend URL or publishable key is missing, fail clearly with a helpful configuration error; **do not silently fall back to fixtures**.

No Medusa credentials are currently available. Implement and unit-test the adapter and request boundaries, but mark real backend connectivity, live data mapping, and checkout as **unverified pending credentials**. Never invent IDs, API responses, payment configuration, successful orders, or backend behavior.

Use environment variable names documented in `.env.example`, such as `COMMERCE_MODE`, `MEDUSA_BACKEND_URL`, `MEDUSA_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_URL`. Keep server configuration server-only where possible. A publishable key is not an admin secret, but never place admin tokens or secret credentials in client bundles, screenshots, logs, or `website.md`.

For Medusa integration, verify the installed/current SDK methods and actual API contracts against the version of official documentation available during implementation. The target backend version is not known, so do not state that compatibility with a specific backend version has been verified.

### 3.4 Product and variant model

- Define typed storefront-facing product, product-image, category, collection, region/price, option, and variant models.
- Add a tested adapter from Medusa product/variant responses to the storefront-facing model.
- A material/size selector must correspond to a real selectable variant or a clearly labelled demo variant. Do not imply that changing a visual pill changes the product SKU or price unless the chosen variant actually changes.
- Product price and currency displayed in live mode must come from the configured Medusa region and calculated price data, not hardcoded amounts or browser calculations.
- Cart totals, tax, discounts, shipping, and payment state are backend/workflow-derived; never present frontend arithmetic as an authoritative payable total.

### 3.5 Cart and checkout

- Separate cart state/actions from wishlist, search, and routing state.
- In live mode, use the Medusa cart lifecycle and real variant IDs. Persist only the cart identifier/state necessary for retrieval; implement refresh/recovery behavior.
- Prefer server-side handlers/actions or a documented SDK request strategy appropriate to the current Medusa SDK. Avoid leaking privileged credentials. Configure CORS only when the browser calls the Medusa host directly.
- In mock mode, allow cart UI tests with deterministic fixtures. Mark the mode visibly during local development where practical.
- Never show a fake successful checkout or claim an order was placed in mock mode. Until backend/payment configuration exists, checkout must clearly be disabled/demo-only and must not collect real payment information.
- Do not implement customer authentication, account history, or payment flows as fake successful integrations. Prepare interfaces only where required and document what's blocked.

## 4. Recommended source structure

Use this as a target shape, adapting only when the current code demonstrates a better simple solution. Do not create empty folders or abstractions just to match the tree.

```text
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    error.tsx
    loading.tsx
    robots.ts
    sitemap.ts
    jewelry/
      page.tsx
      [category]/page.tsx
    products/
      [handle]/page.tsx
    collections/
      [handle]/page.tsx
    love-engagement/page.tsx
    stores/page.tsx
    favorites/page.tsx
    search/page.tsx
    cart/page.tsx
    checkout/page.tsx
  components/
    layout/       # header, footer, announcement bar, shell
    product/      # card, grid, gallery, variant controls
    editorial/    # hero and content sections, only if useful
    ui/            # genuinely shared primitive UI components
  features/
    cart/          # cart drawer, actions, state boundary
    search/        # search interactions
    wishlist/      # favourites
    navigation/    # mega menu/mobile navigation if useful
  lib/
    commerce/      # commerce interface and mode selection
    medusa/        # SDK client and typed API operations
    data/          # explicit mock fixtures and data adapters
    config/        # environment parsing/validation
    seo/           # canonical URL and metadata helpers
    utils/
  types/
  styles/

public/            # preserve/reuse the existing assets

 tests/
  unit/
  components/
  integration/
  e2e/
```

The audit's existing routes are hash-based (`#/...`). Create clean URLs for Next.js. Where appropriate, provide a small, tested compatibility redirect for incoming legacy hash URLs such as `/#/jewelry` and `/#/product/<id>`; do not add complex migration logic unless it works and can be tested. Choose one canonical product URL scheme and use it consistently across cards, metadata, sitemap, and internal links.

Keep current secondary pages (`love-engagement`, `stores`, `favorites`) unless source inspection proves they are dead or intentionally removed. Do not route missing nav links to arbitrary pages. Add a real route/page or remove/disable misleading navigation destinations.

## 5. SEO requirements

Implement and verify these as part of the migration, not as a later optional cleanup:

1. **Server-rendered public content:** homepage, category, collection, and product pages should include meaningful content in initial HTML where appropriate.
2. **Metadata:** root metadata plus page-specific `title`, `description`, canonical URL, Open Graph, and social preview metadata. Use `generateMetadata` for product/category/collection content when data is available.
3. **Unique and truthful metadata:** no repeated generic product descriptions, made-up product attributes, or metadata referencing products that do not exist.
4. **Sitemap:** `src/app/sitemap.ts` for real implemented indexable routes; use actual available product/collection data in live mode. Do not populate fabricated production URLs.
5. **Robots:** `src/app/robots.ts`. Public marketing/product pages can be indexable; cart, checkout, account, and internal search results should generally be `noindex` as appropriate. Do not block essential assets accidentally.
6. **Canonical URLs:** one canonical product URL pattern, normalized host from `NEXT_PUBLIC_SITE_URL`, and no duplicate canonical logic in components.
7. **Structured data:** truthful JSON-LD for `Organization`/`WebSite` as appropriate and `Product`/`Offer`/`BreadcrumbList` only when the fields are known. Escape/serialize safely. Never invent stock, price, reviews, ratings, or availability.
8. **Images:** meaningful alt text; responsive sizing; optimized images where appropriate; prioritize critical hero imagery; lazy-load below-the-fold images. Configure remote sources narrowly if used.
9. **Internal links:** correct, crawlable links among homepage, categories, collections, and products. Avoid dead primary navigation links.
10. **Error states:** missing products should return a genuine not-found response/page. Do not render fake product metadata for unknown handles.
11. **Validation:** inspect rendered HTML, canonical links, metadata, sitemap, robots output, JSON-LD, and actual mobile/desktop pages. Do not invent Lighthouse or Core Web Vitals scores; measure them only if tooling is available.

SEO is not a ranking guarantee. Document implementation and verification, not promises about ranking.

## 6. Testing strategy — required

Tests are required because this is a routing and state migration plus an ecommerce integration boundary. Use a proportionate suite, not excessive test ceremony.

- **Unit tests:** commerce data adapters, region/currency formatting, variant resolution, product handle lookup, filters/sort, search normalization, cart-line identity and environment validation.
- **Component/integration tests:** product variant selection, cart drawer quantity/removal, wishlist actions, modal/dialog keyboard behavior, accessible forms and error/loading states. Use React Testing Library where useful.
- **E2E tests with Playwright:** homepage load, clean direct route load, navigation to category, product page and variant selection, add/update/remove cart item in mock mode, wishlist interaction, search, mobile menu, unknown-product 404, and no horizontal overflow at mobile viewport.
- **SEO checks:** assert product title/meta/canonical, robots and sitemap outputs. Check initial HTML for key product headings/content, where relevant.
- **Visual regression:** capture reference screenshots before migration if browser tooling is available. Capture migrated screenshots at the same viewports: 1440×1000, 768×1024 and 390×844. Compare homepage, category, product detail, open navigation, cart drawer, and mobile menu. Fix major discrepancies before completion. If screenshots/reference browser are unavailable, report that constraint honestly.
- **Build gates:** typecheck, lint, unit/component tests, production build, and Playwright suite. Fix failures introduced by the work. Do not suppress tests, downgrade checks, or claim a check passed without running it.

If a compatible test tool is already configured, reuse it. Otherwise add the minimal required dev dependencies and scripts. Keep tests deterministic and independent of real Medusa credentials. Mock network responses at the boundary, not throughout every component.

## 7. Visual and interaction preservation

Before editing, run and capture the existing implementation if it can be launched. Record baseline screenshots and note current page content/interaction behavior. Reuse current assets and CSS as much as practical.

Preserve:

- Luxury editorial visual hierarchy and generous spacing.
- Existing brand palette and typography.
- Header, mega-menu, mobile navigation, footer and announcement bar.
- Hero video behavior and fallbacks where available.
- Product card image composition, hover behavior, and grid proportions.
- Product gallery, selectable options, related products, and editorial sections.
- Store locator and Love & Engagement pages.
- Current responsive behavior, correcting only demonstrated issues.

Do not substitute generic starter-storefront UI or generic gradient/card layouts. Match the existing approved design. Do not reuse third-party brand imagery for new commercial content without appropriate rights; preserve existing assets for the migration and document rights as a separate launch consideration if not confirmed.

## 8. Code quality and implementation constraints

- Inspect Git status and current branch before changes. Preserve all pre-existing user changes.
- Do not reset, clean, force-checkout, overwrite, or delete user work.
- If the worktree is clean and branching is safe, work on a dedicated branch. If uncommitted user changes exist, do not switch branches or modify their files destructively; preserve them and continue cautiously or use a separate worktree if supported.
- Do not commit, push, deploy, or perform any real transaction.
- Keep TypeScript strict; avoid `any`, unsafe casts, duplicated business rules, and broad catch-and-ignore handlers.
- Validate env variables on startup/build in the correct mode, without exposing values.
- Handle loading, empty, not-found, and error states deliberately.
- Keep server-only modules out of client bundles.
- Avoid creating abstractions without a concrete use case.
- Do not blindly port the monolithic `StoreContext`; split responsibilities only where it makes the app simpler to reason about and test.
- No fake success messages for real-world actions (checkout, appointment booking, newsletter delivery) unless the action is actually connected. Provide truthful demo behavior when external integration is absent.
- Do not use broad lint/typecheck suppressions as a shortcut.

## 9. Execution phases and definition of done

Execute all phases in one uninterrupted implementation pass where the environment allows; do not stop after writing documentation or scaffolding.

### Phase A — Inspect and baseline
- Read `website.md` and verify it against the real repository.
- Inspect package manifests, lockfile, app files, assets, scripts, Git status and existing browser behavior.
- Run existing non-destructive checks.
- Capture before screenshots if possible.

### Phase B — Design and migrate foundation
- Choose compatible Next.js and React versions based on current official docs and the repository runtime.
- Preserve existing asset paths and styling.
- Build App Router layouts, route pages, not-found/error handling and navigation.
- Replace hash routing with clean routes and test old-hash compatibility if implemented.

### Phase C — Rebuild data boundaries
- Create typed commerce interfaces and mock fixtures from the existing 11 products (preserving current details/assets accurately).
- Create an official-SDK-based Medusa adapter behind the interface.
- Keep mock and live modes explicit; live mode must fail clearly when configuration is absent.
- Do not claim real backend compatibility has been confirmed.

### Phase D — SEO and accessibility
- Implement metadata, canonicals, robots, sitemap, relevant JSON-LD, semantic HTML, focus management, keyboard operation, labels and reduced-motion behavior.
- Verify the output.

### Phase E — Tests and visual QA
- Add/run unit/component/E2E tests.
- Compare the migrated UI against the original at the same viewports.
- Fix failures, broken links, console errors, broken assets, hydration issues and visual mismatches.

### Phase F — final review
- Inspect the final diff for unrelated changes, dead code, duplicated implementations, debug logging, secrets, TODO placeholders and broad suppressions.
- Run all final checks from a clean state as practical.
- Update/add the minimal README and `.env.example` needed to run the app; keep docs accurate.

### Required acceptance criteria

- [ ] Next.js App Router application runs and production build succeeds.
- [ ] Existing design and primary pages are retained with no major visual regression.
- [ ] Clean URLs load directly and unknown product handles show not found.
- [ ] No fake seeded cart/wishlist items appear for new visitors.
- [ ] Navigation links lead to implemented destinations or are intentionally disabled.
- [ ] Product fixtures are isolated from the real Medusa adapter.
- [ ] Medusa SDK client and data operations are implemented against official documented APIs, with configuration validation.
- [ ] Missing Medusa credentials do not trigger silent mock fallback in live mode.
- [ ] Live backend integration and checkout are clearly documented as unverified where credentials/configuration are missing.
- [ ] SEO metadata, canonical URLs, robots, sitemap, and truthful structured data are implemented and tested.
- [ ] Unit/component/E2E tests exist for critical logic and user journeys and pass (or blockers are precisely documented).
- [ ] Type check, lint, build, and browser checks are actually run and outcomes recorded.
- [ ] Responsive checks include desktop, tablet and mobile.
- [ ] Accessibility issues in menus/drawers are addressed or explicitly documented.
- [ ] No secrets, credentials, real transactions, or unexpected repository changes.
- [ ] Final diff is reviewed and report separates verified results from assumptions.

## 10. Final deliverables

In addition to the functioning implementation, provide:

1. Migrated Next.js source code.
2. `.env.example` with variable names and safe placeholders only.
3. Tests and test scripts.
4. README with exact install/run/test/build commands and mock/live mode explanation.
5. A concise `MIGRATION_REPORT.md` with:
   - Previous architecture and what was preserved.
   - Major files created/modified/deleted.
   - Route mapping from old hash routes to new routes.
   - SEO changes implemented and how verified.
   - Tests/checks actually run with results.
   - Screenshot paths and visual comparisons performed.
   - Known issues and unverified Medusa integration details.
   - Exact information needed from the backend owner to finish live integration.

Never claim production readiness, live Medusa compatibility, checkout success, or pixel-perfect fidelity without evidence. The deliverable is a high-quality, tested Next.js storefront prepared for real Medusa integration, with clearly documented limitations caused by unavailable credentials/configuration.

## 11. Official references

Use the current versions of these references during implementation; confirm any version-sensitive details rather than relying on this document alone:

- Medusa Next.js Starter: https://docs.medusajs.com/resources/nextjs-starter
- Medusa Storefront Development: https://docs.medusajs.com/resources/storefront-development
- Connect a storefront to Medusa / JS SDK: https://docs.medusajs.com/resources/storefront-development/tips
- Medusa Store API: https://docs.medusajs.com/api/store/
- Next.js App Router: https://nextjs.org/docs/app
- Next.js Metadata API: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js testing guidance: https://nextjs.org/docs/app/guides/testing
