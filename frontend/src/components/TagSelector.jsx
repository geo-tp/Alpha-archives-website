import { useState } from "react";
import { TagDropDown } from "./TagDropDown";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";

export const TagSelector = ({ tags, handleTagClick }) => {
  const [displayTagDropDown, setDisplayTagDropDown] = useState();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
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
        <form action="">
          <div className="tag-selector__icon">#</div>
          <input
            className="tag-selector__search__bar"
            type="text"
            autoFocus={true}
            placeholder="Search and select tags"
            onFocus={() => {
              setDisplayTagDropDown(true);
            }}
          />
        </form>
        {displayTagDropDown && (
          <TagDropDown tags={tags} handleTagClick={handleTagClick} />
        )}
      </div>
    </div>
  );
};

TagSelector.propTypes = {
  tags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
};
