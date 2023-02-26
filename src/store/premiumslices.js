import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name: "premium",
  initialState: { isPremium: false },
  reducers: {
    setPremium(state, action) {
      const data = action.payload;
      const total = data.total;
      if (total > 1000) {
        state.isPremium = true;
      } else if (total <= 1000) {
        state.isPremium = false;
      }
    },
  },
});

export const premiumActions = premiumSlice.actions;

export default premiumSlice;
