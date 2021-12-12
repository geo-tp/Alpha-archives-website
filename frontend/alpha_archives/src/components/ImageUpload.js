import React, { Component } from 'react';
import { fetchUploadFile } from '../fetch/UploadFiles';
import ImageBox from './ImageBox';

export default class ImageUpload extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            files: [null],
            fileResponse: [],
            displayImageBox : false,
            imagesInBox : null,
            indexInBox: null,
            uploaded: false,
            loading: false,
            loadingCount: 0,
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ files: this.fileArray, fileResponse:[], uploaded: false })
    }

    async uploadFiles(e) {
        e.preventDefault()

        this.setState({loading: true})
        if (!this.fileObj.length) {
            return
        }

        let responseList = []
        for (let i=0 ; i<this.fileObj[0].length ; i++ ) {
            let fdata = new FormData()
            fdata.append("image", this.fileObj[0][i], this.fileObj[0][i].name)
            responseList.push(await fetchUploadFile(fdata))
            this.setState({loadingCount: this.state.loadingCount+1})

        }

        this.setState({fileResponse:responseList, 
                      uploaded:true, 
                      loading:false,
                      loadingCount: 0})
    }

    handleImageBoxClick = () => {
        this.setState({displayImageBox: !this.state.displayImageBox})
    }

    handleReset = () => {
        this.fileArray = []
        this.fileObj = []
        this.setState({files: [], fileResponse: [], uploaded:false})

    }

    render() {
        return (
            <form className="main-image-upload"
                  onSubmit={e=> this.uploadFiles(e)}>
                {this.state.displayImageBox && <ImageBox imagesInBox={this.fileArray}
                                                         indexInBox={this.state.indexInBox}
                                                         handleImageBoxClick={this.handleImageBoxClick}
                                                         />} 
                <div className="main-image-upload__form-group">
                    <label for="file-upload">
                        <i className="fa fa-2x fa-download"></i>
                        Drop files or Click to open explorer
                    </label>
                    <input id="file-upload" 
                           type="file" 
                           className="main-image-upload__form-group__form-control" 
                           onChange={this.uploadMultipleFiles} 
                           accept=".jpg, .gif, .png"
                           multiple
                    />
                </div>

                <div className="main-image-upload__previews">
                    <label className="main-image-upload__previews__title">Previews</label>
                    <div className="main-image-upload__previews__box">
                        {(this.fileArray || []).map((url, index) => (
                            <div className="main-image-upload__previews__box__element">
                                <img src={url} alt="..." onClick={() => this.setState({displayImageBox: true,
                                                                                       indexInBox: index})}/>
                                {this.state.uploaded ?
                                    this.state.fileResponse[index] == 208 ? 
                                        <label className="main-image-upload__previews__box__element__response error"><i className="fa fa-2x fa-exclamation-triangle"></i></label> 
                                                                            :
                                        <label className="main-image-upload__previews__box__element__response success"><i className="fa fa-2x fa-check-circle"></i></label> 
                                                    :
                                <label></label>}
                            </div>
                        ))}
                    </div>
                </div>
                
                {this.state.uploaded &&
                    <p className="main-image-upload__feedback">
                        <span className="error">Images with Red symbols are already in archive</span> | 
                        <span className="success"> Green symbols have been uploaded !</span> 
                    </p>
                }
                
                <button className="button-base button-upload" 
                        type="submit">
                        {this.state.loading ? 'Loading ' + this.state.loadingCount+"/"+this.fileArray.length : 'Upload' }
                </button>

                <button className="button-base button-reset" 
                        type="button" 
                        onClick={() => this.handleReset()}>
                        Reset
                </button>
                    
            </form >
        )
    }
}