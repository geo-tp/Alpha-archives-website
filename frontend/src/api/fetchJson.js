import { HeadersManager } from "./utils/headers";

export const fetchJson = (url, params = {}) => {
  params["headers"] = HeadersManager.getHeaders();
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((success) => {
      return success;
    })
    .catch((error) => {
      return error;
    });
};
