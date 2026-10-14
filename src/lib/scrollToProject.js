/**
 * Scroll a featured project into view. On desktop the panels are sticky, so
 * each one has a static slot marker (`#slot-<id>`) at the scroll position
 * where it is fully in place; elsewhere the panel itself is the target.
 */
export function scrollToProject(id) {
  const target = document.getElementById(`slot-${id}`) ?? document.getElementById(`project-${id}`);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
