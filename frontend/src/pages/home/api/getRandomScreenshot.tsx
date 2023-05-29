import { fetchJson } from "../../../api/fetchJson";
import { API_URL, RANDOM_SCREENSHOT_ROUTE } from "../../../config/api";

export const fetchRandomScreenshot = async () => {
  const res = await fetchJson(API_URL + RANDOM_SCREENSHOT_ROUTE, "GET");

  return res.json();
};
