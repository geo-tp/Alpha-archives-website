import { useDispatch, useSelector } from "react-redux";
import { selectBrowser } from "../../store/selectors";
import {
  setCurrentPath,
  setTagDropdownIsOpen,
  setTagSearchIsOpen,
} from "../../store/actions";
import { TagSearch } from "../TagSearch";
import { TagType } from "../../../../types";

type BrowserHeaderType = {
  goBackDirectory: Function;
  goHomeDirectory: Function;
  handleTagClick: Function;
  handleRemoveTagClick: Function;
  tags: TagType[];
};

export const BrowserHeader = (props: BrowserHeaderType) => {
  const dispatch = useDispatch();
  const browserState = useSelector(selectBrowser);

  const handleTagSearchClick = () => {
    dispatch(setTagSearchIsOpen(!browserState.isTagSearchOpen));
    dispatch(setTagDropdownIsOpen(!browserState.isTagDropdownOpen));
  };

  return (
    <div className="browser-header">
      <button
        className="browser-header__button"
        onClick={() => props.goBackDirectory()}
      >
        <i className="fa fa-2x fa-arrow-left"></i>
      </button>
      <button
        className="browser-header__button"
        onClick={() => props.goHomeDirectory()}
      >
        <i className="fa fa-2x fa-home"></i>
      </button>
      <button
        className="browser-header__button"
        onClick={() => handleTagSearchClick()}
      >
        <i
          className={`fa fa-2x fa-${
            browserState.isTagSearchOpen ? "close" : "search"
          }`}
        ></i>
      </button>

      {browserState.isTagSearchOpen ? (
        <TagSearch />
      ) : (
        <span>{[...browserState.currentPath].join("/")}</span>
      )}
    </div>
  );
};
