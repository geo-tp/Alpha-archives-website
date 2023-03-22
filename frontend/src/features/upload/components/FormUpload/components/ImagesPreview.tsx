type ImagesPreviewProps = {
  filesObj: File[];
  files: string[];
  filesApiResponse: number[];
  handleReset: Function;
  isUploaded: boolean;
};

export const ImagesPreview = (props: ImagesPreviewProps) => {
  return (
    <div className="form-upload__previews">
      <label className="form-upload__previews__title">
        Previews ({props.filesObj.length} images)
      </label>
      <button
        className="form-upload__previews__reset"
        type="button"
        onClick={() => props.handleReset()}
      >
        <i className="fa fa-close fa-2x"></i>
      </button>
      <div className="form-upload__previews__box">
        {(props.files || []).map((url, index) => (
          <div
            key={`image-upload-${url}-${index}`}
            className="form-upload__previews__box__element"
          >
            <img src={url} alt="uploaded screenshot" />
            {props.isUploaded ? (
              props.filesApiResponse[index] === 200 ? (
                <label className="form-upload__previews__box__element__response success">
                  <i className="fa fa-2x fa-check-circle"></i>
                </label>
              ) : (
                <label className="form-upload__previews__box__element__response error">
                  <i className="fa fa-2x fa-exclamation-triangle"></i>
                </label>
              )
            ) : (
              <label></label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
