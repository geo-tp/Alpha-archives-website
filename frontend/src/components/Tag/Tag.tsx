import { TagType } from "../../types";

export const Tag = (props: {
  tag: TagType;
  handleClick: Function;
  isDisabled: boolean;
  isSelected: boolean;
}) => {
  const defaultClass = "tag tag--dropdown";
  const selectedClass = defaultClass + " tag--green";

  return (
    <button
      key={`tag-dropdown-button2-${props.tag?.name}`}
      className={props.isSelected ? selectedClass : defaultClass}
      onClick={() => props.handleClick(props.tag)}
      disabled={props.isDisabled}
    >
      {props.tag?.name}
    </button>
  );
};
