import React, { Component } from 'react';
import ImageBox from './ImageBox';

export default class ImageUpload extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
            fileResponse: ["X","X","X","X","X","X","X","X","X","X","X"],
            displayImageBox : false,
            imageInBox : null
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    handleImageBoxClick = () => {
        this.setState({displayImageBox: !this.state.displayImageBox})
    }

    render() {
        return (
            <form className="main-image-upload">
                {this.state.displayImageBox && <ImageBox image={this.state.imageInBox}
                                                            handleImageBoxClick={this.handleImageBoxClick}/>} 
                <div className="main-image-upload__form-group">
                    <label for="file-upload">
                        <i className="fa fa-2x fa-download"></i>
                        Drop files or Click to open explorer
                    </label>

                    <input id="file-upload" type="file" className="main-image-upload__form-group__form-control" onChange={this.uploadMultipleFiles} multiple />
                </div>

                <div className="main-image-upload__previews">
                    <div className="main-image-upload__previews__box">
                        {(this.fileArray || []).map((url, index) => (
                            <div className="main-image-upload__previews__box__element">
                                <img src={url} alt="..." onClick={() => this.setState({displayImageBox: true,
                                                                                       imageInBox: url})}/>
                                <label>{this.state.fileResponse[index]}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button" onClick={this.uploadFiles}>Upload</button>
            </form >
        )
    }
}