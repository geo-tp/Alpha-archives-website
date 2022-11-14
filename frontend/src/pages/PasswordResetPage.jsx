import { PasswordReset } from "../components/PasswordReset";
import bgScreen from "../assets/background.webp";

export const PasswordResetPage = () => {
  return (
    <main className="auth-page footer-hidden">
      <img
        src={bgScreen}
        alt="wow login screen"
        className="image-background-container"
      />
      <PasswordReset />
    </main>
  );
};
