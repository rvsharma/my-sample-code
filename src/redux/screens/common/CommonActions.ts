import {
  getRequestInterface,
  addRequestInterface,
  updateRequestInterface,
  deleteRequestInterface,
  GET_REQUEST,
  ADD_REQUEST,
  UPDATE_REQUEST,
  DELETE_REQUEST,
  getCountRequestInterface,
  GET_COUNT_DATA_REQUEST,
} from './CommonTypeConstant';

// createGetRequest
export const createGetDataRequest = (
  payload?: any,
  callBack?: any,
  url?: any
): getRequestInterface => {
  // console.log('Users actions');
  return {
    type: GET_REQUEST,
    payload,
    callBack,
    url,
  };
};

// createGetCountRequest
export const createGetDataCountRequest = (
  payload?: any,
  callBack?: any,
  url?: any
): getCountRequestInterface => {
  return {
    type: GET_COUNT_DATA_REQUEST,
    payload,
    callBack,
    url,
  };
};

// createAddRequest
export const createAddNewDataRequest = (
  url?: any,
  payload?: any,
  callback?: any
): addRequestInterface => {
  return {
    type: ADD_REQUEST,
    url,
    payload,
    callback,
  };
};

// createUpdateRequest
export const createUpdateDataRequest = (
  url?: any,
  payload?: any,
  callback?: any
): updateRequestInterface => {
  return {
    type: UPDATE_REQUEST,
    url,
    payload,
    callback,
  };
};

// createDeleteRequest
export const createDeleteDataRequest = (payload?: any, callback?: any): deleteRequestInterface => {
  return {
    type: DELETE_REQUEST,
    payload,
    callback,
  };
};
