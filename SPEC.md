# AURELIS ESTATES — Product Specification

## Brand Identity

**Name:** AURELIS ESTATES
**Tagline:** Exceptional Properties. Elevated Living.

## Overview

A premium, cinematic, responsive, accessible, and conversion-focused luxury real estate single-page application built with React, Vite, and Tailwind CSS.

---

## Design System

### Brand Palette

| Token          | Hex       |
|----------------|-----------|
| Warm Ivory     | #F4F0E8   |
| Soft Sand      | #D7C8B2   |
| Deep Charcoal  | #181818   |
| Graphite       | #2B2B2B   |
| Muted Gold     | #B99A63   |
| White          | #FFFFFF   |

### Typography

- **Headings:** Cormorant Garamond (editorial headings)
- **Body / UI:** Inter (body copy, labels, navigation, controls, buttons, forms)
- Muted gold used sparingly.

---

## Page Sections (Scroll Order)

1. **Navigation** — transparent over hero, surface on scroll, hidden down / shown up, active-section highlighting, smooth anchors, accessible mobile menu
2. **Hero** — cinematic video reveal, parallax, architectural depth effect (Three.js)
3. **Signature Pinned Property Showcase** — pinned scroll section for the flagship property
4. **Property Search / Featured Properties** — filters (location, type, min/max price, bedrooms), six complete listings, property cards, detail interaction, schedule-viewing
5. **Cinematic Video Reveal** — full-width video showcase with poster fallback
6. **Services** — advisory, acquisition, sales, property management, relocation, valuation
7. **Neighborhoods & Lifestyle** — locations and lifestyle content
8. **Map** — Mapbox GL JS property map with filter/sync to cards, token-missing fallback
9. **Mortgage Calculator** — fixed-rate formula, input validation, synchronized fields, total payment breakdown
10. **Expertise / Market Metrics** — metric cards
11. **Testimonials** — carousel or grid
12. **Contact Form** — inquiry and viewing-request tabs, React Hook Form + Zod, honeypot, consent, states
13. **Final CTA**
14. **Footer**

---

## Six Property Listings

Each listing includes:

- Name
- Location (neighborhood, city)
- Type (Penthouse, Estate, Villa, New Development, Commercial, Private Residence)
- Price (numeric)
- Currency (USD)
- Pricing note (e.g. "From" if applicable)
- Bedrooms
- Bathrooms
- Living area (sq ft)
- Description
- Features list
- Listing status (Available / Under Offer / Sold / Coming Soon)
- Coordinates (lat, lng)
- Images array
- Agent notes
- Year built
- Parking spots
- Amenities

### Listing Data

1. **Sapphire Penthouse**
   - Type: Penthouse
   - Location: Financial District, Manhattan, New York
   - Price: 28,500,000
   - Bedrooms: 5, Bathrooms: 6
   - Living Area: 6,200 sq ft
   - Coordinates: 40.7081, -74.0096
   - Status: Available

2. **Chartwell Estate**
   - Type: Estate
   - Location: Bel Air, Los Angeles, California
   - Price: 72,000,000
   - Bedrooms: 9, Bathrooms: 12
   - Living Area: 25,000 sq ft
   - Coordinates: 34.0928, -118.4487
   - Status: Available

3. **Villa Serenissima**
   - Type: Villa
   - Location: Lake Como, Lombardy, Italy
   - Price: 34,000,000
   - Bedrooms: 8, Bathrooms: 9
   - Living Area: 14,000 sq ft
   - Coordinates: 46.0161, 9.2496
   - Status: Under Offer

4. **One Grosvenor Square**
   - Type: New Development
   - Location: Mayfair, London, United Kingdom
   - Price: From £18,500,000
   - Bedrooms: 4, Bathrooms: 4
   - Living Area: 4,800 sq ft
   - Coordinates: 51.5123, -0.1504
   - Status: Coming Soon

5. **Crown Tower Suite**
   - Type: Commercial
   - Location: Dubai Marina, Dubai, UAE
   - Price: 48,000,000
   - Bedrooms: N/A (Commercial)
   - Living Area: 12,500 sq ft
   - Coordinates: 25.0810, 55.1398
   - Status: Available

6. **Auberge du Mont**
   - Type: Private Residence
   - Location: Gstaad, Bernese Oberland, Switzerland
   - Price: CHF 22,000,000
   - Bedrooms: 6, Bathrooms: 7
   - Living Area: 8,200 sq ft
   - Coordinates: 46.4747, 7.2869
   - Status: Available

---

## Services

1. Private Advisory
2. Property Acquisition
3. Luxury Sales & Marketing
4. Estate Management
5. International Relocation
6. Valuation & Appraisal

---

## Neighborhoods

- Beverly Hills, Los Angeles
- Mayfair, London
- Upper East Side, New York
- Palm Jumeirah, Dubai
- St. Moritz, Switzerland
- Bel Air, Los Angeles

---

## Mortgage Calculator

Standard fixed-rate mortgage formula:

```
r = (annualRate / 100) / 12
n = termYears * 12
M = P * [r(1+r)^n] / [(1+r)^n - 1]
```

Where:
- P = Loan Amount (Price - Down Payment)
- r = Monthly interest rate
- n = Number of payments
- M = Monthly Principal & Interest

Additional items:
- Monthly tax = (annualTaxRate * price) / 12
- Monthly insurance = (annualInsuranceRate * price) / 12
- Monthly HOA = hoaMonthly
- Total payment = M + tax + insurance + HOA
- Total interest = (M * n) - P
- Cash at closing = downPayment + closing costs (est. 2% of price)

---

## Forms

### Inquiry Form
- Name, Email, Phone, Message, Consent, Honeypot

### Viewing Request Form
- Name, Email, Phone, Preferred Date, Preferred Time, Property of Interest, Message, Consent, Honeypot

Validation: React Hook Form + Zod, accessible labels, error announcements.

States: idle, loading, success, error.

When VITE_CONTACT_FORM_ENDPOINT is missing: simulate local submission, show success state, do not claim remote delivery.

---

## Technical Architecture

### Stack
- React 18+
- Vite 5+
- Tailwind CSS 3+
- GSAP + ScrollTrigger
- Framer Motion
- Lenis (smooth scrolling)
- Three.js (architectural depth effect only)
- React Hook Form + Zod
- Mapbox GL JS
- Lucide React (icons)
- Playwright (E2E)
- Vitest (unit)

### Project Structure
```
src/
  assets/images/
  assets/video/
  assets/textures/
  assets/icons/
  components/common/
  components/navigation/
  components/hero/
  components/search/
  components/properties/
  components/showcase/
  components/cinematic/
  components/services/
  components/neighborhoods/
  components/map/
  components/calculator/
  components/expertise/
  components/testimonials/
  components/contact/
  components/footer/
  data/
  hooks/
  lib/
  styles/
  utils/
  App.jsx
  main.jsx
docs/
tests/
  unit/
  e2e/
```

---

## Environment Variables

`VITE_MAPBOX_TOKEN` — Mapbox GL JS access token. If missing, render styled fallback with property list.
`VITE_CONTACT_FORM_ENDPOINT` — Form submission URL. If missing, simulate local submission.

---

## Accessibility Requirements

- WCAG 2.2 AA where feasible
- Semantic landmarks, skip link, logical headings
- Visible focus indicators
- Keyboard navigation full support
- Accessible forms with labels and error announcements
- Accessible tabs and modals (focus trapping, Escape, focus return)
- Sufficient color contrast
- Reduced motion support
- Touch target sizing (minimum 44px)

### Custom Cursor
- Desktop fine-pointer only
- Hidden on touch devices
- Disabled for reduced motion
- pointer-events: none (purely decorative)

---

## Responsive Breakpoints

Test at: 1440×900, 1280×800, 1024×768, 768×1024, 390×844, 360×800

Requirements: no horizontal overflow, readable typography, usable forms, usable map controls, touch-safe cards, no hover-only functionality.

---

## SEO & Metadata

- Title: "AURELIS ESTATES | Luxury Real Estate and Private Property Advisory"
- Meta description: "Discover exceptional luxury homes, penthouses, new developments, commercial properties, and private real estate opportunities with AURELIS ESTATES."
- Open Graph metadata
- Twitter card metadata
- Canonical URL placeholder
- robots.txt
- RealEstateAgent structured data
- Structured data for featured properties
- No invented ratings, awards, reviews

---

## Performance Targets

- Lazy loading below the fold
- Responsive images (srcset, sizes)
- Deferred off-screen media
- Dynamic imports for Mapbox and Three.js
- Video pause when off-screen
- Animation pause when off-screen
- Stable dimensions to minimize CLS
- Cleanup observers, timelines, listeners, media
- No unnecessary continuous rendering

---

## Testing Requirements

### Unit Tests (Vitest)
- Mortgage formula correctness
- Zero/invalid input handling
- Down payment synchronization
- Tax, insurance, HOA calculations
- Property filtering (location, type, price, bedrooms)
- Filter reset behavior
- Empty result behavior

### E2E Tests (Playwright)
- Page load, anchor navigation, mobile menu
- Property search, filter reset
- Property detail, schedule-viewing
- Inquiry and viewing tabs, validation
- Form submission success/error states
- Mortgage calculator updates
- Map fallback (no token)
- Keyboard navigation, Escape, reduced motion
- Axe accessibility scanning

---

## Definition of Done
- All required sections present
- All 6 listings implemented
- Filters functional
- Map or fallback working
- Calculator correct
- Forms validating with states
- Mobile navigation functional
- Keyboard navigation functional
- Reduced motion support
- Media fallbacks valid
- No broken asset paths
- Automated tests passing
- Production build passing
- No material console errors
- Documentation and acceptance checklist updated
- Remaining blockers and manual reviews disclosed