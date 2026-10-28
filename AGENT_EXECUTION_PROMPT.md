# Agent Prompt — Execute the Storefront Migration End-to-End

You are the senior engineer responsible for implementing the migration described in `plan.md`.

Read these repository files first:

1. `plan.md` — the required implementation plan and acceptance criteria.
2. `website.md` — the existing storefront's technical audit.
3. The actual source code, package manifests, lockfile, Git state, assets, configuration and tests.

## Mission

Migrate the existing Carpediam Bombay React/Vite storefront to Next.js App Router, preserve the current visual design, prepare a real MedusaJS integration behind a clean data-access boundary, improve SEO/accessibility, write meaningful tests, and verify the previous implementation against the migrated one.

**Do the implementation, not just a plan or audit. Work through the phases in `plan.md` in this run and continue until the acceptance criteria are met or a genuine environment limitation prevents a particular step.** Do not ask me to approve routine engineering decisions.

## Hard constraints

- Inspect `git status` and preserve all pre-existing user changes. Never reset, clean, force checkout, or overwrite unrelated work.
- Do not commit, push, deploy, access production customer data, or make real purchases/payment transactions.
- Do not claim Medusa is connected: credentials and backend details are not available yet.
- Build an explicit mock mode for local development/tests and an explicit live Medusa mode. If live mode is enabled without required configuration, fail clearly. Never silently substitute mock products or pretend an order succeeded.
- Use current official Next.js and Medusa documentation and compatible versions. Verify API/SDK method names; do not guess from memory.
- Preserve the approved storefront design and existing assets. Do not replace it with generic starter UI or redesign the store for convenience.
- Do not stop after writing docs, creating a scaffold, or passing the build. Implement pages and interactions, test them, compare visuals, fix findings, and run the final gates.
- Do not introduce fake data as production data, fake appointment/newsletter submission, fake inventory, fake payments or false checkout-success messages.
- Do not suppress lint/type/test errors just to get a green result.

## Required workflow

1. **Inspect and baseline:** verify `website.md` against actual code; inspect current scripts, dependency versions, routes, interactions and assets. Run available non-destructive checks. Start the existing implementation and capture screenshots at 1440×1000, 768×1024 and 390×844 when browser tooling is available. Record what is working before changing it.
2. **Plan the migration internally:** map old pages and hash routes to Next.js App Router routes; identify reusable components and browser-only code. Avoid adding unnecessary layers or dependencies.
3. **Implement Next.js:** migrate the real design, styles, assets, content and useful interactions. Use Server Components by default and Client Components only for interactive UI. Build clean URL routes, a proper not-found page, loading/error handling and correct links. Preserve the secondary pages that exist.
4. **Create commerce boundaries:** implement typed storefront-facing models, explicit fixture data, adapter tests, and a Medusa SDK client/operations based on current official docs. Make mode selection explicit. Keep backend configuration server-side wherever practical. Document unverified behavior that needs the real backend owner.
5. **Implement SEO:** page-specific metadata, canonicals, Open Graph, robots, sitemap, truthful JSON-LD where fields are known, correct internal links, image alt text, and deliberate indexing rules for search/cart/checkout/private pages. Avoid fabricated claims/stock/prices/ratings.
6. **Fix interaction and accessibility issues:** keyboard operation, escape-to-close, focus management/restoration, semantics, responsive layout, reduced motion where appropriate, and useful loading/error/empty states.
7. **Write and run tests:** unit tests for data adapters, variant mapping, filtering, cart identity and environment config; component tests for the gallery/variant/cart/menu behavior; Playwright E2E for core customer journeys and responsive behavior. Mock Medusa at the boundary so tests run without credentials. Do not let test doubles leak into live mode.
8. **Compare visuals:** capture post-migration screenshots at the same dimensions as baseline and compare homepage, category, product details, mega menu, cart drawer and mobile navigation. Fix material regressions. If no browser/screenshot tool is available, record the exact blocker and do all available automated checks.
9. **Final quality review:** inspect the complete diff for accidental deletion, broken imports, dead links, oversized duplicated code, unsafe environment exposure, debug logs, broad suppressions, fake success states and unrelated changes. Run final typecheck, lint, unit/component tests, production build and Playwright tests. Verify SEO output and direct-route loading.
10. **Deliver report:** create/update README and `.env.example` as necessary, and write `MIGRATION_REPORT.md` with the route mapping, architecture decisions, preserved behavior, important file changes, SEO work, actual test outputs, visual comparison paths, limitations and precise information required to complete live Medusa integration.

## Quality expectations

- Treat `plan.md` acceptance criteria as mandatory.
- Favor small, readable modules with clear responsibilities. No giant components, speculative abstractions, needless state libraries, duplicate source-of-truth data, or unnecessary dependencies.
- Do not rebuild every component blindly. Port clean presentational components, adapt interactive components, and replace only architecture that needs replacing.
- Keep cart, wishlist, search and navigation concerns separate; avoid recreating the old monolithic `StoreContext` unchanged.
- Make every existing navigation item either work or have a deliberate, honest disabled/not-available state.
- Do not leave empty placeholder routes or controls that appear functional but do nothing.
- Keep product fixture values and source assets accurate to the existing project. Mark demo-only data clearly.
- A successful build is not sufficient; perform browser-level testing where available.
- Be honest about all unrun tests and unavailable backend checks. Never fabricate results.

## Completion conditions

Continue until the application is implemented and tested, rather than stopping after an interim summary. If an external dependency blocks real Medusa testing, finish every other task and report the exact missing inputs; do not claim the live integration is verified.

At the end, summarize:

- What is implemented and what was preserved.
- Commands actually run and their exact pass/fail outcomes.
- Which routes and viewports were checked.
- Where screenshots and `MIGRATION_REPORT.md` are saved.
- Remaining defects and known limitations.
- The exact Medusa backend details/credentials needed next (never ask for or expose admin secrets in frontend code).
