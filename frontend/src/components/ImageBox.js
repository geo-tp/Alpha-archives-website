import { Component } from "react";
import PropTypes from "prop-types";
import React from "react";
import MagnifyImage from "./MagnifyImage";
import { TagContainer } from "./TagContainer";

class ImageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.imagesInBox,
      index: props.indexInBox,
      inView: props.imagesInBox[props.index],

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
    if (e.keyCode === 39) {
      this.nextImage();
    } else if (e.keyCode === 37) {
      this.previousImage();
    }
  };

  nextImage = () => {
    let newIndex;

    if (this.state.index + 1 > this.state.images.length - 1) {
      newIndex = 0;
    } else {
      newIndex = this.state.index + 1;
    }

    this.setState({ index: newIndex });
  };

  previousImage = () => {
    let newIndex;

    if (this.state.index - 1 < 0) {
      newIndex = this.state.images.length - 1;
    } else {
      newIndex = this.state.index - 1;
    }

    this.setState({ index: newIndex });
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
        <TagContainer />
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

        {/* <div className="button-group">
                    <button className="zoom zoom--out" 
                        onClick={this.zoomOut}
                        disabled={!this.state.stretched}
                        title={"Original image size"}>
                            <i className="fa fa-1x fa-search-minus"></i>
                            Original
                    </button>
                    <button className="zoom zoom--in" 
                        onClick={this.zoomIn}
                        disabled={this.state.stretched}
                        title={"Stretched image size"}>
                            <i className="fa fa-1x fa-search-plus"></i>
                            Stretch
                    </button>
                    <button className={this.state.magnify ? "zoom zoom-magnify-glass--active zoom-magnify-glass--active" : "zoom zoom-magnify-glass"}
                        onClick={this.magnifyGlass}
                        title="Magnify Glass to zoom hover image">
                            <i className="fa fa-1x fa-search"></i>
                            Magnify
                    </button>
                </div> */}
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
          <strong>{this.props.imagesName[this.state.index].filename}</strong>
        </p>
      </div>
    );
  }
}

ImageBox.propTypes = {
  imagesName: PropTypes.object.isRequired,
  imagesInBox: PropTypes.object.isRequired,
  indexInBox: PropTypes.number.isRequired,
  handleImageBoxClick: PropTypes.func.isRequired,
};

export default ImageBox;
