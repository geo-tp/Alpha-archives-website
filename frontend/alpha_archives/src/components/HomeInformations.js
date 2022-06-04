import { Component } from "react";
import logoLarge from "../assets/logo-large.png";
import {Link} from "react-router-dom"
import { randomScreenshot } from "../fetch/RandomScreenshot";
import { API_URL } from "../utils/APIConfig";


class HomeInformations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            screenshot: null,
            infoBoxIsOpen: true,
            rollButtonIsDisabled: false,
        }

        this.getRandomScreenshot()
    }

    async getRandomScreenshot() {

        if (this.state.rollButtonIsDisabled) {
            return
        }

        this.setState({rollButtonIsDisabled: true})
        let screenshot = await randomScreenshot();

        this.setState({
            screenshot: screenshot
        })

        this.setState({rollButtonIsDisabled: false})

    }

    handleCloseBoxClick() {
        this.setState({
            infoBoxIsOpen: false
        })
    }

    

    render() {
        return(
            <div className="main-home-informations">
                
                {this.state.infoBoxIsOpen && 
                
                <div className="main-home-informations__info-box">

                    <a onClick={() => this.handleCloseBoxClick()}
                        className="fa fa-close fa-2x close-menu-cross  main-home-informations__info-box__close ">
                    </a>
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

                    <div className="main-home-informations__button-box">
                        <Link to="/upload/"><button className="button-base button-home">Upload screenshots</button></Link>
                        <Link to="/browse/"><button className="button-base button-home">Browse Archive</button></Link>
                    </div>
                </div>
                
            }


                {this.state.infoBoxIsOpen && 
                    <a onClick={() => this.handleCloseBoxClick()} className="main-home-informations__screenshot_title">                        
                        Random WoW screenshot from pre-release
                    </a>
                }
                {this.state.screenshot && 
                    <div>
                        {/* <p>{this.state.screenshot.image.}</p> */}
                        <img className="main-home-informations__image" src={API_URL.slice(0, -1) + this.state.screenshot.image.image_path}/>
                        {!this.state.infoBoxIsOpen &&
                            <div className="main-home-informations__roll-box">
                                <p className="main-home-informations__roll">You roll {this.state.screenshot.random_number} (1-{this.state.screenshot.total_number})</p>
                                <button class="nav-button-base main-home-informations__button" disabled={this.state.rollButtonIsDisabled} onClick={() => this.getRandomScreenshot()}>Roll</button>
                            </div>
                        }
                    </div>
                }

               
            </div>
        )
    }
}

export default HomeInformations
