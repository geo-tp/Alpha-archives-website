import { CookieManager } from "../utils/CookieManager";
import { HeadersManager } from "./utils/headers";
import store from "../store/store";
import { getDisconnectedSuccess } from "../store/features/auth/actions";

export const fetchJson = (url, params = {}) => {
  params["headers"] = HeadersManager.getHeaders();
  return fetch(url, params)
    .then((response) => {
      // Token is probably expired, so we delete it, no reason normal user can get a 401
      if (response.status === 401) {
        CookieManager.deleteUserData();
        store.dispatch(getDisconnectedSuccess());
      }
      return response.json();
    })
    .then((success) => {
      return success;
    })
    .catch((error) => {
      return error;
    });
};
