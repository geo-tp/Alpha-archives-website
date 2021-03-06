import { Component } from "react";
import ImageUpload from "../components/ImageUpload";

class UploadPage extends Component {

    render() {
        return(
            <div className="main-container page-top-margin">
                <div className="sub-container2">
                    <div className="main-browser__directory-path">
                        <h3 className="page-title">Upload Screenshots</h3>
                    </div>
                    <div className="main-upload-description">
                        <p>The Alpha Project is looking for <strong>original pre-release screenshots</strong> of WoW from alpha and beta clients. <strong>Screenshots already present in the archives will be ignored.</strong></p>
                    </div>
                    <ImageUpload/>
                </div>
            </div>
        )
    }
}

export default UploadPage