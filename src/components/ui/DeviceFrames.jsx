/** Desktop browser window around a screenshot. */
export function BrowserFrame({ image, label, className = '', dark = false, sizes = '(min-width: 1024px) 640px, 90vw', eager = false }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-overlay ${
        dark ? 'border-white/15 bg-[#0F1422]' : 'border-line bg-surface'
      } ${className}`}
    >
      <div className={`flex h-7 items-center gap-1.5 border-b px-3 ${dark ? 'border-white/10' : 'border-line'}`} aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        {label && (
          <span className={`mx-auto max-w-[60%] truncate rounded-full px-3 py-0.5 font-mono text-[0.625rem] ${dark ? 'bg-white/10 text-white/70' : 'bg-surface-sunken text-fg-muted'}`}>
            {label}
          </span>
        )}
      </div>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

/** Phone with a notch around a portrait screenshot. */
export function PhoneFrame({ image, className = '', eager = false }) {
  return (
    <div className={`rounded-[2rem] border border-white/15 bg-[#050505] p-1.5 shadow-overlay ${className}`}>
      <div className="relative overflow-hidden rounded-[1.6rem] bg-[#0B0B0C] pt-5">
        <span aria-hidden="true" className="absolute left-1/2 top-1.5 h-3 w-14 -translate-x-1/2 rounded-full bg-black" />
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 200px, 30vw"
          width={image.width}
          height={image.height}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
