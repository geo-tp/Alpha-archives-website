import { AppliedTagType } from "../../../../types";

export const TagApplied = (props: { tag: AppliedTagType }) => {
  return (
    <span
      className="applied-tag"
      key={`tag-container-${props.tag.tag}-${props.tag.id}`}
    >
      {props.tag.tag}
    </span>
  );
};
