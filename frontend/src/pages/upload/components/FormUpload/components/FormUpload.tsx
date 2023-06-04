import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { ACCEPTED_MIME_TYPES } from "../../../../../config/upload";
import { uploadFile } from "../../../api/uploadFile";
import { ImagesPreview } from "./ImagesPreview";

export const FormUpload = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [filesObj, setFilesObj] = useState<File[]>([]);
  const [filesApiResponse, setFilesApiResponse] = useState<any[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const { isLoading, mutateAsync } = useMutation((file: File) =>
    uploadFile(file)
  );

  const handleReset = () => {
    setFiles([]);
    setFilesObj([]);
    setIsUploaded(false);
  };

  const isMimeTypeValid = (file: File) => {
    if (ACCEPTED_MIME_TYPES.includes(file.type)) {
      return true;
    }

    return false;
  };

  const isFileAlreadyIn = (file: File) => {
    for (let f of filesObj) {
      if (f.name === file.name && f.size === file.size) {
        return true;
      }
    }

    return false;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // setIsLoading(true);
    if (isLoading || !filesObj.length) {
      return;
    }

    const results = [];
    var counter = 0;
    for (let file of filesObj) {
      const status: number = await mutateAsync(file);
      results.push(status);

      counter++;
      setLoadingCount(counter);
    }

    setFilesApiResponse(results);
    setIsUploaded(true);
    setLoadingCount(0);
  };

  const handleOnChange = (incomingFiles: FileList | null) => {
    if (incomingFiles) {
      const newFiles = [];
      for (let newFile of incomingFiles) {
        if (filesObj.length >= 200) {
          break;
        }
        if (!isFileAlreadyIn(newFile) && isMimeTypeValid(newFile)) {
          newFiles.push(newFile);
        }
      }

      const newFilesUrl = [];
      for (let file of newFiles) {
        let url = URL.createObjectURL(file);
        newFilesUrl.push(url);
      }
      setFilesObj([...filesObj, ...newFiles]);
      setFiles([...files, ...newFilesUrl]);
      setFilesApiResponse([]);
      setIsUploaded(false);
    }
  };

  return (
    <form className="form-upload" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-upload__form-group">
        <label htmlFor="file-upload">
          <i className="fa fa-2x fa-download"></i>
          Drop files or Click to open explorer (up to 200 images)
        </label>
        <input
          id="file-upload"
          type="file"
          className="form-upload__form-group__form-control"
          onChange={(e) => handleOnChange(e.target.files)}
          accept=".jpg, .gif, .png, .bmp"
          multiple
        />
      </div>

      <ImagesPreview
        filesObj={filesObj}
        files={files}
        filesApiResponse={filesApiResponse}
        handleReset={handleReset}
        isUploaded={isUploaded}
      />

      <p
        style={{ visibility: isUploaded ? "visible" : "hidden" }}
        className="form-upload__feedback"
      >
        <span className="error">
          <i className="fa fa-exclamation-triangle"></i> {" -> "}already in
          archive
        </span>{" "}
        <span className="success">
          <i className="fa fa-2x fa-check-circle"></i> {" -> "} uploaded
        </span>
      </p>

      <button
        className="form-upload__submit"
        type="submit"
        disabled={files.length ? false : true}
      >
        {isLoading ? "Loading " + loadingCount + "/" + files.length : "Upload"}
      </button>
    </form>
  );
};
