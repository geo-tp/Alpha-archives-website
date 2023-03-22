import { browserReducer } from "./../features/browse/store/reducer";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/reducer";
import { userReducer } from "./slices/user/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    browser: browserReducer,
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
