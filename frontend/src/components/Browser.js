import { Component } from "react";
import { fetchFiles } from "../api/fetchFiles";
import { fetchFilesByTags } from "../api/fetchFilesByTags";
import { fetchTags } from "../api/fetchTags";
import { API_URL } from "../api/utils/config";
import BrowseElement from "./BrowserElement";
import ImageBox from "./ImageBox";
import Loading from "./Loading";
import { TagSearch } from "./TagSearch";

class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      elements: null,
      elementsImages: null,
      tagsResponse: null,
      selectedTags: [],
      displayImageBox: false,
      displaySearchBar: false,
      indexInBox: null,
      actualDirectory: [],
      folderParam: props.folder ? props.folder : "root",
    };

    this.getFiles("parent", this.state.folderParam);
    this.getTags();
  }

  goHomeDirectory = () => {
    this.getFiles("parent");

    this.setState({
      actualDirectory: [],
    });
  };

  goBackDirectory = () => {
    let directory = this.state.actualDirectory;
    directory.pop();

    this.getFiles(
      "parent",
      this.state.actualDirectory[this.state.actualDirectory.length - 1]
    );

    // cause func getFiles will add again, we delete actual dir too
    directory.pop();

    this.setState({
      actualDirectory: directory,
    });
  };

  async getTags() {
    let tags = await fetchTags();

    this.setState({
      tags,
    });
  }

  getSelectedTags() {
    const selectedTags = this.state.selectedTags;
    let formattedSelectedTags = [];

    for (let tag of selectedTags) {
      formattedSelectedTags.push({ name: tag });
    }

    return formattedSelectedTags;
  }

  async getFilesByTags() {
    this.getFiles("", "", true);
  }

  async getFiles(filter_field, filter_value = "root", search = false) {
    this.setState({ loading: true });

    let elements = null;

    if (search) {
      const tags = this.getSelectedTags();
      const response = await fetchFilesByTags(tags);
      console.log("search", response);
      elements = response.body;
    } else {
      elements = await fetchFiles(filter_field, filter_value);
    }

    let elementsImages = [];
    for (let i = 0; i < elements.length; i++) {
      if (!elements[i].is_folder) {
        // let image_path = API_URL.slice(0, -1) + elements[i].image_raw;
        elementsImages.push(elements[i].image_raw);
      }
    }

    let directory = this.state.actualDirectory;
    if (elements[0]) {
      directory.push(elements[0].parent);
    }

    this.setState({
      elements: elements,
      elementsImages: elementsImages,
      actualDirectory: directory,
      loading: false,
    });
  }

  handleRemoveTagClick = (tagName) => {
    const selectedTags = this.state.selectedTags;
    const index = selectedTags.indexOf(tagName);
    selectedTags.splice(index, 1);

    this.setState({ selectedTags });
  };

  handleTagClick = (tagName) => {
    console.log("CLICK FROM BROWSER", this.state.selectedTags);
    const selectedTags = this.state.selectedTags;

    if (selectedTags.includes(tagName)) {
      return;
    }

    selectedTags.unshift(tagName);
    this.setState({ selectedTags });
    this.getFilesByTags();
  };

  handleFolderClick = (elementName) => {
    this.getFiles("parent", elementName);
  };

  handleFileClick = (element) => {
    this.setState({
      indexInView: this.state.elements.indexOf(element),
      displayImageBox: true,
    });
  };

  handleImageBoxClick = () => {
    this.setState({ displayImageBox: !this.state.displayImageBox });
  };

  render() {
    return (
      <div className="main-container page-top-margin">
        <div className="sub-container">
          <div className="main-browser__directory-path">
            <button className="button-browser" onClick={this.goBackDirectory}>
              <i className="fa fa-2x fa-arrow-left"></i>
            </button>
            <button className="button-browser" onClick={this.goHomeDirectory}>
              <i className="fa fa-2x fa-home"></i>
            </button>
            <button
              className="button-browser"
              onClick={() =>
                this.setState({
                  displaySearchBar: !this.state.displaySearchBar,
                })
              }
            >
              <i className="fa fa-2x fa-search"></i>
            </button>
            {this.state.displaySearchBar ? (
              !this.state.tags.error && (
                <TagSearch
                  tags={this.state.tags.body}
                  handleTagClick={this.handleTagClick}
                  selectedTags={this.state.selectedTags}
                  handleRemoveTagClick={this.handleRemoveTagClick}
                />
              )
            ) : (
              <span>{this.state.actualDirectory.join("/")}</span>
            )}
          </div>
          <div className="main-browser">
            {this.state.displayImageBox && (
              <ImageBox
                imagesName={this.state.elements}
                imagesInBox={this.state.elementsImages}
                indexInBox={this.state.indexInView}
                handleImageBoxClick={this.handleImageBoxClick}
                autofocus={true}
              />
            )}

            {!this.state.loading &&
              this.state.elements &&
              this.state.elements.map((element) => {
                return (
                  <BrowseElement
                    element={element}
                    handleFolderClick={this.handleFolderClick}
                    handleFileClick={this.handleFileClick}
                  />
                );
              })}
            {this.state.elements &&
              !this.state.loading &&
              this.state.elements.length == 0 && (
                <p className="main-browser__no-results">
                  {" "}
                  "¯\_(ツ)_/¯" No results
                </p>
              )}
            {this.state.loading && <Loading />}
          </div>
        </div>
      </div>
    );
  }
}

export default Browser;
