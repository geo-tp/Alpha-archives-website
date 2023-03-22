import { API_URL, GENERATE_ACCOUNT } from "./../../../config/api";
import { HeadersManager } from "../../../utils/headers";

export const createAccount = async (username: string) => {
  const headers = HeadersManager.getHeaders();
  const params = {
    headers,
    method: "POST",
    body: JSON.stringify({ username }),
  };

  const res = await fetch(API_URL + GENERATE_ACCOUNT, params);

  return res.json();
};
