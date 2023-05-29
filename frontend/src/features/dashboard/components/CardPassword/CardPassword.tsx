import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { ApiResponse } from "../../../../components/ApiResponse";
import { Loader } from "../../../../components/Loader";
import { updatePassword } from "../../api/updatePassword";
import { CardForm } from "../../../../components/CardForm";
import { ButtonBase } from "../../../../components/ButtonBase";

export const CardPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const { isLoading, data, mutate } = useMutation(
    (variables: { oldPassword: string; newPassword: string }) =>
      updatePassword(variables)
  );

  const [passwordValidation, setPasswordValidation] = useState({
    message: "",
    error: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== newPassword2) {
      setPasswordValidation({
        error: true,
        message: "New passwords are not equals",
      });
      return;
    }

    mutate({ newPassword, oldPassword });
  };

  return (
    <CardForm title={"Password"} icon={"key"}>
      <form className="card-form__box" onSubmit={(e) => handleSubmit(e)}>
        <p className="card-form__infos">Update your login password</p>
        <div className="card-form__input-box">
          <label htmlFor="username-user">Old password</label>

          <input
            className="card-form__input-box__input"
            type="password"
            name="old-password-user"
            id="old-password-user2"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="card-form__input-box">
          <label htmlFor="new-password-user">New password</label>
          <input
            className="card-form__input-box__input"
            type="password"
            name="new-password-user"
            id="new-password-user"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="card-form__input-box">
          <label htmlFor="new-password-user2">New password again</label>
          <input
            className="card-form__input-box__input"
            type="password"
            name="new-password-user2"
            id="new-password-user2"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            required
          />
        </div>
        <div className="card-form__button-box">
          <ButtonBase label="Change" isLoading={isLoading} color="primary" />
          {isLoading && <Loader />}
        </div>
        {(data?.message || passwordValidation.message) && (
          <ApiResponse
            message={data?.message || passwordValidation.message}
            isError={data?.error || passwordValidation.error}
          />
        )}
      </form>
    </CardForm>
  );
};
