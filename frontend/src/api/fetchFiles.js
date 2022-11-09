import { fetchJson } from "./fetchJson";
import { API_FILES } from "./utils/endpoints";
import { urlFormater } from "./utils/urlFormater";

export const fetchFiles = (filter_field, folderName) => {
  let url = urlFormater({
    model: API_FILES,
    filter_field: filter_field,
    filter_value: folderName,
    ordering: "name",
  });

  return fetchJson(url);
};
