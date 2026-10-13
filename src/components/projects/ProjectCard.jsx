import { Maximize2 } from 'lucide-react';
import TechList from '../ui/TechList';
import { gallerySlides } from '../../lib/gallery';
import ProjectImage from './ProjectImage';
import ProjectLinks from './ProjectLinks';

export default function ProjectCard({ project, onOpen }) {
  const slides = gallerySlides(project);
  const titleId = `card-${project.id}-title`;

  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={titleId}
      className="card group flex h-full scroll-mt-6 flex-col overflow-hidden transition-[box-shadow,transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-line-strong/40 hover:shadow-lift"
    >
      <button
        type="button"
        onClick={() => onOpen(slides, 0, project.title)}
        className="group/img relative block cursor-zoom-in border-b border-line focus-visible:outline-offset-[-3px]"
        aria-label={`View ${slides.length} screenshot${slides.length === 1 ? '' : 's'} of ${project.title}`}
        disabled={slides.length === 0}
      >
        <ProjectImage
          image={project.cover}
          title={project.title}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, calc(100vw - 2rem)"
          imgClassName="transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
        />
        {slides.length > 0 && (
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[0.6875rem] text-white backdrop-blur">
            <Maximize2 size={12} aria-hidden="true" />
            {slides.length}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted">
          {project.category} · {project.year}
        </p>
        <h3 id={titleId} className="mt-2 text-h3">
          {project.title}
        </h3>
        <p className="mt-3 text-caption text-fg-secondary">{project.summary}</p>
        <TechList items={project.stack.slice(0, 5)} label={`${project.title} technology stack`} className="mt-5" />
        <div className="-mx-3 mt-auto pt-5">
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
}
