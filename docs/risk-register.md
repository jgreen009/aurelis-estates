# Risk Register — AURELIS ESTATES

## Legend

- Severity: High / Medium / Low
- Likelihood: High / Medium / Low
- Status: Open / Mitigated / Resolved / Accepted

## Risks

| ID | Risk | Severity | Likelihood | Status | Mitigation |
|---|---|---|---|---|---|
| R1 | Mapbox token not provided | High | High | Open | Implement styled MapFallback; pass token via env; document in README |
| R2 | Contact form endpoint not provided | High | High | Open | Local submission simulator isolated in `src/lib/submitForm.js` |
| R3 | Production images / video not delivered | High | High | Open | Polished fallbacks per asset-manifest; Phase 6 replacement path |
| R4 | GSAP / Framer Motion transform conflict | Medium | Medium | Open | Strict separation: ScrollTrigger owns scroll-linked transforms only |
| R5 | ScrollTrigger pinned sections break on resize / reverse scroll | High | Medium | Open | Test refresh at mid-page, resize, reduced-motion; use `ScrollTrigger.refresh()` and proper pin spacing |
| R6 | Custom cursor blocks clicks / focus / text selection | Medium | Medium | Open | `pointer-events:none`, hidden on touch/reduced-motion, never replaces focus indicator |
| R7 | Lenis + ScrollTrigger integration issues | Medium | Medium | Open | Use `lenis.on('scroll', ScrollTrigger.update)` and `scrollerProxy` binding per GSAP docs |
| R8 | Three.js performance overhead on mobile | Medium | Medium | Open | Limit DPR, suspend when off-screen, reduce complexity on mobile, dispose on unmount |
| R9 | CLS from lazy-loaded images / video | Medium | Medium | Open | Set explicit width/height, use aspect-ratio containers, dominant-color placeholders |
| R10 | Lighthouse score requirements cannot be fabricated | High | High | Accepted | Run real performance checks in Phase 7; record measured results only |
| R11 | Reduced-motion path not thoroughly tested | High | Medium | Open | Add Playwright reduced-motion scenario in Phase 4 and 7 |
| R12 | E2E tests flaky due to animation timing | Medium | High | Open | Use `data-testid` attributes, `waitFor`, and disable smooth scroll for test profile |
| R13 | Mobile menu focus trap + body-scroll lock edge cases | Medium | Medium | Open | Reuse Modal primitive; lock body scroll; restore focus on close; Escape |
| R14 | Filter state drift between cards and map | High | Low | Open | Single source of truth in `PropertiesSection` for filters + selected property |
| R15 | Structured data inventing claims (ratings, awards) | High | Low | Accepted | Only data present in SPEC.md goes into JSON-LD |
| R16 | Property image license / copyright | High | High | Open | No copyrighted assets downloaded; all media blocked or locally generated |
| R17 | Tailwind v4 vs v3 setup ambiguity | Low | Medium | Open | Pin Tailwind v3.x for stability; document in package.json |
| R18 | Network/console errors during local form simulation | Low | Medium | Open | Guard fetch path; only call fetch when endpoint is present |
| R19 | Reduced-motion: smooth scroll interruption | Medium | Medium | Open | Skip Lenis init when reduced-motion is active |
| R20 | Mapbox GL CSS not loaded | Medium | Medium | Open | Import `mapbox-gl/dist/mapbox-gl.css` directly in map component |

## Watchlist (re-evaluate later phases)

- Performance budget adherence — only measurable in Phase 7
- Lighthouse Accessibility / SEO scores — manual verification only
- Browser console errors — must be clean before definition of done
- Mapbox rate limits during Playwright runs — use token guard in test profile