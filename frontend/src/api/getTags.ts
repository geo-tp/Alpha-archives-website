import { setBrowserTags } from "./../features/browse/store/actions";
import { API_URL, TAG_ROUTE } from "../config/api";
import { store } from "../store";
import { HeadersManager } from "../utils/headers";

export const getTags = async () => {
  const headers = HeadersManager.getHeaders();
  const params = { headers, method: "GET" };

  const res = await fetch(API_URL + TAG_ROUTE, params);

  if (res.status === 200) {
    const jsonRes = await res.json();
    const tags = jsonRes.body;

    store.dispatch(setBrowserTags(tags));

    return jsonRes;
  }

  return res.json();
};
