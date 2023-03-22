import { AppliedTagType, TagType } from "./../../../types/index";
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
import { MediaType } from "../../../types";

export const setBrowserFiles = (files: MediaType[]) => ({
  type: SET_FILES,
  payload: files,
});

export const setBrowserMedia = (media: MediaType[]) => ({
  type: SET_MEDIA,
  payload: media,
});

export const setBrowserTags = (tags: TagType[]) => ({
  type: SET_TAGS,
  payload: tags,
});

export const setSelectedMedia = (media: MediaType) => ({
  type: SET_SELECTED_MEDIA,
  payload: media,
});

export const setSearchTags = (tags: TagType[]) => ({
  type: SET_TAGS,
  payload: tags,
});

export const setSearchKeywords = (keywords: string) => ({
  type: SET_SEARCH_KEYWORDS,
  payload: keywords,
});

export const setCurrentPath = (path: string[]) => ({
  type: SET_CURRENT_PATH,
  payload: path,
});

export const setLightboxIsOpen = (bool: boolean) => ({
  type: SET_LIGHTBOX_IS_OPEN,
  payload: bool,
});

export const setTagAplicatorIsOpen = (bool: boolean) => ({
  type: SET_TAG_APPLICATOR_IS_OPEN,
  payload: bool,
});

export const setTagDropdownIsOpen = (bool: boolean) => ({
  type: SET_TAG_DROPDOWN_IS_OPEN,
  payload: bool,
});

export const setTagSearchIsOpen = (bool: boolean) => ({
  type: SET_TAG_SEARCH_IS_OPEN,
  payload: bool,
});

export const removeFileTag = (tag: AppliedTagType) => ({
  type: REMOVE_FILE_TAG,
  payload: tag,
});

export const addFileTag = (tag: AppliedTagType) => ({
  type: ADD_FILE_TAG,
  payload: tag,
});
