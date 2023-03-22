import { resetUserProfile } from "../store/slices/user/actions";
import { getDisconnectedSuccess } from "../store/slices/auth/actions";
import { store } from "../store/index";
import { API_URL, LOGOUT_ROUTE } from "../config/api";
import { HeadersManager } from "../utils/headers";

export const getLoggedOut = async () => {
  const headers = HeadersManager.getHeaders();
  const params = { method: "POST", headers };

  const res = await fetch(API_URL + LOGOUT_ROUTE, params);
  console.log("LOGOUT RES", res);
  store.dispatch(getDisconnectedSuccess());
  store.dispatch(resetUserProfile());

  return res.status;
};
