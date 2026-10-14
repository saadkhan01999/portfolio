import { useEffect } from 'react';

const STRENGTH = { x: 0.22, y: 0.32 };
const MAX = 10; // px

/**
 * Elements marked `data-magnetic` lean slightly towards the cursor. One
 * delegated listener serves the whole page; mouse/trackpad only, and off for
 * visitors who prefer reduced motion.
 */
export function useMagnetic() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = null;
    let frame = 0;

    const release = () => {
      if (current) current.style.translate = '';
      current = null;
    };

    const onMove = (e) => {
      if (!fine.matches || reduce.matches) return;
      const el = e.target.closest?.('[data-magnetic]');
      if (el !== current) release();
      if (!el) return;
      current = el;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const clamp = (v) => Math.max(-MAX, Math.min(MAX, v));
        const dx = clamp((e.clientX - (r.left + r.width / 2)) * STRENGTH.x);
        const dy = clamp((e.clientY - (r.top + r.height / 2)) * STRENGTH.y);
        el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      });
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', release);
    window.addEventListener('blur', release);
    return () => {
      cancelAnimationFrame(frame);
      release();
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', release);
      window.removeEventListener('blur', release);
    };
  }, []);
}
