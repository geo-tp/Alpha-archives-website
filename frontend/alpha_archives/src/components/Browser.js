import {Component} from "react"
import { fetchElements } from "../fetch/FetchElements"
import BrowseElement from "./BrowserElement"

class Browser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            elements : null,
        }

        this.getElements("parent")
    }

    async getElements(filter_field, filter_value="root") {
        let elements = await fetchElements(filter_field, filter_value)
        this.setState({elements: elements})
    }

    handleElementClick = (elementName) => {
        this.getElements("parent", elementName)
    }

    render() {
        return(
            <div className="main-browser">
                {this.state.elements && this.state.elements.map(element => {
                    return <BrowseElement element={element}
                                          handleElementClick={this.handleElementClick}/>
                })}
            </div>
        )
    }

}

export default Browser