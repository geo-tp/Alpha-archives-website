import { MediaType } from "../types";

export const updateFiles = (updatedFile: MediaType, files: MediaType[]) => {
  const newMedia = [];
  const newFiles = [];

  for (let file of files) {
    var fileToAdd = file;

    if (file.id === updatedFile.id) {
      fileToAdd = updatedFile;
    } else {
      fileToAdd = file;
    }

    newFiles.push(fileToAdd);
    if (!fileToAdd.is_folder) newMedia.push(fileToAdd);
  }

  return [newMedia, newFiles];
};
