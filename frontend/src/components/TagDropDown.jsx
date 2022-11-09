import PropTypes from "prop-types";

export const TagDropDown = ({ tags, handleTagClick }) => {
  console.log("TAGS, ", tags);
  return (
    <div className="tag-dropdown">
      {tags.map((tag) => (
        <div
          className="tag-dropdown-element"
          onClick={() => handleTagClick(tag.name)}
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};

TagDropDown.propTypes = {
  tags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
};
