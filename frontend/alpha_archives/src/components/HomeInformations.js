import { Component } from "react";
import logoLarge from "../assets/logo-large.png";
import {Link} from "react-router-dom"


class HomeInformations extends Component {

    render() {
        return(
            <div className="main-home-informations">

                <div className="main-home-informations__info-box">
                    <h2>Alpha-Project-Archive</h2>
                    <img src={logoLarge} alt="logo"></img>
                    <div>
                        <form action="https://github.com/The-Alpha-Project">
                            <input className="nav-button-base nav-button-base--home" type="submit" value="Github" />
                        </form>
                        
                        <form action="https://discord.com/invite/RzBMAKU">
                            <input className="nav-button-base nav-button-base--home" type="submit" value="Discord" />
                        </form>
                    </div>
                    <p>Alpha-core is an experimental emulator written in Python for the client WoW 0.5.3</p>
                    <p>To retrieve informations about 0.5.3 version, we need screenshots from pre-release</p>
                    <p>This website helps people to upload screenshots and browe archive without knowledge with GitHub</p>

                </div>

                <div className="main-home-informations__button-box">
                    <Link to="/upload/"><button className="button-base button-home">Upload screenshots</button></Link>
                    <Link to="/browse/"><button className="button-base button-home">Browse Archive</button></Link>
                </div>
            </div>
        )
    }
}

export default HomeInformations