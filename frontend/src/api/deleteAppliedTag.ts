import { API_URL, APPLIED_TAG_ROUTE } from "../config/api";
import { HeadersManager } from "../utils/headers";

export const deleteAppliedTag = async (tagId: number) => {
  const headers = HeadersManager.getHeaders();
  const params = { method: "DELETE", headers };
  const url = API_URL + APPLIED_TAG_ROUTE + tagId;

  const res = await fetch(url, params);

  return res;
};
