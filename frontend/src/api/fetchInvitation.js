import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_INVITATION } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchInvitation = (email) => {
  const url = API_URL + API_INVITATION;
  const params = parametersFormater("POST", { email });

  return fetchJson(url, params);
};
