import {Component} from "react"
import { fetchElements } from "../fetch/FetchElements"
import { API_URL } from "../utils/APIConfig"
import BrowseElement from "./BrowserElement"
import ImageBox from "./ImageBox"

class Browser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            elements : null,
            elementsImages: null,
            displayImageBox: false,
            indexInBox: null,
            actualDirectory: [],
        }

        this.getElements("parent")
    }

    goBackDirectory = () => {

        let directory = this.state.actualDirectory
        console.log(this.state.actualDirectory)
        directory.pop()
        // console.log(this.state.actualDirectory)
        
        this.getElements("parent", this.state.actualDirectory[this.state.actualDirectory.length-1])
        
        // cause func getElements will add again, we delete actual dir too
        directory.pop()

        this.setState({
            actualDirectory: directory
        })
    }

    async getElements(filter_field, filter_value="root") {
        let elements = await fetchElements(filter_field, filter_value)

        let elementsImages = []
        for(let i = 0 ; i < elements.length ; i++) {

            if (elements[i].is_file) {
                let image_path = API_URL.slice(0,-1) + elements[i].image.image_path
                elementsImages.push(image_path)
            }
        }

        let directory  = this.state.actualDirectory
        if (elements[0]){
            directory.push(elements[0].parent)
        }

        this.setState({elements: elements,
                       elementsImages: elementsImages,
                       actualDirectory:  directory})
    }


    handleFolderClick = (elementName) => {
        this.getElements("parent", elementName)
    }

    handleFileClick = (element) => {
        this.setState({indexInView:this.state.elements.indexOf(element),
                       displayImageBox: true})

    }

    handleImageBoxClick = () => {
        this.setState({displayImageBox: !this.state.displayImageBox})
    }

    render() {
        return(
            <div className="main-browser">
                <span className="main-browser__directory_path"
                      onClick={this.goBackDirectory}>
                    <i className="fa fa-2x fa-arrow-left"></i>
                    {this.state.actualDirectory.join("/")}</span>
                {this.state.displayImageBox && 
                    <ImageBox imagesInBox={this.state.elementsImages}
                              indexInBox={this.state.indexInView}
                              handleImageBoxClick={this.handleImageBoxClick}
                              autofocus={true}/>}

                {this.state.elements && this.state.elements.map(element => {
                    return <BrowseElement element={element}
                                          handleFolderClick={this.handleFolderClick}
                                          handleFileClick={this.handleFileClick}/>
                })}
            </div>
        )
    }

}

export default Browser