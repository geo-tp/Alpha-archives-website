import { SelectedTags } from "./SelectedTags";
import { TagSelector } from "./TagSelector";
import PropTypes from "prop-types";
import { useState } from "react";
import { searchTagsByKeywords } from "../utils/search";

export const TagSearch = ({
  tags,
  selectedTags,
  handleTagClick,
  handleRemoveTagClick,
}) => {
  const [newSelectedTags, setNewSelectedTags] = useState(selectedTags);

  const handleAddSelectedTags = (tag) => {
    let tags = newSelectedTags;
    tags.unshift(tag);
    setNewSelectedTags(tags);
  };

  return (
    <div className="tag-search">
      <TagSelector tags={tags} handleTagClick={handleTagClick} />
      <SelectedTags
        selectedTags={selectedTags}
        handleRemoveTagClick={handleRemoveTagClick}
      />
    </div>
  );
};

TagSearch.propTypes = {
  tags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  selected_tags: PropTypes.array.isRequired,
  handleRemoveTagClick: PropTypes.func.isRequired,
};
