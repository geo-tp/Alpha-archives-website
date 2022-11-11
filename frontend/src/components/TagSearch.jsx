import { SelectedTags } from "./SelectedTags";
import { TagSelector } from "./TagSelector";
import PropTypes from "prop-types";
import { useState } from "react";

export const TagSearch = ({
  tags,
  selectedTags,
  handleTagClick,
  handleRemoveTagClick,
}) => {
  const [newSelectedTags, setNewSelectedTags] = useState(selectedTags);

  return (
    <div className="tag-search">
      <TagSelector
        tags={tags}
        handleTagClick={handleTagClick}
        showCreateButton={false}
      />
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
