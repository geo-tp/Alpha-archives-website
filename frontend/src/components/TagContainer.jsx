import { useState } from "react";
import { TagUi } from "./TagUi";

export const TagContainer = ({ tags }) => {
  const [tagBoxIsOpen, setTagBoxIsOpen] = useState(false);

  return (
    <div className="tag-container">
      <button
        onClick={() => setTagBoxIsOpen(!tagBoxIsOpen)}
        className="tag-element"
      >
        <i className="fa fa-angle-down"></i>Tags
      </button>
      <span className="tag-element">One</span>
      <span className="tag-element">One</span>
      <span className="tag-element">Two Three</span>
      <span className="tag-element">Two Three Four</span>
      <span className="tag-element">Two Three Four</span>
      <span className="tag-element">Two Three Four Five</span>
      <span className="tag-element">Two Three Four Five</span>
      {tagBoxIsOpen && <TagUi />}
    </div>
  );
};
