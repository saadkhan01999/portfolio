import { process, services } from '../../data/profile';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Six-step process with a gradient line that fills as you scroll past it. */
function Process() {
  return (
    <div className="mt-24">
      <Reveal className="max-w-2xl">
        <h3 className="text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-tight tracking-[-0.03em]">How a project runs</h3>
        <p className="mt-3 text-fg-secondary">A simple, transparent process — you always know what is being built and why.</p>
      </Reveal>

      <div className="relative mt-12">
        {/* Track + animated fill: vertical on small screens, horizontal on large. */}
        <div aria-hidden="true" className="absolute bottom-0 left-[1.375rem] top-0 w-px bg-line lg:bottom-auto lg:left-0 lg:right-0 lg:top-[1.375rem] lg:h-px lg:w-auto" />
        <div aria-hidden="true" className="scroll-fill-y absolute bottom-0 left-[1.375rem] top-0 w-px lg:hidden" />
        <div aria-hidden="true" className="scroll-fill-x absolute left-0 right-0 top-[1.375rem] hidden h-[2px] lg:block" />

        <ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-6">
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="relative flex gap-5 lg:flex-col lg:gap-0">
              <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[0.8125rem] font-semibold text-accent-fg shadow-card">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="lg:mt-6">
                <h4 className="font-display text-[1.125rem] font-bold">{step.title}</h4>
                <p className="mt-1.5 text-caption text-fg-secondary">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="defer-render section relative overflow-hidden border-y border-line bg-surface-sunken/50">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          index="02"
          eyebrow="Services"
          title={
            <>
              What I can build <span className="text-gradient">for you.</span>
            </>
          }
          intro="Every service below is something I have already shipped in a real product — not a list of buzzwords."
        >
          <a href="#contact" className="btn-primary h-12 px-6">
            Discuss a project
          </a>
        </SectionHeading>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={(i % 2) * 0.08}
              className={`spotlight card flex flex-col rounded-[1.75rem] p-7 sm:p-9 ${i === 0 || i === 3 ? 'lg:col-span-7' : 'lg:col-span-5'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-glow" style={{ backgroundImage: 'var(--grad-brand)' }}>
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-mono text-[0.75rem] text-fg-muted">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-7 text-[clamp(1.35rem,2.2vw,1.75rem)] font-extrabold tracking-[-0.02em]">{s.title}</h3>
              <dl className="mt-5 grid gap-4 text-caption">
                <div>
                  <dt className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted">When you need it</dt>
                  <dd className="mt-1 text-fg-secondary">{s.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted">What you get</dt>
                  <dd className="mt-1 text-fg">{s.deliverable}</dd>
                </div>
              </dl>
              <p className="mt-auto pt-6 text-[0.8125rem] text-fg-secondary">
                <span className="font-semibold text-accent-fg">Shipped in:</span> {s.proof}
              </p>
            </Reveal>
          ))}
        </ul>

        <Process />
      </div>
    </section>
  );
}
