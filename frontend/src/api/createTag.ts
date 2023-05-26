import { API_URL, TAG_ROUTE } from "../config/api";
import { fetchJson } from "./fetchJson";

export const createTag = async (tagName: string) => {
  const res = await fetchJson(API_URL + TAG_ROUTE, "POST", { name: tagName });
  return res.json();
};
