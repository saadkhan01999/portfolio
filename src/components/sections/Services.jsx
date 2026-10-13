import { process, services } from '../../data/profile';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section border-y border-line bg-surface-sunken/60">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="How I can help with your next project."
        >
          <a href="#contact" className="btn-primary">
            Discuss a project
          </a>
        </SectionHeading>

        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 2) * 0.06} className="card flex flex-col p-7 sm:p-8">
              <span className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-accent-fg">
                <Icon name={s.icon} size={20} />
              </span>
              <h3 className="text-h3">{s.title}</h3>
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
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-20">
          <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em]">How a project runs</h3>
          <p className="mt-2 max-w-prose text-fg-secondary">
            A simple, transparent process — you always know what is being built and why.
          </p>
        </Reveal>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} delay={(i % 3) * 0.05} className="bg-surface p-6">
              <span className="font-mono text-[0.75rem] text-accent-fg">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="mt-3 font-display text-[1.0625rem] font-bold">{step.title}</h4>
              <p className="mt-2 text-caption text-fg-secondary">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
