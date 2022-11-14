import PropTypes from "prop-types";

export const TagDropDown = ({
  tags,
  handleTagClick,
  tagSelected = null,
  fileTags = null,
  isLoading = false,
}) => {
  const defaultClass = "tag-element tag-element--dropdown";
  const selectedClass = defaultClass + " tag-element--green";

  if (fileTags) {
    return (
      <div className="tag-dropdown">
        {tags?.map((tag) => (
          <button
            key={`tag-dropdown-button-${tag.name}`}
            className={
              fileTags.some((item) => item.tag === tag.name)
                ? selectedClass
                : defaultClass
            }
            title={
              fileTags.some((item) => item.tag === tag.name)
                ? "Click to remove"
                : "Click to apply"
            }
            onClick={() => handleTagClick(tag.name)}
            disabled={isLoading ? true : false}
          >
            {tag.name}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="tag-dropdown">
      {tags?.map((tag) => (
        <button
          key={`tag-dropdown-button2-${tag.name}`}
          className={tag.name === tagSelected ? selectedClass : defaultClass}
          onClick={() => handleTagClick(tag.name)}
          disabled={isLoading ? true : false}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

TagDropDown.propTypes = {
  tags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  tagSelected: PropTypes.string,
  fileTags: PropTypes.array,
  isLoading: PropTypes.bool,
};
