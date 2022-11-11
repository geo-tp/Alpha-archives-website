import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_BASE, API_MODEL_TAGS } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchUpdateTag = (tag, newName) => {
  const url = API_URL + API_BASE + API_MODEL_TAGS + "/" + tag + "/";
  const params = parametersFormater("PUT", { name: newName });

  return fetchJson(url, params);
};
