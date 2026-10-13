import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems, profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import Logo from '../ui/Logo';
import SocialLinks from '../ui/SocialLinks';
import ThemeToggle from '../ui/ThemeToggle';

const SECTION_IDS = navItems.map((n) => n.id);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  // No backdrop-filter while the menu is open: it would become the containing
  // block for the fixed backdrop and stop it covering the page.
  const surface = menuOpen
    ? 'border-line bg-bg'
    : scrolled
      ? 'border-line bg-bg/85 shadow-card backdrop-blur-md supports-[backdrop-filter]:bg-bg/75'
      : 'border-transparent';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${surface}`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <a href="#home" className="group flex min-h-[2.75rem] min-w-0 items-center gap-3 rounded-lg text-fg" onClick={() => setMenuOpen(false)}>
          <Logo className="h-10 w-10 shrink-0" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-[1rem] font-bold tracking-tight">
              <span className="xs:hidden">{profile.compactName}</span>
              <span className="hidden xs:inline">{profile.name}</span>
            </span>
            <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-muted xs:block">
              {profile.role}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative inline-flex min-h-[2.75rem] items-center rounded-lg px-3.5 text-[0.9375rem] font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-fg-secondary hover:text-fg'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 bottom-1.5 h-0.5 origin-center rounded-full bg-accent transition-transform duration-300 ease-out ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="btn-primary hidden lg:inline-flex">
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
              className="fixed inset-0 top-[var(--header-h)] -z-10 bg-bg/60 backdrop-blur-sm lg:hidden"
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
              className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-line bg-bg lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <nav aria-label="Mobile" className="container-page py-4">
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={active === item.id ? 'true' : undefined}
                        onClick={() => closeMenu(false)}
                        className={`flex min-h-[3rem] items-center justify-between rounded-control px-3 font-display text-[1.125rem] font-semibold transition-colors ${
                          active === item.id ? 'bg-accent-subtle text-fg' : 'text-fg-secondary hover:bg-surface hover:text-fg'
                        }`}
                      >
                        {item.label}
                        {active === item.id && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
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
