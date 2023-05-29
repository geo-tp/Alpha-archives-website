import { FileType } from "./../../../types/index";
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
import { updateFiles } from "../../../utils/media";

export const browserReducer = (
  state = browserDefaultState,
  action: AnyAction
) => {
  var newMediaFiles = [] as FileType[];
  var newFiles = [] as FileType[];
  var newSelectedMedia = {} as FileType;

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
      if (!state.selectedMedia) {
        return { ...state };
      }

      const mediaTags = state.selectedMedia?.tags || [];
      const tagToRemove = action.payload;
      const filteredTags = mediaTags.filter(
        (applyedTag) => applyedTag.id !== tagToRemove.id
      );

      newSelectedMedia = { ...state.selectedMedia, tags: filteredTags };
      [newFiles, newMediaFiles] = updateFiles(newSelectedMedia, state.files);

      return {
        ...state,
        selectedMedia: newSelectedMedia,
        media: newMediaFiles,
        files: newFiles,
      };

    case ADD_FILE_TAG:
      if (!state.selectedMedia) {
        return { ...state };
      }

      const tags = [...state.selectedMedia.tags, action.payload];
      newSelectedMedia = { ...state.selectedMedia, tags: tags };

      [newFiles, newMediaFiles] = updateFiles(newSelectedMedia, state.files);

      return {
        ...state,
        selectedMedia: newSelectedMedia,
        media: newMediaFiles,
        files: newFiles,
      };

    default:
      return state;
  }
};
