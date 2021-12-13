import { Component } from "react";
import ImageUpload from "../components/ImageUpload";
import UploadDescription from "../components/UploadDescription";

class UploadPage extends Component {

    render() {
        return(
            <div className="page-top-margin main-container">
                <div className="sub-container">
                    <h3 className="page-title">Upload Screenshots</h3>
                    <UploadDescription/>
                    <ImageUpload/>
                </div>
            </div>
        )
    }
}

export default UploadPage