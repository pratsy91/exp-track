import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenseSlice";
import premiumSlice from "./premiumslices";
import themeSlice from "./themeSlice";
import userSlice from "./userDetailsilce";

const store = configureStore({
  reducer: {
    expenseReducer: expenseSlice.reducer,
    themeReducer: themeSlice.reducer,
    userReducer: userSlice.reducer,
    premiumReducer: premiumSlice.reducer,
  },
});

export default store;
