import { Login } from "../components/Login";
import { Register } from "../components/Register";

export const AuthPage = () => {
  return (
    <div className="auth-page footer-hidden">
      <Login />
      <Register />
    </div>
  );
};
