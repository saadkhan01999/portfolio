import { useMemo, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { featuredProjects, filters, otherProjects } from '../../data/projects';
import { scrollToProject } from '../../lib/scrollToProject';
import FeaturedStack from '../projects/FeaturedStack';
import ProjectList from '../projects/ProjectList';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const pad = (n) => String(n).padStart(2, '0');

/** Table of contents for the featured panels below. */
function ProjectIndex() {
  return (
    <nav aria-label="Project index" className="glass w-full rounded-[1.75rem] p-2 shadow-card lg:w-[25rem]">
      <p className="flex items-center justify-between px-4 pb-2 pt-3 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted">
        <span>Index</span>
        <span>
          {pad(featuredProjects.length)} featured · {pad(otherProjects.length)} more
        </span>
      </p>
      <ol>
        {featuredProjects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => scrollToProject(p.id)}
              className="group flex min-h-[2.75rem] w-full items-center gap-4 rounded-2xl px-4 py-2.5 text-left transition-colors hover:bg-surface-sunken"
            >
              <span className="font-mono text-[0.75rem] text-fg-muted">{pad(i + 1)}</span>
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-transparent transition-shadow group-hover:ring-[color:var(--dot-ring)]" style={{ backgroundColor: p.theme.glow, '--dot-ring': `${p.theme.glow}33` }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[1rem] font-bold text-fg">{p.title}</span>
                <span className="block truncate text-[0.8125rem] text-fg-muted">{p.category}</span>
              </span>
              <ArrowDownRight size={18} aria-hidden="true" className="shrink-0 text-fg-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-fg group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

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
          intro="From an instalment & retail system and a pharmacy SaaS with its own super admin console to a restaurant platform serving customers today. Open any project for the full case study."
        >
          <ProjectIndex />
        </SectionHeading>

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
          <Reveal>
            <ProjectList projects={visible} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
