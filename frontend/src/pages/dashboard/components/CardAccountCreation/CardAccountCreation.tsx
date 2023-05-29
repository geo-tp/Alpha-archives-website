import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { ApiResponse } from "../../../../components/ApiResponse";
import { ButtonBase } from "../../../../components/ButtonBase";
import { CardForm } from "../../../../components/CardForm";
import { Loader } from "../../../../components/Loader";
import { createAccount } from "../../api/createAccount";

export const CardAccountCreation = () => {
  const [username, setUsername] = useState("");

  const create = useMutation((username: string) => createAccount(username));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    create.mutate(username);
  };

  return (
    <CardForm title="New Contributor" icon="user">
      <p className="card-form__infos">
        You can generate an account for a new contributor, just fill username
        and you will receive credentials of the new member.
      </p>
      <form className="profile__box" onSubmit={(e) => handleSubmit(e)}>
        <div className="card-form__input-box">
          <label htmlFor="email-guest">New contributor username</label>
          <input
            className="card-form__input-box__input"
            type="text"
            name="username-guest"
            id="username-guest"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="card-form__button-box">
          <ButtonBase
            label="Send"
            isLoading={create.isLoading}
            color="primary"
          />

          {create.isLoading && <Loader />}
        </div>
        {create?.data?.message && (
          <ApiResponse
            message={create?.data?.body?.message}
            isError={create.isError}
          />
        )}
        {create?.data?.error && create?.data?.body?.message && (
          <ApiResponse
            message={create.data.body.username}
            isError={create.data.error}
          />
        )}
        {create?.data?.body?.username && (
          <div className="card-form__account-creation">
            <label htmlFor="account-creation-username">Username</label>
            <input
              value={create.data.body.username}
              name="account-creation-username"
              disabled={true}
            />
            <label htmlFor="account-creation-password">Password</label>
            <input
              value={create.data.body.password}
              name="account-creation-password"
              disabled={true}
            />
          </div>
        )}
      </form>
    </CardForm>
  );
};
