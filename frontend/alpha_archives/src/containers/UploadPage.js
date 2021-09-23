import { Component } from "react";
import ImageUpload from "../components/ImageUpload";
import UploadDescription from "../components/UploadDescription";

class UploadPage extends Component {

    render() {
        return(
            <div className="page-top-margin main-upload-page">
                <h3>Upload Files</h3>
                <UploadDescription/>
                <ImageUpload/>

            </div>
        )
    }
}

export default UploadPage