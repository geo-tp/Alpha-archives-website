import { API_URL, UPLOAD_STATUS_ROUTE } from "../../../config/api";
import { HeadersManager } from "../../../utils/headers";

export const getUploadStatus = async () => {
  const headers = HeadersManager.getHeaders();
  const params = { headers, method: "GET" };
  const res = await fetch(API_URL + UPLOAD_STATUS_ROUTE, params);

  return res.status === 200 ? true : false;
};
