import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_PASSWORD_FORGET } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchPasswordForget = (email) => {
  let url = API_URL + API_PASSWORD_FORGET;
  let params = parametersFormater("POST", { email });

  return fetchJson(url, params);
};
