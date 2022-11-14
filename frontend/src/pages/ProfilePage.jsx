import { Profile } from "../components/Profile";
import bgScreen from "../assets/background.webp";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../api/fetchLogout";

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(fetchLogout());
  };

  return (
    <main className="profile-page">
      <img
        src={bgScreen}
        alt="wow login screen"
        className="image-background-container"
      />

      <div className="profile-page__title">
        <h1>
          <i className="fa fa-user"></i> Profile
          <form action="">
            <button
              onClick={handleLogout}
              className="profile__disconnect"
              type="submit"
            >
              Logout
            </button>
          </form>
        </h1>
      </div>
      <Profile />
    </main>
  );
};
