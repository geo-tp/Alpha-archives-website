import { API_URL, APPLIED_TAG_ROUTE } from "../config/api";
import { fetchJson } from "./fetchJson";

export const createAppliedTag = async (variables: {
  tagName: string;
  fileHash: string;
}) => {
  const body = {
    tag: variables.tagName,
    file_hash: variables.fileHash,
  };

  const res = await fetchJson(API_URL + APPLIED_TAG_ROUTE, "POST", body);

  return res.json();
};
