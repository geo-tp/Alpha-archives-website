import { ApiResponse } from "./ApiResponse";
import { TagSelector } from "./TagSelector";

export const UserTagsForm = ({
  handleTagSelection,
  handleTagCreate,
  userTags,
  tagSelected,
  tagBoxIsLoading,
  tagApiResponse,
  tagNewValue,
  handleEditTagInputChange,
  editTagInputRef,
  handleTagDelete,
  handleTagUpdate,
}) => {
  return (
    <div className="profile__box">
      <h2>
        Tags <i className="fa fa-tag"></i>
      </h2>
      <p className="profile__infos">
        You can edit or remove your tags. Warning, if you delete a tag, it will
        be removed from all elements.
      </p>
      <div className="profile__tag-box">
        {userTags && (
          <TagSelector
            handleTagClick={handleTagSelection}
            handleTagCreateClick={handleTagCreate}
            tags={userTags}
            showOnFocus={false}
            tagSelected={tagSelected}
            isLoading={tagBoxIsLoading}
          />
        )}
        {!userTags?.length && <p>You don't have tags yet</p>}
        {tagApiResponse?.error && (
          <ApiResponse
            message={tagApiResponse?.body.name}
            isError={tagApiResponse.error}
          />
        )}
        <div className="profile__tag-box__edit">
          <input
            value={tagNewValue || ""}
            onChange={handleEditTagInputChange}
            className="profile__tag-box__edit__bar"
            type="text"
            placeholder="Select tag to use me"
            disabled={tagSelected ? false : true}
            ref={editTagInputRef}
          />
          <button
            disabled={tagSelected && !tagBoxIsLoading ? false : true}
            onClick={handleTagUpdate}
            className="profile__tag-box__edit__button profile__tag-box__edit__button--valid"
          >
            <i className="fa fa-check"></i>
          </button>
          <button
            onClick={handleTagDelete}
            disabled={tagSelected && !tagBoxIsLoading ? false : true}
            className="profile__tag-box__edit__button profile__tag-box__edit__button--erase"
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
