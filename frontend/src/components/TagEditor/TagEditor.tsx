import { useEffect, useState } from "react";
import { TagType } from "../../types";

type TagEditorType = {
  tag: TagType | null;
  handleUpdate: Function;
  handleDelete: Function;
};

export const TagEditor = (props: TagEditorType) => {
  const [tagNewValue, setTagNewValue] = useState(props.tag?.name);

  useEffect(() => {
    setTagNewValue(props.tag?.name);
  }, [props.tag]);

  return (
    <div className="tag-editor">
      <input
        value={tagNewValue || ""}
        onChange={(e) => setTagNewValue(e.target.value)}
        type="text"
        placeholder="Select tag to use me"
        disabled={props.tag ? false : true}
      />
      <button
        disabled={props.tag == null}
        onClick={() => props.handleUpdate(props.tag?.name, tagNewValue)}
        className="tag-editor__button tag-editor__button--valid"
      >
        <i className="fa fa-check"></i>
      </button>
      <button
        onClick={() => props.handleDelete(props.tag?.name)}
        disabled={props.tag == null}
        className="tag-editor__button tag-editor__button--erase"
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
};
