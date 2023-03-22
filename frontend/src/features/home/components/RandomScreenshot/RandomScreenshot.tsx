import { RandomScreenshotType } from "../../../../types";

export const RandomScreenshot = (props: {
  screenshot: RandomScreenshotType;
  isLoading: boolean;
  changeScreenshot: Function;
}) => {
  console.log("SS", props.screenshot);
  return (
    <div className="random-screenshot">
      <div className="random-screenshot__title">
        <h2>Random Screenshots</h2>
      </div>
      {props.screenshot && (
        <img
          className="random-screenshot__image"
          alt="random WoW screenshot"
          src={props.screenshot.image_raw}
        />
      )}
      <div className="random-screenshot__roll-box">
        {props.screenshot && (
          <p className="random-screenshot__roll">
            You roll {props.screenshot.random_number} (1-
            {props.screenshot.total_number})
          </p>
        )}
        <button
          className="random-screenshot__button"
          disabled={props.isLoading}
          onClick={() => props.changeScreenshot()}
        >
          Roll
        </button>
      </div>
    </div>
  );
};
