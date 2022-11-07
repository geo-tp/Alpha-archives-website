import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import PropTypes from "prop-types";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
      accountMenuIsOpen: false,

      redirectToAuth: false,

      query: null,
    };
  }

  handleEnterPressed(e) {
    if (e.keyCode === 13) {
      window.location.href = "/search/" + this.state.query;
    }
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="nav-bar__logo-box">
          <Link className="nav-bar__logo-link" to="/">
            <img className="nav-bar__logo" alt="logo" src={logo} />
          </Link>
        </div>

        <div className="nav-bar__button-box">
          <NavLink className="no-underline" to="/upload/">
            <button className="nav-button-base">
              <i className="fa fa-upload"></i>
              Upload
            </button>
          </NavLink>

          <NavLink className="no-underline" to="/browse/">
            <button className="nav-button-base">
              <i className="fa fa-image"></i>
              Browse
            </button>
          </NavLink>

          <NavLink className="no-underline" to="/auth/">
            <button className="nav-button-base nav-button-base--colored">
              <i className="fa fa-user"></i>
            </button>
          </NavLink>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default NavBar;
