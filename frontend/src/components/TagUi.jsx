import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchCreateTag } from "../api/fetchCreateTag";
import { getAuth } from "../store/features/auth/selectors";
import { searchTagsByKeywords } from "../utils/search";

export const TagUi = ({
  tags,
  file,
  fileTags,
  handleTagClick,
  createTagInState,
}) => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);

  const auth = useSelector(getAuth);

  const handleSearchInputChange = (e) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setFilteredTags(tags);
      return;
    }

    setSearchKeywords(newValue);
    const resultsTags = searchTagsByKeywords(newValue, tags);
    setFilteredTags(resultsTags);
  };

  const handleSubmitCreateTag = async (e) => {
    e.preventDefault();
    console.log("IN NEW CREATE");
    if (!searchKeywords) {
      return;
    }

    const response = await fetchCreateTag(searchKeywords);
    if (!response.error) {
      setSearchKeywords("");
      const newTag = response.body;
      createTagInState(newTag);
      setFilteredTags([newTag, ...tags]);
    }
  };

  // if (!auth.isStaff || !auth.isAdmin) {
  //   return (
  //     <div className="tag-ui tag-ui--restricted">
  //       <p className="tag-ui__restricted">
  //         You don't have persmissions to add tags
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="tag-ui">
      {!auth.isConnected && (
        <div className="tag-ui__restricted">
          <p>You don't have persmissions to add tags</p>
        </div>
      )}
      <p
        title="Hit a Grey Tag to apply it. Hit a Green Tag to remove it. If a tag doesnt exists, you can create it by pressing New"
        className="tag-ui__user-permission"
      >
        <i className="fa fa-info-circle"></i>
      </p>
      <form
        onSubmit={handleSubmitCreateTag}
        className="tag-ui__search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <label htmlFor="search-tag" className="tag-ui__label">
          Search or create a new tag
        </label>
        <div className="tag-ui__search__bar">
          <input
            type="search"
            name="search-tag"
            id="search-tag"
            placeholder="Tag name"
            autoFocus={auth.isStaff || auth.isAdmin ? true : false}
            required
            onChange={handleSearchInputChange}
            value={searchKeywords}
            disabled={auth.isConnected ? false : true}
          />
          <button
            disabled={auth.isConnected ? false : true}
            className="tag-ui__search__submit"
            type="submit"
          >
            <i className="fa fa-plus"></i>New
          </button>
        </div>
      </form>
      <div className="tag-ui__tags">
        {filteredTags?.map((tag) => (
          <button
            className={
              fileTags.some((item) => item.tag === tag.name)
                ? "tag-element tag-element--green"
                : "tag-element"
            }
            title={
              fileTags.some((item) => item.tag === tag.name)
                ? "Click to remove"
                : "Click to apply"
            }
            onClick={() => handleTagClick(tag)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

TagUi.propTypes = {
  tags: PropTypes.array.isRequired,
  file: PropTypes.object.isRequired,
  fileTags: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  createTagInState: PropTypes.func.isRequired,
};
