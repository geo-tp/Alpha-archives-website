import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPasswordReset } from "../api/fetchPasswordReset";
import { ApiResponse } from "./ApiResponse";

export const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordResetResponse, setPasswordResetResponse] = useState("");
  const { key } = useParams();
  const [keyIsValid, setKeyIsValid] = useState(false);

  const checkIfKeyFormatIsValid = () => {
    const validCharset = "abcdefghijklmnopqrstuvwxyz1234567890";
    const keyDefaultLength = 40;
    if (key.length !== keyDefaultLength) {
      setKeyIsValid(false);
      return;
    }

    for (let char of key) {
      if (!validCharset.includes(char)) {
        setKeyIsValid(false);
        return;
      }
    }

    setKeyIsValid(true);
  };

  useState(() => {
    checkIfKeyFormatIsValid();
  }, []);

  const handlePasswordResetClick = async (e) => {
    e.preventDefault();
    setPasswordResetResponse(null);

    if (password !== password2) {
      setPasswordResetResponse({
        error: true,
        message: "Passwords are not equals",
      });
      return;
    }

    const response = await fetchPasswordReset(key, password);

    if (response.status === 404) {
      setPasswordResetResponse({
        error: true,
        message: "Expired link, you can't change your password",
      });
      return;
    }

    passwordResetResponse(response.body);
  };

  if (!keyIsValid) {
    return (
      <div className="login">
        <h1>
          {" "}
          <i className="fa fa-close"></i> Invalid Token
        </h1>
      </div>
    );
  }

  return (
    <div className="login">
      <h1>Set your new password</h1>
      <form onSubmit={handlePasswordResetClick}>
        <div className="login__password">
          <label htmlFor="username">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login__password">
          <label htmlFor="username">Repeat new Password</label>
          <input
            type="password2"
            name="password2"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button className="button-upload" type="submit">
          Save <i className="fa fa-sign-in"></i>
        </button>
      </form>

      {passwordResetResponse?.message && (
        <ApiResponse
          message={passwordResetResponse.message}
          isError={passwordResetResponse.error}
        />
      )}
    </div>
  );
};
