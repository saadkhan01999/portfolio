import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { systemThemeChanged, THEME_STORAGE_KEY } from '../store/slices/themeSlice';

const THEME_COLORS = { light: '#F7F8FC', dark: '#0B1020' };

/** Applies the theme to <html>, persists explicit choices and follows the OS setting. */
export function useThemeSync() {
  const dispatch = useAppDispatch();
  const { isDarkMode, source } = useAppSelector((s) => s.theme);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    const animate =
      !isFirstRun.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isFirstRun.current = false;

    let timer;
    if (animate) {
      root.classList.add('theme-transition');
      timer = window.setTimeout(() => root.classList.remove('theme-transition'), 300);
    }
    root.classList.toggle('dark', isDarkMode);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light);

    if (source === 'user') {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
      } catch {
        /* storage unavailable: the choice lasts for this visit only */
      }
    }
    return () => window.clearTimeout(timer);
  }, [isDarkMode, source]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => dispatch(systemThemeChanged(event.matches));
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [dispatch]);
}
