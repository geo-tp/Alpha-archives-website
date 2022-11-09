import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_FILES_BY_TAGS } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";
import { urlFormater } from "./utils/urlFormater";

export const fetchFilesByTags = (tags) => {
  let url = API_URL + API_FILES_BY_TAGS;

  let params = parametersFormater("POST", tags);

  return fetchJson(url, params);
};
