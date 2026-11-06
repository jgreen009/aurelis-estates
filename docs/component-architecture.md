# Component Architecture — AURELIS ESTATES

## Routing
None. Route-free single-page application. Anchor-based section navigation only.

## State Management
Local React state + custom hooks. No global store (no Redux/Zustand) unless later phases prove necessary.

```text
App
├── SkipLink
├── Announcement (live region, sr-only, for form status)
├── Navigation
│   ├── Logo
│   ├── DesktopNav (anchor links with active highlighting)
│   ├── MobileMenuButton
│   └── MobileMenu (Modal/focus trap)
├── main#main
│   ├── Hero
│   │   ├── HeroVideo / HeroPoster fallback
│   │   ├── HeroCopy (AnimatedText)
│   │   ├── HeroCTA (Button)
│   │   └── ArchitecturalCanvas (Three.js, lazy)
│   ├── Showcase (Pinned)
│   │   ├── ShowcaseMedia
│   │   ├── ShowcaseCopy
│   │   └── ProgressIndicator
│   ├── PropertiesSection
│   │   ├── SectionHeading
│   │   ├── PropertySearch
│   │   │   ├── LocationSelect
│   │   │   ├── TypeSelect
│   │   │   ├── MinPriceInput
│   │   │   ├── MaxPriceInput
│   │   │   ├── BedroomsSelect
│   │   │   └── ResetButton
│   │   ├── PropertyGrid
│   │   │   └── PropertyCard (×6)
│   │   │       ├── PropertyImage
│   │   │       ├── PropertyMeta
│   │   │       ├── ViewButton
│   │   │       └── ScheduleButton
│   │   └── EmptyState
│   ├── CinematicReveal (video + poster)
│   ├── ServicesSection
│   │   └── ServiceCard (×6)
│   ├── NeighborhoodsSection
│   │   └── NeighborhoodCard (×6)
│   ├── MapSection
│   │   ├── MapContainer (Mapbox GL, dynamic)
│   │   ├── MapFallback (accessible list)
│   │   └── MapList (synced to selection)
│   ├── CalculatorSection
│   │   ├── CalculatorInputs
│   │   └── CalculatorResults
│   ├── ExpertiseSection
│   │   └── MetricCard (×N)
│   ├── TestimonialsSection
│   │   └── TestimonialCard (×N, accessible carousel)
│   ├── ContactSection
│   │   ├── AccessibleTabs
│   │   │   ├── InquiryTab
│   │   │   │   ├── FormField (Name)
│   │   │   │   ├── FormField (Email)
│   │   │   │   ├── FormField (Phone)
│   │   │   │   ├── FormField (Message)
│   │   │   │   ├── ConsentCheckbox
│   │   │   │   └── Honeypot
│   │   │   └── ViewingTab
│   │   │       └── (Inquiry + date/time/property)
│   │   └── FormStatus (live region)
│   └── FinalCTA
├── Footer
└── Cursor (desktop fine-pointer only)
```

## Shared / Reusable Components

`src/components/common/`:
- Button
- SectionHeading
- Modal
- Input
- Select
- FormField
- LoadingState
- ErrorState
- AnimatedText
- AccessibleTabs
- TestimonialCard
- MetricCard

## Data Layer

`src/data/properties.js` — single source of truth for the 6 listings. Components receive properties via props derived from this module. No hardcoded markup duplication.

## Utilities

`src/utils/`:
- `mortgage.js` — pure mortgage calculations (Phase 3)
- `format.js` — currency / percentage formatting
- `filters.js` — pure property filtering logic (Phase 2)
- `safety.js` — null-safe environment/config helpers

## Hooks

`src/hooks/`:
- `useMediaQuery.js`
- `useReducedMotion.js`
- `useActiveSection.js` (IntersectionObserver)
- `useMapToken.js`
- `useScrollDirection.js`
- `useLockBodyScroll.js`

## Environment

`src/lib/env.js` — reads `VITE_MAPBOX_TOKEN` and `VITE_CONTACT_FORM_ENDPOINT`. Exports booleans `hasMapboxToken`, `hasFormEndpoint`.

## Submission Adapter

`src/lib/submitForm.js` — isolates submission strategy. If `VITE_CONTACT_FORM_ENDPOINT` is set, POST to endpoint; else simulate local success after delay. Always returns `{ success: boolean }`.

## Separation of Motion Concerns

- GSAP/ScrollTrigger → scroll-linked, pinned, parallax, cinematic
- Framer Motion → hover, tap, modal, component enter/exit
- CSS → simple transitions, focus states
- No GSAP and Framer Motion on the same transform at the same time.