import { Moon, Sun } from 'lucide-react';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { useToggleTheme } from '../../hooks/useToggleTheme';

export default function ThemeToggle({ className = '' }) {
  const isDark = useAppSelector((s) => s.theme.isDarkMode);
  const toggle = useToggleTheme();
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      className={`icon-btn ${className}`}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
