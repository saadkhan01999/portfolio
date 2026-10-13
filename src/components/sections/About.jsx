import { Compass, Layers, ShieldCheck } from 'lucide-react';
import { education, profile } from '../../data/profile';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const PRINCIPLES = [
  {
    icon: Compass,
    title: 'Start from the real workflow',
    body: 'Before writing code I map who uses the product and what they need to get done — the customer ordering on a phone, the cashier at the till, the admin updating stock.',
  },
  {
    icon: Layers,
    title: 'Build in clear layers',
    body: 'Reusable React components, predictable state with Redux Toolkit or React Query, validated Express APIs and MongoDB schemas that match the domain.',
  },
  {
    icon: ShieldCheck,
    title: 'Leave it maintainable',
    body: 'Role-based access, tests for the critical paths, readable code and setup notes — so the product keeps working after hand-off.',
  },
];

const FACTS = [
  { term: 'Focus', detail: 'Full-stack web applications (MERN)' },
  { term: 'Also builds', detail: 'Mobile apps with React Native' },
  { term: 'Education', detail: `${education[0].credential}, ${education[0].institution} (${education[0].period})` },
  { term: 'Location', detail: `${profile.location} · open to remote work` },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="about-title"
          eyebrow="About"
          title="A developer who owns the whole feature — interface, API and data."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="space-y-6 text-lead text-fg-secondary lg:col-span-7">
            <p>
              I’m <strong className="font-semibold text-fg">{profile.name}</strong>, a full-stack web developer based in{' '}
              {profile.location}. I work across the MERN stack — React on the front end, Node.js and Express on the
              server, MongoDB for data — so a feature can go from screen to endpoint to database without hand-offs.
            </p>
            <p>
              My recent work ranges from a restaurant commerce suite with a storefront, point of sale and kitchen
              display, to admin dashboards, a learning-platform interface and a real-time mobile chat app. I care about
              interfaces that feel fast and obvious, and back ends that stay correct when real people use them.
            </p>
            <p>
              The projects I enjoy most have a clear problem, a client who wants to understand the trade-offs, and room
              to ship in small, working steps.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <dl className="card divide-y divide-line px-6 py-2">
              {FACTS.map((f) => (
                <div key={f.term} className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                  <dt className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted sm:pt-1">{f.term}</dt>
                  <dd className="font-medium text-fg">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: IconCmp, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="card p-7">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-accent-fg">
                <IconCmp size={20} aria-hidden="true" />
              </span>
              <h3 className="text-h3">{title}</h3>
              <p className="mt-3 text-fg-secondary">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
