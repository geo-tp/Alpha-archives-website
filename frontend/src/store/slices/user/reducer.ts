import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS,
} from "./constants";
import { AnyAction } from "@reduxjs/toolkit";
import { userDefaultState } from "./state";

export const userReducer = (state = userDefaultState, action: AnyAction) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...userDefaultState,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...action.payload,
      };

    case GET_USER_PROFILE_ERROR:
      return {
        ...userDefaultState,
      };

    default:
      return state;
  }
};
