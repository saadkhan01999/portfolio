import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const supportsScrollTimeline = typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()');

/** Gradient bar across the top of the viewport that fills as the page scrolls. */
export function ScrollProgress() {
  const ref = useRef(null);

  // Native scroll timelines need no JavaScript; elsewhere update on scroll.
  useEffect(() => {
    if (supportsScrollTimeline) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ backgroundImage: 'var(--grad-brand)', transform: supportsScrollTimeline ? undefined : 'scaleX(0)' }}
      className="page-progress fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}

const R = 20;
const C = 2 * Math.PI * R;

/** Floating "back to top" button with a ring showing how far down the page you are. */
export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
      setVisible(el.scrollTop > 600);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Move focus to the top of the page so keyboard users continue from there.
    document.getElementById('top-anchor')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={`Back to top (${Math.round(progress * 100)}% scrolled)`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-line bg-surface/85 text-fg shadow-lift backdrop-blur-md transition-[opacity,transform] duration-300 hover:-translate-y-1 sm:bottom-8 sm:right-8 ${
        visible ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgb(var(--c-accent))" />
            <stop offset="0.55" stopColor="rgb(var(--c-accent-3))" />
            <stop offset="1" stopColor="rgb(var(--c-accent-2))" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r={R} fill="none" className="stroke-line" strokeWidth="2.5" />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <ArrowUp size={20} aria-hidden="true" className="relative transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
