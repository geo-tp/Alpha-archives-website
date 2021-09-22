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

        let linkList = (navBarType) => {
            return (
                <div className={navBarType}>
                <i onClick={() => this.setState({menuIsOpen: false})}  
                   className=" fa fa-close fa-2x close-menu-cross"></i>
                <ul className="nav-bar__menu__link-list">
                    <li id={id++}>
                        <NavLink className="no-underline" 
                                 to="/choice/popular">
                            <button>Populaires</button>
                        </NavLink>
                    </li>
                    <li id={id++}>
                        <NavLink className="no-underline" 
                                    to="/choice/new">
                                <button>Nouveautés</button>
                        </NavLink>
                    </li>
                    <li id={id++}>
                        <NavLink className="no-underline" 
                                    to="/choice/cheap">
                                <button>Prix Mini</button>
                        </NavLink>
                    </li>
                    <li id={id++}>
                        <NavLink className="no-underline" 
                            to="/help">
                            <button>Aide</button>
                        </NavLink>
                    </li>
                </ul>

            </div>
            )
        }

        let path = this.state.query ? "/search/"+this.state.query : '/search'

        return(


            <div className="nav-bar">

                <div className="nav-bar__nav-site" >
                    <span className="nav-bar__nav-site__nav-burger">

                        <i className="fas fa fa-2x fa-bars" 
                           onClick={() => this.setState({menuIsOpen: !this.state.menuIsOpen,
                           accountMenuIsOpen: false})}></i>

                    </span>
                    <NavLink className="no-underline" to="/home/">
                        <h2><img className="nav-bar__logo" alt="logo" src={logo}/> EBAZAR</h2>
                    </NavLink>
                </div>

                <div>
                    <NavLink className="no-underline" to="/home/">
                        <button>Upload</button>
                    </NavLink>

                    <NavLink className="no-underline" to="/home/">
                        <button>Browse Archive</button>
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