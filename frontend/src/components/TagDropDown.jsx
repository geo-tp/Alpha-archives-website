import PropTypes from "prop-types";

export const TagDropDown = ({
  tags,
  handleTagClick,
  tagSelected = null,
  fileTags = null,
}) => {
  const defaultClass = "tag-element tag-element--dropdown";
  const selectedClass = defaultClass + " tag-element--green";
  console.log("tags", tags, "tag selected", tagSelected);

  if (fileTags) {
    return (
      <div className="tag-dropdown">
        {tags?.map((tag) => (
          <div
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
          >
            {tag.name}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="tag-dropdown">
      {tags?.map((tag) => (
        <div
          className={tag.name === tagSelected ? selectedClass : defaultClass}
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
