import { useState } from "react";
import { ApiResponse } from "./ApiResponse";
import { FormLoading } from "./FormLoading";

export const UserInvitationForm = ({
  handleInvitation,
  invitationEmail,
  invitationIsLoading,
  invitationResponse,
}) => {
  const [invitationEmail, setInvitationEmail] = useState("");

  return (
    <form className="profile__box" onSubmit={handleInvitation}>
      <h2>
        Invitation <i className="fa fa-envelope"></i>
      </h2>

      <p className="profile__infos">
        You can invite people to become contributor. That means they could add,
        edit, and delete tags on screenshots. New user will receive an email
        with crendentials to login.
      </p>
      <div className="profile__input-box">
        <label htmlFor="email-guest">New contributor email</label>
        <input
          className="profile__input-box__input"
          type="email"
          name="email-guest"
          id="email-guest"
          value={invitationEmail}
          onChange={(e) => setInvitationEmail(e.target.value)}
          required
        />
      </div>
      <div className="profile__button-box">
        <button
          disabled={invitationIsLoading ? true : false}
          className="profile__button"
          type="submit"
        >
          Send
        </button>
        {invitationIsLoading && <FormLoading />}
      </div>
      {invitationResponse?.message && (
        <ApiResponse
          message={invitationResponse.message}
          isError={invitationResponse.error}
        />
      )}
    </form>
  );
};
