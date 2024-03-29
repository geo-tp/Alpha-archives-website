import { setBrowserFiles, setBrowserMedia } from "../store/actions";
import { API_URL, SEARCH_BY_TAGS } from "../../../config/api";
import { TagType, FileType } from "../../../types/index";
import { store } from "../../../store";
import { fetchJson } from "../../../api/fetchJson";

export const getFilesByTags = async (tags: TagType[]) => {
  const url = `${API_URL}${SEARCH_BY_TAGS}`;

  const res = await fetchJson(url, "POST", tags);

  if (res.status === 200) {
    const files = await res.json();

    store.dispatch(setBrowserFiles(files.body ? files.body : []));
    store.dispatch(
      setBrowserMedia(
        files.body
          ? files.body.filter((file: FileType) => file.is_folder === false)
          : []
      )
    );

    return files;
  }

  return res.json();
};
