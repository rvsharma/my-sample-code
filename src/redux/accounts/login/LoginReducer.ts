import { LOGIN_SUCCESS, LOGIN_REQUEST_PENDING, LOGIN_FAILED, Action } from './LoginTypeConstants';

export interface loginState {
  isFetching: boolean;
  accessToken?: string;
  data?: any;
  isLoginFailed?: boolean;
  errorMsg: string;
  errorData: any;
  show: boolean;
}

export const defaultState: loginState = {
  isFetching: false,
  accessToken: '',
  isLoginFailed: false,
  data: [],
  errorData: [],
  errorMsg: '',
  show: false,
};
const loginReducer = (state: loginState = defaultState, action: Action): loginState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isFetching: false, data: action.data, errorData: [], errorMsg: '' };
    case LOGIN_REQUEST_PENDING:
      return { ...state, isFetching: action.isFetching, isLoginFailed: false, errorMsg: '' };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoginFailed: action.loginFailed,
        errorMsg: action.errorMsg,
        isFetching: false,
        errorData: action.errorData,
      };
    default:
      return state;
  }
};

export default loginReducer;
