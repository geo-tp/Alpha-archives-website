import { fetchJson } from "./fetchJson";
import { API_UPLOAD_STATUS } from "./utils/endpoints";
import { urlFormater } from "./utils/urlFormater";

export const fetchUploadStatus = () => {
  let url = urlFormater({
    model: API_UPLOAD_STATUS,
  });

  return fetchJson(url);
};
