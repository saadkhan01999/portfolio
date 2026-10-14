import { ArrowRight, Check } from 'lucide-react';
import { contact, process, profile, promises, services } from '../../data/profile';
import { panelBackground } from '../../lib/panel';
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

// Fixed dark panel so white text keeps its contrast in both themes.
const CTA_THEME = { from: '#0B1020', via: '#1E1B4B', to: '#4338CA', glow: '#A855F7' };

/** Strong call to action that closes the section. */
function ServicesCta() {
  return (
    <Reveal className="noise relative mt-24 overflow-hidden rounded-[2rem] px-6 py-12 text-white shadow-overlay ring-1 ring-white/10 sm:px-12 sm:py-14" style={panelBackground(CTA_THEME)}>
      <div aria-hidden="true" className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-[#14B8A6]/30 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(70%_80%_at_85%_10%,black,transparent)]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
            Have a business to grow or an idea to launch?
          </h3>
          <p className="mt-3 text-[1.0625rem] text-white/85">
            Tell me what you need — I’ll reply {profile.replyWindow} with a clear plan, timeline and quote. No jargon, no obligation.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 xs:flex-row">
          <a href="#contact" data-magnetic className="btn-light group h-12 px-6">
            Start your project
            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-on-dark h-12 px-6">
            <Icon name="whatsapp" size={18} />
            WhatsApp me
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="defer-render section relative overflow-hidden border-y border-line bg-surface-sunken/50">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/2 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-40 h-[28rem] w-[28rem] rounded-full bg-teal/10 blur-3xl" />
      <div className="container-page relative">
        <SectionHeading
          id="services-title"
          index="02"
          eyebrow="Services"
          title={
            <>
              Websites &amp; software that <span className="text-gradient">grow your business.</span>
            </>
          }
          intro="Shop, restaurant, pharmacy, clinic, school, agency or startup — whatever you run, I build it custom, fast and mobile-responsive, ready to win you customers. Every service below is one I have already shipped in a real product."
        >
          <a href="#contact" data-magnetic className="btn-primary h-12 px-6">
            Get a free quote
          </a>
        </SectionHeading>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={(i % 3) * 0.06}
              className={`spotlight card group relative flex flex-col overflow-hidden rounded-[1.75rem] p-7 sm:p-8 ${s.featured ? 'lg:col-span-6' : 'lg:col-span-4'}`}
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundImage: 'var(--grad-brand)' }} />
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ backgroundImage: 'var(--grad-brand)' }}>
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-mono text-[0.75rem] text-fg-muted">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={`mt-6 font-extrabold tracking-[-0.02em] ${s.featured ? 'text-[clamp(1.5rem,2.4vw,2rem)]' : 'text-[clamp(1.3rem,1.9vw,1.5rem)]'}`}>{s.title}</h3>
              <p className={`mt-2 text-fg ${s.featured ? 'text-[1.0625rem]' : ''}`}>{s.pitch}</p>
              <ul className="mt-5 grid gap-2.5 text-caption text-fg-secondary">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5">
                    <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-fg" />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-[0.8125rem] text-fg-secondary">
                <span className="font-semibold text-accent-fg">Shipped in:</span> {s.proof}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <h3 className="text-center font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-fg-muted">Included in every project</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <li key={p.title} className="glass flex gap-4 rounded-2xl p-5 shadow-card">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent-fg">
                  <Icon name={p.icon} size={20} />
                </span>
                <div>
                  <p className="font-display font-bold text-fg">{p.title}</p>
                  <p className="mt-0.5 text-caption text-fg-secondary">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Process />
        <ServicesCta />
      </div>
    </section>
  );
}
