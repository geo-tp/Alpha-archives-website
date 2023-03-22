import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../store/slices/auth/selectors";
import { getUser } from "../../../../store/slices/user/selectors";
import { CardForm } from "../../../../components/CardForm";
import { getProfile } from "../../../../api/getProfile";

export const CardProfile = () => {
  const auth = useSelector(selectAuth);
  const user = useSelector(getUser);

  useQuery("user-profile", getProfile);

  return (
    <CardForm title="Profile" icon="bookmark">
      {auth.isStaff && !auth.isAdmin && (
        <div className="card-form__infos">
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
        <div className="card-form__infos">
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

      <div className="card-form__input-box">
        <label htmlFor="username-user">Username</label>

        <input
          className="card-form__input-box__input"
          type="text"
          name="username-user"
          id="username-user"
          disabled={true}
          value={user.username}
        />
      </div>
      <div className="card-form__input-box">
        <label htmlFor="email-user">Email</label>
        <input
          className="card-form__input-box__input"
          type="email"
          name="email-user"
          id="email-user"
          value={user.email}
          disabled={true}
        />
      </div>
    </CardForm>
  );
};
