// Keyboard-shortcut label for the command palette (⌘K on Apple devices, Ctrl K elsewhere).
export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
export const paletteShortcut = isMac ? '⌘K' : 'Ctrl K';
