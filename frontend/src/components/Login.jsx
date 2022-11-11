import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchLogin } from "../api/fetchLogin";
import { getAuth } from "../store/features/auth/selectors";

export const Login = () => {
  const [displayPasswordReset, setDisplayPasswordReset] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();

  const handleLoginClick = (e) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    dispatch(fetchLogin(username, password));
  };

  if (auth.isConnected) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <div className="login">
      <h1>
        <i className="fa fa-user"></i>Login
      </h1>
      <p className="login__mention">
        Only avalaible for contributors of{" "}
        <a
          title="Link to Alpha Projet main repo"
          href="https://github.com/The-Alpha-Project"
        >
          The Alpha Project.
        </a>
      </p>
      <form onSubmit={handleLoginClick}>
        <div className="login__username">
          <label htmlFor="username">Username or Email</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login__password">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
      {auth.isError && (
        <div>
          <p className="login__error">
            Unable to login with provided credentials
          </p>
        </div>
      )}
    </div>
  );
};
