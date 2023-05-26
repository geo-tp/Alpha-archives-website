import { API_URL, APPLIED_TAG_ROUTE } from "../config/api";
import { fetchJson } from "./fetchJson";

export const deleteAppliedTag = async (tagId: number) => {
  const url = API_URL + APPLIED_TAG_ROUTE + tagId;
  const res = await fetchJson(url, "DELETE");

  return res;
};
