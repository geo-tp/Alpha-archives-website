import { API_URL, GENERATE_ACCOUNT } from "../../../config/api";
import { fetchJson } from "../../../api/fetchJson";

export const createAccount = async (username: string) => {
  const res = await fetchJson(API_URL + GENERATE_ACCOUNT, "POST", { username });

  return res.json();
};
