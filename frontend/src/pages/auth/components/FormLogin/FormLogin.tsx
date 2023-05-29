import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { ApiResponse } from "../../../../components/ApiResponse";
import { getLoggedIn } from "../../../../api/getLoggedIn";

export const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data, isLoading, mutate } = useMutation(
    (variables: { username: string; password: string }) =>
      getLoggedIn(variables)
  );
  const handleLoginClick = (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    mutate({ username, password });
  };

  return (
    <form className="form-login" onSubmit={handleLoginClick}>
      <div className="form-login__username">
        <label htmlFor="username">Username or Email</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-login__password">
        <label htmlFor="username">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {data && data !== 200 && (
        <ApiResponse
          message="Unable to login with provided credentials"
          isError={true}
        />
      )}
      <button
        disabled={isLoading ? true : false}
        className="button-base button-base--colored"
        type="submit"
      >
        Connect <i className="fa fa-sign-in"></i>
      </button>
    </form>
  );
};
