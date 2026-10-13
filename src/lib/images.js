// Project images live in src/assets/projects/<project>/<view>-<width>.webp.
// Vite fingerprints them; this module turns a (project, view) pair into
// responsive <img> attributes.
const files = import.meta.glob('../assets/projects/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const url = (project, file) => files[`../assets/projects/${project}/${file}.webp`];

function variants(project, view, widths) {
  const urls = widths.map((w) => url(project, `${view}-${w}`));
  if (urls.some((u) => !u)) {
    if (import.meta.env.DEV) console.warn(`[images] missing variants for ${project}/${view}`);
    return null;
  }
  return {
    src: urls[urls.length - 1],
    srcSet: urls.map((u, i) => `${u} ${widths[i]}w`).join(', '),
  };
}

/**
 * Desktop screenshot or slide (800w + 1600w). Defaults to 16:10; pass the
 * real size for other ratios, e.g. { width: 1600, height: 900 } for 16:9.
 */
export function screenshot(project, view, alt, caption = alt, size = { width: 1600, height: 1000 }) {
  const v = variants(project, view, [800, 1600]);
  return v && { ...v, ...size, alt, caption, orientation: 'landscape' };
}

/** Portrait phone screenshot (390w + 780w). */
export function phoneScreenshot(project, view, alt, caption = alt) {
  const v = variants(project, view, [390, 780]);
  return v && { ...v, width: 780, height: 1688, alt, caption, orientation: 'portrait' };
}

/** A single decorative asset (e.g. a transparent cut-out). */
export function asset(project, file) {
  return url(project, file) ?? null;
}
