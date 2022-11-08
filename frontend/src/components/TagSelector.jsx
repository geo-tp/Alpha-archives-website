import { useState } from "react";
import { SelectedTags } from "./SelectedTags";
import { TagDropDown } from "./TagDropDown";

export const TagSelector = () => {
  const [displayTagDropDown, setDisplayTagDropDown] = useState();

  return (
    <div className="tag-selector">
      <div className="tag-selector__search">
        <form action="">
          <div className="tag-selector__icon">#</div>
          <input
            className="tag-selector__search__bar"
            type="text"
            autoFocus={true}
            placeholder="Search and select tags"
            onFocus={() => {
              console.log("FOCUS");
              setDisplayTagDropDown(true);
            }}
            onBlur={() => {
              console.log("FOCUS");
              setDisplayTagDropDown(false);
            }}
          />
        </form>
        {displayTagDropDown && <TagDropDown />}
      </div>
    </div>
  );
};
