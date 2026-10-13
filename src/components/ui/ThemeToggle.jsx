import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { toggleTheme } from '../../store/slices/themeSlice';

export default function ThemeToggle({ className = '' }) {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((s) => s.theme.isDarkMode);
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className={`icon-btn ${className}`}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
