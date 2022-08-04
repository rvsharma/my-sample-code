import {
  addNewConfigurations,
  getConfigurationDataRequest,
  updateConfigurationsDataRequest,
  deleteConfigurationsDataRequest,
  getConfigurationDataCountRequest,
  ADD_NEW_CONFIGURATION_REQUEST,
  GET_CONFIGURATION_REQUEST,
  UPDATE_CONFIGURATION_REQUEST,
  DELETE_CONFIGURATION_REQUEST,
  GET_DATA_COUNT_REQUEST,
  getConfigFilterRequest,
  GET_CONFIG_FILTERS_REQUEST,
  GET_CONFIG_DETAIL_REQUEST,
  getConfigDetailRequest,
} from './ConfigurationsTypeConstant';

export const createAddConfigurationDataRequest = (
  payload: any,
  callback: any
): addNewConfigurations => {
  return {
    type: ADD_NEW_CONFIGURATION_REQUEST,
    payload,
    callback,
  };
};

export const createGetConfigurationDataRequest = (
  payload: any,
  callBack: any
): getConfigurationDataRequest => {
  return {
    type: GET_CONFIGURATION_REQUEST,
    payload,
    callback: callBack,
  };
};

export const createGetConfigurationDataCountRequest = (
  payload: any,
  callBack: any
): getConfigurationDataCountRequest => {
  return {
    type: GET_DATA_COUNT_REQUEST,
    payload,
    callback: callBack,
  };
};

export const createUpdateConfigurationDataRequest = (
  payload: any,
  callback: any
): updateConfigurationsDataRequest => {
  return {
    type: UPDATE_CONFIGURATION_REQUEST,
    payload,
    callback,
  };
};

export const createDeleteConfigurationDataRequest = (
  payload: any,
  callback: any
): deleteConfigurationsDataRequest => {
  return {
    type: DELETE_CONFIGURATION_REQUEST,
    payload,
    callback,
  };
};

export const createGetConfigFiltersDataRequest = (
  payload: any,
  callBack: any
): getConfigFilterRequest => {
  return {
    type: GET_CONFIG_FILTERS_REQUEST,
    payload,
    callback: callBack,
  };
};

export const createGetConfigDetailRequest = (
  payload: any,
  callBack: any
): getConfigDetailRequest => {
  return {
    type: GET_CONFIG_DETAIL_REQUEST,
    payload,
    callback: callBack,
  };
};
