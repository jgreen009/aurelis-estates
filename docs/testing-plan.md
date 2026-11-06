# Testing Plan — AURELIS ESTATES

## Framework Choices

| Type | Tool | Location |
|---|---|---|
| Unit | Vitest + jsdom + @testing-library/react | `tests/unit/` |
| E2E | Playwright | `tests/e2e/` |
| Accessibility | @axe-core/playwright (in Playwright suite) | `tests/e2e/` |
| Lint | ESLint + eslint-config-preact/react plugin | per `package.json` scripts |
| Typecheck | Not applicable (JS-only project per SPEC React/Vite) | — |

## Test Profile Notes

- Unit tests use Vitest with `environment: 'jsdom'`.
- E2E Playwright launches the production preview server (`npm run preview`) built from a clean `npm run build`.
- A `playwright.config.js` will define a single `chromium` project (extend to firefox/webkit per environment).
- Smooth scroll (Lenis) will be disabled in a custom Playwright test `data-testid` profile by injecting `localStorage` flag, OR a `prefers-reduced-motion` emulation is set in tests requiring deterministic scroll.
- A Mapbox-less environment (no `.env` or empty token) is the default E2E profile. Map token tests are skipped unless an env var `E2E_MAPBOX_TOKEN` is set.

## Unit Test Coverage Map

| Requirement | File | Validation |
|---|---|---|
| Mortgage formula (principal & interest) | `src/utils/mortgage.js` | `tests/unit/mortgage.spec.jsx` |
| Zero interest rate handling | `src/utils/mortgage.js` | `tests/unit/mortgage.spec.jsx` |
| Invalid input handling | `src/utils/mortgage.js` | `tests/unit/mortgage.spec.jsx` |
| Down payment ↔ percentage sync | `src/utils/mortgage.js` + component | `tests/unit/mortgage.spec.jsx` |
| Monthly property tax | `src/utils/mortgage.js` | `tests/unit/mortgage.spec.jsx` |
| Monthly insurance | `src/utils/mortgage.js` | `tests/unit/mortgage.spec.jsx` |
| Monthly HOA | `src/utils/mortgage.js` | `tests/unit/mortgage.spec.jsx` |
| Total interest calculation | `src/utils/mortgage.js` | `tests/unit/mortgage.spec.jsx` |
| Property filtering (location/type/price/bedrooms) | `src/utils/filters.js` | `tests/unit/filters.spec.jsx` |
| Min price > max price behavior | `src/utils/filters.js` | `tests/unit/filters.spec.jsx` |
| Bedroom filter alignment | `src/utils/filters.js` | `tests/unit/filters.spec.jsx` |
| Reset filter behavior | `src/section/PropertiesSection` | `tests/unit/filters.spec.jsx` |
| Empty result state | UI component | `tests/e2e/properties.spec.jsx` |

## E2E Scenarios

| Scenario | File |
|---|---|
| Page loads | `tests/e2e/home.spec.jsx` |
| Anchor navigation | `tests/e2e/navigation.spec.jsx` |
| Mobile menu open/close + Escape | `tests/e2e/navigation.spec.jsx` |
| Property search filters | `tests/e2e/properties.spec.jsx` |
| Reset filters | `tests/e2e/properties.spec.jsx` |
| Property detail interaction | `tests/e2e/properties.spec.jsx` |
| Schedule-viewing action (opens form, prefills) | `tests/e2e/properties.spec.jsx` |
| Inquiry tab switch | `tests/e2e/contact.spec.jsx` |
| Viewing tab switch | `tests/e2e/contact.spec.jsx` |
| Form validation errors | `tests/e2e/contact.spec.jsx` |
| Successful local submission | `tests/e2e/contact.spec.jsx` |
| Submission error state | `tests/e2e/contact.spec.jsx` |
| Mortgage calculator updates | `tests/e2e/calculator.spec.jsx` |
| Map fallback (missing token) | `tests/e2e/map.spec.jsx` |
| Keyboard navigation | `tests/e2e/accessibility.spec.jsx` |
| Escape behavior in dialogs | `tests/e2e/accessibility.spec.jsx` |
| Reduced motion mode | `tests/e2e/accessibility.spec.jsx` |
| axe scan on home + contact | `tests/e2e/axe.spec.jsx` |

## Acceptance Gate (per phase)

| Phase | Must run |
|---|---|
| 1 | `npm run lint`, `npm run build` |
| 2 | above + `npm run test:unit` (filter suite only) |
| 3 | above + relevant unit + Playwright flow subset |
| 4 | above + axe E2E |
| 5 | above + manual motion checks (forward/reverse/refresh/resize) |
| 6 | above + manual visual review |
| 7 | full: `npm run lint && npm run test && npm run build` |

## Manual Review Items (not automatable)

- Visual aesthetic / art-direction parity
- Browser-specific rendering (cannot be captured by Playwright beyond Chromium)
- Lighthouse numbers (must run separately; recorded in `docs/performance-report.md`)
- Real Mapbox token behavior (requires token in CI)
- Real-world perceptual smoothness of pinned sections

## Reporting Conventions

- Test results recorded in `docs/final-audit.md` (Phase 7).
- Pass/fail counts must list the exact commands run.
- Failures blocked by Node/Windows environment must be flagged, not silently skipped.