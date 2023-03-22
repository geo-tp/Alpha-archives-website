import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ImageBackground } from "../../../../components/ImageBackground";
import { selectAuth } from "../../../../store/slices/auth/selectors";
import { FormLogin } from "../FormLogin/FormLogin";
import { FormPassword } from "../FormPassword/FormPassword";

export const Login = () => {
  const [displayPasswordReset, setDisplayPasswordReset] = useState(false);
  const auth = useSelector(selectAuth);

  if (auth.isConnected) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <main className="login">
      <ImageBackground />
      <div className="login__frame">
        <h1>
          <i className="fa fa-user"></i>Login
        </h1>
        <p className="login__frame__mention">
          Only avalaible for contributors of{" "}
          <a
            title="Link to Alpha Projet main repo"
            href="https://github.com/The-Alpha-Project"
          >
            The Alpha Project.
          </a>
        </p>
        <FormLogin />
        <div className="login__frame__forget">
          Forgot your password ?
          <button
            onClick={() => setDisplayPasswordReset(!displayPasswordReset)}
          >
            Click here
          </button>
        </div>
        {displayPasswordReset && <FormPassword />}
      </div>
    </main>
  );
};
