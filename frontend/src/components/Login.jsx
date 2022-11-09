import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [displayPasswordReset, setDisplayPasswordReset] = useState(false);

  return (
    <div className="login">
      <h1>
        <i className="fa fa-user"></i>Login
      </h1>
      <p>
        Only avalaible for contributors of{" "}
        <a
          title="Link to Alpha Projet main repo"
          href="https://github.com/The-Alpha-Project"
        >
          The Alpha Project.
        </a>
      </p>
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
      </form>
      <span to="/password-forgot" className="login_forget">
        Forgot your password ?
        <button onClick={() => setDisplayPasswordReset(!displayPasswordReset)}>
          Click here
        </button>
      </span>
      {displayPasswordReset && (
        <form className="login__forget" action="">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            placeholder="Email for password reset"
            name="username"
            id="username"
          />
          <button title="Reset your password" type="submit">
            <i className="fa fa-arrow-right"></i>
          </button>
        </form>
      )}
    </div>
  );
};
