import { resetUserProfile } from "../store/slices/user/actions";
import { getDisconnectedSuccess } from "../store/slices/auth/actions";
import { store } from "../store/index";
import { API_URL, LOGOUT_ROUTE } from "../config/api";
import { fetchJson } from "./fetchJson";

export const getLoggedOut = async () => {
  const res = await fetchJson(API_URL + LOGOUT_ROUTE, "POST");
  store.dispatch(getDisconnectedSuccess());
  store.dispatch(resetUserProfile());

  return res.status;
};
