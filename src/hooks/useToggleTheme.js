import { flushSync } from 'react-dom';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { applyTheme } from './useThemeSync';
import { toggleTheme } from '../store/slices/themeSlice';

/**
 * Light/dark switch. Where the View Transitions API exists, the new theme
 * spreads out as a circle from the button; otherwise colours cross-fade.
 */
export function useToggleTheme() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((s) => s.theme.isDarkMode);

  return (origin) => {
    const next = !isDark;
    const commit = () => {
      flushSync(() => dispatch(toggleTheme()));
      applyTheme(next);
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) {
      const root = document.documentElement;
      if (!reduce) root.classList.add('theme-transition');
      commit();
      window.setTimeout(() => root.classList.remove('theme-transition'), 300);
      return;
    }
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(commit);
    transition.ready
      .then(() =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        ),
      )
      .catch(() => {});
  };
}
