import { ArrowUpRight } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openCaseStudy } from '../../store/slices/uiSlice';
import ProjectImage from './ProjectImage';

/** Grid card. The whole card opens the case study; a live link sits on top when there is one. */
export default function ProjectCard({ project }) {
  const dispatch = useAppDispatch();
  const titleId = `card-${project.id}-title`;

  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={titleId}
      className="spotlight card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative overflow-hidden border-b border-line">
        <ProjectImage
          image={project.cover}
          title={project.title}
          aspect={1.6}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, calc(100vw - 2rem)"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 translate-y-2 rounded-full bg-white px-3 py-1.5 text-[0.8125rem] font-semibold text-[#0B1020] opacity-0 shadow-lift transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          View case study
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted">
          {project.category} · {project.year}
        </p>
        <h3 id={titleId} className="mt-2 text-h3">
          <button
            type="button"
            onClick={() => dispatch(openCaseStudy(project.id))}
            className="inline-flex min-h-[2.75rem] items-center text-left after:absolute after:inset-0 after:rounded-[1.5rem] after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus"
          >
            {project.title}
            <span className="sr-only"> — view case study</span>
          </button>
        </h3>
        <p className="mt-3 text-caption text-fg-secondary">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
          {project.stack.slice(0, 4).map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-5 inline-flex min-h-[2.75rem] w-fit items-center gap-1.5 text-caption font-semibold text-accent-fg hover:underline"
          >
            Visit live site <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">(opens {project.title} in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
