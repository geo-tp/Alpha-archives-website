import { useState } from "react";
import { ApiResponse } from "./ApiResponse";
import { FormLoading } from "./FormLoading";

export const UserAdminCreateAccountForm = ({
  handleCreateAccount,
  createAccountIsLoading,
  createAccountResponse,
}) => {
  const [username, setUsername] = useState("");

  return (
    <form
      className="profile__box"
      onSubmit={(e) => handleCreateAccount(e, username)}
    >
      <h2>
        New contributor<i className="fa fa-user"></i>
      </h2>

      <p className="profile__infos">
        You can generate an account for a new contributor, just fill username
        and you will receive credentials of the new member.
      </p>
      <div className="profile__input-box">
        <label htmlFor="email-guest">New contributor username</label>
        <input
          className="profile__input-box__input"
          type="text"
          name="username-guest"
          id="username-guest"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="profile__button-box">
        <button
          disabled={createAccountIsLoading ? true : false}
          className="profile__button"
          type="submit"
        >
          Send
        </button>
        {createAccountIsLoading && <FormLoading />}
      </div>
      {createAccountResponse?.message && (
        <ApiResponse
          message={createAccountResponse.message}
          isError={createAccountResponse.error}
        />
      )}
      {createAccountResponse?.error && createAccountResponse?.body && (
        <ApiResponse
          message={createAccountResponse.body.username}
          isError={createAccountResponse.error}
        />
      )}
      {!createAccountResponse?.error && createAccountResponse?.body && (
        <div className="profile__account-creation">
          <label htmlFor="account-creation-username">Username</label>
          <input
            value={createAccountResponse.body.username}
            name="account-creation-username"
            disabled={true}
          />
          <label htmlFor="account-creation-password">Password</label>
          <input
            value={createAccountResponse.body.password}
            name="account-creation-password"
            disabled={true}
          />
        </div>
      )}
    </form>
  );
};
