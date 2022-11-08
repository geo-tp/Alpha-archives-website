import { SelectedTags } from "./SelectedTags";
import { TagSelector } from "./TagSelector";

export const TagSearch = () => {
  return (
    <div className="tag-search">
      <TagSelector />
      <SelectedTags />
    </div>
  );
};
