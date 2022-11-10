import { Profile } from "../components/Profile";
import UploadScreen from "../assets/upload.png";

export const ProfilePage = () => {
  return (
    <main className="profile-page">
      <img
        src={UploadScreen}
        alt="wow login screen"
        className="image-background-container"
      />
      <Profile />
    </main>
  );
};
