import { useState } from "react";
import { TagDropDown } from "./TagDropDown";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
import { searchTagsByKeywords } from "../utils/search";
const forbiddenInputChar = ".?/!%*µ$^)'(#&@+²,;:<>`+°¨{}[]|ø¹^" + '"';

export const TagSelector = ({ tags, handleTagClick, showOnFocus = true }) => {
  const [displayTagDropDown, setDisplayTagDropDown] = useState(
    showOnFocus ? false : true
  );
  const wrapperRef = useRef(null);

  useOutsideBox(wrapperRef);

  useEffect(() => {
    setFilteredTags(tags);
  }, [tags]);

  const [searchKeywords, setSearchKeywords] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);
  const [buzzForForbiddenChar, setBuzzForForbiddenChar] = useState(false);
  console.log("FILTERED TAGS", filteredTags);

  const handleSearchInputChange = (e) => {
    const newValue = e.target.value;
    const lastChar = newValue[newValue.length - 1];

    if (forbiddenInputChar.includes(lastChar)) {
      setBuzzForForbiddenChar(true);
      setTimeout(() => {
        setBuzzForForbiddenChar(false);
      }, 500);
      return;
    }

    console.log();

    if (newValue === "") {
      setFilteredTags(tags);
      setSearchKeywords(newValue);
      return;
    }

    setSearchKeywords(newValue);
    const resultsTags = searchTagsByKeywords(newValue, tags);
    setFilteredTags(resultsTags);
  };

  function useOutsideBox(ref) {
    useEffect(() => {
      /**
       * if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (showOnFocus && ref.current && !ref.current.contains(event.target)) {
          setDisplayTagDropDown(false);
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

  return (
    <div ref={wrapperRef} className="tag-selector">
      <div className="tag-selector__search">
        <form
          action=""
          className={
            buzzForForbiddenChar
              ? "tag-selector__search__form tag-selector__search__form--buzz"
              : "tag-selector__search__form "
          }
        >
          <div className="tag-selector__icon">#</div>
          <input
            className="tag-selector__search__bar"
            type="text"
            autoFocus={true}
            placeholder="Search and select tags"
            onFocus={() => {
              setDisplayTagDropDown(true);
            }}
            onChange={handleSearchInputChange}
            value={searchKeywords}
          />
        </form>
        {displayTagDropDown && (
          <TagDropDown tags={filteredTags} handleTagClick={handleTagClick} />
        )}
      </div>
    </div>
  );
};

TagSelector.propTypes = {
  tags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  showOnFocus: PropTypes.bool,
};
