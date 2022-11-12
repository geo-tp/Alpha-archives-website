import { Component } from "react";
import PropTypes from "prop-types";
import React from "react";
import MagnifyImage from "./MagnifyImage";
import { TagContainer } from "./TagContainer";

class ImageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.files,
      images: props.imagesInBox,
      index: props.fileIndexInBox,
      fileTags: props.files[props.fileIndexInBox].tags,

      imageScale: 100,
      stretched: true,
      magnify: false,
    };
    this.componentRef = React.createRef();
  }

  componentDidMount() {
    this.componentRef.current.focus();
  }

  handleKeyDown = (e) => {
    const ESC = 27;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    if (e.keyCode === RIGHT_ARROW) {
      this.nextImage();
    } else if (e.keyCode === LEFT_ARROW) {
      this.previousImage();
    } else if (e.keyCode === ESC) {
      this.props.handleImageBoxClick();
    }
  };

  nextImage = () => {
    let newIndex;

    if (this.state.index + 1 > this.state.images.length - 1) {
      newIndex = 0;
    } else {
      newIndex = this.state.index + 1;
    }

    this.setState({
      index: newIndex,
      fileTags: [...this.state.files[newIndex].tags],
    });
  };

  previousImage = () => {
    let newIndex;

    if (this.state.index - 1 < 0) {
      newIndex = this.state.images.length - 1;
    } else {
      newIndex = this.state.index - 1;
    }
    this.setState({
      index: newIndex,
      fileTags: this.state.files[newIndex].tags,
    });
  };

  zoomOut = () => {
    this.setState({ imageScale: null, stretched: false, magnify: false });
    this.componentRef.current.focus();
  };

  zoomIn = () => {
    if (this.state.imageScale < 100) {
      this.setState({
        imageScale: this.state.imageScale + 100,
        stretched: true,
      });
    }
    this.componentRef.current.focus();
  };

  magnifyGlass = () => {
    this.zoomIn();
    this.setState({ magnify: !this.state.magnify });
  };

  render() {
    return (
      <div
        className="main-image-box image-box-top-margin"
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
        ref={this.componentRef}
      >
        <span className="main-image-box__images-count">
          {this.state.index + 1}/{this.state.images.length}
        </span>
        <button
          className="image-box-arrow--left image-box-arrow"
          onClick={this.previousImage}
        >
          <i className="fa fa-3x fa-angle-left"></i>
        </button>
        <TagContainer
          file={this.props.files[this.state.index]}
          tags={this.props.tags}
          fileTags={this.props.files[this.state.index].tags}
          createTagInState={this.props.createTagInState}
          updateFileInState={this.props.updateFileInState}
        />
        <div className="main-image-box__image-container">
          {this.state.magnify ? (
            <MagnifyImage
              src={this.state.images[this.state.index]}
              width={this.state.imageScale}
              height=""
            />
          ) : (
            <img
              src={this.state.images[this.state.index]}
              alt="selected screenshot"
              style={
                this.state.imageScale
                  ? { width: `${this.state.imageScale}%` }
                  : null
              }
            />
          )}
        </div>

        <button
          className="image-box-arrow  image-box-arrow--right"
          onClick={this.nextImage}
        >
          <i className="fa fa-3x fa-angle-right"></i>
        </button>
        <button
          onClick={() => this.props.handleImageBoxClick()}
          className="fa fa-close fa-2x close-menu-cross"
        ></button>
        <p className="main-image-box__filename">
          <strong>{this.props.files[this.state.index].filename}</strong>
        </p>
      </div>
    );
  }
}

ImageBox.propTypes = {
  files: PropTypes.object.isRequired,
  imagesInBox: PropTypes.object.isRequired,
  fileIndexInBox: PropTypes.number.isRequired,
  handleImageBoxClick: PropTypes.func.isRequired,
  createTagInState: PropTypes.func.isRequired,
};

export default ImageBox;
