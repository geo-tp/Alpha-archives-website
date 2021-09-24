import { Component } from "react";
import PropTypes from "prop-types"


class ImageBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            images: props.imagesInBox,
            index: props.indexInBox,
            inView: props.imagesInBox[props.index]
        }
    }

    nextImage = () => {

        let newIndex;

        if(this.state.index+1 > this.state.images.length-1) {
            newIndex = 0
        }
        else {
            newIndex = this.state.index +1
        }

        this.setState({index: newIndex})
    }

    previousImage = () => {
        let newIndex;
        
        if (this.state.index -1 < 0) {
            newIndex = this.state.images.length-1
        }
        else {
            newIndex = this.state.index -1
        }
        
        this.setState({index: newIndex})

    }

    render() {

        return(
            <div className="main-image-box image-box-top-margin">
                <a className="image-box-arrow" onClick={this.previousImage}><i className="fa fa-3x fa-arrow-circle-left"></i></a>
                <img src={this.state.images[this.state.index]}/>
                <a className="image-box-arrow" onClick={this.nextImage}><i className="fa fa-3x fa-arrow-circle-right"></i></a>
                <a onClick={() => this.props.handleImageBoxClick()}
                    className="fa fa-close fa-2x close-menu-cross">
                </a>
            </div>
        )
    }
}

ImageBox.propTypes = {
    imagesInBox: PropTypes.object.isRequired,
    indexInBox: PropTypes.number.isRequired,
    handleFullResolutionDisplay: PropTypes.func.isRequired,
}

export default ImageBox