import { Award, GraduationCap } from 'lucide-react';
import { certifications, education, journey } from '../../data/profile';
import { projects } from '../../data/projects';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const projectTitle = Object.fromEntries(projects.map((p) => [p.id, p.title]));

export default function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="journey-title"
          eyebrow="Journey"
          title="Education and the projects that shaped the work."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <ol className="relative lg:col-span-7">
            <span aria-hidden="true" className="absolute bottom-2 left-[0.4375rem] top-2 w-px bg-line" />
            {journey.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05} className="relative pb-10 pl-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-[0.9375rem] w-[0.9375rem] rounded-full border-[3px] border-bg bg-accent ring-1 ring-line"
                />
                <p className="font-mono text-[0.78rem] font-medium text-accent-fg">{item.period}</p>
                <h3 className="mt-1.5 text-h3">{item.title}</h3>
                <p className="mt-2 max-w-prose text-fg-secondary">{item.body}</p>
                {item.projectIds && (
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Related projects">
                    {item.projectIds.map((id) => (
                      <li key={id}>
                        <a href={`#project-${id}`} className="chip transition-colors hover:border-accent hover:text-accent-fg">
                          {projectTitle[id]}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </ol>

          <div className="space-y-5 lg:col-span-5">
            <Reveal className="card p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-accent-fg">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <h3 className="font-display text-[1.125rem] font-bold">Education</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {education.map((e) => (
                  <li key={e.credential}>
                    <p className="font-semibold text-fg">{e.credential}</p>
                    <p className="text-caption text-fg-secondary">
                      {e.institution} · {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="card p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-accent-fg">
                  <Award size={20} aria-hidden="true" />
                </span>
                <h3 className="font-display text-[1.125rem] font-bold">Certifications &amp; training</h3>
              </div>
              <ul className="mt-5 divide-y divide-line">
                {certifications.map((c) => (
                  <li key={c.title} className="py-3 first:pt-0 last:pb-0">
                    <p className="font-medium text-fg">{c.title}</p>
                    {(c.issuer || c.note) && (
                      <p className="text-caption text-fg-secondary">{[c.issuer, c.note].filter(Boolean).join(' · ')}</p>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
