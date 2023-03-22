import { API_URL, USER_PROFILE } from "../config/api";
import { HeadersManager } from "../utils/headers";
import { store } from "../store";
import {
  getUserProfile,
  getUserProfileError,
  getUserProfileSuccess,
} from "../store/slices/user/actions";

export const getProfile = async () => {
  const headers = HeadersManager.getHeaders();
  const params = { headers, method: "GET" };

  store.dispatch(getUserProfile);
  try {
    const res = await fetch(API_URL + USER_PROFILE, params);

    if (res.status === 200) {
      const json_res = await res.json();
      store.dispatch(getUserProfileSuccess(json_res.body));
    }

    return res;
  } catch {
    store.dispatch(getUserProfileError());
  }
};
