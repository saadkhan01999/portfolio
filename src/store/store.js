import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    ui: uiSlice,
  },
});
