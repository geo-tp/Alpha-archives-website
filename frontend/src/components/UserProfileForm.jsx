import { getAuth } from "../store/features/auth/selectors";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const UserProfileForm = ({ userProfile }) => {
  const auth = useSelector(getAuth);

  return (
    <div className="profile__box">
      <h2>
        User <i className="fa fa-bookmark"></i>
      </h2>
      {auth.isStaff && !auth.isAdmin && (
        <div className="profile__infos">
          <span>
            You are connected as <b>Contributor</b>.
          </span>
          <ul>
            <li>✓ Apply or remove tags on image</li>
            <li>✓ Create new tags</li>
            <li>✓ Edit or delete your own tags</li>
          </ul>
        </div>
      )}

      {auth.isAdmin && (
        <div className="profile__infos">
          <span>
            You are connected as <b>Administrator</b>.
          </span>
          <ul>
            <li>✓ Apply or remove tags on image</li>
            <li>✓ Create new tags</li>
            <li>✓ Edit or delete any tags</li>
            <li>✓ Invite new contributor</li>
          </ul>
        </div>
      )}

      <div className="profile__input-box">
        <label htmlFor="username-user">Username</label>

        <input
          className="profile__input-box__input"
          type="text"
          name="username-user"
          id="username-user"
          disabled={true}
          value={userProfile?.username}
        />
      </div>
      <div className="profile__input-box">
        <label htmlFor="email-user">Email</label>
        <input
          className="profile__input-box__input"
          type="email"
          name="email-user"
          id="email-user"
          value={userProfile?.email}
          disabled={true}
        />
      </div>
    </div>
  );
};

UserProfileForm.propsType = {
  userProfile: PropTypes.object.isRequired,
};
