import { fetchJson } from "./fetchJson";
import { API_URL } from "./utils/config";
import { API_FILES, API_FILES_UPLOAD } from "./utils/endpoints";
import { HeadersManager } from "./utils/headers";
import { parametersFormater } from "./utils/parametersFormater";
import { urlFormater } from "./utils/urlFormater";

export const fetchUploadFile = (file) => {
  const url = API_URL + API_FILES_UPLOAD;

  return fetch(url, {
    method: "POST",
    body: file,
  })
    .then((response) => {
      return response.status;
    })
    .then((success) => {
      return success;
    })
    .catch((error) => {
      return error;
    });
};
