import { CreateLoginRequest, CREATE_LOGIN_REQUEST } from './LoginTypeConstants';
// Action Definition

export const createLoginRequest = (payload: any, callback: any): CreateLoginRequest => {
  return {
    type: CREATE_LOGIN_REQUEST,
    payload,
    callback,
  };
};
