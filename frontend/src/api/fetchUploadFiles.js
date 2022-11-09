import { fetchJson } from "./fetchJson";
import { API_IMAGE } from "./utils/endpoints";
import { urlFormater } from "./utils/urlFormater";

export const fetchUploadFile = (file) => {
  const url = urlFormater({
    model: API_IMAGE,
  });

  const params = {
    method: "POST",
    body: file,
  };

  return fetchJson(url, params);
};
