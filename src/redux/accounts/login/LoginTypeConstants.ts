export const LOGIN_REQUEST_PENDING = 'LOGIN_REQUEST_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CREATE_LOGIN_REQUEST = 'CREATE_LOGIN_REQUEST';

export interface CreateLoginRequest {
  type: typeof CREATE_LOGIN_REQUEST;
  payload: any;
  callback: any;
}
export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  data: any;
}

export interface LoginRequestPending {
  type: typeof LOGIN_REQUEST_PENDING;
  isFetching: boolean;
}

export interface LoginRequestFailed {
  type: typeof LOGIN_FAILED;
  loginFailed: boolean;
  errorMsg: string;
  errorData: any;
}

export type Action = LoginSuccess | LoginRequestPending | LoginRequestFailed | CreateLoginRequest;
