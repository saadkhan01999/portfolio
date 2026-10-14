import { m } from 'framer-motion';
import Reveal from './Reveal';

const RISE = { hidden: { y: '108%' }, shown: { y: '0%' } };

/** Section title block: numbered eyebrow, display heading, optional intro and actions. */
export default function SectionHeading({ id, index, eyebrow, title, intro, align = 'left', children }) {
  const centered = align === 'center';
  return (
    <Reveal
      className={`mb-14 flex flex-col gap-5 md:mb-20 ${centered ? 'items-center text-center' : ''} ${
        children ? 'lg:flex-row lg:items-end lg:justify-between lg:gap-12' : ''
      }`}
    >
      <div className={`max-w-4xl ${centered ? 'mx-auto' : ''}`}>
        <p className="eyebrow mb-5">
          {index && <span className="text-fg-muted">{index}</span>}
          <span className="h-px w-8 bg-gradient-to-r from-accent to-teal" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.04em]">
          {/* The title rises out of a mask; padding keeps descenders and gradient text unclipped.
              The mask itself is observed: the hidden title inside it never counts as "in view". */}
          <m.span
            className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          >
            <m.span className="block" variants={RISE} transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}>
              {title}
            </m.span>
          </m.span>
        </h2>
        {intro && <p className={`mt-6 max-w-2xl text-lead text-fg-secondary ${centered ? 'mx-auto' : ''}`}>{intro}</p>}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </Reveal>
  );
}
