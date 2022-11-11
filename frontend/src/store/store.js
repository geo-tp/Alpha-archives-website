import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/reducer";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
