import { skillGroups } from '../../data/skills';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section border-y border-line bg-surface-sunken/60">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="Tools I use to take a product from idea to production."
          intro="Grouped by discipline. No percentage bars — the projects below show how each one is used in practice."
        />

        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal as="li" key={group.id} delay={(i % 3) * 0.06} className="card flex flex-col p-7">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent-fg">
                  <Icon name={group.icon} size={20} />
                </span>
                <h3 className="text-h3">{group.title}</h3>
              </div>
              <p className="mt-4 text-caption text-fg-secondary">{group.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <li key={skill} className="chip">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
