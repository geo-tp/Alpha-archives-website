export const FormPassword = () => {
  return (
    <form className="form-password">
      <label htmlFor="username">Email</label>
      <input
        type="email"
        placeholder="Email for password reset"
        name="username"
        id="username"
        required
      />
      <button title="Reset your password" type="submit">
        <i className="fa fa-arrow-right"></i>
      </button>
    </form>
  );
};
