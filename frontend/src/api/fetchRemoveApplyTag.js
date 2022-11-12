import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_APPLIED_TAGS } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchRemoveApplyTag = (tag) => {
  let url = API_URL + API_APPLIED_TAGS + "/" + tag.id;
  let params = parametersFormater("DELETE");

  return fetchJson(url, params);
};
