import React, { Component } from 'react';
import ImageBox from './ImageBox';

export default class ImageUpload extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
            fileResponse: ["In Archive","X","X","X","X","X","X","X","X","X","X"],
            displayImageBox : false,
            imageInBox : null,
            uploaded: false
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
        console.log("STATE FILE", this.state.file)
        console.log("FileObj", this.fileObj)
        console.log("fileArray", this.fileArray)
    }

    handleImageBoxClick = () => {
        this.setState({displayImageBox: !this.state.displayImageBox})
    }

    handleReset = () => {
        this.fileArray = []
        this.fileObj = []
        this.setState({file: [], fileResponse: []})

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
                    <label className="main-image-upload__previews__title">Previews</label>
                    <div className="main-image-upload__previews__box">
                        {(this.fileArray || []).map((url, index) => (
                            <div className="main-image-upload__previews__box__element">
                                <img src={url} alt="..." onClick={() => this.setState({displayImageBox: true,
                                                                                       imageInBox: url})}/>
                                {this.state.fileResponse[index] == "Not in" ? 
                                    <label className="main-image-upload__previews__box__element__response error"><i className="fa fa-2x fa-exclamation-triangle"></i></label> 
                                    :
                                    <label className="main-image-upload__previews__box__element__response success"><i className="fa fa-2x fa-check-circle"></i></label> 
                                                                            }
                            </div>
                        ))}
                    </div>
                </div>
                <button className="button-base button-upload" 
                        type="button" 
                        onClick={this.uploadFiles}>
                        Upload
                </button>
                


                <button className="button-base button-reset" 
                        type="button" 
                        onClick={() => this.handleReset()}>
                        Reset
                </button>
                {!this.state.uploaded &&
                    <p>
                        <span className="error">Red symbols are already in archive</span> | 
                        <span className="success"> Green symbols have been uploaded !</span> 
                    </p>
                }
                    
            </form >
        )
    }
}