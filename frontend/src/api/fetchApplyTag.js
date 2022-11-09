import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_APPLIED_TAGS, API_TAGS } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchApplyTag = (tagName, file_hash) => {
  const url = API_URL + API_APPLIED_TAGS + "/";
  const params = parametersFormater("POST", {
    tag: tagName,
    file_hash: file_hash,
  });

  return fetchJson(url, params);
};
