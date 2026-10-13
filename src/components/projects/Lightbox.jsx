import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Full-screen screenshot viewer on the native <dialog> element: the browser
 * provides the modal focus trap, inert background and Escape-to-close.
 * `state` is { images, index, title } or null.
 */
export default function Lightbox({ state, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const pointerStart = useRef(null);
  const open = Boolean(state);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement;
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return undefined;
  }, [open]);

  const handleClose = () => {
    document.documentElement.style.overflow = '';
    onClose();
    returnFocusRef.current?.focus?.();
  };

  const count = state?.images.length ?? 0;
  const index = state?.index ?? 0;
  const image = state?.images[index];
  const go = (delta) => count > 1 && onNavigate((index + delta + count) % count);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const onPointerDown = (e) => {
    pointerStart.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (pointerStart.current == null) return;
    const dx = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onKeyDown={onKeyDown}
      aria-labelledby="lightbox-title"
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-[rgb(5_8_18/0.9)] p-0 text-white backdrop-blur-sm backdrop:bg-transparent"
    >
      {image && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <h2 id="lightbox-title" className="min-w-0 truncate font-display text-[1rem] font-semibold text-white">
              {state.title}
              <span className="ml-3 font-mono text-[0.8125rem] font-normal text-white/70">
                {index + 1} / {count}
              </span>
            </h2>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-white"
              aria-label="Close screenshot viewer"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <figure
            className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-4 pb-4 sm:px-20"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
          >
            <img
              key={image.src}
              src={image.src}
              srcSet={image.srcSet}
              sizes="100vw"
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="max-h-[calc(100%-3.5rem)] w-auto max-w-full select-none rounded-xl object-contain shadow-overlay"
              draggable="false"
            />
            <figcaption className="text-center text-caption text-white/80">{image.caption}</figcaption>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                  className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-white sm:inline-flex"
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                  className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-white sm:inline-flex"
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </>
            )}
          </figure>

          {count > 1 && (
            <div className="flex items-center justify-center gap-3 pb-5 sm:hidden">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous screenshot"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next screenshot"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
