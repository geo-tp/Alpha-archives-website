import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchLogin } from "../api/fetchLogin";
import { fetchPasswordForget } from "../api/fetchPasswordForget";
import { getAuth } from "../store/features/auth/selectors";
import { ApiResponse } from "./ApiResponse";

export const Login = () => {
  const [displayPasswordReset, setDisplayPasswordReset] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordForgetEmail, setPasswordForgetEmail] = useState("");
  const [passwordForgetResponse, setPasswordForgetResponse] = useState("");
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();

  const handePasswordForgetClick = async (e) => {
    e.preventDefault();

    const response = await fetchPasswordForget(passwordForgetEmail);
    setPasswordForgetResponse(response);

    if (!response?.error) {
      setPasswordForgetEmail("");
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setPasswordForgetResponse(null);

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
        <button
          disabled={auth.isLoading ? true : false}
          className="button-upload"
          type="submit"
        >
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
        <form className="login__forget" onSubmit={handePasswordForgetClick}>
          <label htmlFor="username">Email</label>
          <input
            type="email"
            placeholder="Email for password reset"
            name="username"
            id="username"
            required
            value={passwordForgetEmail}
            onChange={(e) => setPasswordForgetEmail(e.target.value)}
          />
          <button title="Reset your password" type="submit">
            <i className="fa fa-arrow-right"></i>
          </button>
        </form>
      )}
      {auth.isError && (
        <ApiResponse
          message="Unable to login with provided credentials"
          isError="True"
        />
      )}
      {passwordForgetResponse?.message && (
        <ApiResponse message={passwordForgetResponse.message} />
      )}
    </div>
  );
};
