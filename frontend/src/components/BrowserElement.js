import { Component } from "react";

import divers from "../assets/file_icones/divers.png";
import folder from "../assets/file_icones/folder.png";

class BrowseElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBoxIsOpen: false,
      imageInBoxUrl: null,
    };
  }

  determinateIconToUse(element) {
    console.log("ELEMENt", element);
    if (this.props.element.is_folder) {
      return folder;
    }

    let elementNameList = this.props.element.filename.split(".");
    let ext = elementNameList[elementNameList.length - 1].toLowerCase();

    switch (ext) {
      case "gif":
      case "jpg":
      case "png":
      case "bmp":
      case "jpeg":
        return element.image_thumbnail;

      default:
        return divers;
    }
  }

  handleClick() {
    if (this.props.element.is_folder) {
      // this.setState({
      //     imageBoxIsOpen: true,
      //     imageInBoxUrl: this.props.element.image.image_url,
      // })

      this.props.handleFolderClick(this.props.element.filename);
    } else {
      this.props.handleFileClick(this.props.element);
    }
  }

  // handleImageBoxClick = () => {
  //     this.setState({imageBoxIsOpen: !false})
  // }

  render() {
    let icon = this.determinateIconToUse(this.props.element);
    return (
      <div className="main-browser-element" onClick={() => this.handleClick()}>
        {/* {this.state.imageBoxIsOpen && <ImageBox image={this.state.imageInBoxUrl}
                                                        handleFullResolutionDisplay={this.handleImageBoxClick}/>} */}
        <img src={icon} alt="thumbnail" />
        <p>{this.props.element.filename}</p>
      </div>
    );
  }
}

export default BrowseElement;
