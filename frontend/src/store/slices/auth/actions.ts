import {
  CREATE_ACCOUNT_SUCCESS,
  GET_CONNECTED,
  GET_CONNECTED_ERROR,
  GET_CONNECTED_SUCCESS,
  GET_DISCONNECTED,
  GET_DISCONNECTED_ERROR,
  GET_DISCONNECTED_SUCCESS,
} from "./constants";

export const getConnected = (mail: string, password: string) => ({
  type: GET_CONNECTED,
  payload: { mail, password },
});

export const getConnectedSuccess = (loginInfos: any) => ({
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

export const getDisconnectedSuccess = () => ({
  type: GET_DISCONNECTED_SUCCESS,
  payload: {},
});

export const getDisconnectedError = () => ({
  type: GET_DISCONNECTED_ERROR,
  payload: {},
});

// export const createAccount = (registrationInfos) => ({
//   type: CREATE_ACCOUNT,
//   payload: { registrationInfos },
// });

// export const createAccountError = (error) => ({
//   type: CREATE_ACCOUNT_ERROR,
//   payload: { error },
// });

export const createAccountSuccess = () => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload: {},
});
