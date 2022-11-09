import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <p>Only avalaible for contributors of the Alpha Core Project.</p>
      <form action="">
        <div classname="login__username">
          <label htmlFor="username">Username or Email</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="login__password">
          <label htmlFor="username">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button className="button-upload" type="submit">
          Connect <i className="fa fa-sign-in"></i>
        </button>
        <Link to="/password-forgot" className="login_forget">
          Forgot your password ? Click here
        </Link>
      </form>
    </div>
  );
};
