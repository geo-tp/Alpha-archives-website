import { FileType, TagType } from "../../../types/index";

type browserDefaultStateType = {
  files: FileType[];
  media: FileType[];
  tags: TagType[];
  searchTags: TagType[];
  selectedMedia: FileType | null;
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
