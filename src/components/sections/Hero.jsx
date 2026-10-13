import { useRef } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import profileJpg from '../../assets/profile.jpg';
import profileWebp from '../../assets/profile.webp';
import { heroWords, profile, RESUME_URL } from '../../data/profile';
import { projectById, projects } from '../../data/projects';
import { marquee, skillCount } from '../../data/skills';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openCaseStudy } from '../../store/slices/uiSlice';
import { BrowserFrame, PhoneFrame } from '../ui/DeviceFrames';
import { Aurora, CountUp, Marquee, WordRotator } from '../ui/Effects';
import SocialLinks from '../ui/SocialLinks';
import { paletteShortcut } from '../../lib/platform';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const STATS = [
  { value: projects.length, label: 'Projects built' },
  { value: 3, label: 'Business platforms built' },
  { value: skillCount, label: 'Technologies in the toolkit' },
  { value: null, display: '2023', label: 'Building for the web since' },
];

/** Layered, cursor-reactive composition of real product screens. */
function Showcase() {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const ksf = projectById['ksf-pharmacy'].visual;
  const fb = projectById['feather-bone'].visual;
  const adeena = projectById['adeena-traders'].visual;

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
    ref.current.style.setProperty('--ry', `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
  };
  const reset = () => {
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  };

  const open = (id) => () => dispatch(openCaseStudy(id));
  const layer = 'showcase-layer absolute block rounded-xl hover:z-20 focus-visible:z-20';

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className="relative [perspective:1800px]">
      <div
        className="showcase-3d relative mx-auto aspect-[10/9] w-full max-w-[40rem] transition-transform duration-500 ease-out [transform-style:preserve-3d]"
      >
        <button type="button" onClick={open('ksf-pharmacy')} aria-label="Open the KSF Pharmacy System case study" className={`${layer} right-0 top-[4%] w-[80%]`} style={{ '--z': '-40px' }}>
          <BrowserFrame image={ksf.windows[0]} label="KSF Pharmacy System" sizes="(min-width: 1024px) 520px, 80vw" />
        </button>
        <button type="button" onClick={open('feather-bone')} aria-label="Open the Feather & Bone case study (featherbonepk.com)" className={`${layer} bottom-[6%] left-0 w-[72%]`} style={{ '--z': '30px' }}>
          <BrowserFrame image={fb.windows[0]} label="featherbonepk.com" dark sizes="(min-width: 1024px) 460px, 72vw" />
        </button>
        <button type="button" onClick={open('adeena-traders')} aria-label="Open the Adeena Traders case study" className={`${layer} bottom-0 right-[3%] w-[25%] rounded-[2rem]`} style={{ '--z': '90px' }}>
          <PhoneFrame image={adeena.phones[0]} className="float-slow" />
        </button>

        <span aria-hidden="true" className="glass absolute right-[6%] top-0 hidden items-center gap-2 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold text-fg shadow-lift sm:inline-flex" style={{ transform: 'translateZ(120px)' }}>
          <span className="h-2 w-2 rounded-full bg-[#10B981]" /> SaaS · 2 apps in one
        </span>
        <span aria-hidden="true" className="glass absolute bottom-[1%] left-[6%] hidden items-center gap-2 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold text-fg shadow-lift sm:inline-flex" style={{ transform: 'translateZ(140px)' }}>
          <span className="relative h-2 w-2 rounded-full bg-[#F5B21B] text-[#F5B21B] pulse-dot" /> Live · featherbonepk.com
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="noise relative isolate overflow-hidden pt-[var(--header-h)]">
      <Aurora className="-z-10" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-70" />

      <div className="container-page grid items-center gap-x-10 gap-y-14 pb-14 pt-10 sm:pt-14 lg:min-h-[min(56rem,calc(100svh-var(--header-h)))] lg:grid-cols-12 lg:pb-16 lg:pt-6">
        <div className="relative z-10 min-w-0 lg:col-span-6">
          <m.p {...fadeUp(0)} className="glass mb-8 inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-caption font-medium text-fg-secondary shadow-card">
            <picture>
              <source srcSet={profileWebp} type="image/webp" />
              <img src={profileJpg} alt="" width="343" height="477" className="h-8 w-8 rounded-full object-cover object-top" />
            </picture>
            <span className="relative h-2 w-2 rounded-full bg-teal text-teal pulse-dot" aria-hidden="true" />
            {profile.availability}
          </m.p>

          <h1 id="hero-title">
            <span className="block font-sans text-[clamp(1rem,1.5vw,1.2rem)] font-semibold tracking-normal text-fg-secondary">
              {profile.name} <span className="text-fg-muted">·</span> {profile.role}
            </span>
            <span className="mt-4 block text-[clamp(2.1rem,4.7vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.045em]">
              I build
              <br />
              <WordRotator words={heroWords} />
              <span className="sr-only">web products</span>
              <br />
              that businesses run{'\u00A0'}on.
            </span>
          </h1>

          <m.p {...fadeUp(0.08)} className="mt-7 max-w-[36rem] text-lead text-fg-secondary">
            Custom software, web apps and websites for businesses — from an instalment & retail system and a pharmacy SaaS
            to a restaurant platform that’s live today. Designed, built and shipped end to end, and responsive on every screen.
          </m.p>

          <m.div {...fadeUp(0.16)} className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
            <a href="#work" className="btn-primary group h-12 px-6">
              Explore my work
              <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn-secondary h-12 px-6">
              <Sparkles size={17} aria-hidden="true" />
              Start a project
            </a>
            <a href={RESUME_URL} download="Saad-Bin-Saeed-Khan-Resume.pdf" className="btn-ghost h-12">
              <Download size={18} aria-hidden="true" />
              Résumé <span className="sr-only">(PDF)</span>
            </a>
          </m.div>

          <m.div {...fadeUp(0.24)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <SocialLinks className="flex-nowrap" />
            <p className="hidden items-center gap-2 text-caption text-fg-muted [@media(pointer:fine)]:flex">
              Press <kbd className="kbd">{paletteShortcut}</kbd> to explore
            </p>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 lg:col-span-6"
        >
          <Showcase />
        </m.div>
      </div>

      <div className="container-page">
        <dl className="glass grid grid-cols-2 overflow-hidden rounded-3xl shadow-card lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col p-5 sm:p-7 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <dt className="order-2 mt-1 text-caption text-fg-secondary">{s.label}</dt>
              <dd className="order-1 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-none tracking-[-0.04em]">
                {s.value === null ? <span className="text-gradient">{s.display}</span> : <CountUp value={s.value} className="text-gradient" />}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Marquee items={marquee} className="mt-14 border-y border-line bg-surface/40 py-5 backdrop-blur-sm" />
    </section>
  );
}
