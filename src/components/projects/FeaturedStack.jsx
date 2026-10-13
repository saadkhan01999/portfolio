import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { openCaseStudy } from '../../store/slices/uiSlice';
import { panelBackground } from '../../lib/panel';
import ProjectVisual from './ProjectVisual';

function FeaturedCard({ project, index, scale, stacking }) {
  const dispatch = useAppDispatch();
  const t = project.theme;
  const open = () => dispatch(openCaseStudy(project.id));
  const titleId = `featured-${project.id}-title`;

  return (
    <li
      className="lg:pointer-events-none lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:pt-[var(--header-h)]"
      style={stacking ? { paddingTop: `calc(var(--header-h) + ${index * 22}px)` } : undefined}
    >
      <m.article
        id={`project-${project.id}`}
        aria-labelledby={titleId}
        style={{ ...(scale ? { scale } : {}), ...panelBackground(t) }}
        className="noise group pointer-events-auto relative w-full origin-top overflow-hidden rounded-[2rem] text-white shadow-overlay ring-1 ring-white/10 lg:h-[min(40rem,calc(100svh-var(--header-h)-3rem))]"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(80%_70%_at_80%_20%,black,transparent)]" />

        <div className="relative grid h-full gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:gap-6 lg:p-12">
          <div className="flex min-w-0 flex-col lg:col-span-5">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-white/70">
              <span style={{ color: t.accent }}>{String(index + 1).padStart(2, '0')}</span>
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
            <p className="mt-4 max-w-[34rem] text-[0.98rem] leading-relaxed text-white/80">{project.summary}</p>

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
              <button type="button" onClick={open} className="btn-light group/btn h-12 px-6">
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
          <div onClick={open} aria-hidden="true" className="relative min-h-[16rem] cursor-pointer sm:min-h-[22rem] lg:col-span-7 lg:min-h-0">
            <ProjectVisual project={project} eager={index === 0} />
          </div>
        </div>
      </m.article>
    </li>
  );
}

// Earlier cards shrink slightly as later ones slide over them.
function StackedCard({ progress, index, total, ...props }) {
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045]);
  return <FeaturedCard {...props} index={index} scale={scale} stacking />;
}

function StackingList({ projects }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <ol ref={ref} className="relative">
      {projects.map((p, i) => (
        <StackedCard key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} />
      ))}
    </ol>
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
