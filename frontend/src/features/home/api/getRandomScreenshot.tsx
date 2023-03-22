import { API_URL, RANDOM_SCREENSHOT_ROUTE } from "../../../config/api";
import { HeadersManager } from "../../../utils/headers";

export const fetchRandomScreenshot = async () => {
  const headers = HeadersManager.getHeaders();
  const params = { headers, method: "GET" };
  const res = await fetch(API_URL + RANDOM_SCREENSHOT_ROUTE, params);

  return res.json();
};
