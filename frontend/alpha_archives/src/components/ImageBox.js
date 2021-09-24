import { Component } from "react";
import PropTypes from "prop-types"


class ImageBox extends Component {

    render() {
        return(
            <div className="main-image-box">
                <img src={this.props.image}/>
                <a  onClick={() => this.props.handleImageBoxClick()}
                    className="fa fa-close fa-2x close-menu-cross">
                </a>
            </div>
        )
    }
}

ImageBox.propTypes = {
    image: PropTypes.string.isRequired,
    handleFullResolutionDisplay: PropTypes.func.isRequired,
}

export default ImageBox