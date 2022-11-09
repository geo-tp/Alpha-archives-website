import { useState } from "react";
import { TagUi } from "./TagUi";
import PropTypes from "prop-types";
import { fetchApplyTag } from "../api/fetchApplyTag";

export const TagContainer = ({ fileTags, tags, file }) => {
  const [tagBoxIsOpen, setTagBoxIsOpen] = useState(false);
  const [newFileTags, setNewFileTags] = useState(fileTags ? fileTags : []);

  console.log("file", file);

  const handleTagClick = async (tagName) => {
    const response = await fetchApplyTag(tagName, file.image_hash);
    const createdTag = response.body;
    let tags = newFileTags;
    tags.unshift(createdTag);
    setNewFileTags(tags);
    console.log("NEW TAGS", tags);
  };

  return (
    <div className="tag-container">
      <button
        onClick={() => setTagBoxIsOpen(!tagBoxIsOpen)}
        className="tag-container__selector"
      >
        <i className="fa fa-angle-down"></i>Tags
      </button>
      <div className="tag-container__tags">
        {newFileTags?.map((tag) => (
          <span className="tag-element">{tag.tag}</span>
        ))}
      </div>
      {tagBoxIsOpen && (
        <TagUi
          tags={tags}
          file={file}
          fileTags={newFileTags}
          handleTagClick={handleTagClick}
        />
      )}
    </div>
  );
};

TagContainer.propTypes = {
  tags: PropTypes.array.isRequired,
  fileTags: PropTypes.array.isRequired,
  file: PropTypes.object.isRequired,
};
