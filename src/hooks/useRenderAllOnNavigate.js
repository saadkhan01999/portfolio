import { useEffect } from 'react';
import { renderAllSections } from '../lib/renderAll';

/**
 * Renders deferred sections the first time an in-page link is followed, and
 * honours a #section in the address on arrival (the page renders after the
 * browser's own jump, so it has nothing to land on).
 */
export function useRenderAllOnNavigate() {
  useEffect(() => {
    const target = window.location.hash.length > 1 && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    let frame = 0;
    let timer = 0;
    if (target) {
      renderAllSections();
      let landedAt = -1;
      const jump = () => {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
        landedAt = window.scrollY;
      };
      frame = requestAnimationFrame(jump);
      // Late layout (fonts, the desktop project stack) can move the target; jump
      // again unless the visitor has already scrolled.
      timer = window.setTimeout(() => window.scrollY === landedAt && jump(), 500);
    }

    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      if (!link || link.getAttribute('href') === '#') return;
      renderAllSections();
      document.removeEventListener('click', onClick, true);
    };
    document.addEventListener('click', onClick, true);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      document.removeEventListener('click', onClick, true);
    };
  }, []);
}
