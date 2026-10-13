import { useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * Screenshot with a stable aspect ratio (no layout shift), lazy loading and a
 * designed fallback when the file is missing or fails to load.
 */
export default function ProjectImage({ image, title, sizes, eager = false, className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(false);
  const portrait = image?.orientation === 'portrait';

  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-surface-sunken ${className}`}>
      {image && !failed ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full ${portrait ? 'object-contain py-4' : 'object-cover object-top'} ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-fg-muted">
          <ImageOff size={24} aria-hidden="true" />
          <span className="font-display text-[1rem] font-semibold text-fg-secondary">{title}</span>
          <span className="text-caption">Preview not available</span>
        </div>
      )}
    </div>
  );
}
