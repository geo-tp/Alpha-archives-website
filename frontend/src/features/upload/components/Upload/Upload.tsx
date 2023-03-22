import { FormUpload } from "../FormUpload";
import { ImageBackground } from "../../../../components/ImageBackground";
import { Modal } from "../FormUpload/components/Modal";
import { useQuery } from "react-query";
import { getUploadStatus } from "../../api/getUploadStatus";
import { DISABLE_UPLOAD } from "../../../../config/upload";

export const Upload = () => {
  // Upload status query, data is a boolean
  const { data } = useQuery("upload-status", getUploadStatus);
  console.log("data", data);
  return (
    <main className="upload">
      <ImageBackground />
      <div className="upload__frame">
        <div className="upload__frame__title">
          <h1>Upload Screenshots</h1>
        </div>
        <div className="upload__frame__description">
          <p>
            The Alpha Project is looking for{" "}
            <strong>original pre-release screenshots</strong> of WoW from alpha
            and beta clients{" "}
            <a href="/#screenshot-identification">
              (How to recognize screenshot version ?)
            </a>
            <strong>
              . Screenshots already present in the archives will be ignored
            </strong>{" "}
          </p>
        </div>
        <FormUpload />
        {(!data || DISABLE_UPLOAD) && <Modal />}
      </div>
    </main>
  );
};
