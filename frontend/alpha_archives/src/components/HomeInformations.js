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
                    <p><a href="https://github.com/The-Alpha-Project/alpha-core">Alpha Core</a> is an experimental Python emulator for the 0.5.3.3368 version of World of Warcraft.</p>
                    <p>In order to build the contents of the emulator, hundreds of original alpha and beta screenshots have been found and archived.</p>
                    <p>This website helps people interact with these screenshots that are <a href="https://github.com/The-Alpha-Project/Alpha-Project-Archive">stored on GitHub</a> without the need to use it.</p>

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
