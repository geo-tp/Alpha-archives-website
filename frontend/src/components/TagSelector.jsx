import { useState } from "react";
import { TagDropDown } from "./TagDropDown";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
import { searchTagsByKeywords } from "../utils/search";
import Loading from "./Loading";
import { forbiddenInputChar } from "../utils/string";

export const TagSelector = ({
  tags,
  tagSelected,
  fileTags = null,
  handleTagClick,
  handleTagCreateClick,
  showOnFocus = true,
  showCreateButton = true,
  isLoading = false,
}) => {
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

  const handleTagCreation = (e) => {
    e.preventDefault();
    handleTagCreateClick(searchKeywords);
    setSearchKeywords("");
  };

  const handleSearchInputChange = (e) => {
    const newValue = e.target.value;
    const lastChar = newValue[newValue.length - 1];

    // to display buzz when a bad char is typed in tag search input
    if (forbiddenInputChar.includes(lastChar)) {
      setBuzzForForbiddenChar(true);
      setTimeout(() => {
        setBuzzForForbiddenChar(false);
      }, 500);
      return;
    }

    // go back to default dataset
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
      {isLoading && (
        <div className="tag-selector__loader">
          <Loading />
        </div>
      )}
      <div className="tag-selector__search">
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onSubmit={(e) => handleTagCreation(e)}
          className={
            buzzForForbiddenChar
              ? "tag-selector__search__form tag-selector__search__form--buzz"
              : "tag-selector__search__form "
          }
        >
          <div className="tag-selector__icon">#</div>
          <input
            style={
              showCreateButton
                ? {}
                : {
                    borderBottomRightRadius: 10 + "px",
                    borderTopRightRadius: 10 + "px",
                  }
            }
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
          {showCreateButton && (
            <button
              // disabled={auth.isConnected ? false : true}
              className="tag-selector__search__submit"
              type="submit"
              title="Click to create a new tag"
            >
              <i className="fa fa-plus"></i>New
            </button>
          )}
        </form>
        {displayTagDropDown && (
          <TagDropDown
            tags={filteredTags}
            tagSelected={tagSelected}
            handleTagClick={handleTagClick}
            fileTags={fileTags}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

TagSelector.propTypes = {
  tags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  showOnFocus: PropTypes.bool,
  isLoading: PropTypes.bool,
};
