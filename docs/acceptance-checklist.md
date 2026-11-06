# Acceptance Checklist — AURELIS ESTATES

## Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Implemented
- `[T]` Automated test passed
- `[M]` Manual review required
- `[B]` Blocked by external dependency

## Phase 0 — Audit and Planning

- [x] [Phase 0] Read SPEC.md in full — `SPEC.md` — reading log — implemented
- [x] [Phase 0] Repository inspection — `docs/implementation-plan.md`, `docs/asset-manifest.md` — implemented (workspace contains unrelated repos; new project at `aurelis-estates/`)
- [x] [Phase 0] Implementation plan — `docs/implementation-plan.md` — implemented
- [x] [Phase 0] Component architecture — `docs/component-architecture.md` — implemented
- [x] [Phase 0] Asset manifest — `docs/asset-manifest.md` — implemented (all production media blocked)
- [x] [Phase 0] Risk register — `docs/risk-register.md` — implemented
- [x] [Phase 0] Testing plan — `docs/testing-plan.md` — implemented
- [x] [Phase 0] Acceptance checklist — `docs/acceptance-checklist.md` — implemented

---

## Phase 1 — Foundation and Design System

- [x] [Phase 1] Vite + React scaffold — `package.json`, `vite.config.js`
- [x] [Phase 1] Tailwind CSS configured with brand palette tokens — `tailwind.config.js`
- [x] [Phase 1] Cormorant Garamond + Inter typographic setup — `src/styles/index.css`
- [x] [Phase 1] Dependencies installed (GSAP, ScrollTrigger, Framer Motion, Lenis, Three.js, React Hook Form, Zod, Mapbox GL JS, Lucide React) — `package.json` (ScrollTrigger ships inside the `gsap` package)
- [x] [Phase 1] Property data module (6 listings) — `src/data/properties.js`
- [x] [Phase 1] Environment configuration module (`hasMapboxToken`, `hasFormEndpoint`) — `src/lib/env.js`
- [x] [Phase 1] `.env.example` with VITE_MAPBOX_TOKEN + VITE_CONTACT_FORM_ENDPOINT — `.env.example`
- [x] [Phase 1] Layout primitives (Button, SectionHeading) — `src/components/common/`
- [x] [Phase 1] Core hooks (useMediaQuery, useReducedMotion, useActiveSection, useScrollDirection, useLockBodyScroll, useMapToken) — `src/hooks/`
- [x] [Phase 1] SEO metadata (<title>, meta description, OG, Twitter, canonical, JSON-LD RealEstateAgent, robots.txt) — `index.html`, `public/robots.txt`, `src/components/common/SeoMetadata.jsx`
- [x] [Phase 1] Vitest configuration — `vite.config.js`, `tests/setup.js`
- [x] [Phase 1] ESLint configuration — `.eslintrc.cjs`
- [T] [Phase 1] Production build passes — `npm run build` ✓ built in 11.73s
- [T] [Phase 1] Lint passes — `npm run lint` (0 errors, 0 warnings)

---

## Phase 2 — Core Content and Functional Components

### Navigation
- [x] [Phase 2] Transparent over hero — `src/components/navigation/Navigation.jsx`
- [x] [Phase 2] Surface changes after scroll
- [x] [Phase 2] Hides on downward scroll, reappears on upward scroll
- [x] [Phase 2] Active-section highlighting — `useActiveSection`
- [x] [Phase 2] Smooth anchor scrolling (Lenis-free in Phase 2) — `src/utils/scroll.js`
- [x] [Phase 2] Accessible mobile menu open/close
- [x] [Phase 2] Escape closes mobile menu
- [x] [Phase 2] Body scroll managed while menu open (`useLockBodyScroll`)
- [x] [Phase 2] Focus handled correctly (return focus on close) — `MobileMenu` restores `document.activeElement`

### Hero
- [x] [Phase 2] Hero section structure (copy, CTA, image area) — `src/components/hero/Hero.jsx`

### Property Search
- [x] [Phase 2] Filter by location — `src/components/search/PropertySearch.jsx`
- [x] [Phase 2] Filter by property type
- [x] [Phase 2] Filter by minimum price
- [x] [Phase 2] Filter by maximum price
- [x] [Phase 2] Filter by bedrooms
- [x] [Phase 2] Reset filters behavior
- [x] [Phase 2] Accessible small-screen layout (grid collapses 6→2→1 cols)
- [x] [Phase 2] Empty result state — `src/components/properties/EmptyState.jsx`
- [x] [Phase 2] Prices numeric in data; "From" pricing handled — `src/data/properties.js`
- [T] [Phase 2] Property filter unit tests pass — `tests/unit/filters.spec.jsx` (12 tests)

### Featured Properties
- [x] [Phase 2] Six listings rendered from data — `src/data/properties.js`
- [x] [Phase 2] Reusable PropertyCard — `src/components/properties/PropertyCard.jsx`
- [x] [Phase 2] Property metadata complete (beds, baths, area, status, location)
- [x] [Phase 2] View-property interaction opens detail panel/modal (`Modal` + `PropertyDetailPanel`)
- [x] [Phase 2] Schedule-viewing interaction (scrolls to contact, preselects property) — `App.jsx` `scheduleViewing`
- [x] [Phase 2] Keyboard operable on cards (Enter/Space opens detail; sr-only trigger button)
- [x] [Phase 2] Visible focus states on all interactive controls (`focus-visible:outline-gold`)
- [x] [Phase 2] Touch-friendly tap targets (≥44px) — `min-h-[44px]` on controls

### Other Sections
- [x] [Phase 2] Services section — 6 services — `src/components/services/ServicesSection.jsx`
- [x] [Phase 2] Neighborhood & lifestyle section — `src/components/neighborhoods/NeighborhoodsSection.jsx`
- [x] [Phase 2] Expertise / market metrics — `src/components/expertise/ExpertiseSection.jsx`
- [x] [Phase 2] Testimonials carousel (accessible, keyboard-navigable) — `src/components/testimonials/TestimonialsSection.jsx`
- [x] [Phase 2] Final CTA section — `src/components/contact/FinalCallToAction.jsx`
- [x] [Phase 2] Footer with links — `src/components/footer/Footer.jsx`

### Phase 2 Validation
- [T] [Phase 2] Build succeeds — `npm run build` ✓ built in 1m 33s
- [T] [Phase 2] Filter unit tests pass — 18/18 (mortgage 6, filters 12)
- [M] [Phase 2] Responsive review at 6 breakpoints — pending visual confirmation


---

## Phase 3 — Map, Calculator, and Forms

### Map
- [x] [Phase 3] Mapbox integrated dynamically (token-gated) — `src/components/map/MapContainer.jsx`, `MapSection.jsx` (lazy `import()` with `Suspense`)
- [x] [Phase 3] MapFallback when token missing — accessible list of 6 locations — `src/components/map/MapFallback.jsx`
- [x] [Phase 3] Selecting card selects its marker (shared `selectedPropertyId` filters marker state)
- [x] [Phase 3] Selecting marker highlights its card (`onSelectProperty` callback from marker click handler)
- [x] [Phase 3] One source of truth for selected property — `App.jsx` `selectedPropertyId` lifted state
- [x] [Phase 3] Map flies to property (flyTo) — `MapContainer.flyToProperty` on selection change
- [x] [Phase 3] Filters affect both cards and markers — `visibleProperties` shared from `App.jsx`
- [x] [Phase 3] No misleading map errors when token missing — env.js refuses to load Mapbox without token
- [T] [Phase 3] Map fallback tests pass — `tests/unit/mapFallback.spec.jsx` (3 tests; full E2E in Phase 7)

### Mortgage Calculator
- [x] [Phase 3] Fixed-rate mortgage formula — `src/utils/mortgage.js`
- [x] [Phase 3] Loan amount calculated (price − down payment)
- [x] [Phase 3] Principal & interest calculated
- [x] [Phase 3] Monthly property tax calculated
- [x] [Phase 3] Monthly insurance calculated
- [x] [Phase 3] Monthly HOA included
- [x] [Phase 3] Total monthly payment calculated
- [x] [Phase 3] Total interest calculated
- [x] [Phase 3] Estimated cash at closing calculated
- [x] [Phase 3] Down payment amount ↔ percentage synchronized — `CalculatorSection` `onDownAmount` / `onDownPercent`
- [x] [Phase 3] Invalid loan amount prevented — `normalizeCalcInputs` rejects invalid/zero/negative
- [x] [Phase 3] Currency and percentage formatting — `src/utils/format.js`
- [x] [Phase 3] Updates immediately on input change — `useMemo` recalculation on state change
- [T] [Phase 3] Mortgage unit tests pass — `tests/unit/mortgage.spec.jsx` (16 tests)
- [T] [Phase 3] E2E mortgage updates — `tests/e2e/home.spec.jsx` "mortgage calculator computes a monthly payment and a loan amount"

### Forms
- [x] [Phase 3] Inquiry form built with React Hook Form + Zod — `src/components/contact/ContactSection.jsx`, `src/lib/schemas.js`
- [x] [Phase 3] Viewing-request form with date/time/property fields
- [x] [Phase 3] Accessible labels on every field — `FormControls.jsx` `FormField` + `aria-describedby`
- [x] [Phase 3] Error announcements (programmatic, live region) — `role="alert"` per error and `FormStatus` live region
- [x] [Phase 3] Honeypot field present — `company` (inquiry) and `website` (viewing)
- [x] [Phase 3] Consent checkbox required — `consentField` Zod refinement
- [x] [Phase 3] Loading state — disabled submit + spinner
- [x] [Phase 3] Success state — `FormStatus status="success"`
- [x] [Phase 3] Error state — `FormStatus status="error"`
- [x] [Phase 3] Tabs isolation: correct tab-specific fields revealed — `AccessibleTabs` `hidden` attribute
- [x] [Phase 3] Accessible tabs (keyboard, arrow keys) — `AccessibleTabs` handles ArrowLeft/Right/Home/End/Enter
- [x] [Phase 3] Mobile-friendly date/time controls — native `<input type="date|time">`
- [x] [Phase 3] Local submission fallback (when endpoint missing) — `src/lib/submitForm.js` (`mode: 'simulated'`)
- [T] [Phase 3] Local submission tested — `tests/unit/submitForm.spec.jsx` (3 tests)
- [T] [Phase 3] Form validation E2E passes — `tests/e2e/home.spec.jsx` "inquiry form shows validation errors", `tests/e2e/axe.spec.jsx` "contact form preserves keyboard accessibility"

### Phase 3 Validation
- [T] [Phase 3] Build succeeds — `node node_modules/vite/bin/vite.js build` ✓ built in 38s
- [T] [Phase 3] Phase 3 unit tests pass — 34/34 (mortgage 16, filters 12, mapFallback 3, submitForm 3)
- [x] [Phase 3] Playwright E2E no longer deferred — project installed in Phase 4; Phase 3 form/calculator/map coverage now in `tests/e2e/home.spec.jsx`

---

## Phase 4 — Accessibility and Responsiveness

### Accessibility
- [x] [Phase 4] Skip-to-content link — `src/components/common/SkipLink.jsx` (`#main`), E2E verified
- [x] [Phase 4] Semantic landmarks (header/nav/main/footer) — E2E verified
- [x] [Phase 4] Logical heading order audited — single `h1`, no skipped levels — E2E verified
- [x] [Phase 4] Descriptive alt text on all meaningful images — `PropertyCard`, `Hero`
- [x] [Phase 4] Visible focus indicators — `focus-visible:outline-gold` on all interactive controls
- [x] [Phase 4] Keyboard navigation — Tab + Enter/Space on cards, tabs, links — E2E verified
- [x] [Phase 4] Programmatic error messages — per-field `role="alert"` — E2E verified
- [x] [Phase 4] Live regions for submission status — `FormStatus` `aria-live` — E2E verified
- [x] [Phase 4] Accessible tabs — `AccessibleTabs` (Enter/Space + Arrow keys) — E2E verified
- [x] [Phase 4] Accessible modal focus management — `Modal` focus trap + `useLockBodyScroll`
- [x] [Phase 4] Escape support in menu + modal — `MobileMenu` E2E verified; `Modal` closes on Escape
- [x] [Phase 4] Focus return after dialogs close — `MobileMenu` restores `document.activeElement`; `Modal` returns focus
- [x] [Phase 4] Sufficient contrast — axe WCAG AA scan clean (critical/serious)
- [x] [Phase 4] No color-only status communication — `FormStatus` pairs icon + text + border
- [x] [Phase 4] Touch target sizing ≥44px — `min-h-[44px]` on controls
- [x] [Phase 4] Accessible carousel controls for testimonials — `TestimonialsSection` prev/next + dots
- [x] [Phase 4] Accessible map fallback — `MapFallback` region with 6 buttons — E2E verified
- [T] [Phase 4] axe scan E2E passes — `tests/e2e/axe.spec.jsx` (WCAG 2.2 AA tag scan, no critical/serious violations)
- [T] [Phase 4] Keyboard-only E2E passes — `tests/e2e/axe.spec.jsx` (Enter activates tabs) + `tests/e2e/home.spec.jsx` (Tab reaches interactive element)
- [T] [Phase 4] Escape behavior E2E passes — `tests/e2e/home.spec.jsx` "mobile menu opens and closes via Escape"

### Reduced Motion
- [x] [Phase 4] Smooth scrolling disabled — `src/utils/scroll.js` checks `prefers-reduced-motion`
- [x] [Phase 4] Cursor interpolation disabled — `src/components/common/Cursor.jsx` not rendered under reduced motion
- [ ] [Phase 4] Scroll-linked parallax disabled — parallax not yet implemented (Phase 5)
- [ ] [Phase 4] Pinned cinematic sequences simplified — not yet implemented (Phase 5)
- [ ] [Phase 4] Autoplay video paused / poster-only — video not yet integrated (Phase 6)
- [ ] [Phase 4] Three.js camera motion disabled — Three.js not yet integrated (Phase 5)
- [x] [Phase 4] Non-essential entrance animations disabled — `@media (prefers-reduced-motion: reduce)` in `src/styles/index.css`
- [ ] [Phase 4] Reduced-motion E2E passes — dedicated test not yet written (deferred)

### Custom Cursor
- [x] [Phase 4] Desktop fine-pointer devices only — `(pointer: fine)` media query
- [x] [Phase 4] Hidden on touch devices — `useMediaQuery` + width gate ≥1024px
- [x] [Phase 4] Disabled for reduced motion — `useReducedMotion`
- [x] [Phase 4] `pointer-events: none` — `.custom-cursor` / `.custom-cursor-ring` CSS
- [x] [Phase 4] Never blocks clicks or text selection — pointer-events none + `aria-hidden`

### Responsive
- [ ] [Phase 4] No horizontal overflow at 6 breakpoints
- [ ] [Phase 4] Readable typography
- [ ] [Phase 4] Usable forms
- [ ] [Phase 4] Usable map controls
- [ ] [Phase 4] Touch-safe cards
- [ ] [Phase 4] Reduced pinned-section duration
- [ ] [Phase 4] Simplified parallax
- [ ] [Phase 4] No content hidden beneath fixed nav
- [ ] [Phase 4] No clipped modal content
- [ ] [Phase 4] No inaccessible off-screen controls
- [ ] [M] Visual review at 1440×900
- [ ] [M] Visual review at 1280×800
- [ ] [M] Visual review at 1024×768
- [ ] [M] Visual review at 768×1024
- [ ] [M] Visual review at 390×844
- [ ] [M] Visual review at 360×800

### Phase 4 Validation
- [T] [Phase 4] Playwright E2E suite passes — 11/11 (`tests/e2e/axe.spec.jsx`, `tests/e2e/home.spec.jsx`)
- [T] [Phase 4] Unit tests pass — 35/35 (mortgage 16, filters 12, mapFallback 3, submitForm 3, formControls 1)
- [T] [Phase 4] Lint passes — `npm run lint` (0 errors, 0 warnings)
- [T] [Phase 4] Production build succeeds — `npm run build` ✓ built in 27.77s
- [M] [Phase 4] Responsive visual review — pending

---

## Phase 5 — Motion System

### Smooth Scroll
- [x] [Phase 5] Lenis global integration — `src/hooks/useSmoothScroll.js` (gsap ticker-driven, ScrollTrigger.sync)
- [x] [Phase 5] Disabled for reduced motion — hook returns early; `scroll.js` honors `prefers-reduced-motion`

### Section Reveals
- [x] [Phase 5] Restrained text reveals on section enter (GSAP) — `src/hooks/useReveals.js` + `data-reveal` on section content
- [x] [Phase 5] Hero parallax — `Hero.jsx` watermark + grid ScrollTrigger scrub
- [x] [Phase 5] Navigation motion (smooth scroll-driven state) — `useScrollDirection` + CSS `transition-[transform,…]`

### Framer Motion
- [x] [Phase 5] Property card hover/tap states — `PropertyCard.jsx` `motion.article` + child visual scale (variant-propagated, no conflict with GSAP reveal on `<li>`)
- [x] [Phase 5] Modal transitions — `Modal.jsx` `AnimatePresence` backdrop/panel enter+exit
- [x] [Phase 5] Component entry/exit where appropriate — `ScrollProgress.jsx` (framer `useScroll`)

### GSAP ScrollTrigger
- [x] [Phase 5] Signature pinned property showcase — `ShowcaseSection.jsx` pin + cross-fade slides + parallel visual reveal
- [x] [Phase 5] Progress indicator — global `ScrollProgress`; local pinned-showcase progress bar bound to ScrollTrigger progress
- [ ] [Phase 5] Reverse-scroll correctness verified [M] — pending manual
- [ ] [Phase 5] Refresh-at-mid-page verified [M] — pending manual
- [ ] [Phase 5] Resize behavior verified [M] — pending manual (`invalidateOnRefresh` configured)
- [x] [Phase 5] Cinematic video reveal ScrollTrigger — `CinematicRevealSection.jsx` clip-reveal + static poster fallback (video asset Phase 6)

### Custom Cursor
- [x] [Phase 5] Decoration only; pointer-events:none — `Cursor.jsx` + `.custom-cursor{pointer-events:none}` CSS
- [x] [Phase 5] Hidden on touch/reduced-motion — `Cursor.jsx` media-gated, reduced-motion CSS hides

### Three.js
- [x] [Phase 5] Architectural depth effect on hero — `HeroDepthCanvas.jsx` layered wireframe planes
- [x] [Phase 5] DPR limited — `Math.min(devicePixelRatio, 2)`
- [x] [Phase 5] Suspended when off-screen — IntersectionObserver gates rAF renders
- [x] [Phase 5] Reduced complexity on mobile — fewer planes + lower internal resolution on `max-width:768px`
- [x] [Phase 5] Reduced motion path — component returns null under `prefers-reduced-motion`
- [x] [Phase 5] Disposal of geometries/materials/textures/listeners on unmount — disposal + IO disconnect + renderer.dispose
- [x] [Phase 5] Static fallback when WebGL unavailable — try/catch on renderer init returns null; CSS gradient/grid remain

### Phase 5 Validation
- [x] [Phase 5] No transform conflicts (GSAP vs Framer) — reveals target `<li>`/section; Framer targets inner image only
- [x] [Phase 5] No layout jumping — reveals via `opacity`+`y`; pin uses `min-h` + `pinSpacing` default
- [x] [Phase 5] No trapped scroll — Lenis owns scroll; anchors push correct offset via `scrollTo(target, {offset})`
- [x] [Phase 5] No horizontal overflow — parallax uses `yPercent`; sections are `overflow-hidden`
- [T] [Phase 5] Build succeeds — `npm run build` ✓ 16–17s; Three.js + HeroDepthCanvas code-split
- [T] [Phase 5] Lint passes — `npm run lint` (0 errors, 0 warnings)
- [T] [Phase 5] Unit tests pass — 35/35
- [T] [Phase 5] E2E passes — 11/11 (axe WCAG AA still clean after motion layer added)
- [M] [Phase 5] Acceptable frame behavior — pending manual (Three.js off-screen suspend + reduced-motion render steady)

---

## Phase 6 — Media Integration and Visual Refinement

> **Placeholder media policy:** all media is sourced from license-friendly
> stock (Unsplash photos, Pexels video) and stored locally in `public/media/`.
> These are *placeholder* assets standing in for production photography; each
> one is documented with attribution in `docs/asset-manifest.md` and can be
> swapped for production assets in-place (same filenames) without code changes.

- [x] [Phase 6] Hero image integrated — `public/media/hero/hero-{1920,960}.{avif,webp,jpg}`
- [x] [Phase 6] Cinematic video + poster integrated — `public/media/cinematic/cinematic-{720,1080}.mp4` + `cinematic-poster.jpg`
- [x] [Phase 6] All 6 property images integrated — `public/media/properties/<id>-{1200,600}.{avif,webp,jpg}`
- [x] [Phase 6] Showcase flagship image — `public/media/properties/showcase-sapphire-penthouse-1500.{avif,webp,jpg}` (4:5 vertical crop)
- [x] [Phase 6] Neighborhood images — `public/media/neighborhoods/<id>-{800,400}.{avif,webp,jpg}`
- [x] [Phase 6] Testimonial avatars — monogram fallback retained (acceptable per spec)
- [x] [Phase 6] Responsive images — `<PictureImage>` component emits `<picture>` with AVIF + WebP `<source>` + JPG `<img>`; srcset+sizes + width/height
- [x] [Phase 6] Eager loading only for primary hero visual — `loading="eager"` + `fetchPriority="high"` on Hero; all other images `loading="lazy"`
- [x] [Phase 6] Video paused when off-screen — IntersectionObserver (`threshold: 0.25`) pause/play in `CinematicRevealSection`
- [x] [Phase 6] Poster fallback when playback unavailable — `poster=…`; autoplay is wrapped in `.catch()` to silently fall back to poster
- [x] [Phase 6] No missing asset paths — 85 media files copied to `dist/media/`; verified bulk download against data IDs
- [x] [Phase 6] No watermarks — stock from Unsplash/Pexels, license-cleared; no Unsplash watermark (full-resolution downloads)
- [x] [Phase 6] No layout shift from media — `width`/`height` attrs + `aspect-[…]` boxes reserve space before load
- [x] [Phase 6] Reduced-motion: cinematic video has `autoPlay={!reduce}` → poster only under reduced-motion; reveals/parallax already gated in Phase 5
- [ ] [Phase 6] Spacing / typography refined — pending manual visual pass
- [ ] [Phase 6] Overlays / transitions refined — pending manual visual pass
- [ ] [Phase 6] Visual consistency sweep — pending manual visual pass
- [x] [M] Manual visual review — completed (32 shots captured at 6 breakpoints + interactions + reduced-motion; log in `docs/visual-review/log.txt`; only Google Fonts network error in test env)
- [T] [Phase 6] Build succeeds — `npm run build` ✓ 28.59s (media copied to dist)
- [T] [Phase 6] axe WCAG AA scan still clean (decorative `alt=""`, meaningful alts on showcase/neighborhoods)
- [T] [Phase 6] Lint passes (0/0); unit 35/35; E2E 11/11

---

## Phase 7 — Final Verification

- [T] [Phase 7] All unit tests pass — `npm run test:unit` (35/35)
- [T] [Phase 7] All E2E tests pass — `npm run test:e2e` (11/11)
- [T] [Phase 7] axe scan results recorded — WCAG 2.2 AA clean (0 critical/serious)
- [T] [Phase 7] Production build passes — `npm run build` ✓
- [ ] [Phase 7] Performance checks run — measured results only
- [ ] [Phase 7] Environment fallbacks verified (no token, no endpoint)
- [ ] [Phase 7] All links verified
- [ ] [Phase 7] All calculations verified
- [ ] [Phase 7] Forms verified (valid + error)
- [ ] [Phase 7] Responsive behavior verified [M]
- [ ] [Phase 7] Console errors clean
- [ ] [Phase 7] Network failures clean
- [ ] [Phase 7] README updated — `README.md`
- [ ] [Phase 7] Final audit report — `docs/final-audit.md`
- [ ] [Phase 7] Performance report — `docs/performance-report.md`

---

## Cross-cutting Concerns

- [ ] SEO metadata <title> — `index.html`
- [ ] SEO meta description — `index.html`
- [ ] Open Graph metadata
- [ ] Twitter card metadata
- [ ] Canonical URL placeholder
- [ ] `public/robots.txt` present
- [ ] RealEstateAgent structured data (no invented claims)
- [ ] Structured data for featured properties
- [ ] Semantic page structure
- [ ] Image alt text descriptive
- [ ] Code splitting for heavy sections (Mapbox, Three.js)
- [ ] Dynamic loading for Mapbox
- [ ] Dynamic loading for Three.js
- [ ] Cleanup for observers, timelines, listeners, media
- [ ] No unnecessary continuous rendering when idle
- [ ] README covers: overview, prerequisites, install, dev, build, preview, tests, env setup, Mapbox setup, form endpoint setup, asset replacement, accessibility notes, deployment, known external dependencies