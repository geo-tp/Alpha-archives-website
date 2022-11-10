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
      files: null,
      filesImages: null,
      tags: null,
      selectedTags: [],
      instanceFiles: [],
      instanceAppliedTags: [],
      instanceTags: [],
      displayImageBox: false,
      displaySearchBar: false,
      indexInBox: null,
      actualDirectory: [],
      folderParam: props.folder ? props.folder : "root",
    };

    this.getFiles("parent", this.state.folderParam);
    this.getTags();
  }

  createTagInState = (tag) => {
    console.log("CREATE TAGS", this.state.tags);
    this.setState({ tags: [tag, ...this.state.tags] });
  };

  updateFileInState = (FileToUpdate) => {
    let index = this.state.files
      .map(function (e) {
        return e.id;
      })
      .indexOf(FileToUpdate.id);

    let newFiles = this.state.files;

    newFiles[index] = FileToUpdate;

    this.setState({ files: newFiles });
  };

  goHomeDirectory = () => {
    this.getFiles("parent");

    this.setState({
      actualDirectory: [],
      selectedTags: [],
      displaySearchBar: false,
    });
  };

  goBackDirectory = () => {
    if (this.state.displaySearchBar) {
      this.getFiles("parent");

      this.setState({
        actualDirectory: [],
        selectedTags: [],
        displaySearchBar: false,
      });
      return;
    }

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
    console.log(tags);
    this.setState({
      tags: tags.body,
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

    let files = null;

    if (search) {
      const tags = this.getSelectedTags();
      const response = await fetchFilesByTags(tags);
      console.log("search", response);
      files = response.body;
    } else {
      files = await fetchFiles(filter_field, filter_value);
    }

    let filesImages = [];
    for (let i = 0; i < files.length; i++) {
      if (!files[i].is_folder) {
        // let image_path = API_URL.slice(0, -1) + files[i].image_raw;
        filesImages.push(files[i].image_raw);
      }
    }

    let directory = this.state.actualDirectory;
    if (files[0]) {
      directory.push(files[0].parent);
    }

    this.setState({
      files: files,
      filesImages: filesImages,
      actualDirectory: directory,
      loading: false,
    });
  }

  handleRemoveTagClick = (tagName) => {
    const selectedTags = this.state.selectedTags;
    const index = selectedTags.indexOf(tagName);
    selectedTags.splice(index, 1);

    this.setState({ selectedTags });

    if (selectedTags.length) {
      this.getFilesByTags();
    } else {
      this.getFiles("parent", "root");
      this.setState({ actualDirectory: [] });
    }
  };

  handleTagClick = (tagName) => {
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
      indexInView: this.state.files.indexOf(element),
      displayImageBox: true,
    });
  };

  handleImageBoxClick = () => {
    this.setState({ displayImageBox: !this.state.displayImageBox });
  };

  handleSearchIconClick = () => {
    const displaySearchBar = !this.state.displaySearchBar;

    if (!displaySearchBar) {
      this.getFiles("parent", "root");
    }

    this.setState({
      displaySearchBar,
      actualDirectory: [],
      selectedTags: [],
    });
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
              onClick={this.handleSearchIconClick}
            >
              <i
                className={`fa fa-2x fa-${
                  this.state.displaySearchBar ? "close" : "search"
                }`}
              ></i>
            </button>
            {this.state.displaySearchBar ? (
              !this.state.tags.error && (
                <TagSearch
                  tags={this.state.tags}
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
                tags={this.state.tags}
                files={this.state.files}
                imagesInBox={this.state.filesImages}
                fileIndexInBox={this.state.indexInView}
                handleImageBoxClick={this.handleImageBoxClick}
                autofocus={true}
                createTagInState={this.createTagInState}
                updateFileInState={this.updateFileInState}
              />
            )}

            {!this.state.loading &&
              this.state.files &&
              this.state.files.map((element) => {
                return (
                  <BrowseElement
                    element={element}
                    handleFolderClick={this.handleFolderClick}
                    handleFileClick={this.handleFileClick}
                  />
                );
              })}
            {this.state.files &&
              !this.state.loading &&
              this.state.files.length == 0 && (
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
