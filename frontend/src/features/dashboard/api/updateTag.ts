import { API_URL, TAG_ROUTE } from "./../../../config/api";
import { fetchJson } from "../../../api/fetchJson";

export const updateTag = async (variables: {
  tagName: string;
  newTagName: string;
}) => {
  const url = API_URL + TAG_ROUTE + variables.tagName + "/";
  const res = await fetchJson(url, "PUT", { name: variables.newTagName });

  return res.json();
};
