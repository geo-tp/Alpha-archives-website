export const TagUi = () => {
  return (
    <div className="tag-ui">
      <form className="tag-ui__search">
        <input
          type="search"
          name="search-tag"
          id="search-tag"
          placeholder="Tag name"
          required
        />
        <button type="submit">
          <i className="fa fa-plus"></i>New
        </button>
      </form>
      <div className="tag-ui__tags">
        <div className="tag-element">One</div>
        <div className="tag-element">One</div>
        <div className="tag-element">Two Three</div>
        <div className="tag-element tag-element--green">Two Three Four</div>
        <div className="tag-element">Two Three Four</div>
        <div className="tag-element">Two Three Four Five</div>
        <div className="tag-element tag-element--green">
          Two Three Four Five
        </div>
      </div>
    </div>
  );
};
