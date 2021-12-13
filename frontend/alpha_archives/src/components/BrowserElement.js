import { Component } from "react"
import png from "../assets/file_icones/png.png"
import jpg from "../assets/file_icones/jpg.png"
import gif from "../assets/file_icones/gif.png"
import divers from "../assets/file_icones/divers.png"
import folder from "../assets/file_icones/folder.png"
import ImageBox from "./ImageBox"

class BrowseElement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageBoxIsOpen: false,
            imageInBoxUrl : null
        }
    }

    determinateIconToUse(element) {
        console.log(this.props.element)
        if (!this.props.element.is_file) {
            return folder
        }

        let elementNameList = this.props.element.name.split(".")
        let ext = elementNameList[elementNameList.length - 1]

        switch (ext) {
            case "gif":
            case "jpg":
            case "png":
            case "bmp":
            case "jpeg":
                return element.thumbnail_path

            default:
                return divers
        }
    }

    handleClick() {
        if (this.props.element.is_file) {
            // this.setState({
            //     imageBoxIsOpen: true,
            //     imageInBoxUrl: this.props.element.image.image_url,
            // })

            this.props.handleFileClick(this.props.element)

        }
        else {
            this.props.handleFolderClick(this.props.element.name)
        }
    }

    // handleImageBoxClick = () => {
    //     this.setState({imageBoxIsOpen: !false})
    // }

    render() {

        let icon = this.determinateIconToUse(this.props.element)
        return(
            <div className="main-browser-element" onClick={() => this.handleClick()}>
                {/* {this.state.imageBoxIsOpen && <ImageBox image={this.state.imageInBoxUrl}
                                                        handleFullResolutionDisplay={this.handleImageBoxClick}/>} */}
                <img src={icon}/>
                <p>{this.props.element.name}</p>
            </div>
        )
    }
}

export default BrowseElement