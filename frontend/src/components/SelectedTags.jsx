import PropTypes from "prop-types";

export const SelectedTags = ({ selectedTags, handleRemoveTagClick }) => {
  console.log("SELCTED TAGS", selectedTags);
  return (
    <div className="selected-tags">
      {selectedTags.map((tag) => (
        <div className="tag-selected-element">
          {tag}{" "}
          <i
            onClick={() => handleRemoveTagClick(tag)}
            className="fa fa-close"
          ></i>
        </div>
      ))}
    </div>
  );
};

SelectedTags.propTypes = {
  tags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  selected_tags: PropTypes.array.isRequired,
  handleRemoveTagClick: PropTypes.func.isRequired,
};
