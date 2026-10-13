import { useState } from 'react';
import { Award, BadgeCheck, GraduationCap, Maximize2 } from 'lucide-react';
import { certificates, certifications, education, journey } from '../../data/profile';
import { projectById } from '../../data/projects';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openCaseStudy } from '../../store/slices/uiSlice';
import Lightbox from '../projects/Lightbox';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const scans = certificates.filter((c) => c.image);
const certificateIndex = Object.fromEntries(scans.map((c, i) => [c.id, i]));

export default function Journey() {
  const dispatch = useAppDispatch();
  const [viewer, setViewer] = useState(null);
  const openCertificate = (id) => setViewer({ images: scans.map((c) => c.image), index: certificateIndex[id], title: 'Certificates' });

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
                {item.certificateId && certificateIndex[item.certificateId] != null && (
                  <button
                    type="button"
                    onClick={() => openCertificate(item.certificateId)}
                    className="chip mt-4 min-h-[2.75rem] gap-2 px-3.5 transition-colors hover:border-accent hover:text-accent-fg"
                  >
                    <Award size={15} aria-hidden="true" />
                    View certificate
                  </button>
                )}
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
                <h3 className="font-display text-[1.25rem] font-extrabold">Certificates</h3>
              </div>
              <ul className="mt-6 grid gap-6">
                {scans.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => openCertificate(c.id)}
                      className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift"
                    >
                      <img
                        src={c.image.src}
                        srcSet={c.image.srcSet}
                        sizes="(min-width: 1024px) 420px, calc(100vw - 5rem)"
                        width={c.image.width}
                        height={c.image.height}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#0B1020]/85 px-3 py-1.5 text-[0.8125rem] font-semibold text-white shadow-lift backdrop-blur"
                      >
                        <Maximize2 size={14} /> View
                      </span>
                      <span className="sr-only">
                        View certificate: {c.title}, {c.issuer}
                      </span>
                    </button>
                    <div className="mt-3 flex gap-3">
                      <BadgeCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-fg" />
                      <div>
                        <p className="font-semibold text-fg">{c.title}</p>
                        <p className="text-caption text-fg-secondary">
                          {c.issuer} · {c.date}
                        </p>
                        <p className="mt-0.5 font-mono text-[0.75rem] text-fg-muted">{c.credential}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {certifications.length > 0 && (
                <>
                  <p className="mt-7 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted">Also completed</p>
                  <ul className="mt-3 grid gap-2">
                    {certifications.map((c) => (
                      <li key={c.title} className="flex items-center gap-3 rounded-xl border border-line bg-surface-sunken/60 px-4 py-3 text-caption">
                        <BadgeCheck size={18} aria-hidden="true" className="shrink-0 text-teal-fg" />
                        <span className="font-semibold text-fg">{c.title}</span>
                        {c.issuer && <span className="text-fg-secondary">· {c.issuer}</span>}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Reveal>
          </div>
        </div>
      </div>

      <Lightbox kind="certificate" state={viewer} onClose={() => setViewer(null)} onNavigate={(index) => setViewer((v) => (v ? { ...v, index } : v))} />
    </section>
  );
}
