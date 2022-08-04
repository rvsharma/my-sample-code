import {
  GET_GENERAL_PENDING,
  GET_GENERAL_SUCCESS,
  GET_GENERAL_FAILED,
  Action,
} from './GeneralTypeConstant';

export interface termsAndConditionData {
  isFetching: boolean;
  accessToken?: string;
  data?: any;
  getDataFailed?: boolean;
  errorMsg: string;
  errorData: any;
  show: boolean;
}
export const defaultState: termsAndConditionData = {
  isFetching: false,
  accessToken: '',
  getDataFailed: false,
  data: [],
  errorData: [],
  errorMsg: '',
  show: false,
  // Data Count
};

const termsAndConditionReducer = (
  state: termsAndConditionData = defaultState,
  action: Action
): termsAndConditionData => {
  switch (action.type) {
    case GET_GENERAL_SUCCESS:
      return { ...state, isFetching: false, data: action.data, errorData: [], errorMsg: '' };
    case GET_GENERAL_PENDING:
      return { ...state, isFetching: true, getDataFailed: false, errorMsg: '' };
    case GET_GENERAL_FAILED:
      return {
        ...state,
        getDataFailed: false,
        errorMsg: 'failed',
        isFetching: false,
        errorData: action.errorData,
      };
    default:
      return state;
  }
};

export default termsAndConditionReducer;
