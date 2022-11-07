import { Component } from "react";
import banner from "../assets/banner.png";
import { Link } from "react-router-dom";
import { randomScreenshot } from "../api/RandomScreenshot";
import { API_URL } from "../api/utils/config";

class HomeInformations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      infoBoxIsOpen: true,
      rollButtonIsDisabled: false,
    };

    this.getRandomScreenshot();
  }

  async getRandomScreenshot() {
    if (this.state.rollButtonIsDisabled) {
      return;
    }

    this.setState({ rollButtonIsDisabled: true });
    let screenshot = await randomScreenshot();

    this.setState({
      screenshot: screenshot,
    });

    this.setState({ rollButtonIsDisabled: false });
  }

  handleCloseBoxClick() {
    this.setState({
      infoBoxIsOpen: false,
    });
  }

  render() {
    return (
      <div className="main-home-informations">
        <div className="main-home-informations__home-banner">
          <h1>
            <i className="main-home-informations__home-banner__icon fa fa-image"></i>
            Alpha Project Archive{" "}
          </h1>
          <h2>
            Browse World of Warcraft Beta & Alpha screenshots from 2003 to 2004
          </h2>

          <img src={banner} alt="logo"></img>

          <div className="main-home-informations__home-banner__description-box">
            <p>
              <a href="https://github.com/The-Alpha-Project/alpha-core">
                Alpha Core
              </a>{" "}
              is an experimental Python emulator for the 0.5.3.3368 version of
              World of Warcraft.
            </p>
            <p>
              In order to build the contents of the emulator, hundreds of
              original alpha and beta screenshots have been found and archived.
            </p>
            <p>
              This website helps people interact with these screenshots that are{" "}
              <a href="https://github.com/The-Alpha-Project/Alpha-Project-Archive">
                stored on GitHub
              </a>{" "}
              without the need to use it.
            </p>
          </div>

          <div className="main-home-informations__button-box">
            <Link to="/upload/">
              <button className="button-base button-home">
                Upload screenshots
              </button>
            </Link>
            <Link to="/browse/">
              <button className="button-base button-home">
                Browse Archive
              </button>
            </Link>
          </div>
          <p className="main-home-informations__check-sentence">
            <i className="fa fa-check"></i>
            More than 18 000 screenshots to browse
          </p>
        </div>
        )
        {this.state.screenshot && (
          <div className="random-box">
            <div className="random-box__title">
              <h2>Random Screenshots</h2>
            </div>
            <img
              className="random-box__image"
              src={
                API_URL.slice(0, -1) + this.state.screenshot.image.image_path
              }
            />
            <div className="random-box__roll-box">
              <p className="random-box__roll">
                You roll {this.state.screenshot.random_number} (1-
                {this.state.screenshot.total_number})
              </p>
              <button
                class="nav-button-base random-box__button"
                disabled={this.state.rollButtonIsDisabled}
                onClick={() => this.getRandomScreenshot()}
              >
                Roll
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomeInformations;
