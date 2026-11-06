# Asset Manifest — AURELIS ESTATES

## Status Key

- **Source:** Where the asset must come from (production owner/asset library).
- **License:** Must be cleared for commercial use. Not invented.
- **Status:** `placeholder` = current stock stand-in (license-cleared, swap-in-ready). `blocked` = production asset not yet provided.
- **Fallback:** Mechanism used if the asset path 404s.

## General Asset Status

**All visual media is currently served by license-cleared stock placeholders**
(Unsplash photos, Pexels video) downloaded into `public/media/`. These stand in
for production assets, which remain pending. **Placeholder files are drop-in
replacements:** swapping a production asset in by overwriting the same filename
(e.g. `public/media/properties/sapphire-penthouse-1200.avif`) requires no code
change.

Sources:
- Stock photos: [Unsplash](https://unsplash.com) — Unsplash License (free for commercial + non-commercial, no attribution required). Attribution is still recorded below as a courtesy.
- Cinematic video: [Pexels](https://www.pexels.com) — Pexels License (free for commercial use, no attribution required). Attribution recorded below as a courtesy.

The detailed source selection lives in `docs/unsplash-selection.json`.

---

## Hero Visual

| Field | Value |
|---|---|
| Asset name | hero |
| Section | Hero |
| Local paths | `public/media/hero/hero-{1920,960}.{avif,webp,jpg}` |
| Status | placeholder |
| Source | Unsplash |
| Photo ID | `b8f8Ptbmdu4` |
| Photographer | Leo Okuyama (`@okuyama_leo`) — https://unsplash.com/@okuyama_leo |
| Photo page | https://unsplash.com/photos/white-and-black-city-buildings-during-daytime-b8f8Ptbmdu4 |
| License | Unsplash License |
| Loading | eager + `fetchPriority="high"` |
| Fallback | CSS architectural gradient + Three.js depth canvas remain beneath |

## Cinematic Reveal Video

| Field | Value |
|---|---|
| Asset name | cinematic |
| Section | Cinematic reveal |
| Local paths | `public/media/cinematic/cinematic-{720,1080}.mp4` + `cinematic-poster.jpg` |
| Status | placeholder |
| Source | Pexels |
| Video ID | `34345704` (6s, 1920×1080, 24fps, MP4/H.264) |
| Author | Atif Dar (`@atifdar82`) — https://www.pexels.com/@atifdar82 |
| License | Pexels License |
| Behavior | `autoplay muted loop playsInline`; IntersectionObserver pauses when off-screen; reduced-motion users see poster only |
| Fallback | `cinematic-poster.jpg` shown if the browser blocks autoplay |

## Cinematic Reveal Poster

| Field | Value |
|---|---|
| Asset name | cinematic-poster |
| Section | Cinematic reveal |
| Local path | `public/media/cinematic/cinematic-poster.jpg` |
| Status | placeholder (derived from the Pexels video preview frame) |
| License | Pexels License |

## Property Images

| Listing | local base path | Unsplash photo ID | Photographer | Photo page |
|---|---|---|---|---|
| Sapphire Penthouse | `properties/sapphire-penthouse` | `ugprhwhfAoE` | DriveMonk (`@drivemonk`) | https://unsplash.com/photos/a-view-of-a-city-and-a-body-of-water-ugprhwhfAoE |
| Chartwell Estate | `properties/chartwell-estate` | `7sDz5t3vMuk` | Phil Lev (`@phil_lev`) | https://unsplash.com/photos/a-white-mansion-stands-in-a-grassy-field-7sDz5t3vMuk |
| Villa Serenissima | `properties/villa-serenissima` | `o9ye4vVmFt0` | Long Nguyen (`@lolongan`) | https://unsplash.com/photos/a-house-on-a-small-island-in-the-middle-of-the-water-o9ye4vVmFt0 |
| One Grosvenor Square | `properties/one-grosvenor-square` | `8V1CX7kuH9E` | Otakar Hyps (`@otakar`) | https://unsplash.com/photos/a-building-with-many-windows-8V1CX7kuH9E |
| Crown Tower Suite | `properties/crown-tower-suite` | `Fr6zexbmjmc` | David Rodrigo (`@david__r`) | https://unsplash.com/photos/aerial-photo-of-city-highway-surrounded-by-high-rise-buildings-Fr6zexbmjmc |
| Auberge du Mont | `properties/auberge-du-mont` | `JT-RUtO2sfs` | Aswathy N (`@abnair`) | https://unsplash.com/photos/white-and-brown-house-near-green-grass-field-and-mountain-during-daytime-JT-RUtO2sfs |

Renditions per property: `{1200,600}.{avif,webp,jpg}` (4:3 crop). License: Unsplash License. Loading: `lazy` (above-the-fold cards would still be loaded once via the `<picture>` srcset). Card `<img>` is decorative (`alt=""`) since the listing title follows the image.

## Showcase Media (Pinned Property)

| Field | Value |
|---|---|
| Asset name | showcase-sapphire-penthouse |
| Section | Pinned showcase |
| Local path | `public/media/properties/showcase-sapphire-penthouse-1500.{avif,webp,jpg}` |
| Status | placeholder (4:5 vertical crop of the Sapphire Penthouse Unsplash photo) |
| Source / license | Unsplash (`ugprhwhfAoE` by DriveMonk) — Unsplash License |
| Loading | `lazy`; reveal animated by ScrollTrigger clip-path |
| Fallback | Charcoal gradient panel |

## Three.js Textures

| Asset name | Section | Format | Status |
|---|---|---|---|
| depth-displacement.jpg | Hero canvas | JPG | blocked (Three.js uses procedural geometry only — no external textures required) |

Decision: Three.js effect uses procedural geometry (no external textures). Final textures optional.

## Neighborhood Images

| Neighborhood | local base path | Unsplash photo ID | Photographer | Photo page |
|---|---|---|---|---|
| Beverly Hills | `neighborhoods/beverly-hills` | `TH8D-CrYZEY` | Venti Views (`@ventiviews`) | https://unsplash.com/photos/green-palm-trees-during-night-time-TH8D-CrYZEY |
| Mayfair | `neighborhoods/mayfair` | `Fhuy35VowOU` | Adam Wilson (`@fourcolourblack`) | https://unsplash.com/photos/a-group-of-flags-on-a-building-Fhuy35VowOU |
| Upper East Side | `neighborhoods/upper-east-side` | `A2CChTZvzTE` | Jermaine Ee (`@eejermaine`) | https://unsplash.com/photos/new-york-central-park-A2CChTZvzTE |
| Palm Jumeirah | `neighborhoods/palm-jumeirah` | `cV4qkkorDFY` | Robert Bock (`@robertbock`) | https://unsplash.com/photos/panoramic-photography-of-the-city-during-night-cV4qkkorDFY |
| St. Moritz | `neighborhoods/st-moritz` | `kSNxCVYe7oo` | Elijah Grimm (`@watchelijah`) | https://unsplash.com/photos/a-snowy-mountain-range-kSNxCVYe7oo |
| Bel Air | `neighborhoods/bel-air` | `9cVSoJ3qiIA` | Laurel and Michael Evans (`@laurelmike`) | https://unsplash.com/photos/white-concrete-building-near-green-grass-field-during-daytime-9cVSoJ3qiIA |

Renditions per neighborhood: `{800,400}.{avif,webp,jpg}` (3:2 crop). License: Unsplash License. Loading: `lazy`. Each `<img>` carries a descriptive `alt` (no adjacent caption duplicating it).

## Service Icons

| Asset name | Section | Status |
|---|---|---|
| Lucide icons | Services | available via `lucide-react` package (no asset needed) |

No external assets needed; using Lucide React icon library.

## Testimonial Avatars

| Asset name | Section | Status |
|---|---|---|
| testimonial-avatar-*.jpg | Testimonials | **monogram fallback retained** (acceptable per spec — initials on circular badge) |

## Favicon / Brand Marks

| Asset name | Status |
|---|---|
| favicon.ico / icon.svg | to be generated as monogram "AE" procedural SVG — no license blocker |

## Summary

- **Placeholder assets (live):** hero, 6 properties, showcase flagship, cinematic video + poster, 6 neighborhoods — all stored in `public/media/`.
- **Live assets:** Lucide React icons (via package).
- **License:** Unsplash License (photos) + Pexels License (video) — both free for commercial use; attribution is recorded as a courtesy but not required.
- **Production asset plan:** when owner-supplied photography arrives, overwrite the same filenames in `public/media/` — no code/markup changes needed.
- **No production asset will be claimed final without actual delivery**; the placeholder policy is documented in `README.md` + this manifest.