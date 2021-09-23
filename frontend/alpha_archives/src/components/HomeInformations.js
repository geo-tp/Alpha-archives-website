import { Component } from "react";
import logoLarge from "../assets/logo-large.png";
import {Link} from "react-router-dom"


class HomeInformations extends Component {

    render() {
        return(
            <div className="main-home-informations">

                <div className="main-home-informations__info-box">
                    <h2>Alpha-Project-Archive</h2>
                    <img src={logoLarge}></img>
                    <p>Alpha-core is an experimental emulator written in Python for the client WoW 0.5.3</p>
                    <p>In order to retrieve informations about this version, we need screenshots from pre-release</p>
                    <p>This website helps people to upload screenshots and browe archive without knowledge with GitHub</p>
                    <a href="https://github.com/The-Alpha-Project/Alpha-Project-Archive"><i className="fa fa-3x fa-github"></i></a>
                </div>

                <div className="main-home-informations__button-box">
                    <Link to="/upload"><button className="button-base button-home">Upload screenshots</button></Link>
                    <button className="button-base button-home">Browse Archive</button>
                </div>
            </div>
        )
    }
}

export default HomeInformations