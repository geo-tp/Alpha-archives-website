import {
  getConnected,
  getConnectedSuccess,
  getConnectedError,
  getDisconnectedSuccess,
} from "../store/slices/auth/actions";
import { API_URL, LOGIN_ROUTE } from "../config/api";
import { HeadersManager } from "../utils/headers";
import { CookieManager } from "../utils/cookie";
import { store } from "../store";

export const getLoggedIn = async (variables: {
  username: string;
  password: string;
}) => {
  const username = variables.username;
  const password = variables.password;

  const headers = HeadersManager.getHeaders();
  const params = {
    headers,
    method: "POST",
    body: JSON.stringify({ username, password }),
  };

  try {
    store.dispatch(getConnected(username, password));

    const res = await fetch(API_URL + LOGIN_ROUTE, params);

    if (res.status === 401) {
      CookieManager.deleteAuthData();
      HeadersManager.removeAuthorization();
      store.dispatch(getDisconnectedSuccess());
    }

    if (res.status === 200) {
      const json_res = await res.json();
      store.dispatch(getConnectedSuccess(json_res.body));
    }

    return res.status;
  } catch (error) {
    store.dispatch(getConnectedError());
  }
};
