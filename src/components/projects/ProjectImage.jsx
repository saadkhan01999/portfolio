import { useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * Image in a frame of fixed aspect ratio (no layout shift), lazy loaded, with a
 * designed fallback. The frame defaults to the image's own ratio; when a
 * different `aspect` is forced (e.g. in a carousel), images of another shape
 * are letterboxed instead of cropped. `compact` shrinks the fallback to an icon
 * for thumbnails.
 */
export default function ProjectImage({ image, title, sizes, aspect, eager = false, compact = false, className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(false);
  const own = image ? image.width / image.height : 1.6;
  const frame = aspect ?? own;
  const fits = Math.abs(frame - own) < 0.02;

  return (
    <div className={`relative overflow-hidden bg-surface-sunken ${className}`} style={{ aspectRatio: frame }}>
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
          className={`h-full w-full ${fits ? 'object-cover object-top' : 'object-contain p-3'} ${imgClassName}`}
        />
      ) : compact ? (
        <div className="flex h-full w-full items-center justify-center text-fg-muted">
          <ImageOff size={20} aria-hidden="true" />
          <span className="sr-only">Preview not available</span>
        </div>
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
