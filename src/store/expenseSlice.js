import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: { expenses: [] },
  reducers: {
    setExpenses(state, action) {
      const data = action.payload;
      state.expenses = data.expenses;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
