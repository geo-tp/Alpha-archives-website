import { HeadersManager } from "../../../api/utils/headers";
import { CookieManager } from "../../../utils/CookieManager";
import {
  GET_CONNECTED,
  GET_CONNECTED_ERROR,
  GET_CONNECTED_SUCCESS,
  GET_DISCONNECTED,
  GET_DISCONNECTED_ERROR,
  GET_DISCONNECTED_SUCCESS,
} from "./constants";
import { authDefaultState } from "./state";

export const authReducer = (state = authDefaultState, action) => {
  switch (action.type) {
    case GET_CONNECTED:
      return {
        ...state,
        isLoading: true,
        isConnected: false,
        token: false,
        isError: false,
      };

    case GET_CONNECTED_SUCCESS:
      const token = action.payload.loginInfos.token;
      const isStaff = action.payload.loginInfos.isStaff;
      const isAdmin = action.payload.loginInfos.isAdmin;
      HeadersManager.addAuthorization(token);
      CookieManager.setUserData(token, isStaff, isAdmin);

      return {
        ...state,
        isLoading: false,
        isError: false,
        isConnected: true,
        ...action.payload.loginInfos,
      };

    case GET_CONNECTED_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isConnected: false,
        token: null,
      };

    case GET_DISCONNECTED:
      return {
        ...state,
        isLoading: true,
      };

    case GET_DISCONNECTED_SUCCESS:
      HeadersManager.removeAuthorization();
      CookieManager.deleteUserData();
      return {
        ...authDefaultState,
      };

    case GET_DISCONNECTED_ERROR:
      HeadersManager.removeAuthorization();
      CookieManager.deleteUserData();

      return {
        ...authDefaultState,
      };

    default:
      return state;
  }
};
