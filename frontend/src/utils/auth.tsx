import { Navigate } from "react-router-dom";
import { getLoggedOut } from "../api/getLoggedOut";
import { getProfile } from "../api/getProfile";
import {
  getConnectedError,
  getConnectedSuccess,
} from "../store/slices/auth/actions";
import { CookieManager } from "./cookie";
import { HeadersManager } from "./headers";

export const restoreSavedAuth = async (dispatch: Function) => {
  const authData = CookieManager.retrieveAuthData();

  if (authData) {
    if (authData.expired) {
      // We send a logout request (it will delete cookie and auth)
      dispatch(getLoggedOut());
    } else {
      const token = authData.token;
      const isStaff = authData.isStaff;
      const isAdmin = authData.isAdmin;
      HeadersManager.addAuthorization(token);
      CookieManager.setAuthData(token, isStaff, isAdmin);

      const response = await getProfile();

      if (response?.status !== 200) {
        dispatch(getConnectedError());
      }

      // We login user if data from cookie exists and are not expired
      dispatch(getConnectedSuccess(authData));
    }
  }
};

export function RequireAuth(props: {
  children: JSX.Element;
  auth: { isConnected: boolean };
}) {
  return props.auth.isConnected ? props.children : <Navigate to="/login" />;
}
