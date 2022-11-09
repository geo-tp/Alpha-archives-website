import { useEffect, useRef, useState } from "react";
import { TagUi } from "./TagUi";
import PropTypes from "prop-types";
import { fetchApplyTag } from "../api/fetchApplyTag";
import { fetchRemoveApplyTag } from "../api/fetchRemoveApplyTag";
export const TagContainer = ({ fileTags, tags, file }) => {
  const [tagBoxIsOpen, setTagBoxIsOpen] = useState(false);
  const [newFileTags, setNewFileTags] = useState(fileTags ? fileTags : []);
  const wrapperRef = useRef(null);
  useOutsideBox(wrapperRef);

  function useOutsideBox(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setTagBoxIsOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleTagClick = async (tag) => {
    if (newFileTags.some((item) => item.tag === tag.name)) {
      // const response = await fetchRemoveApplyTag(tag);
      const tags = newFileTags;

      for (let tagApplied of newFileTags) {
        if (tagApplied.tag === tag.name) {
          console.log("tag appied", tagApplied);
          const response = await fetchRemoveApplyTag(tagApplied);
          const index = newFileTags.indexOf(tagApplied);
          tags.splice(index, 1);
          setNewFileTags([...tags]);
          return;
        }
      }
    }

    const response = await fetchApplyTag(tag.name, file.image_hash);
    const createdTag = response.body;
    console.log("CREATED", createdTag);
    let tags = newFileTags;
    setNewFileTags([...tags, createdTag]);
    console.log("NEW TAGS", tags);
  };

  return (
    <div className="tag-container" ref={wrapperRef}>
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
