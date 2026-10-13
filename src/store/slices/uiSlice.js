import { createSlice } from '@reduxjs/toolkit';

// App-wide UI that several components open or read: the command palette and
// the project case-study dialog.
const uiSlice = createSlice({
  name: 'ui',
  initialState: { paletteOpen: false, caseStudyId: null },
  reducers: {
    openPalette: (state) => {
      state.paletteOpen = true;
    },
    closePalette: (state) => {
      state.paletteOpen = false;
    },
    openCaseStudy: (state, action) => {
      state.caseStudyId = action.payload;
      state.paletteOpen = false;
    },
    closeCaseStudy: (state) => {
      state.caseStudyId = null;
    },
  },
});

export const { openPalette, closePalette, openCaseStudy, closeCaseStudy } = uiSlice.actions;
export default uiSlice.reducer;
