import Reveal from './Reveal';

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
          {title}
        </h2>
        {intro && <p className={`mt-6 max-w-2xl text-lead text-fg-secondary ${centered ? 'mx-auto' : ''}`}>{intro}</p>}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </Reveal>
  );
}
