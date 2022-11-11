import { HeadersManager } from "../../../api/utils/headers";
import {
  GET_CONNECTED,
  GET_CONNECTED_ERROR,
  GET_CONNECTED_SUCCESS,
  GET_DISCONNECTED,
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
      HeadersManager.addAuthorization(token);

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
      HeadersManager.removeAuthorization();

      return {
        ...authDefaultState,
      };

    default:
      return state;
  }
};
