import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { TagDropDown } from "../../../../components/TagDropDown";
import { TagSearchBar } from "../../../../components/TagSearchBar";
import { useOutsideBox } from "../../../../hooks/useOutsideBox";
import { TagType } from "../../../../types";
import { searchTagsByKeywords } from "../../../../utils/tags";
import { getFiles } from "../../api/getFiles";
import { getFilesByTags } from "../../api/getFilesByTags";
import { setTagDropdownIsOpen } from "../../store/actions";
import { selectBrowser } from "../../store/selectors";
import { TagsSelected } from "../TagSelected";

export const TagSearch = () => {
  const dispatch = useDispatch();
  const browserState = useSelector(selectBrowser);

  const [keywords, setKeywords] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [filteredTags, setFilteredTags] = useState<TagType[]>(
    browserState.tags
  );

  const filesByTags = useMutation((selectedTags: TagType[]) =>
    getFilesByTags(selectedTags)
  );

  const filesByFolder = useMutation((folderName: string) =>
    getFiles(folderName)
  );

  useEffect(() => {
    if (selectedTags.length) {
      filesByTags.mutate(selectedTags);
    } else {
      const currentPath = [...browserState.currentPath];
      const last = currentPath.pop();

      filesByFolder.mutate(last);
    }
  }, [selectedTags]);

  const tagSearchRef = useRef(null);
  useOutsideBox(tagSearchRef, () => dispatch(setTagDropdownIsOpen(false)));

  useEffect(() => {
    if (browserState.tags?.length) {
      setFilteredTags(searchTagsByKeywords(keywords, browserState.tags));
    }
  }, [keywords, browserState.tags]);

  const handleTagClick = (tag: TagType) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const handleRemoveTagClick = (tag: TagType) => {
    const updatedTags = selectedTags.filter((t) => t.name !== tag.name);
    setSelectedTags(updatedTags);
  };

  return (
    <div className="tag-search" ref={tagSearchRef}>
      <TagSearchBar
        isDisabled={false}
        handleTagCreation={null}
        showCreateButton={false}
        keywords={keywords}
        setKeywords={setKeywords}
      />
      <TagsSelected
        selectedTags={selectedTags}
        handleRemoveTagClick={handleRemoveTagClick}
      />
      {browserState.isTagDropdownOpen && (
        <TagDropDown
          tags={filteredTags}
          handleTagClick={handleTagClick}
          isLoading={false}
        />
      )}
    </div>
  );
};
