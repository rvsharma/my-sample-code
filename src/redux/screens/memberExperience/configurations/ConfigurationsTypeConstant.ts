export const GET_CONFIGURATION_REQUEST = 'GET_CONFIGURATION_REQUEST';
export const GET_CONFIGURATION_PENDING = 'GET_CONFIGURATION_PENDING';
export const GET_CONFIGURATION_SUCCESS = 'GET_CONFIGURATION_SUCCESS';
export const GET_CONFIGURATION_FAILED = 'GET_CONFIGURATION_FAILED';

// get count
export const GET_DATA_COUNT_REQUEST_PENDING = 'GET_DATA_COUNT_REQUEST_PENDING';
export const GET_DATA_COUNT_REQUEST_SUCCESS = 'GET_DATA_COUNT_REQUEST_SUCCESS';
export const GET_DATA_COUNT_REQUEST_FAILED = 'GET_DATA_COUNT_REQUEST_FAILED';
export const GET_DATA_COUNT_REQUEST = 'GET_DATA_COUNT_REQUEST';

export const ADD_NEW_CONFIGURATION_REQUEST = 'ADD_NEW_CONFIGURATION_REQUEST';
export const ADD_NEW_CONFIGURATION_PENDING = 'ADD_NEW_CONFIGURATION_PENDING';
export const ADD_NEW_CONFIGURATION_SUCCESS = 'ADD_NEW_CONFIGURATION_SUCCESS';
export const ADD_NEW_CONFIGURATION_FAILED = 'ADD_NEW_CONFIGURATION_FAILED';

export const DELETE_CONFIGURATION_REQUEST = 'DELETE_CONFIGURATION_REQUEST';
export const DELETE_CONFIGURATION_PENDING = 'DELETE_CONFIGURATION_PENDING';
export const DELETE_CONFIGURATION_SUCCESS = 'DELETE_CONFIGURATION_SUCCESS';
export const DELETE_CONFIGURATION_FAILED = 'DELETE_CONFIGURATION_FAILED';

export const UPDATE_CONFIGURATION_REQUEST = 'UPDATE_CONFIGURATION_REQUEST';
export const UPDATE_CONFIGURATION_PENDING = 'UPDATE_CONFIGURATION_PENDING';
export const UPDATE_CONFIGURATION_SUCCESS = 'UPDATE_CONFIGURATION_SUCCESS';
export const UPDATE_CONFIGURATION_FAILED = 'UPDATE_CONFIGURATION_FAILED';

export const GET_CONFIG_FILTERS_REQUEST = 'GET_CONFIG_FILTERS_REQUEST';
export const GET_CONFIG_FILTERS_PENDING = 'GET_CONFIG_FILTERS_PENDING';
export const GET_CONFIG_FILTERS_SUCCESS = 'GET_CONFIG_FILTERS_SUCCESS';
export const GET_CONFIG_FILTERS_FAILED = 'GET_CONFIG_FILTERS_FAILED';

// get details
export const GET_CONFIG_DETAIL_REQUEST = 'GET_CONFIG_DETAIL_REQUEST';
export const GET_CONFIG_DETAIL_PENDING = 'GET_CONFIG_DETAIL_PENDING';
export const GET_CONFIG_DETAIL_SUCCESS = 'GET_CONFIG_DETAIL_SUCCESS';
export const GET_CONFIG_DETAIL_FAILED = 'GET_CONFIG_DETAIL_FAILED';

//  add
export interface addNewConfigurations {
  type: typeof ADD_NEW_CONFIGURATION_REQUEST;
  payload: any;
  callback: any;
}

export interface addConfigurationsPending {
  type: typeof ADD_NEW_CONFIGURATION_PENDING;
  isFetching: boolean;
}
export interface addConfigurationsSuccess {
  type: typeof ADD_NEW_CONFIGURATION_SUCCESS;
  data: any;
}

export interface addConfigurationsFailed {
  type: typeof ADD_NEW_CONFIGURATION_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

//  get

export interface getConfigurationDataRequest {
  type: typeof GET_CONFIGURATION_REQUEST;
  payload: any;
  callback: any;
}

export interface getConfigurationDataRequestPending {
  type: typeof GET_CONFIGURATION_PENDING;
  isFetching: boolean;
}
export interface getConfigurationDataRequestSuccess {
  type: typeof GET_CONFIGURATION_SUCCESS;
  data: any;
}

export interface getConfigurationDataRequestFailed {
  type: typeof GET_CONFIGURATION_FAILED;
  requestFailed: boolean;
  errorMessage: any;
  errorData: any;
}

//  get count

export interface getConfigurationDataCountRequest {
  type: typeof GET_DATA_COUNT_REQUEST;
  payload: any;
  callback: any;
}

export interface getConfigurationDatCountaRequestPending {
  type: typeof GET_DATA_COUNT_REQUEST_PENDING;
  isFetching: boolean;
}
export interface getConfigurationDataCountRequestSuccess {
  type: typeof GET_DATA_COUNT_REQUEST_SUCCESS;
  data: any;
}

export interface getConfigurationDataCountRequestFailed {
  type: typeof GET_DATA_COUNT_REQUEST_FAILED;
  requestFailed: boolean;
  errorMessage: any;
  errorData: any;
}

//  Delete
export interface deleteConfigurationsDataRequest {
  type: typeof DELETE_CONFIGURATION_REQUEST;
  payload: any;
  callback: any;
}
export interface deleteConfigurationsDataRequestSuccess {
  type: typeof DELETE_CONFIGURATION_SUCCESS;
  data: any;
}

export interface deleteConfigurationsDataRequestPending {
  type: typeof DELETE_CONFIGURATION_PENDING;
  isFetching: boolean;
}

export interface deletConfigurationsDataRequestFailed {
  type: typeof DELETE_CONFIGURATION_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}
// UPDATE
export interface updateConfigurationsDataRequest {
  type: typeof UPDATE_CONFIGURATION_REQUEST;
  payload: any;
  callback: any;
}
export interface updateConfigurationsDataSuccess {
  type: typeof UPDATE_CONFIGURATION_SUCCESS;
  data: any;
}

export interface updateConfigurationsDataRequestPending {
  type: typeof UPDATE_CONFIGURATION_PENDING;
  isFetching: boolean;
}

export interface updateConfigurationsDataRequestFailed {
  type: typeof UPDATE_CONFIGURATION_FAILED;
  getDataFailed: boolean;
  errorMsg: string;
  errorData: any;
}

// config filters
export interface getConfigFilterRequest {
  type: typeof GET_CONFIG_FILTERS_REQUEST;
  payload: any;
  callback: any;
}

export interface getConfigFilterRequestPending {
  type: typeof GET_CONFIG_FILTERS_PENDING;
  isFetching: boolean;
}
export interface getConfigFilterRequestSuccess {
  type: typeof GET_CONFIG_FILTERS_SUCCESS;
  data: any;
}

export interface getConfigFilterRequestFailed {
  type: typeof GET_CONFIG_FILTERS_FAILED;
  requestFailed: boolean;
  errorMessage: any;
  errorData: any;
}

// config detail

export interface getConfigDetailRequest {
  type: typeof GET_CONFIG_DETAIL_REQUEST;
  payload: any;
  callback: any;
}

export interface getConfigDetailRequestPending {
  type: typeof GET_CONFIG_DETAIL_PENDING;
  isFetching: boolean;
}
export interface getConfigDetailRequestSuccess {
  type: typeof GET_CONFIG_DETAIL_SUCCESS;
  data: any;
}

export interface getConfigDetailRequestFailed {
  type: typeof GET_CONFIG_DETAIL_FAILED;
  requestFailed: boolean;
  errorMessage: any;
  errorData: any;
}

export type Action =
  | getConfigurationDataRequest
  | getConfigurationDataRequestPending
  | getConfigurationDataRequestSuccess
  | getConfigurationDataRequestFailed
  | addNewConfigurations
  | addConfigurationsPending
  | addConfigurationsSuccess
  | addConfigurationsFailed
  | getConfigurationDataRequestFailed
  | getConfigurationDataCountRequest
  | getConfigurationDatCountaRequestPending
  | getConfigurationDataCountRequestSuccess
  | getConfigurationDataCountRequestFailed
  | deleteConfigurationsDataRequest
  | deleteConfigurationsDataRequestSuccess
  | deleteConfigurationsDataRequestPending
  | deletConfigurationsDataRequestFailed
  | updateConfigurationsDataRequest
  | updateConfigurationsDataSuccess
  | updateConfigurationsDataRequestPending
  | updateConfigurationsDataRequestFailed
  | getConfigFilterRequest
  | getConfigFilterRequestPending
  | getConfigFilterRequestSuccess
  | getConfigFilterRequestFailed
  | getConfigDetailRequest
  | getConfigDetailRequestPending
  | getConfigDetailRequestSuccess
  | getConfigDetailRequestFailed;
