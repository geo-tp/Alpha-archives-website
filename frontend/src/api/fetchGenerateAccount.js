import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_ACCOUNT_GENERATION } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchGenerateAccount = (username) => {
  const url = API_URL + API_ACCOUNT_GENERATION;
  const params = parametersFormater("POST", { username });

  return fetchJson(url, params);
};
