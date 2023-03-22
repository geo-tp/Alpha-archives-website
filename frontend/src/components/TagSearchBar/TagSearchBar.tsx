import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { forbiddenInputChar } from "../../config/input";
import { setTagDropdownIsOpen } from "../../features/browse/store/actions";

type TagSearchBarType = {
  isDisabled: boolean;
  handleTagCreation: Function | null;
  showCreateButton: boolean;
  keywords: string;
  setKeywords: Function;
};

export const TagSearchBar = (props: TagSearchBarType) => {
  const [buzzForForbiddenChar, setBuzzForForbiddenChar] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e: FormEvent) => {
    const target = e.target as HTMLFormElement;
    const newValue = target.value;
    const lastChar = newValue[newValue.length - 1];

    // to display buzz when a bad char is typed in tag search input
    if (forbiddenInputChar.includes(lastChar)) {
      setBuzzForForbiddenChar(true);
      setTimeout(() => {
        setBuzzForForbiddenChar(false);
      }, 500);
      return;
    }

    props.setKeywords(newValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (props.handleTagCreation) {
      props.handleTagCreation(props.keywords);
    }
  };

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={(e) => handleSubmit(e)}
      className={
        buzzForForbiddenChar
          ? "tag-search-bar tag-search-bar--buzz"
          : "tag-search-bar "
      }
    >
      <div className="tag-search-bar__icon">#</div>
      <input
        style={
          props.showCreateButton
            ? {}
            : {
                borderBottomRightRadius: 10 + "px",
                borderTopRightRadius: 10 + "px",
              }
        }
        className="tag-search-bar__input"
        type="text"
        disabled={props.isDisabled}
        autoFocus={props.isDisabled ? false : true}
        onFocus={() => dispatch(setTagDropdownIsOpen(true))}
        placeholder="Search and select tags"
        onChange={handleInputChange}
        value={props.keywords}
      />
      {props.showCreateButton && (
        <button
          disabled={props.isDisabled ? true : false}
          className="tag-search-bar__submit"
          type="submit"
          title="Click to create a new tag"
        >
          <i className="fa fa-plus"></i>New
        </button>
      )}
    </form>
  );
};
