import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, emailsent: false },
  reducers: {
    setUser(state, action) {
      const data = action.payload;
      state.user = data.user;
    },
    emailSent(state, action) {
      const data = action.payload;
      state.emailsent = data.flag;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
