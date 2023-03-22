import { API_URL, TAG_ROUTE } from "./../../../config/api";
import { HeadersManager } from "../../../utils/headers";

export const deleteTag = async (tagName: string) => {
  const headers = HeadersManager.getHeaders();
  const params = { headers, method: "DELETE" };
  const url = `${API_URL}${TAG_ROUTE}${tagName}/`;

  const res = await fetch(url, params);

  return res;
};
