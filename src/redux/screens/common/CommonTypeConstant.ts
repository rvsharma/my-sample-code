// export const CREATE_GET_DATA_REQUEST = 'CREATE_GET_DATA_REQUEST';
// export const GET_DATA_REQUEST_PENDING = 'GET_DATA_REQUEST_PENDING';
// export const GET_DATA_REQUEST_SUCCESS = 'GET_DATA_REQUEST_SUCCESS';
// export const GET_DATA_REQUEST_FAILED = 'GET_DATA_REQUEST_FAILED';

export const GET_REQUEST = 'GET_REQUEST';
export const PENDING_GET_REQUEST = 'PENDING_GET_REQUEST';
export const SUCCESSED_GET_REQUEST = 'SUCCESSED_GET_REQUEST';
export const FAILED_GET_REQUEST = 'FAILED_GET_REQUEST';

// get count
export const GET_COUNT_DATA_REQUEST = 'GET_COUNT_DATA_REQUEST';
export const PENDING_GET_COUNT_DATA_REQUEST = 'PENDING_GET_COUNT_DATA_REQUEST';
export const SUCCESSED_GET_COUNT_DATA_REQUEST = 'SUCCESSED_GET_COUNT_DATA_REQUEST';
export const FAILED_GET_COUNT_DATA_REQUEST = 'FAILED_GET_COUNT_DATA_REQUEST';

// add
export const ADD_REQUEST = 'ADD_REQUEST';
export const PENDING_ADD_REQUEST = 'PENDING_ADD_REQUEST';
export const SUCCESSED_ADD_REQUEST = 'SUCCESSED_ADD_REQUEST';
export const FAILED_ADD_REQUEST = 'FAILED_ADD_REQUEST';

// delete
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const PENDING_DELETE_REQUEST = 'PENDING_DELETE_REQUEST';
export const SUCCESSED_DELETE_REQUEST = 'SUCCESSED_DELETE_REQUEST';
export const FAILED_DELETE_REQUEST = 'FAILED_DELETE_REQUEST';

// update
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const PENDING_UPDATE_REQUEST = 'PENDING_UPDATE_REQUEST';
export const SUCCESSED_UPDATE_REQUEST = 'SUCCESSED_UPDATE_REQUEST';
export const FAILED_UPDATE_REQUEST = 'FAILED_UPDATE_REQUEST';

// get
export interface getRequestInterface {
  type: typeof GET_REQUEST;
  payload: any;
  callBack: any;
  url?: any;
}

export interface successGetRequestInterface {
  type: typeof SUCCESSED_GET_REQUEST;
  data: any;
}

export interface pendingGetRequestInterface {
  type: typeof PENDING_GET_REQUEST;
  isFetching: boolean;
}

export interface failedGetRequestInterface {
  type: typeof FAILED_GET_REQUEST;
  requestFailed: boolean;
  errorMessage: any;
  errorData: any;
}

// get count
export interface getCountRequestInterface {
  type: typeof GET_COUNT_DATA_REQUEST;
  payload: any;
  callBack: any;
  url?: any;
}

export interface successGetCountRequestInterface {
  type: typeof SUCCESSED_GET_COUNT_DATA_REQUEST;
  data: any;
}

export interface pendingGetCountRequestInterface {
  type: typeof PENDING_GET_COUNT_DATA_REQUEST;
  isFetching: boolean;
}

export interface failedGetCountRequestInterface {
  type: typeof FAILED_GET_COUNT_DATA_REQUEST;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

// add
export interface addRequestInterface {
  type: typeof ADD_REQUEST;
  url: any;
  payload: any;
  callback: any;
}

export interface successAddRequestInterface {
  type: typeof SUCCESSED_ADD_REQUEST;
  data: any;
}

export interface pendingAddRequestInterface {
  type: typeof PENDING_ADD_REQUEST;
  isFetching: boolean;
}

export interface failedAddRequestInterface {
  type: typeof FAILED_ADD_REQUEST;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

// delete
export interface deleteRequestInterface {
  type: typeof DELETE_REQUEST;
  payload: any;
  callback: any;
}

export interface successDeleteRequestInterface {
  type: typeof SUCCESSED_DELETE_REQUEST;
  data: any;
}

export interface pendingDeleteRequestInterface {
  type: typeof PENDING_DELETE_REQUEST;
  isFetching: boolean;
}

export interface failedDeleteRequestInterface {
  type: typeof FAILED_DELETE_REQUEST;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

// update
export interface updateRequestInterface {
  type: typeof UPDATE_REQUEST;
  url?: any;
  payload: any;
  callback: any;
}

export interface successUpdateRequestInterface {
  type: typeof SUCCESSED_UPDATE_REQUEST;
  data: any;
}

export interface pendingUpdateRequestInterface {
  type: typeof PENDING_UPDATE_REQUEST;
  isFetching: boolean;
}

export interface failedUpdateRequestInterface {
  type: typeof FAILED_UPDATE_REQUEST;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

export type Action =
  | getRequestInterface
  | successGetRequestInterface
  | pendingGetRequestInterface
  | failedGetRequestInterface
  | getCountRequestInterface
  | successGetCountRequestInterface
  | pendingGetCountRequestInterface
  | failedGetCountRequestInterface
  | addRequestInterface
  | successAddRequestInterface
  | pendingAddRequestInterface
  | failedAddRequestInterface
  | deleteRequestInterface
  | successDeleteRequestInterface
  | pendingDeleteRequestInterface
  | failedDeleteRequestInterface
  | updateRequestInterface
  | successUpdateRequestInterface
  | pendingUpdateRequestInterface
  | failedUpdateRequestInterface;
