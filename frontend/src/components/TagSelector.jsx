import { useState } from "react";
import { TagDropDown } from "./TagDropDown";
import PropTypes from "prop-types";

export const TagSelector = ({ tags, handleTagClick }) => {
  const [displayTagDropDown, setDisplayTagDropDown] = useState();

  return (
    <div
      // onBlur={() => {
      //   setDisplayTagDropDown(false);
      // }}
      className="tag-selector"
    >
      <div className="tag-selector__search">
        <form action="">
          <div className="tag-selector__icon">#</div>
          <input
            className="tag-selector__search__bar"
            type="text"
            autoFocus={true}
            placeholder="Search and select tags"
            onFocus={() => {
              setDisplayTagDropDown(true);
            }}
          />
        </form>
        {displayTagDropDown && (
          <TagDropDown tags={tags} handleTagClick={handleTagClick} />
        )}
      </div>
    </div>
  );
};

TagSelector.propTypes = {
  tags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
};
