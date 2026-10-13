// Project screenshots live in src/assets/projects/<project>/<view>-<width>.webp.
// Vite fingerprints them; this module turns a (project, view) pair into
// responsive <img> attributes.
const files = import.meta.glob('../assets/projects/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

function variants(project, view, widths) {
  const urls = widths.map((w) => files[`../assets/projects/${project}/${view}-${w}.webp`]);
  if (urls.some((u) => !u)) {
    if (import.meta.env.DEV) console.warn(`[images] missing variants for ${project}/${view}`);
    return null;
  }
  return {
    src: urls[urls.length - 1],
    srcSet: urls.map((u, i) => `${u} ${widths[i]}w`).join(', '),
  };
}

/** 16:10 desktop screenshot (800w + 1600w). */
export function screenshot(project, view, alt, caption = alt) {
  const v = variants(project, view, [800, 1600]);
  return v && { ...v, width: 1600, height: 1000, alt, caption, orientation: 'landscape' };
}

/** Portrait phone screenshot (390w + 780w). */
export function phoneScreenshot(project, view, alt, caption = alt) {
  const v = variants(project, view, [390, 780]);
  return v && { ...v, width: 780, height: 1688, alt, caption, orientation: 'portrait' };
}
