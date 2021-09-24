import { Component } from "react";
import Browser from "../components/Browser";

class BrowserPage extends Component {

    render() {
        return(
            <div className="main-browse-page page-top-margin">
                <h3 className="page-title"> Browse Archive</h3>
                <Browser/>
            </div>
        )
    }
}

export default BrowserPage