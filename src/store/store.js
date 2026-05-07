import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import portfolioSlice from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    portfolio: portfolioSlice,
  },
});
