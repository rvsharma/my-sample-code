export const CREATE_GET_GENERAL_REQUEST = 'CREATE_GET_GENERAL_REQUEST';
export const GET_GENERAL_PENDING = 'GET_GENERAL_PENDING';
export const GET_GENERAL_SUCCESS = 'GET_GENERAL_SUCCESS';
export const GET_GENERAL_FAILED = 'GET_GENERAL_FAILED';

export const ADD_NEW_GENERAL = 'ADD_NEW_GENERAL';
export const ADD_NEW_GENERAL_PENDING = 'ADD_NEW_GENERAL_PENDING';
export const ADD_NEW_GENERAL_SUCCESS = 'ADD_NEW_GENERAL_SUCCESS';
export const ADD_NEW_GENERAL_FAILED = 'ADD_NEW_GENERAL_FAILED';

export const CREATE_DELETE_GENERAL_REQUEST = 'CREATE_DELETE_GENERAL_REQUEST';
export const DELETE_GENERAL_PENDING = 'DELETE_GENERAL_PENDING';
export const DELETE_GENERAL_SUCCESS = 'DELETE_GENERAL_SUCCESS';
export const DELETE_GENERAL_FAILED = 'DELETE_GENERAL_FAILED';

export const CREATE_UPDATE_GENERAL_REQUEST = 'CREATE_UPDATE_GENERAL_REQUEST';
export const UPDATE_GENERAL_PENDING = 'UPDATE_GENERAL_PENDING';
export const UPDATE_GENERAL_SUCCESS = 'UPDATE_GENERAL_SUCCESS';
export const UPDATE_GENERAL_FAILED = 'UPDATE_GENERAL_FAILED';

export interface addNewGeneral {
  type: typeof ADD_NEW_GENERAL;
  payload: any;
  callback: any;
}

export interface addGeneralPending {
  type: typeof ADD_NEW_GENERAL_PENDING;
  isProcessing: boolean;
}
export interface addGeneralSuccess {
  type: typeof ADD_NEW_GENERAL_SUCCESS;
  data: any;
}

export interface addGeneralFailed {
  type: typeof ADD_NEW_GENERAL_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

export interface getGeneralDataRequest {
  type: typeof CREATE_GET_GENERAL_REQUEST;
  payload: any;
  callBack: any;
}

export interface getGeneralDataRequestPending {
  type: typeof GET_GENERAL_PENDING;
  isProcessing: boolean;
}
export interface getGeneralDataRequestSuccess {
  type: typeof GET_GENERAL_SUCCESS;
  data: any;
}

export interface getGeneralDataRequestFailed {
  type: typeof GET_GENERAL_FAILED;
  requestFailed: boolean;
  errorMessage: any;
  errorData: any;
}

// Delete
export interface deleteGeneralDataRequest {
  type: typeof CREATE_DELETE_GENERAL_REQUEST;
  payload: any;
  callback: any;
}
export interface deleteGeneralDataRequestSuccess {
  type: typeof DELETE_GENERAL_SUCCESS;
  data: any;
}

export interface deleteGeneralDataRequestPending {
  type: typeof DELETE_GENERAL_PENDING;
  isFetching: boolean;
}

export interface deletGeneralDataRequestFailed {
  type: typeof DELETE_GENERAL_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}
// UPDATE
export interface updateGeneralDataRequest {
  type: typeof CREATE_UPDATE_GENERAL_REQUEST;
  payload: any;
  callback: any;
}
export interface updateGeneralDataSuccess {
  type: typeof UPDATE_GENERAL_SUCCESS;
  data: any;
}

export interface updateGeneralDataRequestPending {
  type: typeof UPDATE_GENERAL_PENDING;
  isFetching: boolean;
}

export interface updateGeneralDataRequestFailed {
  type: typeof UPDATE_GENERAL_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

export type Action =
  | getGeneralDataRequest
  | getGeneralDataRequestPending
  | getGeneralDataRequestSuccess
  | getGeneralDataRequestFailed;
