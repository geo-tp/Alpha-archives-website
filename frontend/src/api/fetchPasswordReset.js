import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_PASSWORD_RESET } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchPasswordReset = (key, password) => {
  const url = API_URL + API_PASSWORD_RESET + key;
  const params = parametersFormater("POST", { password });

  return fetchJson(url, params);
};
