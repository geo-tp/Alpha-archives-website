import { API_URL, TAG_ROUTE } from "./../../../config/api";
import { HeadersManager } from "../../../utils/headers";

export const updateTag = async (variables: {
  tagName: string;
  newTagName: string;
}) => {
  const headers = HeadersManager.getHeaders();
  const params = {
    headers,
    method: "PUT",
    body: JSON.stringify({ name: variables.newTagName }),
  };

  const url = API_URL + TAG_ROUTE + variables.tagName + "/";
  const res = await fetch(url, params);

  return res.json();
};
