import { setBrowserTags } from "../pages/browse/store/actions";
import { API_URL, TAG_ROUTE } from "../config/api";
import { store } from "../store";
import { fetchJson } from "./fetchJson";

export const getTags = async () => {
  const res = await fetchJson(API_URL + TAG_ROUTE, "GET");

  if (res.status === 200) {
    const jsonRes = await res.json();
    const tags = jsonRes.body;

    store.dispatch(setBrowserTags(tags));

    return jsonRes;
  }

  return res.json();
};
