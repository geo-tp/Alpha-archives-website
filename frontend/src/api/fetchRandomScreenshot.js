import { fetchJson } from "./fetchJson";
import { API_RANDOM_SCREENSHOT } from "./utils/endpoints";
import { urlFormater } from "./utils/urlFormater";

export const fetchRandomScreenshot = () => {
  let url = urlFormater({
    model: API_RANDOM_SCREENSHOT,
  });

  return fetchJson(url);
};
