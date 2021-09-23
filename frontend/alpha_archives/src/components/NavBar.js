import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png"
import PropTypes from 'prop-types'

let id = 0

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

        let path = this.state.query ? "/search/"+this.state.query : '/search'

        return(
            <div className="nav-bar">

                <div className="nav-bar__logo-box">
                    <Link className="nav-bar__logo-link" to="/home/">
                        <img className="nav-bar__logo" alt="logo" src={logo}/>
                    </Link>
                </div>

                <div className="nav-bar__button-box">
                    <NavLink className="no-underline" to="/home/">
                        <button className="nav-button-base">Upload</button>
                    </NavLink>

                    <NavLink className="no-underline" to="/home/">
                        <button className="nav-button-base">Browse Archive</button>
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