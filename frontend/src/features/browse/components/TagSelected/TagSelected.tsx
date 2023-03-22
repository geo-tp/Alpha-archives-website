import { TagType } from "../../../../types";

export const TagsSelected = (props: {
  selectedTags: TagType[];
  handleRemoveTagClick: Function;
}) => {
  return (
    <div className="tag-selected">
      {props.selectedTags.map((tag, index) => (
        <div
          key={`selected-tags-${tag.name}-${index}`}
          className="tag-selected-element"
        >
          <div>{tag.name}</div>
          <button className="tag-selected-element__close">
            <i
              onClick={() => props.handleRemoveTagClick(tag)}
              className="fa fa-close"
            ></i>
          </button>
        </div>
      ))}
    </div>
  );
};
