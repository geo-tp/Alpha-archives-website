import UploadScreen from "../assets/upload.png";
import { PasswordReset } from "../components/PasswordReset";

export const PasswordResetPage = () => {
  return (
    <main className="auth-page footer-hidden">
      <img
        src={UploadScreen}
        alt="wow login screen"
        className="image-background-container"
      />
      <PasswordReset />
    </main>
  );
};
