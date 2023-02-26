import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    setUser(state, action) {
      const data = action.payload;
      state.user = data.user;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
