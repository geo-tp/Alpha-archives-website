import PropTypes from "prop-types";

export const ApiResponse = ({ message, isError = false }) => {
  return (
    <div className="api-response">
      <p
        className={
          isError
            ? "api-response__message api-response__message--error"
            : "api-response__message api-response__message--success"
        }
      >
        {message}
      </p>
    </div>
  );
};

ApiResponse.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool,
};
