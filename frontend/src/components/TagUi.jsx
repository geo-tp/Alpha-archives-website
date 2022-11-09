import PropTypes from "prop-types";
import { useState } from "react";
import { fetchApplyTag } from "../api/fetchApplyTag";

export const TagUi = ({ tags, file, fileTags, handleTagClick }) => {
  console.log("TAGS", tags);
  console.log("FILE TAGS", fileTags);
  return (
    <div className="tag-ui">
      <form className="tag-ui__search">
        <label htmlFor="search-tag" className="tag-ui__label">
          Apply or create a new tag
        </label>
        <div className="tag-ui__search__bar">
          <input
            type="search"
            name="search-tag"
            id="search-tag"
            placeholder="Tag name"
            autoFocus={true}
            required
          />
          <button className="tag-ui__search__submit" type="submit">
            <i className="fa fa-plus"></i>New
          </button>
        </div>
      </form>
      <div className="tag-ui__tags">
        {tags?.map((tag) => (
          <button
            className={
              fileTags.some((item) => item.tag === tag.name)
                ? "tag-element tag-element--green"
                : "tag-element"
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
};
