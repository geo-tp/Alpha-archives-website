import { useState } from "react";
import { TagDropDown } from "./TagDropDown";

export const TagSelector = () => {
  const [displayTagDropDown, setDisplayTagDropDown] = useState();

  return (
    <div className="tag-selector">
      <form action="">
        <input type="text" className="tag-selector__search" autoFocus={true} />
        <div className="tag-selector__icon"># Tag</div>
      </form>
      <TagDropDown />
    </div>
  );
};
