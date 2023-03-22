import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { CardForm } from "../../../../components/CardForm";
import { TagDropDown } from "../../../../components/TagDropDown";
import { TagEditor } from "../../../../components/TagEditor";
import { TagSearchBar } from "../../../../components/TagSearchBar";
import { TagType } from "../../../../types";
import { searchTagsByKeywords } from "../../../../utils/tags";
import { getTags } from "../../../../api/getTags";
import { updateTag } from "../../api/updateTag";
import { deleteTag } from "../../api/deleteTag";
import { createTag } from "../../../../api/createTag";

export const CardTag = () => {
  const [keywords, setKeywords] = useState("");
  const [filteredTags, setFilteredTags] = useState<TagType[]>([]);
  const [tagSelected, setTagSelected] = useState<TagType | null>(null);

  // QUERIES
  const tags = useQuery("tags", getTags);
  const update = useMutation(
    (variables: { tagName: string; newTagName: string }) => updateTag(variables)
  );
  const delete_ = useMutation((tagName: string) => deleteTag(tagName));
  const create = useMutation((tagName: string) => createTag(tagName));

  // Filter by keywords
  useEffect(() => {
    if (tags.data?.body) {
      const filtered = searchTagsByKeywords(keywords, tags.data?.body);
      setFilteredTags(filtered);
    }
  }, [keywords, tags.data]);

  const handleTagCreation = async (tagName: string) => {
    await create.mutateAsync(tagName);
    tags.refetch();
  };

  const handleTagDeletion = async (tagName: string) => {
    await delete_.mutateAsync(tagName);
    tags.refetch();
    setTagSelected(null);
  };

  const handleTagUpdate = async (tagName: string, newTagName: string) => {
    if (tagName === newTagName) {
      return;
    }

    const res = await update.mutateAsync({ tagName, newTagName });

    if (res?.name === newTagName) {
      tags.refetch();
      setTagSelected(res);
    }
  };

  return (
    <CardForm title="Tags" icon="tag">
      <div className="card-form__infos">
        You can edit or remove your tags. Warning, if you delete a tag, it will
        be removed from all elements.
      </div>

      <TagSearchBar
        isDisabled={false}
        handleTagCreation={handleTagCreation}
        showCreateButton={true}
        keywords={keywords}
        setKeywords={setKeywords}
      />
      <TagDropDown
        tags={filteredTags}
        handleTagClick={setTagSelected}
        tagSelected={tagSelected}
        fileTags={[]}
        isLoading={false}
      />
      <TagEditor
        tag={tagSelected}
        handleUpdate={handleTagUpdate}
        handleDelete={handleTagDeletion}
      />
    </CardForm>
  );
};
