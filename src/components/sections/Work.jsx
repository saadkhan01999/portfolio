import { useMemo, useState } from 'react';
import { featuredProjects, filters, otherProjects } from '../../data/projects';
import FeaturedStack from '../projects/FeaturedStack';
import ProjectCard from '../projects/ProjectCard';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Work() {
  const [filter, setFilter] = useState('all');

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
    <section id="work" aria-labelledby="work-title" className="section relative">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Products I’ve designed, built <span className="text-gradient">and shipped.</span>
            </>
          }
          intro="From a pharmacy SaaS with its own super admin console to a restaurant platform serving customers today. Open any project for the full case study."
        />

        <FeaturedStack projects={featuredProjects} />

        <div className="mt-28 lg:mt-36">
          <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-tight tracking-[-0.03em]">More projects</h3>
              <p className="mt-2 text-fg-secondary">Dashboards, sites and earlier work that shaped the craft.</p>
            </div>
            <div role="group" aria-label="Filter projects" className="glass flex flex-wrap gap-1 rounded-full p-1">
              {availableFilters.map((f) => {
                const selected = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(f.id)}
                    className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 text-caption font-semibold transition-colors ${
                      selected ? 'bg-fg text-bg shadow-card' : 'text-fg-secondary hover:text-fg'
                    }`}
                  >
                    {f.label}
                    <span className={`font-mono text-[0.75rem] ${selected ? 'opacity-70' : 'text-fg-muted'}`}>{counts[f.id]}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <p className="sr-only" aria-live="polite">
            Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          </p>
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {visible.map((project, i) => (
              <Reveal as="li" key={project.id} delay={(i % 4) * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
