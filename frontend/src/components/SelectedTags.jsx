import PropTypes from "prop-types";

export const SelectedTags = ({ selectedTags, handleRemoveTagClick }) => {
  return (
    <div className="selected-tags">
      {selectedTags.map((tag, index) => (
        <div
          key={`selected-tags-${tag.name}-${index}`}
          className="tag-selected-element"
        >
          {tag}{" "}
          <button className="tag-selected-element__close">
            <i
              onClick={() => handleRemoveTagClick(tag)}
              className="fa fa-close"
            ></i>
          </button>
        </div>
      ))}
    </div>
  );
};

SelectedTags.propTypes = {
  selected_tags: PropTypes.array,
  handleRemoveTagClick: PropTypes.func.isRequired,
};
