import {
  ADD_FILE_TAG,
  REMOVE_FILE_TAG,
  SET_CURRENT_PATH,
  SET_FILES,
  SET_LIGHTBOX_IS_OPEN,
  SET_MEDIA,
  SET_SEARCH_KEYWORDS,
  SET_SELECTED_MEDIA,
  SET_TAGS,
  SET_TAG_APPLICATOR_IS_OPEN,
  SET_TAG_DROPDOWN_IS_OPEN,
  SET_TAG_SEARCH_IS_OPEN,
} from "./constants";
import { AnyAction } from "@reduxjs/toolkit";
import { browserDefaultState } from "./state";

export const browserReducer = (
  state = browserDefaultState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_MEDIA:
      return { ...state, media: action.payload };
    case SET_TAGS:
      return { ...state, tags: action.payload };
    case SET_SELECTED_MEDIA:
      return { ...state, selectedMedia: action.payload };
    case SET_LIGHTBOX_IS_OPEN:
      return { ...state, isLightboxOpen: action.payload };
    case SET_CURRENT_PATH:
      return { ...state, currentPath: action.payload };
    case SET_TAG_APPLICATOR_IS_OPEN:
      return { ...state, isTagApplicatorOpen: action.payload };
    case SET_TAG_DROPDOWN_IS_OPEN:
      return { ...state, isTagDropdownOpen: action.payload };
    case SET_TAG_SEARCH_IS_OPEN:
      return { ...state, isTagSearchOpen: action.payload };
    case SET_SEARCH_KEYWORDS:
      return { ...state, searchKeywords: action.payload };

    case REMOVE_FILE_TAG:
      const currentMedia = state.selectedMedia;
      const mediaTags = currentMedia?.tags || [];
      const tagToRemove = action.payload;
      const filteredTags = mediaTags.filter(
        (applyedTag) => applyedTag.id !== tagToRemove.id
      );

      const updatedMedia = { ...currentMedia, tags: filteredTags };

      return { ...state, selectedMedia: updatedMedia };

    case ADD_FILE_TAG:
      const media = state.selectedMedia;
      const tags = [...(media?.tags || []), action.payload];

      return { ...state, selectedMedia: { ...media, tags: tags } };

    default:
      return state;
  }
};
