export const Modal = () => {
  return (
    <div className="upload-modal">
      <div className="upload-modal__frame">
        <div>
          <h2>NOT AVAILABLE</h2>
          <p>
            <strong>Not enough space, you can't upload now</strong>
          </p>
          <i className="fa fa-5x fa-hdd-o"></i>
          <p>All requests will be rejected</p>
          <p>
            <strong>Please try later</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
