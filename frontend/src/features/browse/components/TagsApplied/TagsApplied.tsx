import { AppliedTagType } from "../../../../types";
import { TagApplied } from "../TagApplied/TagApplied";

export const TagsApplied = (props: { tags: AppliedTagType[] }) => {
  return (
    <div className="applied-tags">
      {props.tags.map((tag) => (
        <TagApplied key={`applied-tag-${tag.tag}-${tag.id}`} tag={tag} />
      ))}
    </div>
  );
};
