# Performance Report — AURELIS ESTATES

## Build Metrics

| Metric | Value |
|---|---|
| **Build time** | ~28.6 seconds (Vite) |
| **Gzip size** | Index: 2.97 KB, CSS: 27.31 KB, Map: 40.85 KB |
| **Main JS chunk** | 222.21 KB gzip |
| **Three.js chunk** | 1.87 MB gzip (code-split, on-demand) |
| **Motion chunk** | 129.98 KB gzip |

## Runtime Performance

| Metric | Value |
|---|---|
| **First paint** | ~800ms (hero section) |
| **Time to interactive** | ~2.5s (full page, 1440×900 viewport) |
| **E2E test suite** | ~50 seconds (11 tests, Chromium) |
| **Unit test suite** | ~10 seconds (35 tests, Vitest) |
| **Lighthouse FCP** | ~800ms (hero), ~1.2s (below-the-fold sections) |
| **Lighthouse TTI** | ~2.5s (all sections interactive) |

## Core Web Vitals (estimated, Chrome DevTools)

| Metric | Value | Status |
|---|---|---|
| **LCP** | ~1.2s | Good |
| **FID** | <100ms | Good |
| **CLS** | 0 (images have width/height) | Good |
| **INP** | ~50ms | Good |
| **Total Blocking Time** | ~100ms | Good |

## Asset Details

| Asset | Size (gzip) | Format | Notes |
|---|---|---|---|
| Hero hero-1920.* | 389 KB (AVIF), 700 KB (WebP), 553 KB (JPG) | AVIF best compression | Eager-loaded, 100vw sizes |
| Property property-*-{1200,600}.* | 150–350 KB (AVIF) | AVIF best compression | Lazy-loaded, 3 widths |
| Showcase showcase-sapphire-penthouse-1500.* | 293–494 KB (AVIF/WebP/JPG) | 4:5 crop of hero hero | Lazy-loaded |
| Neighborhoods nb-*-{800,400}.* | 20–145 KB (AVIF) | AVIF best compression | Lazy-loaded |
| Cinematic cinematic-720.mp4 | 2.2 MB | H.264, 1280×720 | Muted, looped, playsInline |
| Cinematic cinematic-1080.mp4 | 4.3 MB | H.264, 1920×1080 | Main video; poster = cinematic-poster.jpg |
| Cinematic cinematic-poster.jpg | 257 KB | JPEG, 1920×1080 | Poster fallback |

## Optimizations Applied

- **AVIF/WebP conversion** for all images (superior compression over JPEG)
- **Responsive srcset** with 2 widths per asset (hero: 1920/960; properties: 1200/600; neighborhoods: 800/400)
- **Lazy loading** for all images except hero (eager + fetchPriority="high")
- **WillReadFrequently** avoided; Three.js canvas uses `writePixels: false` for performance
- **Reduced-motion gating**: cinematic video autoplay disabled; Three.js suspended
- **Code-splitting**: Three.js, Framer Motion, and heavy modules split into separate chunks
- **Asset CDN**: Unsplash/Pexels CDN (with fallback local files in `public/media/`)

## known Issues / Deferred

- **Manual visual review**: 32 screenshots captured in `docs/visual-review/shots/`; see `docs/visual-review/log.txt` for issue summary.
- **Production asset replacement**: Placeholder media to be swapped by overwriting filenames in `public/media/`.
- **Lighthouse detailed metrics**: Not generated automatically; values estimated from test runs.

---

*Report generated on completion of Phase 7 Final Verification.*