/**
 * Build a srcset attribute string for a fixed list of widths, single format.
 * Asset files are named `/media/${base}-${w}.${fmt}` (matches Phase 6 download).
 */
export function srcset(base, widths, fmt) {
  return widths.map((w) => `/media/${base}-${w}.${fmt} ${w}w`).join(', ');
}

/**
 * Default `<img>` src — pick the largest JPEG version of the asset (broad
 * format support; browsers that understand <picture> will pick a better
 * <source> instead).
 */
export function defaultSrc(base, widths) {
  const w = widths[widths.length - 1];
  return `/media/${base}-${w}.jpg`;
}

/**
 * Responsive <picture> for a Phase 6 downloaded asset.
 *
 * - Three formats: AVIF + WebP <source> + JPG <img> fallback.
 * - Multiple widths via srcset (caller passes the widths it pre-downloaded).
 * - `sizes` MUST be supplied so the browser can choose a width without
 *   downloading all of them.
 * - `width`/`height` set the placeholder aspect-box so layout is stable (no
 *   CLS) before the image loads.
 * - `loading` defaults to 'lazy'; the Hero passes 'eager' + fetchpriority high.
 * - Decorative images pass `alt=''` (empty alt is the correct way to mark an
 *   image as decorative for assistive tech).
 */
export default function PictureImage({
  base,
  widths,
  sizes = '100vw',
  alt = '',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  className = '',
  style,
  ...rest
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(base, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(base, widths, 'webp')} sizes={sizes} />
      <img
        src={defaultSrc(base, widths)}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        // fetchPriority is a React 18 attribute; only emitted when provided.
        {...(fetchPriority ? { fetchPriority } : null)}
        className={className}
        style={style}
        {...rest}
      />
    </picture>
  );
}
