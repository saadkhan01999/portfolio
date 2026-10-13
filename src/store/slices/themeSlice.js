import { createSlice } from '@reduxjs/toolkit';

// The inline script in index.html applies the theme before first paint using
// the same key, so there is no flash of the wrong theme. This slice keeps React
// in sync with it; side effects (class, storage) live in useThemeSync.
export const THEME_STORAGE_KEY = 'theme';

export const readStoredTheme = () => {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null; // storage blocked (private mode, disabled cookies)
  }
};

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;

const initialState = () => {
  const stored = readStoredTheme();
  return {
    isDarkMode: stored ? stored === 'dark' : Boolean(systemPrefersDark()),
    // 'system' follows the OS setting live; 'user' is an explicit override.
    source: stored ? 'user' : 'system',
  };
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.source = 'user';
    },
    systemThemeChanged: (state, action) => {
      if (state.source === 'system') state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, systemThemeChanged } = themeSlice.actions;
export default themeSlice.reducer;
