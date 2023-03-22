import { API_URL, APPLIED_TAG_ROUTE } from "../config/api";
import { HeadersManager } from "../utils/headers";

export const createAppliedTag = async (variables: {
  tagName: string;
  fileHash: string;
}) => {
  const headers = HeadersManager.getHeaders();
  const params = {
    method: "POST",
    headers,
    body: JSON.stringify({
      tag: variables.tagName,
      file_hash: variables.fileHash,
    }),
  };

  const res = await fetch(API_URL + APPLIED_TAG_ROUTE, params);

  return res.json();
};
