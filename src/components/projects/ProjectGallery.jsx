import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { gallerySlides } from '../../lib/gallery';
import ProjectImage from './ProjectImage';

/**
 * Screenshot carousel built on native scroll-snap: swipe and trackpad work
 * out of the box; buttons, dots and arrow keys drive the same scroll position.
 * No autoplay — the visitor stays in control.
 */
export default function ProjectGallery({ project, onOpen, sizes }) {
  const slides = gallerySlides(project);
  // Every slide shares the first image's frame; other shapes are letterboxed.
  const aspect = slides[0] ? slides[0].width / slides[0].height : 1.6;
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIndex(Number(e.target.dataset.index));
        });
      },
      { root: track, threshold: 0.6 },
    );
    track.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  const goTo = useCallback(
    (target) => {
      const track = trackRef.current;
      const next = Math.max(0, Math.min(count - 1, target));
      const slide = track?.querySelector(`[data-index="${next}"]`);
      if (!slide) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({ left: slide.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
      setIndex(next);
    },
    [count],
  );

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const current = slides[index];
  const atStart = index === 0;
  const atEnd = index === count - 1;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${project.title} screenshots`}
      onKeyDown={onKeyDown}
      className="group/gallery overflow-hidden rounded-card border border-line bg-surface shadow-lift"
    >
      <ul
        ref={trackRef}
        className="scrollbar-none relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {slides.map((img, i) => (
          <li
            key={img.src}
            data-index={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${img.caption}`}
            className="w-full shrink-0 snap-center"
          >
            <button
              type="button"
              tabIndex={i === index ? 0 : -1}
              onClick={() => onOpen(slides, i, project.title)}
              data-cursor="Zoom in"
              className="group/slide relative block w-full cursor-zoom-in focus-visible:outline-offset-[-3px]"
              aria-label={`View larger: ${img.caption}`}
            >
              <ProjectImage
                image={img}
                aspect={aspect}
                title={project.title}
                sizes={sizes}
                imgClassName="transition-transform duration-500 ease-out group-hover/slide:scale-[1.015]"
              />
              <span className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover/slide:opacity-100 group-focus-visible/slide:opacity-100">
                <Maximize2 size={16} aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2 sm:px-4">
        <p className="min-w-0 truncate pl-1 text-caption text-fg-secondary" aria-live="polite">
          <span className="font-medium text-fg">{current?.caption}</span>
          <span className="sr-only">, screenshot {index + 1} of {count}</span>
        </p>
        {count > 1 && (
          <div className="flex shrink-0 items-center gap-1">
            <div className="mr-1 hidden items-center gap-0.5 xs:flex">
              {slides.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show screenshot ${i + 1}: ${img.caption}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="group/dot inline-flex h-11 w-6 items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-5 bg-accent' : 'w-1.5 bg-line-strong/50 group-hover/dot:bg-line-strong'
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => !atStart && goTo(index - 1)}
              aria-disabled={atStart}
              aria-label="Previous screenshot"
              className="icon-btn aria-disabled:cursor-not-allowed aria-disabled:opacity-40"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => !atEnd && goTo(index + 1)}
              aria-disabled={atEnd}
              aria-label="Next screenshot"
              className="icon-btn aria-disabled:cursor-not-allowed aria-disabled:opacity-40"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
