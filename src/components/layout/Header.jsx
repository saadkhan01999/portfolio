import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { navItems, profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openPalette } from '../../store/slices/uiSlice';
import Logo from '../ui/Logo';
import SocialLinks from '../ui/SocialLinks';
import ThemeToggle from '../ui/ThemeToggle';
import { isMac, paletteShortcut } from '../../lib/platform';

const SECTION_IDS = ['home', ...navItems.map((n) => n.id)];

export default function Header() {
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);
  const navRef = useRef(null);
  const [indicator, setIndicator] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Slide the highlight pill under the active link.
  useLayoutEffect(() => {
    const measure = () => {
      const link = navRef.current?.querySelector(`a[href="#${active}"]`);
      setIndicator(link ? { left: link.offsetLeft, width: link.offsetWidth } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Mobile menu: lock page scroll, close on Escape, keep Tab inside the header,
  // and close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a, button')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') return closeMenu();
      if (e.key !== 'Tab') return undefined;
      const focusables = [
        menuButtonRef.current,
        ...(panelRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? []),
      ].filter(Boolean);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return undefined;
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => desktop.matches && closeMenu(false);

    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen, closeMenu]);

  const solid = scrolled || menuOpen;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3" style={{ paddingInline: 'var(--gutter)' }}>
      <div
        className={`pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-full border pl-2 pr-1.5 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-3 ${
          solid ? 'border-line/80 bg-surface/75 shadow-lift backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <a href="#home" className="flex min-h-[2.75rem] min-w-0 items-center gap-2.5 rounded-full pr-2 text-fg" onClick={() => setMenuOpen(false)}>
          <Logo className="h-9 w-9 shrink-0" />
          <span className="truncate font-display text-[0.9375rem] font-bold tracking-tight">
            <span className="xl:hidden">{profile.compactName}</span>
            <span className="hidden xl:inline">{profile.name}</span>
          </span>
        </a>

        <nav ref={navRef} aria-label="Primary" className="relative hidden lg:block">
          {indicator && (
            <span
              aria-hidden="true"
              className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-accent-subtle transition-[transform,width] duration-300 ease-out"
              style={{ width: indicator.width, transform: `translate(${indicator.left}px, -50%)` }}
            />
          )}
          <ul className="relative flex items-center">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative inline-flex min-h-[2.75rem] items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-fg-secondary hover:text-fg'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => dispatch(openPalette())}
            className="icon-btn md:w-auto md:gap-2 md:px-3.5"
            aria-label={`Search ${paletteShortcut}`}
            aria-haspopup="dialog"
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
          >
            <Search size={17} aria-hidden="true" />
            <span className="hidden text-[0.875rem] md:inline">Search</span>
            <kbd className="kbd hidden md:inline-flex">{paletteShortcut}</kbd>
          </button>
          <ThemeToggle />
          <a href="#contact" className="btn-primary hidden h-11 lg:inline-flex">
            Let’s talk
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <m.div
              key="backdrop"
              className="pointer-events-auto fixed inset-0 -z-10 bg-bg/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={() => closeMenu(false)}
              aria-hidden="true"
            />
            <m.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              className="pointer-events-auto mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-6xl overflow-y-auto rounded-3xl border border-line bg-surface p-3 shadow-overlay lg:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <nav aria-label="Mobile">
                <ul className="grid gap-1 sm:grid-cols-2">
                  {navItems.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={active === item.id ? 'true' : undefined}
                        onClick={() => closeMenu(false)}
                        className={`flex min-h-[3.25rem] items-center gap-3 rounded-2xl px-4 font-display text-[1.125rem] font-semibold transition-colors ${
                          active === item.id ? 'bg-accent-subtle text-fg' : 'text-fg-secondary hover:bg-surface-sunken hover:text-fg'
                        }`}
                      >
                        <span className="font-mono text-[0.75rem] text-accent-fg">{String(i + 1).padStart(2, '0')}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-col gap-4 border-t border-line px-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <a href="#contact" className="btn-primary w-full sm:w-auto" onClick={() => closeMenu(false)}>
                    Let’s work together
                  </a>
                  <SocialLinks />
                </div>
              </nav>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
