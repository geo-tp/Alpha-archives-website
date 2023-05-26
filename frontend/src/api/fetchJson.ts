import { CookieManager } from "../utils/cookie";
import { HeadersManager } from "../utils/headers";
import { store } from "../store";
import { getDisconnectedSuccess } from "../store/slices/auth/actions";

export const fetchJson = async (
  url: string,
  method: string,
  body: Object | null = null
) => {
  const headers = HeadersManager.getHeaders();

  const params: RequestInit = {
    headers,
    method,
  };

  if (body) {
    params["body"] = JSON.stringify(body);
  }

  const res = await fetch(url, params);

  if (res.status === 401) {
    CookieManager.deleteAuthData();
    HeadersManager.removeAuthorization();
    store.dispatch(getDisconnectedSuccess());
  }

  return res;
};
