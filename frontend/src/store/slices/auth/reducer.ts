import { AnyAction } from "@reduxjs/toolkit";
import { CookieManager } from "../../../utils/cookie";
import { HeadersManager } from "../../../utils/headers";
import {
  GET_CONNECTED,
  GET_CONNECTED_ERROR,
  GET_CONNECTED_SUCCESS,
  GET_DISCONNECTED,
  GET_DISCONNECTED_ERROR,
  GET_DISCONNECTED_SUCCESS,
} from "./constants";
import { authDefaultState } from "./state";

export const authReducer = (state = authDefaultState, action: AnyAction) => {
  switch (action.type) {
    case GET_CONNECTED:
      return {
        ...state,
        isConnected: false,
        token: false,
        isError: false,
      };

    case GET_CONNECTED_SUCCESS:
      const token = action.payload.loginInfos.token;
      const isStaff = action.payload.loginInfos.isStaff;
      const isAdmin = action.payload.loginInfos.isAdmin;
      HeadersManager.addAuthorization(token);
      CookieManager.setAuthData(token, isStaff, isAdmin);

      return {
        ...state,
        isConnected: true,
        ...action.payload.loginInfos,
      };

    case GET_CONNECTED_ERROR:
      return {
        ...state,
        isConnected: false,
        token: null,
      };

    case GET_DISCONNECTED:
      return {
        ...state,
      };

    case GET_DISCONNECTED_SUCCESS:
      HeadersManager.removeAuthorization();
      CookieManager.deleteAuthData();
      return {
        ...authDefaultState,
      };

    case GET_DISCONNECTED_ERROR:
      HeadersManager.removeAuthorization();
      CookieManager.deleteAuthData();

      return {
        ...authDefaultState,
      };

    default:
      return state;
  }
};
