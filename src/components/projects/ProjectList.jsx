import { useState } from 'react';
import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { openCaseStudy } from '../../store/slices/uiSlice';
import ProjectImage from './ProjectImage';

const PREVIEW_W = 352; // px, 16:10

/** Floating cover that trails the cursor over the list (mouse and trackpad only). */
function CursorPreview({ projects, hovered, x, y }) {
  return (
    <m.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40" style={{ x, y, width: PREVIEW_W }}>
      <AnimatePresence>
        {hovered && (
          <m.div
            key="preview"
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative aspect-[1.6] overflow-hidden rounded-2xl bg-surface shadow-overlay ring-1 ring-white/15"
          >
            {projects.map((p) => (
              <img
                key={p.id}
                src={p.cover?.src}
                srcSet={p.cover?.srcSet}
                sizes={`${PREVIEW_W}px`}
                alt=""
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-500 ease-out ${
                  hovered === p.id ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                }`}
              />
            ))}
            <span className="absolute bottom-3 left-3 rounded-full bg-[#0B1020]/85 px-3 py-1.5 text-[0.75rem] font-semibold text-white backdrop-blur">
              View case study
            </span>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

function Row({ project, number, onEnter }) {
  const dispatch = useAppDispatch();
  const titleId = `list-${project.id}-title`;

  return (
    <li className="group relative border-b border-line" onPointerEnter={onEnter}>
      <article id={`project-${project.id}`} aria-labelledby={titleId} className="relative">
        {/* Background that sweeps up on hover. */}
        <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 rounded-2xl bg-surface-sunken transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
        <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 px-1 py-5 sm:gap-6 sm:px-4 sm:py-6 md:grid-cols-[2.5rem_auto_1fr_auto]">
          <span className="hidden font-mono text-[0.8125rem] text-fg-muted md:block">{number}</span>
          <div className="w-24 overflow-hidden rounded-xl border border-line shadow-card transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-105 sm:w-36 lg:w-40">
            <ProjectImage image={project.cover} title={project.title} aspect={1.6} compact sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 96px" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted">
              {project.category} · {project.year}
            </p>
            <h4 id={titleId} className="mt-1">
              <button
                type="button"
                onClick={() => dispatch(openCaseStudy(project.id))}
                className="inline-flex min-h-[2.75rem] items-center text-left font-display text-[clamp(1.25rem,2.6vw,2.125rem)] font-extrabold leading-tight tracking-[-0.03em] transition-colors duration-300 after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-accent-fg focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus"
              >
                {project.title}
                <span className="sr-only"> — view case study</span>
              </button>
            </h4>
            <p className="mt-1 hidden max-w-2xl text-caption text-fg-secondary sm:line-clamp-1">{project.summary}</p>
            <ul className="mt-3 hidden flex-wrap gap-2 sm:flex" aria-label={`${project.title} technology stack`}>
              {project.stack.slice(0, 4).map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 hidden min-h-[2.75rem] items-center gap-1.5 rounded-full px-3 text-caption font-semibold text-accent-fg hover:underline sm:inline-flex"
              >
                Live <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(opens {project.title} in a new tab)</span>
              </a>
            )}
            <span
              aria-hidden="true"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-fg group-hover:text-bg sm:h-14 sm:w-14"
            >
              <ArrowUpRight size={20} />
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}

/**
 * Editorial index of the non-featured projects. Each row opens its case study;
 * on devices with a mouse, the hovered project's cover trails the cursor.
 */
export default function ProjectList({ projects }) {
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduce = useReducedMotion();
  const follow = canHover && !reduce;
  const [hovered, setHovered] = useState(null);
  const [armed, setArmed] = useState(false); // mount the preview (and fetch its images) on first hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  const onMove = (e) => {
    // Sit beside the cursor, flipping to the left near the right edge.
    const right = e.clientX < window.innerWidth * 0.6;
    x.set(e.clientX + (right ? 28 : -PREVIEW_W - 28));
    y.set(e.clientY - PREVIEW_W / 1.6 / 2);
  };
  const enter = (id) => (e) => {
    if (!follow) return;
    onMove(e);
    // Appear at the cursor rather than flying in from the last spot.
    if (!hovered) {
      sx.jump(x.get());
      sy.jump(y.get());
    }
    setArmed(true);
    setHovered(id);
  };

  return (
    <div onPointerMove={follow ? onMove : undefined} onPointerLeave={() => setHovered(null)}>
      <ul data-project-list className="border-t border-line">
        {projects.map((p, i) => (
          <Row key={p.id} project={p} number={String(i + 1).padStart(2, '0')} onEnter={enter(p.id)} />
        ))}
      </ul>
      {follow && armed && <CursorPreview projects={projects} hovered={hovered} x={sx} y={sy} />}
    </div>
  );
}
