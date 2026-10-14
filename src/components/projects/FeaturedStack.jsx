import { useRef, useState } from 'react';
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { openCaseStudy } from '../../store/slices/uiSlice';
import { panelBackground } from '../../lib/panel';
import { scrollToProject } from '../../lib/scrollToProject';
import ProjectVisual from './ProjectVisual';

const pad = (n) => String(n).padStart(2, '0');

function FeaturedCard({ project, index, scale, dim, parallax, liRef, stacking }) {
  const dispatch = useAppDispatch();
  const t = project.theme;
  const open = () => dispatch(openCaseStudy(project.id));
  const titleId = `featured-${project.id}-title`;

  return (
    <li
      ref={liRef}
      className="lg:pointer-events-none lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:pt-[var(--header-h)]"
      style={stacking ? { paddingTop: `calc(var(--header-h) + ${index * 22}px)` } : undefined}
    >
      <m.article
        id={`project-${project.id}`}
        aria-labelledby={titleId}
        style={{ ...(scale ? { scale } : {}), ...panelBackground(t) }}
        className="noise group pointer-events-auto relative w-full origin-top overflow-hidden rounded-[2rem] text-white shadow-overlay ring-1 ring-white/10 lg:h-[min(40rem,calc(100svh-var(--header-h)-3rem))]"
      >
        {/* Fine grid, a soft glow that follows the theme, and a giant outlined index number. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(80%_70%_at_80%_20%,black,transparent)]" />
        <div aria-hidden="true" className="absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70" style={{ backgroundColor: t.glow }} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[0.18em] right-[0.04em] select-none font-display text-[clamp(9rem,20vw,19rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.13)]"
        >
          {pad(index + 1)}
        </span>
        {/* Earlier panels dim as later ones slide over them. */}
        {dim && <m.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-black" />}

        <div className="relative grid h-full gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:gap-6 lg:p-12">
          <div className="flex min-w-0 flex-col lg:col-span-5">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-white/70">
              <span style={{ color: t.accent }}>{pad(index + 1)}</span>
              <span aria-hidden="true" className="h-px w-6 bg-white/30" />
              <span>{project.category}</span>
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 normal-case tracking-normal text-white">
                  <span className="relative h-1.5 w-1.5 rounded-full pulse-dot" style={{ color: t.glow, backgroundColor: t.glow }} />
                  Live
                </span>
              )}
              {project.status && (
                <span className="rounded-full border border-white/25 px-2.5 py-1 normal-case tracking-normal text-white/85">{project.status}</span>
              )}
            </p>

            <h3 id={titleId} className="mt-5 text-[clamp(2rem,3.6vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white">
              {project.title}
            </h3>
            <p className="mt-3 font-display text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold" style={{ color: t.accent }}>
              {project.tagline}
            </p>
            <p className="mt-4 max-w-[34rem] text-[0.98rem] leading-relaxed text-white/80 lg:line-clamp-3">{project.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
              {project.stack.slice(0, 5).map((s) => (
                <li key={s} className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 font-mono text-[0.75rem] text-white/85 backdrop-blur-sm">
                  {s}
                </li>
              ))}
            </ul>

            {project.metrics && (
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-5 sm:grid-cols-3 lg:mt-auto">
                {project.metrics.map((mt) => (
                  <div key={mt.label} className="flex flex-col">
                    <dt className="order-2 mt-1 text-[0.8125rem] leading-snug text-white/70">{mt.label}</dt>
                    <dd className="order-1 font-display text-[1.75rem] font-extrabold leading-none tracking-tight text-white">{mt.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={open} data-magnetic className="btn-light group/btn h-12 px-6">
                View case study
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover/btn:translate-x-1" />
                <span className="sr-only">: {project.title}</span>
              </button>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-on-dark h-12 px-6">
                  Visit live site
                  <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only">(opens {project.title} in a new tab)</span>
                </a>
              )}
            </div>
          </div>

          {/* Mouse shortcut to the case study; keyboard and screen-reader users have the button above. */}
          <div
            onClick={open}
            aria-hidden="true"
            data-cursor="View case study"
            className="relative z-10 min-h-[16rem] cursor-pointer sm:min-h-[22rem] lg:col-span-7 lg:min-h-0"
          >
            <ProjectVisual project={project} eager={index === 0} parallax={parallax} />
          </div>
        </div>
      </m.article>
    </li>
  );
}

// Earlier cards shrink and dim as later ones slide over them; each card's
// screens settle into place at different speeds as it arrives.
function StackedCard({ progress, index, total, ...props }) {
  const liRef = useRef(null);
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045]);
  const dim = useTransform(progress, [index / (total - 1), 1], [0, Math.min(0.55, (total - 1 - index) * 0.14)]);
  const { scrollYProgress: arrive } = useScroll({ target: liRef, offset: ['start end', 'start start'] });
  const parallax = {
    back: useTransform(arrive, [0, 1], [90, 0]),
    front: useTransform(arrive, [0, 1], [40, 0]),
    phone: useTransform(arrive, [0, 1], [140, 0]),
  };
  return <FeaturedCard {...props} index={index} scale={scale} dim={dim} parallax={parallax} liRef={liRef} stacking />;
}

/** Dots beside the stack showing which project is on screen; each one jumps to its project. */
function ProgressRail({ projects, active, engaged }) {
  return (
    <nav aria-label="Project progress" className="pointer-events-none absolute inset-y-0 left-0 hidden w-[var(--gutter)] -translate-x-full xl:block">
      <div
        className={`sticky top-[calc(50svh-9rem)] flex flex-col items-center py-2 transition-[opacity,visibility] duration-500 ${engaged ? 'pointer-events-auto visible opacity-100' : 'invisible opacity-0'}`}
      >
        <span aria-hidden="true" className="font-mono text-[0.6875rem] font-semibold text-fg">
          {pad(active + 1)}
        </span>
        <ol className="my-1 flex flex-col items-center">
          {projects.map((p, i) => {
            const current = i === active;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => scrollToProject(p.id)}
                  aria-label={p.title}
                  aria-current={current ? 'true' : undefined}
                  className="group relative grid h-11 w-8 place-items-center rounded-full"
                >
                  <span
                    aria-hidden="true"
                    className={`block w-1.5 rounded-full transition-all duration-500 ${current ? 'h-7' : 'h-1.5 bg-fg-muted/60 group-hover:bg-fg'}`}
                    style={current ? { backgroundColor: p.theme.glow, boxShadow: `0 0 14px ${p.theme.glow}` } : undefined}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-fg px-3 py-1 text-[0.75rem] font-semibold text-bg opacity-0 shadow-lift transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  >
                    {p.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <span aria-hidden="true" className="font-mono text-[0.6875rem] text-fg-muted">
          {pad(projects.length)}
        </span>
      </div>
    </nav>
  );
}

function StackingList({ projects }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(projects.length - 1, Math.max(0, Math.round(v * (projects.length - 1)))));
  });
  // The rail shows only while the stack fills the screen.
  const { scrollYProgress: span } = useScroll({ target: ref, offset: ['start 35%', 'end 65%'] });
  useMotionValueEvent(span, 'change', (v) => setEngaged(v > 0 && v < 1));

  return (
    <div className="relative">
      <ProgressRail projects={projects} active={active} engaged={engaged} />
      {/* Static markers where each sticky panel is fully in place (see lib/scrollToProject.js). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {projects.map((p, i) => (
          <span key={p.id} id={`slot-${p.id}`} className="absolute left-0 block h-px w-px [scroll-margin-top:calc(var(--header-h)*-1)]" style={{ top: `calc(${i} * 100svh)` }} />
        ))}
      </div>
      <ol ref={ref} className="relative">
        {projects.map((p, i) => (
          <StackedCard key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </ol>
    </div>
  );
}

/**
 * Featured projects as full-bleed brand panels. On large screens each panel
 * pins in place and the next slides over it, with earlier ones receding;
 * scroll tracking only runs there.
 */
export default function FeaturedStack({ projects }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduce = useReducedMotion();
  if (isDesktop && !reduce) return <StackingList projects={projects} />;
  return (
    <ol className="relative space-y-6 lg:space-y-0">
      {projects.map((p, i) => (
        <FeaturedCard key={p.id} project={p} index={i} stacking={false} />
      ))}
    </ol>
  );
}
