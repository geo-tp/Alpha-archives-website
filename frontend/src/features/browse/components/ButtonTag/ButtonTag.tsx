import { useDispatch, useSelector } from "react-redux";
import { setTagAplicatorIsOpen } from "../../store/actions";
import { selectBrowser } from "../../store/selectors";

export const ButtonTag = () => {
  const browserState = useSelector(selectBrowser);
  const dispatch = useDispatch();

  return (
    <button
      className="button-tag"
      onClick={() => dispatch(setTagAplicatorIsOpen(true))}
    >
      {browserState.isTagApplicatorOpen ? (
        <i className="button-tag__icon--reverse fa fa-angle-down"></i>
      ) : (
        <i className="fa fa-angle-down"></i>
      )}
      Tags
    </button>
  );
};
