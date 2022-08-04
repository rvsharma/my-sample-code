import {
  addNewGeneral,
  getGeneralDataRequest,
  updateGeneralDataRequest,
  deleteGeneralDataRequest,
  ADD_NEW_GENERAL,
  CREATE_GET_GENERAL_REQUEST,
  CREATE_UPDATE_GENERAL_REQUEST,
  CREATE_DELETE_GENERAL_REQUEST,
} from './GeneralTypeConstant';

export const createAddGeneralDataRequest = (payload: any, callback: any): addNewGeneral => {
  return {
    type: ADD_NEW_GENERAL,
    payload,
    callback,
  };
};

export const createGetGeneralDataRequest = (payload: any, callBack: any): getGeneralDataRequest => {
  return {
    type: CREATE_GET_GENERAL_REQUEST,
    payload,
    callBack,
  };
};

export const createUpdateGeneralDataRequest = (
  payload: any,
  callback: any
): updateGeneralDataRequest => {
  return {
    type: CREATE_UPDATE_GENERAL_REQUEST,
    payload,
    callback,
  };
};

export const createDeleteGeneralDataRequest = (
  payload: any,
  callback: any
): deleteGeneralDataRequest => {
  return {
    type: CREATE_DELETE_GENERAL_REQUEST,
    payload,
    callback,
  };
};
