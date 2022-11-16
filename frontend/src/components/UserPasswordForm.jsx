import { useState } from "react";
import { ApiResponse } from "./ApiResponse";
import { FormLoading } from "./FormLoading";

export const UserPasswordForm = ({
  handlePasswordUpdate,
  passwordUpdateIsLoading,
  passwordUpdateResponse,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [oldPasssword, setOldPassword] = useState("");

  return (
    <form
      className="profile__box"
      onSubmit={(e) =>
        handlePasswordUpdate(e, oldPasssword, newPassword, newPassword2)
      }
    >
      <h2>
        Password <i className="fa fa-key"></i>
      </h2>
      <p className="profile__infos">Update your login password</p>
      <div className="profile__input-box">
        <label htmlFor="username-user">Old password</label>

        <input
          className="profile__input-box__input"
          type="password"
          name="old-password-user"
          id="old-password-user2"
          value={oldPasssword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div className="profile__input-box">
        <label htmlFor="new-password-user">New password</label>
        <input
          className="profile__input-box__input"
          type="password"
          name="new-password-user"
          id="new-password-user"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="profile__input-box">
        <label htmlFor="new-password-user2">New password again</label>
        <input
          className="profile__input-box__input"
          type="password"
          name="new-password-user2"
          id="new-password-user2"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
          required
        />
      </div>
      <div className="profile__button-box">
        <button
          disabled={passwordUpdateIsLoading ? true : false}
          className="profile__button"
          type="submit"
        >
          Change
        </button>
        {passwordUpdateIsLoading && <FormLoading />}
      </div>
      {passwordUpdateResponse?.message && (
        <ApiResponse
          message={passwordUpdateResponse.message}
          isError={passwordUpdateResponse.error}
        />
      )}
    </form>
  );
};
