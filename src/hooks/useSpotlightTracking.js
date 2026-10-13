import { useEffect } from 'react';

/**
 * Feeds the pointer position to every `.spotlight` element as --mx/--my, so
 * cards can draw a glow under the cursor. One listener for the whole page.
 */
export function useSpotlightTracking() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    let frame = 0;
    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target.closest('.spotlight') : null;
      if (!el || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
