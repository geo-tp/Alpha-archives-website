import { Profile } from "../components/Profile";
import bgScreen from "../assets/background.webp";

export const ProfilePage = () => {
  return (
    <main className="profile-page">
      <img
        src={bgScreen}
        alt="wow login screen"
        className="image-background-container"
      />
      <Profile />
    </main>
  );
};
