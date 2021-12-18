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
                        <p>Alpha-project looking for <strong>pre release</strong> screenshots of WoW from 0.5.3 to 0.12 clients. <strong>Screenshots already presents in archives will be ignored.</strong></p>
                    </div>
                    <ImageUpload/>
                </div>
            </div>
        )
    }
}

export default UploadPage