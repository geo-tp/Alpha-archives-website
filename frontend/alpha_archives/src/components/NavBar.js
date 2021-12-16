import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png"
import PropTypes from 'prop-types'

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuIsOpen: false,
            accountMenuIsOpen: false,

            redirectToAuth: false,

            query: null,
        }
    }

    handleEnterPressed(e) {
        if (e.keyCode === 13) {
            window.location.href = "/search/"+this.state.query
        }
    }

    render() {

        return(
            <div className="nav-bar">

                <div className="nav-bar__logo-box">
                    <Link className="nav-bar__logo-link" to="/home/">
                        <img className="nav-bar__logo" alt="logo" src={logo}/>
                    </Link>
                </div>

                <div className="nav-bar__button-box">
                    <NavLink className="no-underline" to="/upload/">
                        <button className="nav-button-base">Upload</button>
                    </NavLink>

                    <NavLink className="no-underline" to="/browse/">
                        <button className="nav-button-base">Browse</button>
                    </NavLink>
                </div>
                
                

        </div>
        )
    }
}

NavBar.propTypes = {
    auth: PropTypes.object.isRequired
}

export default NavBar