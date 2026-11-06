# AURELIS ESTATES — Development Process

## Project Overview

AURELIS ESTATES is a luxury real estate single-page application built as a fully accessible, motion-rich, editorial-grade marketing site. It showcases six high-end properties across global markets (New York, Los Angeles, Lake Como, London, Dubai, Gstaad) with interactive search, a mortgage calculator, an OpenStreetMap/Mapbox map integration, and a cinematic hero with a Three.js depth canvas.

The site was developed iteratively across seven phases, with each phase building on the previous one. AI-assisted development was used throughout, with models handling code generation, debugging, refactoring, accessibility audits, and documentation.

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI framework (SPA, hooks, concurrent features) |
| Vite | 5.4 | Build tool, dev server, HMR, production bundling |
| JavaScript (ES Modules) | ES2020 target | Language (no TypeScript) |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.4 | Utility-first CSS framework |
| PostCSS | 8.4 | CSS processing pipeline |
| Autoprefixer | 10.4 | Vendor prefix automation |

### Typography

| Font | Source | Role |
|------|--------|------|
| Cormorant Garamond | Google Fonts | Headings — serif editorial voice |
| Inter | Google Fonts | UI elements — labels, buttons, navigation |
| Spectral | Google Fonts | Body prose — paragraph text with editorial cadence |

### Animation and Motion

| Technology | Version | Purpose |
|------------|---------|---------|
| GSAP | 3.12 | ScrollTrigger-driven parallax, reveal animations, Lenis ticker |
| ScrollTrigger (GSAP) | bundled | Section-based scroll animations, pinning, progress |
| Framer Motion | 11.3 | Modal enter/exit, card hover states, scroll progress bar |
| Lenis | 1.1 | Smooth scroll (replaces native scrolling with rAF-driven interpolation) |

### 3D and Maps

| Technology | Version | Purpose |
|------------|---------|---------|
| Three.js | 0.169 | Hero depth canvas — decorative wireframe architectural planes |
| Mapbox GL JS | 3.7 | Interactive property map (lazy-loaded, optional — requires token) |
| OpenStreetMap | iframe embed | Property location display in detail modal (no token required) |

### Forms and Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| React Hook Form | 7.53 | Form state management, validation orchestration |
| Zod | 3.23 | Schema-based validation (inquiry + viewing forms) |
| @hookform/resolvers | 3.10 | Zod-to-React Hook Form bridge |

### Icons

| Technology | Version | Purpose |
|------------|---------|---------|
| Lucide React | 0.439 | SVG icon library (MapPin, Menu, X, BedDouble, Bath, etc.) |

### Testing

| Technology | Version | Purpose |
|------------|---------|---------|
| Vitest | 2.1 | Unit test runner (jsdom environment) |
| @testing-library/react | 16.0 | Component rendering and assertion utilities |
| @testing-library/jest-dom | 6.5 | Custom DOM matchers (toBeInTheDocument, etc.) |
| @testing-library/user-event | 14.5 | Simulated user interactions in tests |
| Playwright | 1.47 | E2E test runner (Chromium, production build) |
| @axe-core/playwright | 4.10 | Automated WCAG AA accessibility scanning |
| jsdom | 25.0 | DOM simulation for unit tests |

### Code Quality

| Technology | Version | Purpose |
|------------|---------|---------|
| ESLint | 8.57 | Linting (zero-warning policy) |
| eslint-plugin-react | 7.35 | React-specific lint rules |
| eslint-plugin-react-hooks | 4.6 | Hooks rules enforcement |
| eslint-plugin-react-refresh | 0.4 | Fast refresh compatibility checks |

### Deployment Readiness

| File | Purpose |
|------|---------|
| `.gitignore` | Ignores node_modules, dist, test artifacts, .env files |
| `.env.example` | Documents required environment variables |
| `robots.txt` | Search engine crawl directives |
| `index.html` | SEO meta tags, Open Graph, Twitter Card, JSON-LD structured data |

---

## AI Models Used

This project was developed with AI assistance across all phases. The following models were used:

| Model | Context | Role |
|-------|---------|------|
| **opencode/big-pickle** | Interactive CLI session | Primary development model — handled all code generation, debugging, refactoring, and documentation throughout Phases 0–7 |
| **opencode/explore** | Subagent (parallel research) | Fast codebase exploration — file inventories, grep searches, dependency audits, pattern matching across the full source tree |
| **opencode/general** | Subagent (parallel tasks) | Multi-step research and analysis — comprehensive codebase audits, cross-file dependency tracing |

### How AI Was Used

1. **Code Generation**: Components, hooks, utilities, data modules, and configuration files were generated from natural language descriptions of desired behavior.
2. **Debugging**: Bug reports (e.g., "the map popup doesn't show", "scroll wheel doesn't work in the modal") were traced to root causes through systematic code reading and fixed with targeted edits.
3. **Refactoring**: Component architecture was reorganized multiple times (e.g., property data separation, filter system, map fallback strategy) with AI handling the structural changes.
4. **Accessibility Audits**: axe-core E2E tests were written and maintained by AI, ensuring WCAG AA compliance throughout development.
5. **Documentation**: README, SPEC.md, component architecture docs, and this file were generated and maintained by AI.
6. **Parallel Exploration**: Subagents were used to audit the entire codebase for console.logs, unused imports, dead code, and dependency usage without blocking the main development thread.

---

## Development Phases

### Phase 0: Project Scaffolding

**Goal**: Establish the foundation — Vite + React + Tailwind, project structure, design tokens.

- Initialized Vite React project with ES module support
- Configured Tailwind CSS with custom color palette (ivory, charcoal, graphite, gold, sand)
- Defined typography system (Cormorant Garamond headings, Inter UI)
- Set up ESLint with zero-warning policy
- Created directory structure: `components/`, `hooks/`, `utils/`, `data/`, `lib/`, `styles/`

### Phase 1: Design System and Common Components

**Goal**: Build reusable UI primitives — Button, Modal, SectionHeading, FormControls.

- Built `Button` component with variant system (gold, outline, ghost) and `as` polymorphism (button/a)
- Built `Modal` with AnimatePresence (Framer Motion), focus trap, Escape key, body scroll lock
- Built `SectionHeading` with eyebrow/title/description pattern
- Built `FormField`, `Input`, `Select`, `Textarea`, `ConsentCheckbox`, `Honeypot` form controls
- Built `AccessibleTabs` with keyboard navigation (arrow keys, Home/End)
- Built `PictureImage` for responsive image loading with format negotiation (AVIF/WebP/JPG)

### Phase 2: Section Components

**Goal**: Build all page sections — Hero through Footer.

- **Hero**: Full-viewport with background image, headline, CTA, scroll indicator, Three.js depth canvas
- **About**: Two-column layout with parallax image and guiding principles
- **Showcase**: Horizontal scroll section highlighting flagship property
- **Properties**: Grid of property cards with search/filter system and detail modal
- **Cinematic**: Video section with ambient motion
- **Services**: Six-service grid with icons and descriptions
- **Neighborhoods**: Image cards for six global markets
- **Map**: Interactive Mapbox map or text-based fallback (no token required)
- **Calculator**: Mortgage calculator with live payment computation
- **Expertise**: Metrics display (48 yrs, 12 cities, $3.4B, 94%)
- **Testimonials**: Carousel with navigation controls
- **Contact**: Tabbed inquiry/viewing form with validation
- **Final CTA**: Closing call-to-action
- **Footer**: Site footer with navigation links

### Phase 3: Data Layer

**Goal**: Centralize all content in data modules, separate from components.

- `properties.js`: Six property listings with coordinates, features, amenities, agent notes
- `content.js`: Services, neighborhoods, metrics, testimonials
- `navigation.js`: Site navigation links
- `filters.js`: Property filter logic (type, location, bedrooms, price range)
- `format.js`: Currency and area formatting utilities
- `mortgage.js`: Mortgage calculation formulas
- `scroll.js`: Smooth scroll and anchor navigation utilities
- `schemas.js`: Zod validation schemas for forms
- `env.js`: Environment variable access with validation

### Phase 4: Accessibility

**Goal**: Achieve WCAG AA compliance across all interactive elements.

- Skip-to-content link
- Landmark roles (banner, main, contentinfo)
- Heading hierarchy (single h1, sequential h2s)
- Focus management in Modal and MobileMenu
- Keyboard navigation for tabs, carousel, filter controls
- `aria-current`, `aria-expanded`, `aria-label`, `aria-hidden` throughout
- `prefers-reduced-motion` gating on all animations
- Automated axe-core E2E tests (11 tests, zero violations)
- Screen reader announcements for form submission states

### Phase 5: Motion System

**Goal**: Add scroll-driven animations and smooth scrolling without breaking accessibility.

- Lenis smooth scroll integrated with GSAP ticker (shared rAF loop)
- ScrollTrigger for section reveals, parallax, progress tracking
- `useReveals` hook: IntersectionObserver-driven fade-up stagger on `data-reveal` elements
- `useScrollDirection`: Hides navbar on scroll down, shows on scroll up
- `ScrollProgress`: Gold progress bar at top of viewport
- `HeroDepthCanvas`: Three.js wireframe planes with mouse parallax, IntersectionObserver suspend, WebGL failure fallback
- All motion gated by `prefers-reduced-motion: reduce` media query
- `useReducedMotion` hook used in 12+ components

### Phase 6: Visual Review and Polish

**Goal**: Capture screenshots at all breakpoints, verify visual consistency.

- Visual review script (`scripts/visual-review.mjs`) captures full-page screenshots at 6 breakpoints
- Section-by-section screenshots for desktop, mobile, and reduced-motion
- Interaction state screenshots (modal open, mobile menu, cinematic frame)
- Console and network error sweep
- Image asset optimization (AVIF/WebP/JPG, multiple sizes per asset)
- Public media organized: `hero/`, `properties/`, `neighborhoods/`, `cinematic/`

### Phase 7: Bug Fixes and Enhancements

**Goal**: Fix reported issues, improve UX, prepare for deployment.

This phase addressed the most complex bugs encountered during development. Each is documented in detail in the **Problems and Solutions** section below.

- Map popup integration (OpenStreetMap iframe in property detail modal)
- Modal scroll-leak fix (Lenis stop/start + wheel event propagation)
- Custom cursor z-index fix (raised above modal)
- Hamburger menu visibility fix (adaptive color based on scroll state)
- Paragraph typography upgrade (Spectral font family)
- About section parallax animation
- Dead code removal and deployment preparation

---

## Problems and Solutions

### Problem 1: Map Popup Not Showing a Real Map

**Symptom**: Clicking a property location in the Map section opened the detail modal, but the map area showed only a static pin icon on a dark background — no geographic context.

**Root Cause**: The `PropertyMapEmbed` component was originally built with a broken toggle pattern. It used `let expanded = false` (a plain variable, not React state) to control an overlay. Since the variable reset to `false` on every render and there was no state update, React never re-rendered the component, so the overlay never appeared. Even if it had worked, the component showed only a pin icon with no actual map.

**Solution**: Replaced the entire component with an OpenStreetMap iframe embed:
- The iframe loads `openstreetmap.org/export/embed.html` with the property's coordinates
- A marker is placed at the exact location
- A gradient overlay at the bottom shows the location name and an "Open in map" link
- Works in all environments without any API token
- Accessible: proper `title` attribute, `loading="lazy"`, `sandbox` restrictions

**File**: `src/components/map/PropertyMapEmbed.jsx`

---

### Problem 2: Modal Scroll-Leak (Trackpad Scrolling Page Behind Modal)

**Symptom**: When the property detail modal was open, using the trackpad or mouse wheel scrolled the page behind the modal instead of (or in addition to) scrolling the modal content.

**Root Cause**: Lenis smooth scroll drives its own scroll loop via `requestAnimationFrame` and intercepts wheel events at the `window` level, calling `preventDefault()` on them to prevent native scroll. When the modal opened:
1. `body.style.overflow = 'hidden'` was set (blocks native body scroll)
2. `lenis.stop()` was called (paused Lenis's RAF loop)
3. But Lenis's wheel event listener remained active and still called `preventDefault()` on every wheel event
4. This blocked native overflow scroll inside the modal panel (`overflow-y: auto`)

**Solution**: Two-part fix in `Modal.jsx`:
1. Kept `lenis.stop()` to prevent Lenis from writing to `window.scrollY`
2. Added a `wheel` event listener on the modal panel in the **capture phase** that calls `e.stopPropagation()`. This intercepts wheel events inside the modal before they bubble up to Lenis's listener at `window`. Since we only stop propagation (not `preventDefault`), the browser's native overflow scroll works independently on the panel.

**File**: `src/components/common/Modal.jsx` (lines 40–48, 84–85)

---

### Problem 3: Modal Z-Index Below Mapbox Controls

**Symptom**: In some configurations, Mapbox GL's internal rendering context (which uses its own z-index stacking) appeared above the modal backdrop.

**Root Cause**: The modal used default z-index values that were lower than Mapbox's internal z-index hierarchy.

**Solution**: Raised the modal z-index significantly:
- Backdrop: `z-[100]`
- Panel: `z-[110]`
- Added `overscroll-contain` to the panel to prevent scroll chaining

**File**: `src/components/common/Modal.jsx` (lines 89, 109)

---

### Problem 4: PropertiesSection useEffect Guard Preventing Modal Updates

**Symptom**: Clicking a second property location in the Map section while the modal was already open did not update the modal content — it stayed showing the first property.

**Root Cause**: In `PropertiesSection.jsx`, the `useEffect` that watches `selectedPropertyId` had a guard:
```js
if (property && !detailProperty) setDetailProperty(property);
```
The `!detailProperty` condition prevented the update when the modal was already open (i.e., `detailProperty` was already set).

**Solution**: Removed the `!detailProperty` guard:
```js
if (property) setDetailProperty(property);
```
Also removed `detailProperty` from the dependency array to prevent unnecessary re-runs. Now clicking any property location immediately updates the modal to show that property.

**File**: `src/components/properties/PropertiesSection.jsx` (lines 36–40)

---

### Problem 5: Custom Cursor Disappearing Over Modal

**Symptom**: On desktop, the custom gold cursor (dot + ring) disappeared when moving the mouse over the property detail modal.

**Root Cause**: Z-index conflict. The custom cursor CSS had `z-index: 90` (dot) and `z-index: 89` (ring). The modal panel had `z-index: 110`. Since both the cursor spans and the modal are `position: fixed`, the cursor rendered behind the modal.

**Solution**: Bumped the cursor z-index above the modal:
- `.custom-cursor`: `z-index: 90` → `z-index: 120`
- `.custom-cursor-ring`: `z-index: 89` → `z-index: 119`

Both cursor elements remain `pointer-events: none`, so they never interfere with clicks or focus.

**File**: `src/styles/index.css` (lines 118, 132)

---

### Problem 6: Scroll Wheel Not Working Inside Modal

**Symptom**: The mouse wheel had no effect inside the modal. Users could only scroll the modal content by dragging the scrollbar.

**Root Cause**: Same underlying issue as Problem 2, but manifesting differently. Lenis's wheel event listener on `window` called `preventDefault()` on every wheel event, which prevented the browser from processing the wheel event for native overflow scroll inside the modal panel. Even though `lenis.stop()` was called, the listener remained active.

**Solution**: The capture-phase `stopPropagation()` fix from Problem 2 also resolved this. Wheel events inside the modal panel are caught in the capture phase and stopped before they reach Lenis's listener. The browser's native overflow scroll then works normally.

**File**: `src/components/common/Modal.jsx` (lines 40–48)

---

### Problem 7: Hamburger Menu Invisible on Mobile

**Symptom**: On mobile breakpoints, the hamburger menu icon was invisible at the top of the page because its dark color blended with the dark hero background.

**Root Cause**: The hamburger button had a hardcoded `text-charcoal` class. At the top of the page, the navbar is transparent (`bg-transparent text-ivory`) to overlay the dark hero. The dark charcoal hamburger icon on the dark hero background was invisible.

**Solution**: Made the hamburger icon color adapt to the same `surface` state as the navbar:
```jsx
className={[
  'lg:hidden inline-flex items-center justify-center w-12 h-12 -mr-2 ...',
  surface ? 'text-charcoal' : 'text-ivory',
].join(' ')}
```
- `surface = false` (top of page): `text-ivory` — white icon on dark hero, visible
- `surface = true` (scrolled/menu open): `text-charcoal` — dark icon on ivory background, visible

**File**: `src/components/navigation/Navigation.jsx` (lines 110–116)

---

### Problem 8: Lenis Smooth Scroll Fighting Native Behavior

**Symptom**: On page load, the browser sometimes scrolled to a deep section (e.g., `#calculator`) from a previous session, bypassing the hero. Lenis's own scroll loop ignored `body { overflow: hidden }`.

**Root Cause**: Browsers restore previous scroll position on reload. Lenis drives its own scroll position via `window.scrollTo()` and ignores CSS `overflow: hidden` on the body.

**Solution**: In `useSmoothScroll.js`, before constructing the Lenis instance:
1. Clear any non-`#home` hash from the URL via `history.replaceState`
2. Call `window.scrollTo(0, 0)` to force the page to the top
3. Only then initialize Lenis

**File**: `src/hooks/useSmoothScroll.js` (lines 27–30)

---

### Problem 9: Page-Load Scroll to Calculator via Hash

**Symptom**: After navigating to the calculator section and refreshing, the page loaded at the calculator instead of the hero.

**Root Cause**: Browsers persist scroll position across reloads. The hash `#calculator` in the URL caused the browser to scroll to that section before JavaScript initialized.

**Solution**: Same as Problem 8 — the `history.replaceState` call strips the hash before Lenis initializes, and `window.scrollTo(0, 0)` resets the scroll position.

**File**: `src/hooks/useSmoothScroll.js` (lines 27–30)

---

### Problem 10: Dead Code — Unused Hooks

**Symptom**: Two hooks (`useMapToken` and `useMapTokenState`) existed in the codebase but were never imported by any component.

**Root Cause**: These hooks were created during the Mapbox integration phase but were superseded by direct imports from `lib/env.js` (which exports `hasMapboxToken` and `mapboxToken`). The hooks were never cleaned up.

**Solution**: Deleted both files. No code changes needed elsewhere since nothing imported them.

**Files removed**: `src/hooks/useMapToken.js`, `src/hooks/useMapTokenState.js`

---

### Problem 11: Missing .gitignore

**Symptom**: Build artifacts (`dist/`), test results (`test-results/`), and Playwright reports (`playwright-report/`) were present in the working tree with no gitignore to prevent them from being committed.

**Root Cause**: The project was initialized without a `.gitignore` file.

**Solution**: Created `.gitignore` with standard entries for Node.js, Vite, Playwright, and environment files.

**File**: `.gitignore` (new)

---

### Problem 12: Missing og:image for Social Sharing

**Symptom**: The `twitter:card` meta tag was set to `summary_large_image`, but no `og:image` was defined. Social media previews showed no image.

**Root Cause**: Open Graph image tags were never added during the SEO setup phase.

**Solution**: Added `og:image`, `og:image:width`, and `og:image:height` meta tags pointing to the hero image (`/media/hero/hero-1920.jpg`).

**File**: `index.html` (lines 26–28)

---

## Architecture Decisions

### Why Lenis + GSAP Instead of Native Scroll

Native CSS `scroll-behavior: smooth` provides no control over easing, duration, or scroll velocity. Lenis gives pixel-level control over scroll interpolation and integrates with GSAP's ticker, ensuring ScrollTrigger animations stay in sync with the smoothed scroll position. This is critical for the parallax and reveal animations that define the site's editorial feel.

### Why OpenStreetMap in Modal Instead of Mapbox

Mapbox GL JS is a 1,865 kB library that requires an API token and network access to Mapbox tile servers. For the property detail modal, an OpenStreetMap iframe provides a real, interactive, token-free map that works in all environments (development, staging, production, offline demos). The Mapbox interactive map is still available in the main Map section when a token is configured.

### Why No TypeScript

The project was scoped as a marketing site with a fixed set of pages and interactions. The data models (properties, services, neighborhoods) are stable and well-defined. React's runtime + ESLint's strict mode + Zod's schema validation on forms provide sufficient type safety without the compilation step.

### Why Manual Chunks in Vite

Three.js, Mapbox GL, GSAP, Framer Motion, and the form libraries are large dependencies. Splitting them into separate chunks via `manualChunks` ensures they load independently — Three.js only loads if the hero depth canvas renders, Mapbox only loads if a token is configured, and the form libraries only load when the contact section mounts.

---

## File Structure

```
aurelis-estates/
├── index.html                    # SPA entry point, SEO meta, JSON-LD
├── package.json                  # Dependencies, scripts
├── vite.config.js                # Build config, code splitting, test config
├── tailwind.config.js            # Design tokens, custom utilities
├── postcss.config.js             # Tailwind + Autoprefixer pipeline
├── .eslintrc.cjs                 # Lint rules (zero-warning)
├── .env.example                  # Required env vars
├── .gitignore                    # Version control ignores
├── public/
│   ├── robots.txt                # Crawl directives
│   └── media/
│       ├── hero/                 # Hero images (AVIF, WebP, JPG × 2 sizes)
│       ├── properties/           # Property photos (AVIF, WebP, JPG × 2 sizes)
│       ├── neighborhoods/        # Neighborhood images (AVIF, WebP, JPG × 2 sizes)
│       └── cinematic/            # Video + poster frame
├── src/
│   ├── main.jsx                  # React root mount
│   ├── App.jsx                   # Section composition, state management
│   ├── styles/index.css          # Tailwind layers, custom cursor, utilities
│   ├── components/
│   │   ├── hero/                 # Hero, HeroDepthCanvas (Three.js)
│   │   ├── about/                # AboutSection
│   │   ├── showcase/             # ShowcaseSection
│   │   ├── properties/           # PropertiesSection, PropertyCard, PropertyDetailPanel, EmptyState
│   │   ├── cinematic/            # CinematicRevealSection
│   │   ├── services/             # ServicesSection
│   │   ├── neighborhoods/        # NeighborhoodsSection
│   │   ├── map/                  # MapSection, MapContainer, MapFallback, MapLoading, PropertyMapEmbed
│   │   ├── calculator/           # CalculatorSection
│   │   ├── expertise/            # ExpertiseSection
│   │   ├── testimonials/         # TestimonialsSection
│   │   ├── contact/              # ContactSection, FinalCallToAction
│   │   ├── navigation/           # Navigation (desktop + mobile menu)
│   │   ├── footer/               # Footer
│   │   ├── search/               # PropertySearch (filters)
│   │   └── common/               # Button, Modal, SectionHeading, PictureImage, FormControls,
│   │                             # AccessibleTabs, Cursor, ScrollProgress, SeoMetadata
│   ├── hooks/
│   │   ├── useSmoothScroll.js    # Lenis + GSAP ticker integration
│   │   ├── useReveals.js         # IntersectionObserver-driven reveals
│   │   ├── useScrollDirection.js # Navbar show/hide on scroll
│   │   ├── useActiveSection.js   # Current section tracking for nav
│   │   ├── useReducedMotion.js   # prefers-reduced-motion query
│   │   ├── useMediaQuery.js      # Generic media query hook
│   │   └── useLockBodyScroll.js  # Body scroll lock for modals
│   ├── data/
│   │   ├── properties.js         # Six property listings
│   │   ├── content.js            # Services, neighborhoods, metrics, testimonials
│   │   └── navigation.js         # Site nav links
│   ├── lib/
│   │   ├── env.js                # Environment variable access
│   │   ├── motion.js             # GSAP + ScrollTrigger re-exports
│   │   ├── schemas.js            # Zod validation schemas
│   │   └── submitForm.js         # Form submission logic
│   └── utils/
│       ├── format.js             # Currency, area, percent formatting
│       ├── filters.js            # Property filter logic
│       ├── mortgage.js           # Mortgage calculation formulas
│       └── scroll.js             # Smooth scroll + anchor navigation
├── tests/
│   ├── setup.js                  # Vitest setup (jest-dom, matchMedia mock)
│   ├── unit/                     # 5 unit test files (35 tests)
│   └── e2e/                      # 2 E2E test files (11 tests, axe-core)
└── scripts/
    └── visual-review.mjs         # Screenshot capture harness
```

---

## Testing Strategy

### Unit Tests (Vitest, 35 tests)

- **filters.spec.jsx**: Property filter logic — type, location, bedrooms, price range, empty state
- **mortgage.spec.jsx**: Mortgage calculation — monthly payment, down payment, loan amount
- **formControls.spec.jsx**: Form component rendering — input, select, textarea, consent checkbox, honeypot
- **submitForm.spec.jsx**: Form submission — local mock endpoint, error handling, success state
- **mapFallback.spec.jsx**: Map fallback rendering — property list, coordinates display, button accessibility

### E2E Tests (Playwright + axe-core, 11 tests)

All tests run against the production build (`vite preview`) on Chromium:

- **axe accessibility scan**: WCAG AA compliance on home page and contact form
- **Page load**: Skip link, landmarks, heading hierarchy
- **Navigation**: Anchor jumps via in-page hash
- **Mobile menu**: Open/close via click, Escape key
- **Contact form**: Validation errors, consent requirement, local submission, success state
- **Schedule viewing**: Property prefill from modal
- **Mortgage calculator**: Monthly payment and loan amount computation
- **Map fallback**: All six property locations displayed without Mapbox token
- **Keyboard navigation**: Tab reaches interactive elements

### Accessibility

- Zero axe-core violations (WCAG AA)
- All interactive elements keyboard-accessible
- Screen reader announcements for dynamic content
- `prefers-reduced-motion` respected globally
- Focus management in modals and mobile menu

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_MAPBOX_TOKEN` | No | Mapbox GL access token. Without it, the Map section shows a text-based fallback. |
| `VITE_CONTACT_FORM_ENDPOINT` | No | URL for form submission. Without it, forms submit locally with simulated success. |

---

## Build Output

The production build produces code-split chunks:

| Chunk | Size (raw) | Size (gzipped) | Contents |
|-------|-----------|----------------|----------|
| Main bundle | ~1,200 kB | ~350 kB | React, ReactDOM, app components |
| `three` | 464 kB | 117 kB | Three.js (lazy — hero depth canvas only) |
| `motion` | — | — | Framer Motion (modal, cards, progress bar) |
| `gsap` | — | — | GSAP + ScrollTrigger (scroll animations) |
| `mapbox` | 1,865 kB | 522 kB | Mapbox GL JS (lazy — only with token) |
| `forms` | — | — | React Hook Form + Zod (contact section) |
| `HeroDepthCanvas` | — | — | Three.js scene (lazy) |
| `MapContainer` | — | — | Mapbox map (lazy) |
| CSS | — | — | Tailwind output + custom utilities |

---

## Deployment Checklist

Before deploying to production:

1. **Update placeholder URLs** in `index.html` (canonical, og:url, og:image) and `robots.txt` (sitemap)
2. **Create `.env`** from `.env.example` with production values
3. **Replace placeholder media** if needed (all assets in `public/media/` are production-ready)
4. **Run full verification**: `npm run lint && npm run test:unit && npm run build && npm run test:e2e`
5. **Deploy `dist/`** to your hosting provider (Vercel, Netlify, AWS S3, etc.)

---

*This document was generated as part of the AURELIS ESTATES development process. Last updated: August 2026.*
