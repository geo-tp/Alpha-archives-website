import { MediaType, TagType } from "./../../../types/index";

type browserDefaultStateType = {
  files: MediaType[];
  media: MediaType[];
  tags: TagType[];
  searchTags: TagType[];
  selectedMedia: MediaType | null;
  currentPath: string[];
  isLightboxOpen: boolean;
  isTagApplicatorOpen: boolean;
  isTagSearchOpen: boolean;
  isTagDropdownOpen: boolean;
  searchKeywords: string;
};

export const browserDefaultState: browserDefaultStateType = {
  files: [],
  media: [],
  tags: [],
  selectedMedia: null,
  searchTags: [],
  currentPath: [],
  isLightboxOpen: false,
  isTagApplicatorOpen: false,
  isTagSearchOpen: false,
  isTagDropdownOpen: false,
  searchKeywords: "",
};
