import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_TAGS } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchCreateTag = (tagName) => {
  let url = API_URL + API_TAGS + "/";
  let params = parametersFormater("POST", { name: tagName });

  return fetchJson(url, params);
};
