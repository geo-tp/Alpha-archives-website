import { fetchJson } from "./fetchJson";
import { API_TAGS } from "./utils/endpoints";
import { API_URL } from "./utils/config";

export const fetchTags = () => {
  const url = API_URL + API_TAGS;

  return fetchJson(url);
};
