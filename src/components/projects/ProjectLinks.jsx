import { ArrowUpRight, Github, Images } from 'lucide-react';

export default function ProjectLinks({ project, onGallery, compact = false }) {
  const size = compact ? 16 : 18;
  return (
    <div className={`flex flex-wrap items-center ${compact ? 'gap-1' : 'gap-3'}`}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={compact ? 'btn-ghost min-h-[2.75rem] px-3 text-caption' : 'btn-primary'}
        >
          Live site
          <ArrowUpRight size={size} aria-hidden="true" />
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={compact ? 'btn-ghost min-h-[2.75rem] px-3 text-caption' : project.liveUrl ? 'btn-secondary' : 'btn-primary'}
        >
          <Github size={size} aria-hidden="true" />
          Source code
          <span className="sr-only">for {project.title} on GitHub (opens in a new tab)</span>
        </a>
      )}
      {onGallery && (
        <button
          type="button"
          onClick={onGallery}
          className={compact ? 'btn-ghost min-h-[2.75rem] px-3 text-caption' : 'btn-secondary'}
        >
          <Images size={size} aria-hidden="true" />
          Screenshots
          <span className="sr-only">of {project.title}</span>
        </button>
      )}
    </div>
  );
}
