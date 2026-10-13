import { useEffect } from 'react';
import { closePalette, openPalette } from '../store/slices/uiSlice';
import { useAppDispatch, useAppSelector } from './useAppDispatch';

const isTyping = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** ⌘K / Ctrl+K toggles the command palette; "/" opens it when not typing. */
export function usePaletteShortcut() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.paletteOpen);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch(open ? closePalette() : openPalette());
      } else if (e.key === '/' && !open && !isTyping(document.activeElement)) {
        e.preventDefault();
        dispatch(openPalette());
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dispatch, open]);
}
