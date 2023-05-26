import {
  getConnected,
  getConnectedSuccess,
  getConnectedError,
} from "../store/slices/auth/actions";
import { API_URL, LOGIN_ROUTE } from "../config/api";
import { store } from "../store";
import { fetchJson } from "./fetchJson";

export const getLoggedIn = async (variables: {
  username: string;
  password: string;
}) => {
  const username = variables.username;
  const password = variables.password;

  try {
    store.dispatch(getConnected(username, password));

    const res = await fetchJson(API_URL + LOGIN_ROUTE, "POST", {
      username,
      password,
    });

    if (res.status === 200) {
      const json_res = await res.json();
      store.dispatch(getConnectedSuccess(json_res.body));
    }

    return res.status;
  } catch (error) {
    store.dispatch(getConnectedError());
  }
};
