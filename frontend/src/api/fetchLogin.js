import {
  getConnected,
  getConnectedError,
  getConnectedSuccess,
} from "../store/features/auth/actions";
import { fetchJsonForRedux } from "./fetchJsonForRedux";
import { API_URL } from "./utils/config";
import { API_LOGIN } from "./utils/endpoints";
import { parametersFormater } from "./utils/parametersFormater";

export const fetchLogin = (username, password) => {
  const url = API_URL + API_LOGIN;
  const params = parametersFormater("POST", { username, password });

  return fetchJsonForRedux(
    getConnected,
    getConnectedSuccess,
    getConnectedError,
    url,
    params
  );
};
