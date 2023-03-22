import { useRef } from "react";
import { TagApplicator } from "../TagApplicator/TagApplicator";
import { ButtonTag } from "../ButtonTag";
import { Magnifier } from "../Magnifier";
import { useDispatch, useSelector } from "react-redux";
import { TagsApplied } from "../TagsApplied/TagsApplied";
import { selectBrowser } from "../../store/selectors";
import {
  setLightboxIsOpen,
  setSelectedMedia,
  setTagAplicatorIsOpen,
} from "../../store/actions";
import { useOutsideBox } from "../../../../hooks/useOutsideBox";

export const Lightbox = () => {
  const dispatch = useDispatch();
  const browserState = useSelector(selectBrowser);

  const tagApplicatorRef = useRef(null);
  useOutsideBox(tagApplicatorRef, () => dispatch(setTagAplicatorIsOpen(false)));

  const nextImage = () => {
    let newIndex: number;

    const mediaIndex = browserState.media.indexOf(browserState.selectedMedia);

    if (mediaIndex + 1 > browserState.media.length - 1) {
      newIndex = 0;
    } else {
      newIndex = mediaIndex + 1;
    }

    dispatch(setSelectedMedia(browserState.media[newIndex]));
  };

  const previousImage = () => {
    let newIndex: number;
    const mediaIndex = browserState.media.indexOf(browserState.selectedMedia);

    if (mediaIndex - 1 < 0) {
      newIndex = browserState.media.length - 1;
    } else {
      newIndex = mediaIndex - 1;
    }

    dispatch(setSelectedMedia(browserState.media[newIndex]));
  };

  const handleKeyDown = (e: any) => {
    const ESC = 27;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    if (e.keyCode === RIGHT_ARROW) {
      nextImage();
    } else if (e.keyCode === LEFT_ARROW) {
      previousImage();
    } else if (e.keyCode === ESC) {
      dispatch(setLightboxIsOpen(false));
    }
  };

  return (
    <div className="light-box" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
      <span className="light-box__images-count">
        {browserState.media.indexOf(browserState.selectedMedia) + 1}/
        {browserState.media.length}
      </span>
      <button
        className="light-box__arrow--left light-box__arrow"
        onClick={previousImage}
      >
        <i className="fa fa-3x fa-angle-left"></i>
      </button>
      <div ref={tagApplicatorRef}>
        <ButtonTag />
        <TagsApplied tags={browserState.selectedMedia?.tags || []} />
        {browserState.isTagApplicatorOpen && <TagApplicator />}
      </div>
      <div className="light-box__image-container">
        <Magnifier image={browserState.selectedMedia?.image_raw} />
      </div>

      <button
        className="light-box__arrow  light-box__arrow--right"
        onClick={nextImage}
      >
        <i className="fa fa-3x fa-angle-right"></i>
      </button>
      <button
        onClick={() => dispatch(setLightboxIsOpen(false))}
        className="light-box__close fa fa-close fa-2x close-menu-cross"
      ></button>

      <p className="light-box__filename">
        <strong>{browserState.selectedMedia?.filename}</strong>
      </p>
    </div>
  );
};
