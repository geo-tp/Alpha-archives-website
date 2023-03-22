export const ApiResponse = (props: { message: string; isError: boolean }) => {
  return (
    <div className="api-response">
      <p
        className={
          props.isError
            ? "api-response__message api-response__message--error"
            : "api-response__message api-response__message--success"
        }
      >
        {props.message}
      </p>
    </div>
  );
};
