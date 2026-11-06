# AURELIS ESTATES

## Overview

AURELIS ESTATES is a luxury real estate single-page application showcasing high-end properties, offering advanced search, mortgage calculation, and virtual tours.

## Prerequisites

- Node.js (v20+)
- npm (v10+)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev   # Start Vite dev server
npm run test:unit  # Run Vitest unit tests
npm run test:e2e  # Run Playwright E2E tests
npm run lint  # Run ESLint
npm run build  # Production build
```

## Preview

```bash
npm run preview  # Preview production build locally
```

## Environment Setup

### Mapbox Token

Obtain a Mapbox access token and add it to `.env`:

```
VITE_MAPBOX_TOKEN=your_token_here
```

### Form Endpoint

Configure the contact form endpoint in `.env`:

```
VITE_CONTACT_FORM_ENDPOINT=https://your-endpoint.com/api
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Produce production build |
| `npm run preview` | Preview production build locally |
| `npm run test:unit` | Run all unit tests (35 tests) |
| `npm run test:e2e` | Run all E2E tests (11 tests) |
| `npm run test` | Run both unit and E2E tests |

## Asset Replacement

All production media is expected in `public/media/`:
- Hero images, property photos, neighborhood images, cinematic video, etc.
- Placeholder assets (Unsplash/Pexels) are documented in `docs/asset-manifest.md`.
- To replace a placeholder, overwrite the corresponding file in `public/media/` — no code changes needed.

## Notes

- Three.js and other heavy libraries are code-split; they load only when required.
- Reduced-motion is respected globally via `prefers-reduced-motion` media queries and the `useReducedMotion` hook.
- The app is fully responsive at 6 breakpoints (360×800 through 1440×900).