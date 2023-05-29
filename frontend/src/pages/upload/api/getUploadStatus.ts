import { fetchJson } from "../../../api/fetchJson";
import { API_URL, UPLOAD_STATUS_ROUTE } from "../../../config/api";

export const getUploadStatus = async () => {
  const res = await fetchJson(API_URL + UPLOAD_STATUS_ROUTE, "GET");

  return res.status === 200 ? true : false;
};
