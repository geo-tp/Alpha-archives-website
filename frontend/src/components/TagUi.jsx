import PropTypes from "prop-types";
import { useState } from "react";
import { fetchCreateTag } from "../api/fetchCreateTag";
import { searchTagsByKeywords } from "../utils/search";

export const TagUi = ({
  tags,
  file,
  fileTags,
  handleTagClick,
  createTagInState,
}) => {
  console.log("TAGS", tags);
  console.log("FILE TAGS", fileTags);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);
  console.log("FILTERED TAGS", filteredTags);

  const handleSearchInputChange = (e) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setFilteredTags(tags);
      return;
    }

    setSearchKeywords(newValue);
    const resultsTags = searchTagsByKeywords(newValue, tags);
    setFilteredTags(resultsTags);
  };

  const handleSubmitCreateTag = async (e) => {
    e.preventDefault();
    console.log("IN NEW CREATE");
    if (!searchKeywords) {
      return;
    }

    const response = await fetchCreateTag(searchKeywords);
    if (!response.error) {
      setSearchKeywords("");
      const newTag = response.body;
      createTagInState(newTag);
      setFilteredTags([newTag, ...tags]);
    }
  };

  return (
    <div className="tag-ui">
      <p
        title="Hit a Grey Tag to apply it. Hit a Green Tag to remove it. If a tag doesnt exists, you can create it by pressing New"
        className="tag-ui__user-permission"
      >
        <i className="fa fa-info-circle"></i>
      </p>
      <form
        onSubmit={handleSubmitCreateTag}
        className="tag-ui__search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <label htmlFor="search-tag" className="tag-ui__label">
          Search or create a new tag
        </label>
        <div className="tag-ui__search__bar">
          <input
            type="search"
            name="search-tag"
            id="search-tag"
            placeholder="Tag name"
            autoFocus={true}
            required
            onChange={handleSearchInputChange}
            value={searchKeywords}
          />
          <button className="tag-ui__search__submit" type="submit">
            <i className="fa fa-plus"></i>New
          </button>
        </div>
      </form>
      <div className="tag-ui__tags">
        {filteredTags?.map((tag) => (
          <button
            className={
              fileTags.some((item) => item.tag === tag.name)
                ? "tag-element tag-element--green"
                : "tag-element"
            }
            title={
              fileTags.some((item) => item.tag === tag.name)
                ? "Click to remove"
                : "Click to apply"
            }
            onClick={() => handleTagClick(tag)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

TagUi.propTypes = {
  tags: PropTypes.array.isRequired,
  file: PropTypes.object.isRequired,
  fileTags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  createTagInState: PropTypes.func.isRequired,
};
