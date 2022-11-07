import { API_UPLOAD_STATUS } from "./utils/endpoints";
import { urlFormater } from "./utils/urlFormater";

export const UploadStatus = () => {
  let url = urlFormater({
    model: API_UPLOAD_STATUS,
  });

  return fetch(url)
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
