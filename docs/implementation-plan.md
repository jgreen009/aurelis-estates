# Implementation Plan — AURELIS ESTATES

## Phases

### Phase 0 — Audit and Planning
**Goal:** Inspect repository, review dependencies, create documentation.

**Tasks:**
- Inspect project directory and existing repos
- Verify package managers and tooling
- Audit available assets
- Read SPEC.md
- Create implementation plan (this file)
- Create acceptance checklist
- Create component architecture document
- Create asset manifest
- Create risk register
- Create testing plan

**Validation:**
- All requirements represented in checklist
- Asset gaps documented
- Architecture documented
- No application code written yet

---

### Phase 1 — Project Foundation and Design System
**Goal:** Scaffold project with Vite + React, configure all tooling, create design tokens, property data, and base structure.

**Tasks:**
- Initialize Vite + React project
- Install all dependencies (Tailwind CSS, GSAP, Framer Motion, Lenis, Three.js, React Hook Form, Zod, Mapbox GL JS, Lucide React, Playwright, Vitest)
- Configure Tailwind with design tokens
- Configure typography (Cormorant Garamond, Inter)
- Create layout primitives
- Create property data module (src/data/properties.js)
- Create core hooks (useMediaQuery, useReducedMotion, useMapToken)
- Create environment configuration module
- Implement SEO metadata and structured data
- Create document shell (index.html, robots.txt)
- Create baseline App.jsx structure

**Validation:**
- Lint passes
- Unit test framework operational
- Production build succeeds
- Responsive shell renders without content

---

### Phase 2 — Core Content and Functional Components

**Goal:** Implement all content sections, navigation, property cards, and basic interactions without complex animations.

**Tasks:**
- Navigation (transparent/scrolled/hidden/shown)
- Mobile navigation with accessibility
- Hero section structure with placeholder
- Property search (filters, reset, empty results)
- Featured properties (6 cards, detail panel, schedule viewing)
- Services section
- Neighborhood & lifestyle section
- Expertise / market metrics
- Testimonials carousel
- Call to action section
- Footer with links
- Internal anchor navigation with smooth scrolling

**Validation:**
- All interactive states functional
- Keyboard accessible
- Property filter unit tests pass
- Responsive review at all breakpoints
- Build succeeds

---

### Phase 3 — Map, Calculator, and Forms

**Goal:** Integrate Mapbox, mortgage calculator, inquiry forms, and viewing request flows.

**Tasks:**
- Mapbox GL JS integration (conditional on token)
- Map fallback when token missing
- Property-to-marker synchronization
- Map-to-property interaction (flyTo)
- Filter-driven map updates
- Mortgage calculator (fixed-rate formula)
- Calculator field synchronization (down payment, sliders)
- Inquiry form with React Hook Form + Zod
- Viewing request form with tab-specific fields
- Accessible tabs for form switching
- Honeypot submission flow
- Local submission simulator (when endpoint missing)
- Loading, success, and error states

**Validation:**
- Calculator unit tests pass
- Form validation tests pass
- Map fallback tests pass
- Playwright critical flow tests pass
- Build succeeds

---

### Phase 4 — Accessibility and Responsiveness

**Goal:** Full WCAG 2.2 AA pass, responsive refinement, reduced-motion.

**Tasks:**
- Heading hierarchy audit
- ARIA landmarks audit
- Skip-to-content link
- Keyboard navigation inventory
- Focus management (modals, menus)
- Contrast review
- Accessible status indicators (non-color-only)
- Reduced motion support implementation
- Mobile and tablet UI refinements
- Touch interaction review (target sizing)
- Breakpoint testing at 6 representative viewports

**Validation:**
- axe scan (manual or programmatic)
- Keyboard-only navigation review
- Reduced-motion tests
- Viewport tests at all breakpoints
- Build succeeds

---

### Phase 5 — Motion System

**Goal:** Implement animations using GSAP/ScrollTrigger, Framer Motion, Lenis, Three.js, and custom cursor.

**Tasks (one system at a time):**
1. Lenis smooth scrolling
2. Section text reveal animations (GSAP)
3. Hero parallax
4. Navigation scroll motion
5. Property card hover/tap (Framer Motion)
6. Signature pinned property showcase (GSAP ScrollTrigger)
7. Progress indicator
8. Cinematic video reveal (GSAP ScrollTrigger)
9. Custom cursor (decorative, hidden on touch, disabled for reduced motion)
10. Three.js architectural depth enhancement

**Per-animation validation:**
- Forward scroll correct
- Reverse scroll correct
- Mid-page refresh correct
- Resize maintains layout
- Reduced motion disables animation
- Mobile behavior
- Cleanup on unmount

**Validation:**
- No transform conflicts (GSAP vs Framer Motion)
- No layout jumping
- No trapped scroll
- No horizontal overflow
- Build succeeds

---

### Phase 6 — Media Integration and Visual Refinement

**Goal:** Integrate approved assets, replace fallbacks, polish typography and spacing.

**Tasks:**
- Integrate approved image assets (per asset manifest)
- Optimize images (AVIF, WebP, srcset)
- Integrate cinematic video with poster fallback
- Refine spacing and typography
- Refine overlays, transitions
- Visual consistency sweep

**Validation:**
- No missing / broken assets
- No broken video paths
- No layout shift from loaded media
- Manual visual review required
- Build succeeds

---

### Phase 7 — Final Verification

**Goal:** Complete automated testing, performance benchmarking, audit.

**Tasks:**
- Run all unit tests
- Run all E2E tests
- axe scan where available
- Production build
- Performance checks
- Environment fallback verification
- Link tests
- Calculations verified
- Forms tested for valid + error
- Responsive inspection at 6 viewports
- Console error scan
- Network error scan
- Update README
- Update acceptance checklist
- Generate final audit (docs/final-audit.md)
- Generate performance report (docs/performance-report.md)

**Validation:**
- All tests passing
- Build passing
- Checklists disclose blockers and manual review required

---

## Delivery Milestones

| Milestone | After | Deliverable |
|---|---|---|
| Planning complete | Phase 0 | Planning documentation |
| Foundation ready | Phase 1 | Dev-ready project |
| Core UI functional | Phase 2 | All sections navigable |
| Map, forms, calculator | Phase 3 | Business logic complete |
| Accessible and responsive | Phase 4 | Inclusive design |
| Motion polished | Phase 5 | Animation complete |
| Media complete | Phase 6 | Visual refined |
| Final audit | Phase 7 | Ready for review |