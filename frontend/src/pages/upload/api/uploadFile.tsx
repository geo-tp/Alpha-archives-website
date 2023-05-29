import { API_URL, FILE_ROUTE } from "../../../config/api";

export const uploadFile = async (file: File | null) => {
  if (file) {
    let fdata = new FormData();
    fdata.append("image", file, file.name);
    const params = { method: "POST", body: fdata };
    const res = await fetch(API_URL + FILE_ROUTE, params);
    return res.status;
  }

  return 404;
};
