import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { systemThemeChanged, THEME_STORAGE_KEY } from '../store/slices/themeSlice';

const THEME_COLORS = { light: '#F7F8FC', dark: '#0B1020' };

/** Puts the theme on <html> and the browser chrome colour. Safe to call repeatedly. */
export function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark ? THEME_COLORS.dark : THEME_COLORS.light);
}

/** Keeps <html> in sync with the store, persists explicit choices and follows the OS setting. */
export function useThemeSync() {
  const dispatch = useAppDispatch();
  const { isDarkMode, source } = useAppSelector((s) => s.theme);

  useEffect(() => {
    applyTheme(isDarkMode);
    if (source === 'user') {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
      } catch {
        /* storage unavailable: the choice lasts for this visit only */
      }
    }
  }, [isDarkMode, source]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => dispatch(systemThemeChanged(event.matches));
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [dispatch]);
}
