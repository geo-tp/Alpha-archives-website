import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_PROFILE } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchProfile = () => {
  const url = API_URL + API_PROFILE;
  const params = parametersFormater("GET");

  return fetchJson(url, params);
};
