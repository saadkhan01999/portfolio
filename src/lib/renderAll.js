/**
 * Offscreen sections use `content-visibility: auto`, so their height is only an
 * estimate until they render. Before jumping to a section, render them all so
 * the scroll lands exactly on its target.
 */
export function renderAllSections() {
  document.documentElement.classList.add('render-all');
}
