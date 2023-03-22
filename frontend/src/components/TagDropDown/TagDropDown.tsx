import { AppliedTagType, TagType } from "../../types";
import { Tag } from "../Tag/Tag";

type TagDropDownType = {
  tags: TagType[];
  handleTagClick: Function;
  tagSelected?: TagType | null;
  fileTags?: AppliedTagType[];
  isLoading: boolean;
};

export const TagDropDown = (props: TagDropDownType) => {
  if (props.fileTags?.length) {
    return (
      <div className="tag-dropdown">
        {props.tags?.map((tag) => (
          <Tag
            key={`tag-${tag.name}`}
            tag={tag}
            handleClick={props.handleTagClick}
            isDisabled={props.isLoading}
            isSelected={
              props.fileTags?.some((item) => item?.tag === tag?.name) || false
            }
          />
        ))}
      </div>
    );
  }
  return (
    <div className="tag-dropdown">
      {props.tags?.map((tag) => (
        <Tag
          key={`tag-${tag.name}`}
          tag={tag}
          handleClick={props.handleTagClick}
          isDisabled={props.isLoading}
          isSelected={tag?.name === props.tagSelected?.name}
        />
      ))}
    </div>
  );
};
