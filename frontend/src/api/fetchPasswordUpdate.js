import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_PASSWORD_UPDATE } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchPasswordUpdate = (oldPassword, newPassword) => {
  const url = API_URL + API_PASSWORD_UPDATE;
  const params = parametersFormater("PUT", {
    old_password: oldPassword,
    new_password: newPassword,
  });

  return fetchJson(url, params);
};
