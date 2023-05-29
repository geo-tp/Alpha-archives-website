import { FileType } from "./../../../types/index";
import { setBrowserFiles, setBrowserMedia } from "./../store/actions";
import { API_URL, FILE_ROUTE } from "../../../config/api";
import { store } from "../../../store";
import { fetchJson } from "../../../api/fetchJson";

export const getFiles = async (folderName: string) => {
  const url = `${API_URL}${FILE_ROUTE}?parent=${folderName}&ordering=filename`;

  const res = await fetchJson(url, "GET");

  if (res.status === 200) {
    const files = await res.json();
    store.dispatch(setBrowserFiles(files));
    store.dispatch(
      setBrowserMedia(
        files.filter((file: FileType) => file.is_folder === false)
      )
    );

    return files;
  }

  return res.json();
};
