import { m } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download, MapPin } from 'lucide-react';
import profileJpg from '../../assets/profile.jpg';
import profileWebp from '../../assets/profile.webp';
import { profile, RESUME_URL } from '../../data/profile';
import { coreStack } from '../../data/skills';
import SocialLinks from '../ui/SocialLinks';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const FACTS = [
  { label: 'Full stack', value: 'React · Node.js · Express · MongoDB' },
  { label: 'Mobile', value: 'React Native with Expo' },
  { label: 'Education', value: 'MS / MPhil, Computer Science' },
  { label: 'Based in', value: 'Pakistan · UTC+5' },
];

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[var(--header-h)]">
      {/* Restrained backdrop: a soft wash and a faint grid that fades out. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_0%,rgb(var(--c-accent)/0.12),transparent_70%),radial-gradient(40%_40%_at_0%_30%,rgb(var(--c-accent-2)/0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--c-border))_1px,transparent_1px),linear-gradient(90deg,rgb(var(--c-border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="container-page grid items-center gap-x-12 gap-y-14 pb-16 pt-12 sm:pt-16 lg:min-h-[min(54rem,calc(100svh-var(--header-h)))] lg:grid-cols-12 lg:pb-20 lg:pt-10">
        <div className="min-w-0 lg:col-span-7">
          <m.p {...fadeUp(0)} className="mb-7 inline-flex items-center gap-2.5 rounded-2xl border xs:rounded-full border-line bg-surface/80 py-1.5 pl-2.5 pr-3.5 text-caption font-medium text-fg-secondary shadow-card">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-teal/30" />
              <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-teal" />
            </span>
            {profile.availability}
          </m.p>

          <h1 id="hero-title" className="text-display font-extrabold">
            <span className="block">Saad Bin</span>
            <span className="block">Saeed Khan</span>
            <span className="mt-5 block max-w-[22ch] text-[clamp(1.35rem,2.7vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-fg-secondary">
              {profile.role} building reliable web apps.
            </span>
          </h1>

          <m.p {...fadeUp(0.08)} className="mt-7 max-w-[36rem] text-lead text-fg-secondary">
            I design and build complete web products with React, Node.js, Express and MongoDB — from responsive,
            accessible interfaces to the APIs and data models behind them.
          </m.p>

          <m.div {...fadeUp(0.16)} className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
            <a href="#projects" className="btn-primary group">
              View my projects
              <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="btn-secondary">
              Let’s work together
            </a>
            <a href={RESUME_URL} download="Saad-Bin-Saeed-Khan-Resume.pdf" className="btn-ghost">
              <Download size={18} aria-hidden="true" />
              Résumé <span className="sr-only">(PDF)</span>
            </a>
          </m.div>

          <m.div {...fadeUp(0.24)} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <SocialLinks className="shrink-0 flex-nowrap" />
            <span className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
            <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.78rem] text-fg-muted" aria-label="Core stack">
              {coreStack.map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-line-strong">/</span>}
                  {s}
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        <m.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:col-span-5 lg:mr-0 lg:max-w-[24rem]"
        >
          <div className="rounded-[1.75rem] border border-line bg-surface p-2 shadow-lift">
            <picture>
              <source srcSet={profileWebp} type="image/webp" />
              <img
                src={profileJpg}
                width="343"
                height="477"
                alt="Portrait of Saad Bin Saeed Khan in a light grey suit"
                // React 18 only passes the lowercase attribute through without a warning.
                // eslint-disable-next-line react/no-unknown-property
                fetchpriority="high"
                decoding="async"
                className="aspect-[343/477] w-full rounded-[1.375rem] object-cover"
              />
            </picture>
          </div>

          <figcaption className="absolute -bottom-5 left-4 right-4 flex items-center gap-2 rounded-2xl border border-line bg-surface-elevated px-4 py-3 text-caption text-fg-secondary shadow-lift sm:-left-6 sm:right-auto sm:bottom-auto sm:top-8">
            <MapPin size={16} aria-hidden="true" className="shrink-0 text-accent-fg" />
            <span>
              Based in <strong className="font-semibold text-fg">{profile.location}</strong> · open to remote work
            </span>
          </figcaption>

          <a
            href="#project-feather-bone"
            className="group absolute -bottom-6 -right-3 hidden max-w-[13.5rem] rounded-2xl border border-line bg-surface-elevated p-4 shadow-lift transition-transform duration-300 hover:-translate-y-0.5 sm:block lg:-right-8"
          >
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-muted">Latest project</span>
            <span className="mt-1 flex items-center gap-1 font-display text-[1rem] font-bold text-fg">
              Feather &amp; Bone
              <ArrowUpRight size={16} aria-hidden="true" className="text-accent-fg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1 block text-[0.8125rem] leading-snug text-fg-secondary">
              Storefront, POS and kitchen display on one API
            </span>
          </a>
        </m.figure>
      </div>

      <div className="container-page">
        <dl className="grid grid-cols-1 border-b border-line xs:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="border-t border-line py-5 pr-4 xs:odd:pl-0 xs:even:border-l xs:even:pl-5 lg:[&:nth-child(3)]:border-l lg:[&:nth-child(3)]:pl-5"
            >
              <dt className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted">{f.label}</dt>
              <dd className="mt-1.5 font-medium text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
