import {
  getDisconnected,
  getDisconnectedError,
  getDisconnectedSuccess,
} from "../store/features/auth/actions";
import { fetchJsonForRedux } from "./fetchJsonForRedux";
import { API_LOGOUT } from "./utils/endpoints";
import { API_URL } from "./utils/config";

import { parametersFormater } from "./utils/parametersFormater";

export const fetchLogout = () => {
  const url = API_URL + API_LOGOUT;
  const params = parametersFormater("POST");

  return fetchJsonForRedux(
    getDisconnected,
    getDisconnectedSuccess,
    getDisconnectedError,
    url,
    params
  );
};
