import { useCallback, useMemo, useState } from 'react';
import { featuredProjects, filters, otherProjects } from '../../data/projects';
import FeaturedProject from '../projects/FeaturedProject';
import GitHubRepos from '../projects/GitHubRepos';
import Lightbox from '../projects/Lightbox';
import ProjectCard from '../projects/ProjectCard';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Projects() {
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState('all');

  const openLightbox = useCallback((images, index, title) => {
    if (images.length) setLightbox({ images, index, title });
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        filters.map((f) => [f.id, f.id === 'all' ? otherProjects.length : otherProjects.filter((p) => p.filters.includes(f.id)).length]),
      ),
    [],
  );
  const visible = filter === 'all' ? otherProjects : otherProjects.filter((p) => p.filters.includes(filter));
  const availableFilters = filters.filter((f) => counts[f.id] > 0);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          eyebrow="Selected work"
          title="Real projects, from first prototype to full product."
          intro="Every screenshot below was captured from the actual application. Open any image to see it full size."
        />

        <div className="space-y-24 lg:space-y-32">
          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.id} project={project} index={i} onOpen={openLightbox} />
          ))}
        </div>

        <div className="mt-28 lg:mt-36">
          <Reveal className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em]">More projects</h3>
              <p className="mt-2 text-fg-secondary">Dashboards, sites and earlier practice work.</p>
            </div>
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
              {availableFilters.map((f) => {
                const selected = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(f.id)}
                    className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border px-4 text-caption font-semibold transition-colors ${
                      selected
                        ? 'border-accent bg-accent text-accent-contrast'
                        : 'border-line bg-surface text-fg-secondary hover:border-line-strong/50 hover:text-fg'
                    }`}
                  >
                    {f.label}
                    <span className={`font-mono text-[0.75rem] ${selected ? 'opacity-80' : 'text-fg-muted'}`}>{counts[f.id]}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <p className="sr-only" aria-live="polite">
            Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          </p>
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} onOpen={openLightbox} />
              </li>
            ))}
          </ul>
        </div>

        <GitHubRepos />
      </div>

      <Lightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(index) => setLightbox((s) => (s ? { ...s, index } : s))}
      />
    </section>
  );
}
