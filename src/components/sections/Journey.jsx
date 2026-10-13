import { Award, BadgeCheck, GraduationCap } from 'lucide-react';
import { certifications, education, journey } from '../../data/profile';
import { projectById } from '../../data/projects';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openCaseStudy } from '../../store/slices/uiSlice';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Journey() {
  const dispatch = useAppDispatch();

  return (
    <section id="journey" aria-labelledby="journey-title" className="defer-render section relative">
      <div className="container-page">
        <SectionHeading
          id="journey-title"
          index="05"
          eyebrow="Journey"
          title={
            <>
              From first websites to <span className="text-gradient">SaaS platforms.</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <ol className="relative lg:col-span-7">
            <span aria-hidden="true" className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-line" />
            <span aria-hidden="true" className="scroll-fill-y absolute bottom-3 left-[0.6875rem] top-3 w-[2px]" />
            {journey.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05} className="relative pb-12 pl-12 last:pb-0">
                <span aria-hidden="true" className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border border-line bg-surface shadow-card">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundImage: 'var(--grad-brand)' }} />
                </span>
                <p className="font-mono text-[0.8125rem] font-medium text-accent-fg">{item.period}</p>
                <h3 className="mt-1.5 text-[clamp(1.25rem,2vw,1.6rem)] font-extrabold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 max-w-prose text-fg-secondary">{item.body}</p>
                {item.projectIds && (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Related projects">
                    {item.projectIds.map((id) => (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => dispatch(openCaseStudy(id))}
                          className="chip min-h-[2.75rem] px-3.5 transition-colors hover:border-accent hover:text-accent-fg"
                        >
                          {projectById[id].title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </ol>

          <div className="space-y-5 lg:col-span-5">
            <Reveal className="spotlight card rounded-[1.75rem] p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ backgroundImage: 'var(--grad-brand)' }}>
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <h3 className="font-display text-[1.25rem] font-extrabold">Education</h3>
              </div>
              <ul className="mt-6 space-y-4">
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

            <Reveal delay={0.08} className="spotlight card rounded-[1.75rem] p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ backgroundImage: 'var(--grad-brand)' }}>
                  <Award size={20} aria-hidden="true" />
                </span>
                <h3 className="font-display text-[1.25rem] font-extrabold">Certifications</h3>
              </div>
              <ul className="mt-6 grid gap-3">
                {certifications.map((c) => (
                  <li key={c.title} className="flex gap-3 rounded-2xl border border-line bg-surface-sunken/60 p-4">
                    <BadgeCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-fg" />
                    <div>
                      <p className="font-semibold text-fg">{c.title}</p>
                      {(c.issuer || c.note) && <p className="text-caption text-fg-secondary">{[c.issuer, c.note].filter(Boolean).join(' · ')}</p>}
                    </div>
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
