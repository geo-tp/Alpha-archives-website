import { Component } from "react";
import HomeInformations from "../components/HomeInformations";

class HomePage extends Component {

    render() {
        return(
            <div className="main-container page-top-margin">
                <HomeInformations/>
            </div>
        )
    }
}

export default HomePage