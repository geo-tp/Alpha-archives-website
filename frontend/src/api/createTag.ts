import { API_URL, TAG_ROUTE } from "../config/api";
import { HeadersManager } from "../utils/headers";

export const createTag = async (tagName: string) => {
  const headers = HeadersManager.getHeaders();
  const params = {
    headers,
    method: "POST",
    body: JSON.stringify({ name: tagName }),
  };

  const res = await fetch(API_URL + TAG_ROUTE, params);

  return res.json();
};
