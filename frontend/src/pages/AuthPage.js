import { Login } from "../components/Login";
import { Register } from "../components/Register";
import UploadScreen from "../assets/upload.png";

export const AuthPage = () => {
  return (
    <main className="auth-page footer-hidden">
      <img
        src={UploadScreen}
        alt="wow login screen"
        className="image-background-container"
      />
      <Login />
      <Register />
    </main>
  );
};
