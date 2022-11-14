import PropTypes from "prop-types";

export const RandomBox = ({
  screenshot,
  getRandomScreenshot,
  rollButtonIsDisabled,
}) => {
  return (
    <div className="random-box">
      <div className="random-box__title">
        <h2>Random Screenshots</h2>
      </div>
      {screenshot && (
        <img
          className="random-box__image"
          alt="random WoW screenshot"
          src={screenshot.image_raw}
        />
      )}
      <div className="random-box__roll-box">
        {screenshot && (
          <p className="random-box__roll">
            You roll {screenshot.random_number} (1-
            {screenshot.total_number})
          </p>
        )}
        <button
          class="nav-button-base random-box__button"
          disabled={rollButtonIsDisabled}
          onClick={() => getRandomScreenshot()}
        >
          Roll
        </button>
      </div>
    </div>
  );
};

RandomBox.propTypes = {
  screenshot: PropTypes.object.isRequired,
  getRandomScreenshot: PropTypes.func.isRequired,
  rollButtonIsDisabled: PropTypes.bool.isRequired,
};
