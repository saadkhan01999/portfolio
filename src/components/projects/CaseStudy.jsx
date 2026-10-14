import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projectById, projects } from '../../data/projects';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { closeCaseStudy, openCaseStudy } from '../../store/slices/uiSlice';
import { panelBackground } from '../../lib/panel';
import CursorBadge from '../ui/CursorBadge';
import Lightbox from './Lightbox';
import ProjectGallery from './ProjectGallery';
import ProjectImage from './ProjectImage';

export default function CaseStudy() {
  const dispatch = useAppDispatch();
  const id = useAppSelector((s) => s.ui.caseStudyId);
  const project = id ? projectById[id] : null;
  const dialogRef = useRef(null);
  const scrollerRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      returnFocusRef.current = document.activeElement;
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
      dialog.querySelector('[data-autofocus]')?.focus();
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  // New project: start at the top.
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [id]);

  const onClose = (e) => {
    // React bubbles `close` from the nested lightbox dialog; only react to our own.
    if (e.target !== e.currentTarget) return;
    document.documentElement.style.overflow = '';
    dispatch(closeCaseStudy());
    // Opened from a shared link there is no opener to return to; land on the main content instead.
    const target = returnFocusRef.current && returnFocusRef.current !== document.body ? returnFocusRef.current : document.getElementById('main');
    target?.focus?.({ preventScroll: true });
  };

  const openLightbox = useCallback((images, index, title) => images.length && setLightbox({ images, index, title }), []);

  const i = project ? projects.indexOf(project) : -1;
  const prevProject = i >= 0 ? projects[(i - 1 + projects.length) % projects.length] : null;
  const nextProject = i >= 0 ? projects[(i + 1) % projects.length] : null;
  const go = (p) => dispatch(openCaseStudy(p.id));
  const t = project?.theme ?? { from: '#111827', via: '#1E1B4B', to: '#312E81', glow: '#8B8DFF', accent: '#C7D2FE' };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="case-study-title"
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-bg p-0 text-fg backdrop:bg-black/60"
    >
      {project && (
        <div ref={scrollerRef} className="h-full overflow-y-auto overscroll-contain">
          <div className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-xl">
            {/* Reading progress through the case study (CSS scroll timeline; hidden where unsupported). */}
            <div aria-hidden="true" className="cs-progress absolute inset-x-0 -bottom-px h-[2px] origin-left" style={{ backgroundImage: 'var(--grad-brand)' }} />
            <div className="container-page flex h-16 items-center justify-between gap-3">
              <button type="button" onClick={() => dialogRef.current?.close()} className="btn-ghost -ml-3">
                <ArrowLeft size={18} aria-hidden="true" />
                <span className="hidden sm:inline">Back to work</span>
                <span className="sm:hidden">Back</span>
              </button>
              <p className="min-w-0 truncate font-display font-semibold text-fg-secondary" aria-hidden="true">
                {project.title}
              </p>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => go(prevProject)} className="icon-btn" aria-label={`Previous project: ${prevProject.title}`}>
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(nextProject)} className="icon-btn" aria-label={`Next project: ${nextProject.title}`}>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                <button type="button" data-autofocus onClick={() => dialogRef.current?.close()} className="icon-btn" aria-label="Close case study">
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <header className="noise relative overflow-hidden text-white" style={panelBackground(t)}>
            <div className="container-page relative pb-14 pt-12 sm:pt-16">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-white/70">
                Case study · {project.category} · {project.year}
                {project.status ? ` · ${project.status}` : ''}
              </p>
              <h2 id="case-study-title" className="mt-4 max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold leading-[1] tracking-[-0.045em] text-white">
                {project.title}
              </h2>
              {project.tagline && (
                <p className="mt-4 font-display text-[clamp(1.1rem,2vw,1.5rem)] font-semibold" style={{ color: t.accent }}>
                  {project.tagline}
                </p>
              )}
              <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-white/80">{project.summary}</p>

              <dl className="mt-9 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-6 md:grid-cols-4">
                {[
                  ['Role', project.role],
                  ['Year', project.year],
                  ['Platforms', project.platforms ?? 'Web'],
                  ['Built with', project.stack.slice(0, 3).join(', ')],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">{k}</dt>
                    <dd className="mt-1.5 font-medium text-white">{v}</dd>
                  </div>
                ))}
              </dl>

              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-light mt-9 h-12 px-6">
                  Visit live site
                  <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </header>

          <div className="container-page -mt-6 pb-20">
            <div className="relative z-10">
              <ProjectGallery
                key={project.id}
                project={project}
                onOpen={openLightbox}
                sizes="(min-width: 1280px) 1200px, calc(100vw - 2rem)"
              />
            </div>

            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              {project.problem && (
                <section className="lg:col-span-5" aria-labelledby="cs-challenge">
                  <h3 id="cs-challenge" className="eyebrow">The challenge</h3>
                  <p className="mt-4 text-lead text-fg">{project.problem}</p>
                </section>
              )}
              <section className={project.problem ? 'lg:col-span-7' : 'lg:col-span-12'} aria-labelledby="cs-built">
                <h3 id="cs-built" className="eyebrow">What I built</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 rounded-2xl border border-line bg-surface p-4 text-caption text-fg-secondary">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent-fg">
                        <Check size={14} aria-hidden="true" />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {project.metrics && (
              <dl className="mt-14 grid gap-4 sm:grid-cols-3">
                {project.metrics.map((mt) => (
                  <div key={mt.label} className="card flex flex-col p-6">
                    <dt className="order-2 mt-2 text-caption text-fg-secondary">{mt.label}</dt>
                    <dd className="order-1 font-display text-[2.5rem] font-extrabold leading-none tracking-tight">
                      <span className="text-gradient">{mt.value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <section className="mt-14" aria-labelledby="cs-stack">
              <h3 id="cs-stack" className="eyebrow">Tech stack</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="chip px-3 py-1.5 text-[0.8125rem]">
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            <button
              type="button"
              onClick={() => go(nextProject)}
              className="spotlight group mt-20 grid w-full items-center gap-6 overflow-hidden rounded-[1.75rem] border border-line bg-surface p-5 text-left shadow-card sm:grid-cols-[1fr_auto] sm:p-7"
            >
              <span>
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-fg-muted">Next project</span>
                <span className="mt-2 flex items-center gap-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-tight text-fg">
                  {nextProject.title}
                  <ArrowRight size={26} aria-hidden="true" className="text-accent-fg transition-transform group-hover:translate-x-1.5" />
                </span>
                <span className="mt-1 block text-caption text-fg-secondary">{nextProject.category}</span>
              </span>
              <span className="block w-full overflow-hidden rounded-xl border border-line sm:w-64">
                <ProjectImage image={nextProject.cover} title={nextProject.title} aspect={1.6} sizes="256px" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* The dialog sits in the top layer, above the page's own cursor badge. */}
      <CursorBadge />
      <Lightbox lockScroll={false} state={lightbox} onClose={() => setLightbox(null)} onNavigate={(index) => setLightbox((s) => (s ? { ...s, index } : s))} />
    </dialog>
  );
}
