import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { fetchApplyTag } from "../api/fetchApplyTag";
import { fetchRemoveApplyTag } from "../api/fetchRemoveApplyTag";
import { TagSelector } from "./TagSelector";
import { fetchCreateTag } from "../api/fetchCreateTag";
export const TagContainer = ({
  fileTags,
  tags,
  file,
  createTagInState,
  updateFileInState,
}) => {
  const [tagBoxIsOpen, setTagBoxIsOpen] = useState(false);
  const [newFileTags, setNewFileTags] = useState(fileTags ? fileTags : []);
  const [tagSelected, setTagSelected] = useState(null);
  const wrapperRef = useRef(null);
  useOutsideBox(wrapperRef);

  useEffect(() => {
    setNewFileTags(fileTags);
  }, [fileTags]);

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

  const handleCreateTagClick = async (searchKeywords) => {
    if (!searchKeywords) {
      return;
    }

    const response = await fetchCreateTag(searchKeywords);
    if (!response.error) {
      const newTag = response.body;
      createTagInState(newTag);
      // setFilteredTags([newTag, ...tags]);
    }
  };

  const handleTagClick = async (tag) => {
    if (newFileTags.some((item) => item.tag === tag)) {
      console.log("LE TAG", tag);
      // const response = await fetchRemoveApplyTag(tag);
      const updatedFileTags = newFileTags;

      for (let tagApplied of newFileTags) {
        if (tagApplied.tag === tag) {
          const response = await fetchRemoveApplyTag(tagApplied);
          const index = newFileTags.indexOf(tagApplied);
          updatedFileTags.splice(index, 1);
          setNewFileTags([...updatedFileTags]);
          return;
        }
      }
    }

    const response = await fetchApplyTag(tag, file.image_hash);
    const createdTag = response.body;
    const newTags = [createdTag, ...file.tags];
    console.log("n new TAGS", newTags);
    const updatedFile = { ...file, tags: newTags };
    console.log("NEW FILE", updatedFile);
    updateFileInState(updatedFile);
    setNewFileTags([createdTag, ...fileTags]);
  };

  return (
    <div className="tag-container" ref={wrapperRef}>
      <button
        onClick={() => setTagBoxIsOpen(!tagBoxIsOpen)}
        className="tag-container__selector"
      >
        <i
          className={
            tagBoxIsOpen
              ? "fa fa-angle-down tag-container__selector__icon--reverse"
              : "fa fa-angle-down"
          }
        ></i>
        Tags
      </button>
      <div className="tag-container__tags">
        {newFileTags?.map((tag) => (
          <span className="tag-element">{tag.tag}</span>
        ))}
      </div>
      {tagBoxIsOpen && (
        <div className="tag-container__box">
          <TagSelector
            tags={tags}
            handleTagClick={handleTagClick}
            tagSelected={tagSelected}
            handleTagCreateClick={handleCreateTagClick}
            showOnFocus={false}
            fileTags={fileTags}
          />
        </div>
      )}
    </div>
  );
};

TagContainer.propTypes = {
  tags: PropTypes.array.isRequired,
  fileTags: PropTypes.array.isRequired,
  file: PropTypes.object.isRequired,
  createTagInState: PropTypes.func.isRequired,
};
