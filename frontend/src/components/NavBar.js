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
    console.log("W", window.innerWidth);
    return (
      <header className="nav-bar">
        <div className="nav-bar__logo-box">
          <Link
            title="Go to Homepage"
            aria-label="Go to Homepage"
            className="nav-bar__logo-link"
            to="/"
          >
            <img className="nav-bar__logo" alt="logo" src={logo} />
          </Link>
        </div>

        <nav className="nav-bar__button-box">
          <NavLink
            title="Upload pre release screenshots"
            aria-label="Upload pre release screenshots"
            className="no-underline"
            to="/upload/"
          >
            <button className="nav-button-base">
              <i className="fa fa-upload"></i>
              Upload
            </button>
          </NavLink>

          <NavLink
            className="no-underline"
            to="/browse/"
            title="Browse pre release screenshots"
            aria-label="Browse pre release screenshots"
          >
            <button className="nav-button-base">
              <i className="fa fa-image"></i>
              Browse
            </button>
          </NavLink>

          <NavLink
            className="no-underline"
            to="/auth/"
            title="Login or profile page"
            aria-label="Login or profile page"
          >
            <button className="nav-button-base nav-button-base--colored">
              <i className="fa fa-user"></i>
            </button>
          </NavLink>
        </nav>
      </header>
    );
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default NavBar;
