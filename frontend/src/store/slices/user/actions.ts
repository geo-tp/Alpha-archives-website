import { UserType } from "../../../types";
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS,
  RESET_USER_PROFILE,
} from "./constants";

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
  payload: {},
});

export const getUserProfileSuccess = (user: UserType) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: user,
});

export const getUserProfileError = () => ({
  type: GET_USER_PROFILE_ERROR,
  payload: {},
});

export const resetUserProfile = () => ({
  type: RESET_USER_PROFILE,
  payload: {},
});
