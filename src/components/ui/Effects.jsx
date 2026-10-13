import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useInView } from 'framer-motion';

/** Three drifting colour fields behind a section. */
export function Aurora({ className = '' }) {
  return (
    <div aria-hidden="true" className={`aurora ${className}`}>
      <span />
      <span />
      <span />
    </div>
  );
}

/** Cycles through words in place. The widest word reserves the space, so nothing reflows. */
export function WordRotator({ words, interval = 2600, className = '' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-grid whitespace-nowrap align-bottom ${className}`} aria-hidden="true">
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <m.span
          key={words[index]}
          className="text-gradient col-start-1 row-start-1 pb-[0.08em]"
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-60%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({ value, duration = 1400, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return undefined;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.round(value * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

/** Infinite horizontal ticker (pauses on hover; static with reduced motion). */
export function Marquee({ items, className = '' }) {
  const row = (hidden) =>
    items.map((item, i) => (
      <li key={`${hidden ? 'b' : 'a'}-${item}`} aria-hidden={hidden || undefined} className="flex items-center gap-8 pr-8">
        <span className="whitespace-nowrap font-display text-[clamp(1.1rem,2vw,1.5rem)] font-semibold text-fg-secondary">{item}</span>
        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${i % 3 === 0 ? 'bg-accent' : i % 3 === 1 ? 'bg-violet' : 'bg-teal'}`} />
      </li>
    ));
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <ul className="marquee-track flex w-max" aria-label="Technologies">
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
