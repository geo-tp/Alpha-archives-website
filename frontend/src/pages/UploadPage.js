import { Component } from "react";
import ImageUpload from "../components/ImageUpload";
import UploadScreen from "../assets/upload.png";
class UploadPage extends Component {
  render() {
    return (
      <main className="main-container page-top-margin footer-hidden">
        <img
          src={UploadScreen}
          alt="wow login screen"
          className="image-background-container"
        />
        <div className="sub-container2 max-width-container">
          <div className="main-browser__directory-path">
            <h1 className="page-title">Upload Screenshots</h1>
          </div>
          <div className="main-upload-description">
            <p>
              The Alpha Project is looking for{" "}
              <strong>original pre-release screenshots</strong> of WoW from
              alpha and beta clients.{" "}
              <strong>
                Screenshots already present in the archives will be ignored.
              </strong>
            </p>
          </div>
          <ImageUpload />
        </div>
      </main>
    );
  }
}

export default UploadPage;
