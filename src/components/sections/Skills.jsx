import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { skillGroups } from '../../data/skills';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Toolkit as accessible tabs (arrow keys move between disciplines). */
export default function Skills() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const group = skillGroups[active];

  const onKeyDown = (e) => {
    const last = skillGroups.length - 1;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="defer-render section relative overflow-hidden border-y border-line bg-surface-sunken/50">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          index="04"
          eyebrow="Skills"
          title={
            <>
              The toolkit behind <span className="text-gradient">every build.</span>
            </>
          }
          intro="Grouped by discipline. No percentage bars — the projects above show how each one is used in practice."
        />

        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div role="tablist" aria-label="Skill areas" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:col-span-4 lg:flex-col lg:overflow-visible">
            {skillGroups.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => (tabs.current[i] = el)}
                  id={`tab-${g.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${g.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group flex min-h-[3.25rem] shrink-0 items-center gap-3 rounded-2xl border px-4 text-left transition-all duration-200 lg:min-h-[4rem] ${
                    selected ? 'border-transparent bg-surface text-fg shadow-lift' : 'border-line bg-transparent text-fg-secondary hover:bg-surface/70 hover:text-fg'
                  }`}
                >
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${selected ? 'text-white' : 'bg-accent-subtle text-accent-fg'}`}
                    style={selected ? { backgroundImage: 'var(--grad-brand)' } : undefined}
                  >
                    <Icon name={g.icon} size={18} />
                  </span>
                  <span className="whitespace-nowrap font-display font-bold">{g.title}</span>
                  <span className="ml-auto hidden font-mono text-[0.75rem] text-fg-muted lg:inline">{g.skills.length}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={group.id}
                id={`panel-${group.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${group.id}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="spotlight card h-full rounded-[1.75rem] p-7 sm:p-10"
              >
                <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold tracking-[-0.02em]">{group.title}</h3>
                <p className="mt-2 text-fg-secondary">{group.summary}</p>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {group.skills.map((skill, i) => (
                    <m.li
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.25 }}
                      className="rounded-full border border-line bg-surface-sunken px-4 py-2 font-medium text-fg transition-colors hover:border-accent hover:text-accent-fg"
                    >
                      {skill}
                    </m.li>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
