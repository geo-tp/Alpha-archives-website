import { Login } from "../components/Login";
import { Register } from "../components/Register";
import bgScreen from "../assets/background.webp";

export const AuthPage = () => {
  return (
    <main className="auth-page footer-hidden">
      <img
        src={bgScreen}
        alt="wow login screen"
        className="image-background-container"
      />
      <Login />
      <Register />
    </main>
  );
};
