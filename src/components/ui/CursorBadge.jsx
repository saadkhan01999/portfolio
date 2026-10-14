import { useEffect, useRef } from 'react';

/**
 * A round label that follows the cursor over elements marked `data-cursor`
 * (e.g. project visuals: "View case study"). Decorative — the same actions are
 * always available as real buttons. Mouse/trackpad only; hidden for reduced motion.
 */
export default function CursorBadge() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let shown = false;

    const hide = () => {
      if (!shown) return;
      shown = false;
      el.dataset.visible = 'false';
    };

    const onMove = (e) => {
      if (!fine.matches || reduce.matches) return hide();
      const target = e.target.closest?.('[data-cursor]');
      if (!target) return hide();
      const label = target.getAttribute('data-cursor');
      if (el.textContent !== label) el.textContent = label;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        if (!shown) {
          shown = true;
          el.dataset.visible = 'true';
        }
      });
      return undefined;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('scroll', hide, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('scroll', hide);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" data-visible="false" className="cursor-badge" />;
}
