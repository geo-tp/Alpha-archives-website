import { API_URL, USER_PROFILE } from "../config/api";
import { store } from "../store";
import {
  getUserProfile,
  getUserProfileError,
  getUserProfileSuccess,
} from "../store/slices/user/actions";
import { fetchJson } from "./fetchJson";

export const getProfile = async () => {
  store.dispatch(getUserProfile);
  try {
    const res = await fetchJson(API_URL + USER_PROFILE, "GET");

    if (res.status === 200) {
      const json_res = await res.json();
      store.dispatch(getUserProfileSuccess(json_res.body));
    }

    return res;
  } catch {
    store.dispatch(getUserProfileError());
  }
};
