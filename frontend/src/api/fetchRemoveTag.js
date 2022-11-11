import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_BASE, API_MODEL_TAGS } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchRemoveTag = (name) => {
  let url = API_URL + API_BASE + API_MODEL_TAGS + "/" + name;
  let params = parametersFormater("DELETE");

  return fetchJson(url, params);
};
