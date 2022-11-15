import { API_URL } from "./utils/config";
import { API_FILES_UPLOAD } from "./utils/endpoints";

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
