import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: false },
  reducers: {
    setTheme(state) {
      state.theme = !state.theme;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;
