import { browserReducer } from "../pages/browse/store/reducer";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/reducer";
import { userReducer } from "./slices/user/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer, // for token and permissions
    user: userReducer, // for user profile
    browser: browserReducer, // for browser state with lightbox, search, selected tags...
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
