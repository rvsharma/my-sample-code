export const GET_DATA_REQUEST_PENDING = 'GET_DATA_REQUEST_PENDING';
export const GET_DATA_REQUEST_SUCCESS = 'GET_DATA_REQUEST_SUCCESS';
export const GET_DATA_REQUEST_FAILED = 'GET_DATA_REQUEST_FAILED';
export const CREATE_GET_DATA_REQUEST = 'CREATE_GET_DATA_REQUEST';
// get count
export const GET_DATA_COUNT_REQUEST_PENDING = 'GET_DATA_COUNT_REQUEST_PENDING';
export const GET_DATA_COUNT_REQUEST_SUCCESS = 'GET_DATA_COUNT_REQUEST_SUCCESS';
export const GET_DATA_COUNT_REQUEST_FAILED = 'GET_DATA_COUNT_REQUEST_FAILED';
export const CREATE_GET_DATA_COUNT_REQUEST = 'CREATE_GET_DATA_COUNT_REQUEST';
// Delete
export const DELETE_DATA_REQUEST_PENDING = 'DELETE_DATA_REQUEST_PENDING';
export const DELETE_DATA_REQUEST_SUCCESS = 'DELETE_DATA_REQUEST_SUCCESS';
export const DELETE_DATA_REQUEST_FAILED = 'DELETE_DATA_REQUEST_FAILED';
export const CREATE_DELETE_DATA_REQUEST = 'CREATE_DELETE_DATA_REQUEST';
// Update
export const UPDATE_DATA_REQUEST_PENDING = 'UPDATE_DATA_REQUEST_PENDING';
export const UPDATE_DATA_REQUEST_SUCCESS = 'UPDATE_DATA_REQUEST_SUCCESS';
export const UPDATE_DATA_REQUEST_FAILED = 'UPDATE_DATA_REQUEST_FAILED';
export const CREATE_UPDATE_DATA_REQUEST = 'CREATE_UPDATE_DATA_REQUEST';
// CREATE
export const ADD_NEW_DATA_REQUEST_PENDING = 'ADD_NEW_DATA_REQUEST_PENDING';
export const ADD_NEW_DATA_REQUEST_SUCCESS = 'ADD_NEW_DATA_REQUEST_SUCCESS';
export const ADD_NEW_DATA_REQUEST_FAILED = 'ADD_NEW_DATA_REQUEST_FAILED';
export const CREATE_ADD_NEW_DATA_REQUEST = 'CREATE_ADD_NEW_DATA_REQUEST';

// Create New
export interface CreateAddNewDataRequest {
  type: typeof CREATE_ADD_NEW_DATA_REQUEST;
  payload: any;
  callback: any;
}
export interface addNewDataSuccess {
  type: typeof ADD_NEW_DATA_REQUEST_SUCCESS;
  data: any;
}

export interface addNewDataRequestPending {
  type: typeof ADD_NEW_DATA_REQUEST_PENDING;
  isFetching: boolean;
}

export interface addNewDataRequestFailed {
  type: typeof ADD_NEW_DATA_REQUEST_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}
// FETCH
export interface CreateGetDataRequest {
  type: typeof CREATE_GET_DATA_REQUEST;
  payload: any;
  callback: any;
}
export interface getDataSuccess {
  type: typeof GET_DATA_REQUEST_SUCCESS;
  data: any;
}

export interface getDataRequestPending {
  type: typeof GET_DATA_REQUEST_PENDING;
  isFetching: boolean;
}

export interface getDataRequestFailed {
  type: typeof GET_DATA_REQUEST_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}
// Delete
export interface CreateDeleteDataRequest {
  type: typeof CREATE_DELETE_DATA_REQUEST;
  payload: any;
  callback: any;
}
export interface deleteDataSuccess {
  type: typeof DELETE_DATA_REQUEST_SUCCESS;
  data: any;
}

export interface deleteDataRequestPending {
  type: typeof DELETE_DATA_REQUEST_PENDING;
  isFetching: boolean;
}

export interface deleteDataRequestFailed {
  type: typeof DELETE_DATA_REQUEST_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}
// UPDATE
export interface CreateUpdateDataRequest {
  type: typeof CREATE_UPDATE_DATA_REQUEST;
  payload: any;
  callback: any;
}
export interface updateDataSuccess {
  type: typeof UPDATE_DATA_REQUEST_SUCCESS;
  data: any;
}

export interface updateDataRequestPending {
  type: typeof UPDATE_DATA_REQUEST_PENDING;
  isFetching: boolean;
}

export interface updateDataRequestFailed {
  type: typeof UPDATE_DATA_REQUEST_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}
// get count
export interface CreateGetDataCountRequest {
  type: typeof CREATE_GET_DATA_COUNT_REQUEST;
  payload: any;
  callback: any;
}
export interface getDataCountSuccess {
  type: typeof GET_DATA_COUNT_REQUEST_SUCCESS;
  data: any;
}

export interface getDataCountRequestPending {
  type: typeof GET_DATA_COUNT_REQUEST_PENDING;
  isFetching: boolean;
}

export interface getDataCountRequestFailed {
  type: typeof GET_DATA_COUNT_REQUEST_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

export type Action =
  | addNewDataSuccess
  | addNewDataRequestPending
  | addNewDataRequestFailed
  | CreateAddNewDataRequest
  | getDataSuccess
  | getDataRequestPending
  | getDataRequestFailed
  | CreateGetDataRequest
  | deleteDataSuccess
  | deleteDataRequestPending
  | deleteDataRequestFailed
  | CreateDeleteDataRequest
  | updateDataSuccess
  | updateDataRequestPending
  | updateDataRequestFailed
  | CreateUpdateDataRequest
  | getDataCountSuccess
  | getDataCountRequestPending
  | getDataCountRequestFailed
  | CreateGetDataCountRequest;
