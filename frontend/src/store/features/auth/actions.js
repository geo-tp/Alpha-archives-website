import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
  GET_CONNECTED,
  GET_CONNECTED_ERROR,
  GET_CONNECTED_SUCCESS,
  GET_DISCONNECTED,
} from "./constants";

export const getConnected = (mail, password) => ({
  type: GET_CONNECTED,
  payload: { mail, password },
});

export const getConnectedSuccess = (loginInfos) => ({
  type: GET_CONNECTED_SUCCESS,
  payload: { loginInfos },
});

export const getConnectedError = () => ({
  type: GET_CONNECTED_ERROR,
  payload: {},
});

export const getDisconnected = () => ({
  type: GET_DISCONNECTED,
  payload: {},
});

export const createAccount = (registrationInfos) => ({
  type: CREATE_ACCOUNT,
  payload: { registrationInfos },
});

export const createAccountError = (error) => ({
  type: CREATE_ACCOUNT_ERROR,
  payload: { error },
});

export const createAccountSuccess = () => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload: {},
});
