import Reveal from './Reveal';

export default function SectionHeading({ id, eyebrow, title, intro, align = 'left', children }) {
  const centered = align === 'center';
  return (
    <Reveal
      className={`mb-12 flex flex-col gap-4 md:mb-16 ${centered ? 'items-center text-center' : ''} ${
        children ? 'lg:flex-row lg:items-end lg:justify-between lg:gap-12' : ''
      }`}
    >
      <div className={`max-w-3xl ${centered ? 'mx-auto' : ''}`}>
        <p className="eyebrow mb-4">
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-h2">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-prose text-lead text-fg-secondary">{intro}</p>}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </Reveal>
  );
}
