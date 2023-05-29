import { API_URL, TAG_ROUTE } from "../../../config/api";
import { fetchJson } from "../../../api/fetchJson";

export const deleteTag = async (tagName: string) => {
  const url = `${API_URL}${TAG_ROUTE}${tagName}/`;

  const res = await fetchJson(url, "DELETE");

  return res;
};
