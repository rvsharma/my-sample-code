import {
  CreateGetDataCountRequest,
  CreateGetDataRequest,
  CREATE_GET_DATA_REQUEST,
  CREATE_GET_DATA_COUNT_REQUEST,
  CreateDeleteDataRequest,
  CREATE_DELETE_DATA_REQUEST,
  CreateAddNewDataRequest,
  CreateUpdateDataRequest,
  CREATE_ADD_NEW_DATA_REQUEST,
  CREATE_UPDATE_DATA_REQUEST,
} from './ContentTypeConstants';
// Action Definition

export const createGetDataRequest = (payload: any, callback: any): CreateGetDataRequest => {
  return {
    type: CREATE_GET_DATA_REQUEST,
    payload,
    callback,
  };
};

export const createGetDataCountRequest = (
  payload: any,
  callback: any
): CreateGetDataCountRequest => {
  return {
    type: CREATE_GET_DATA_COUNT_REQUEST,
    payload,
    callback,
  };
};

export const createDeleteDataRequest = (payload: any, callback: any): CreateDeleteDataRequest => {
  return {
    type: CREATE_DELETE_DATA_REQUEST,
    payload,
    callback,
  };
};
export const createUpdateDataRequest = (payload: any, callback: any): CreateUpdateDataRequest => {
  return {
    type: CREATE_UPDATE_DATA_REQUEST,
    payload,
    callback,
  };
};

export const createAddNewDataRequest = (payload: any, callback: any): CreateAddNewDataRequest => {
  return {
    type: CREATE_ADD_NEW_DATA_REQUEST,
    payload,
    callback,
  };
};
