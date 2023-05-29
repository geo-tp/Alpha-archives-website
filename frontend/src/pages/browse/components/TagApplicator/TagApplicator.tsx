import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createTag } from "../../../../api/createTag";
import { getTags } from "../../../../api/getTags";
import { TagDropDown } from "../../../../components/TagDropDown";
import { TagSearchBar } from "../../../../components/TagSearchBar";
import { TagType } from "../../../../types";
import { searchTagsByKeywords } from "../../../../utils/tags";
import { createAppliedTag } from "../../../../api/createAppliedTag";
import { deleteAppliedTag } from "../../../../api/deleteAppliedTag";
import { useDispatch, useSelector } from "react-redux";
import { selectBrowser } from "../../store/selectors";
import { selectAuth } from "../../../../store/slices/auth/selectors";
import {
  addFileTag,
  removeFileTag,
  setSearchKeywords,
} from "../../store/actions";
import { Link } from "react-router-dom";

export const TagApplicator = () => {
  const authState = useSelector(selectAuth);
  const browserState = useSelector(selectBrowser);
  const dispatch = useDispatch();

  const tags = useQuery("tags", getTags);
  const applyTag = useMutation(
    (variables: { tagName: string; fileHash: string }) =>
      createAppliedTag(variables)
  );
  const deapplyTag = useMutation((tagId: number) => deleteAppliedTag(tagId));
  const createNewTag = useMutation((tagName: string) => createTag(tagName));
  const [keywords, setKeywords] = useState("");
  const [filteredTags, setFilteredTags] = useState<TagType[]>([]);

  // Filter by keywords
  useEffect(() => {
    if (tags.data?.body) {
      const filtered = searchTagsByKeywords(keywords, tags.data?.body);
      setFilteredTags(filtered);
    }
  }, [keywords, tags.data]);

  const handleTagCreation = async () => {
    if (keywords) {
      await createNewTag.mutateAsync(keywords);
      tags.refetch();
      setKeywords("");
    }
  };

  const handleTagClick = async (tag: TagType) => {
    if (browserState.selectedMedia.tags === undefined) {
      return;
    }

    for (let appliedTag of browserState.selectedMedia.tags) {
      if (appliedTag.tag === tag.name) {
        await deapplyTag.mutateAsync(appliedTag.id);
        dispatch(removeFileTag(appliedTag));
        return;
      }
    }

    const newTag = await applyTag.mutateAsync({
      tagName: tag.name,
      fileHash: browserState.selectedMedia?.image_hash || "",
    });

    dispatch(addFileTag(newTag.body));
  };

  return (
    <div className="tag-applicator">
      {!authState.isConnected && (
        <div className="tag-applicator__restricted">
          <p>
            <Link to="/login">login</Link> to add tags
          </p>
        </div>
      )}
      <TagSearchBar
        isDisabled={createNewTag.isLoading || !authState.isConnected}
        handleTagCreation={handleTagCreation}
        showCreateButton={true}
        keywords={browserState.searchKeywords}
        setKeywords={(keywords: string) =>
          dispatch(setSearchKeywords(keywords))
        }
      />
      <TagDropDown
        tags={filteredTags}
        handleTagClick={handleTagClick}
        isLoading={applyTag.isLoading || deapplyTag.isLoading}
        fileTags={browserState.selectedMedia.tags}
      />
    </div>
  );
};
