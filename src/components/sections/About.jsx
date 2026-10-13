import { useEffect, useState } from 'react';
import { ArrowUpRight, Clock, Compass, Layers, MapPin, ShieldCheck } from 'lucide-react';
import profileJpg from '../../assets/profile.jpg';
import profileWebp from '../../assets/profile.webp';
import { education, profile } from '../../data/profile';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openCaseStudy } from '../../store/slices/uiSlice';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const PRINCIPLES = [
  {
    icon: Compass,
    title: 'Start from the real workflow',
    body: 'Before writing code I map who uses the product and what they need to get done — the customer ordering on a phone, the pharmacist at the till, the owner reading the accounts.',
  },
  {
    icon: Layers,
    title: 'Build in clear layers',
    body: 'Reusable React components, predictable state, validated Express APIs and MongoDB schemas that match the domain.',
  },
  {
    icon: ShieldCheck,
    title: 'Leave it maintainable',
    body: 'Role-based access, permissions checked on the server, tests for the critical paths and readable code — so the product keeps working after hand-off.',
  },
];

const localTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: profile.timeZone }).format(new Date());

/** The current time where Saad works, refreshed every 30 seconds. */
function LocalTime() {
  const [time, setTime] = useState(localTime);
  useEffect(() => {
    const id = window.setInterval(() => setTime(localTime()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <time className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-fg">{time}</time>;
}

export default function About() {
  const dispatch = useAppDispatch();

  return (
    <section id="about" aria-labelledby="about-title" className="defer-render section relative">
      <div className="container-page">
        <SectionHeading
          id="about-title"
          index="03"
          eyebrow="About"
          title={
            <>
              One developer for the <span className="text-gradient">whole feature</span> — interface, API and data.
            </>
          }
        />

        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="spotlight card relative overflow-hidden rounded-[1.75rem] p-2 lg:col-span-4 lg:row-span-2">
            <picture>
              <source srcSet={profileWebp} type="image/webp" />
              <img
                src={profileJpg}
                width="343"
                height="477"
                alt="Portrait of Saad Bin Saeed Khan in a light grey suit"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[1.4rem] object-cover object-top lg:aspect-auto lg:h-full"
              />
            </picture>
            <div className="glass absolute inset-x-5 bottom-5 rounded-2xl p-4 shadow-lift">
              <p className="font-display text-[1.125rem] font-bold text-fg">{profile.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-caption text-fg-secondary">
                <MapPin size={14} aria-hidden="true" className="text-accent-fg" /> {profile.location} · open to remote work
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="spotlight card rounded-[1.75rem] p-7 sm:p-9 lg:col-span-8">
            <div className="space-y-5 text-lead text-fg-secondary">
              <p>
                I’m <strong className="font-semibold text-fg">{profile.name}</strong>, a full-stack web developer based in {profile.location}. I
                work across the MERN stack — React and TypeScript on the front end, Node.js and Express on the server, MongoDB for data —
                so a feature goes from screen to endpoint to database without hand-offs.
              </p>
              <p>
                Lately that has meant <strong className="font-semibold text-fg">KSF</strong>, a multi-tenant pharmacy SaaS with its own super admin
                console, and <strong className="font-semibold text-fg">Feather &amp; Bone</strong>, a restaurant platform where the website, till and
                kitchen share one API. I like products with real rules, real users and room to ship in small, working steps.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="spotlight card flex flex-col justify-between gap-6 rounded-[1.75rem] p-7 lg:col-span-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted">Local time</span>
              <Clock size={18} aria-hidden="true" className="text-accent-fg" />
            </div>
            <div>
              <LocalTime />
              <p className="mt-1 text-caption text-fg-secondary">
                in {profile.location} ({profile.timeZoneLabel}). {profile.responseTime}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4">
            <button
              type="button"
              onClick={() => dispatch(openCaseStudy('feather-bone'))}
              className="spotlight group relative flex h-full w-full flex-col justify-between gap-6 overflow-hidden rounded-[1.75rem] p-7 text-left text-white shadow-card"
              style={{ backgroundImage: 'radial-gradient(80% 80% at 90% 0%, #F5B21B55, transparent 60%), linear-gradient(135deg, #120D06, #3A2709)' }}
            >
              <span className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-white/75">
                  <span className="relative h-2 w-2 rounded-full bg-[#F5B21B] text-[#F5B21B] pulse-dot" aria-hidden="true" /> Latest launch
                </span>
                <ArrowUpRight size={20} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span>
                <span className="block font-display text-[1.6rem] font-extrabold tracking-tight">Feather &amp; Bone</span>
                <span className="mt-1 block text-caption text-white/75">Live at featherbonepk.com — open the case study</span>
              </span>
            </button>
          </Reveal>

          {PRINCIPLES.map(({ icon: IconCmp, title, body }, i) => (
            <Reveal key={title} delay={0.05 * i} className="spotlight card rounded-[1.75rem] p-7 lg:col-span-4">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-accent-fg">
                <IconCmp size={20} aria-hidden="true" />
              </span>
              <h3 className="text-h3">{title}</h3>
              <p className="mt-3 text-fg-secondary">{body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-caption text-fg-muted">
          {education[0].credential} · {education[0].institution} ({education[0].period})
        </p>
      </div>
    </section>
  );
}
