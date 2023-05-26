import { MediaType } from "./../../../types/index";
import { setBrowserFiles, setBrowserMedia } from "./../store/actions";
import { API_URL, FILE_ROUTE } from "../../../config/api";
import { store } from "../../../store";
import { HeadersManager } from "../../../utils/headers";

export const getFiles = async (folderName: string) => {
  const headers = HeadersManager.getHeaders();
  const params = { method: "GET", headers };
  const url = `${API_URL}${FILE_ROUTE}?parent=${folderName}&ordering=filename`;

  const res = await fetch(url, params);

  if (res.status === 200) {
    const files = await res.json();
    store.dispatch(setBrowserFiles(files));
    store.dispatch(
      setBrowserMedia(
        files.filter((file: MediaType) => file.is_folder === false)
      )
    );

    return files;
  }

  return res.json();
};
