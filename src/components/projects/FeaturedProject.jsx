import { Check } from 'lucide-react';
import Reveal from '../ui/Reveal';
import TechList from '../ui/TechList';
import { gallerySlides } from '../../lib/gallery';
import ProjectGallery from './ProjectGallery';
import ProjectLinks from './ProjectLinks';

export default function FeaturedProject({ project, index, onOpen }) {
  const flipped = index % 2 === 1;
  const titleId = `project-${project.id}-title`;

  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={titleId}
      className="grid scroll-mt-6 items-start gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <Reveal className={`min-w-0 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-7 ${flipped ? 'lg:order-last' : ''}`}>
        <ProjectGallery
          project={project}
          onOpen={onOpen}
          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, calc(100vw - 2rem)"
        />
      </Reveal>

      <Reveal delay={0.08} className="min-w-0 lg:col-span-5 lg:pt-2">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted">
          <span className="text-accent-fg">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true">/</span>
          <span>{project.category}</span>
          <span aria-hidden="true">/</span>
          <span>{project.year}</span>
          {project.status && (
            <span className="rounded-full border border-line px-2 py-0.5 normal-case tracking-normal text-fg-secondary">
              {project.status}
            </span>
          )}
        </p>

        <h3 id={titleId} className="mt-4 text-[clamp(1.6rem,3vw,2.375rem)] leading-[1.1] tracking-[-0.025em]">
          {project.title}
        </h3>
        <p className="mt-4 text-lead text-fg-secondary">{project.summary}</p>

        <dl className="mt-6 grid gap-4 border-y border-line py-5 text-caption sm:grid-cols-[7rem_1fr]">
          <dt className="font-semibold text-fg">The problem</dt>
          <dd className="-mt-3 text-fg-secondary sm:mt-0">{project.problem}</dd>
          <dt className="font-semibold text-fg">My role</dt>
          <dd className="-mt-3 text-fg-secondary sm:mt-0">{project.role}</dd>
        </dl>

        <h4 className="sr-only">Key features</h4>
        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-caption text-fg-secondary">
              <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-fg" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <TechList items={project.stack} label={`${project.title} technology stack`} className="mt-6" />

        <div className="mt-7">
          <ProjectLinks project={project} onGallery={() => onOpen(gallerySlides(project), 0, project.title)} />
        </div>
      </Reveal>
    </article>
  );
}
