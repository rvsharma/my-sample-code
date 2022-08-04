import {
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_PENDING,
  GET_CONFIGURATION_FAILED,
  Action,
  GET_DATA_COUNT_REQUEST_SUCCESS,
  GET_DATA_COUNT_REQUEST_FAILED,
  GET_DATA_COUNT_REQUEST_PENDING,
  ADD_NEW_CONFIGURATION_FAILED,
  ADD_NEW_CONFIGURATION_PENDING,
  ADD_NEW_CONFIGURATION_SUCCESS,
  UPDATE_CONFIGURATION_FAILED,
  UPDATE_CONFIGURATION_PENDING,
  UPDATE_CONFIGURATION_SUCCESS,
  DELETE_CONFIGURATION_FAILED,
  DELETE_CONFIGURATION_PENDING,
  DELETE_CONFIGURATION_SUCCESS,
  GET_CONFIG_FILTERS_SUCCESS,
  GET_CONFIG_FILTERS_PENDING,
  GET_CONFIG_FILTERS_FAILED,
  GET_CONFIG_DETAIL_SUCCESS,
  GET_CONFIG_DETAIL_PENDING,
  GET_CONFIG_DETAIL_FAILED,
} from './ConfigurationsTypeConstant';

export interface contentData {
  isFetching: boolean;
  accessToken?: string;
  data?: any;
  getDataFailed?: boolean;
  errorMsg: string;
  errorData: any;
  show: boolean;
  // data count
  getDataCountProcessing: boolean;
  dataCount: any;
  getDataCountFailed: boolean;
  getDataCountSuccess: boolean;
  getDataCountError: any;
  // data
  updateDataProcessing: boolean;
  updateData: any;
  updateDataFailed: boolean;
  updateDataSuccess: boolean;
  updateDataError: any;
  // delete
  deleteDataProcessing: boolean;
  deleteData: any;
  deleteDataFailed: boolean;
  deleteDataSuccess: boolean;
  deleteDataError: any;
  // add new
  addNewDataProcessing: boolean;
  addNewData: any;
  addNewDataFailed: boolean;
  addNewDataSuccess: boolean;
  addNewDataError: any;
}

export const defaultState: contentData = {
  isFetching: false,
  accessToken: '',
  getDataFailed: false,
  data: [],
  errorData: [],
  errorMsg: '',
  show: false,
  // Data Count
  getDataCountError: '',
  getDataCountFailed: false,
  getDataCountProcessing: false,
  getDataCountSuccess: false,
  dataCount: [],
  // add new
  addNewDataError: '',
  addNewDataFailed: false,
  addNewDataProcessing: false,
  addNewDataSuccess: false,
  addNewData: [],
  // delete
  deleteDataError: '',
  deleteDataFailed: false,
  deleteDataProcessing: false,
  deleteDataSuccess: false,
  deleteData: [],
  // update
  updateDataError: '',
  updateDataFailed: false,
  updateDataProcessing: false,
  updateDataSuccess: false,
  updateData: [],
};
const contentDataReducer = (state: contentData = defaultState, action: Action): contentData => {
  switch (action.type) {
    case GET_CONFIGURATION_SUCCESS:
      return { ...state, isFetching: false, data: action.data, errorData: [], errorMsg: '' };
    case GET_CONFIGURATION_PENDING:
      return { ...state, isFetching: action.isFetching, getDataFailed: false, errorMsg: '' };
    case GET_CONFIGURATION_FAILED:
      return {
        ...state,
        getDataFailed: action.requestFailed,
        errorMsg: action.errorMessage,
        isFetching: false,
        errorData: action.errorData,
      };
    case GET_DATA_COUNT_REQUEST_SUCCESS:
      return {
        ...state,
        getDataCountProcessing: false,
        dataCount: action.data,
        getDataCountError: [],
      };
    case GET_DATA_COUNT_REQUEST_PENDING:
      return {
        ...state,
        getDataCountProcessing: action.isFetching,
        getDataCountFailed: false,
        getDataCountError: '',
      };
    case GET_DATA_COUNT_REQUEST_FAILED:
      return {
        ...state,
        getDataCountFailed: action.requestFailed,
        getDataCountProcessing: false,
        getDataCountSuccess: false,
      };
    // Add New
    case ADD_NEW_CONFIGURATION_SUCCESS:
      return {
        ...state,
        addNewDataProcessing: false,
        addNewData: action.data,
        addNewDataError: [],
      };
    case ADD_NEW_CONFIGURATION_PENDING:
      return {
        ...state,
        addNewDataProcessing: action.isFetching,
        addNewDataFailed: false,
        addNewDataError: '',
      };
    case ADD_NEW_CONFIGURATION_FAILED:
      return {
        ...state,
        addNewDataFailed: action.getDataFailed,
        addNewDataProcessing: false,
        addNewDataSuccess: false,
      };
    // Update
    case UPDATE_CONFIGURATION_SUCCESS:
      return {
        ...state,
        updateDataProcessing: false,
        updateData: action.data,
        updateDataError: [],
      };
    case UPDATE_CONFIGURATION_PENDING:
      return {
        ...state,
        updateDataProcessing: action.isFetching,
        updateDataFailed: false,
        updateDataError: '',
      };
    case UPDATE_CONFIGURATION_FAILED:
      return {
        ...state,
        updateDataFailed: action.getDataFailed,
        updateDataProcessing: false,
        updateDataSuccess: false,
      };
    // Delete
    case DELETE_CONFIGURATION_SUCCESS:
      return {
        ...state,
        deleteDataProcessing: false,
        deleteData: action.data,
        deleteDataError: [],
      };
    case DELETE_CONFIGURATION_PENDING:
      return {
        ...state,
        deleteDataProcessing: action.isFetching,
        deleteDataFailed: false,
        deleteDataError: '',
      };
    case DELETE_CONFIGURATION_FAILED:
      return {
        ...state,
        deleteDataFailed: action.getDataFailed,
        deleteDataProcessing: false,
        deleteDataSuccess: false,
      };
    case GET_CONFIG_FILTERS_SUCCESS:
      return { ...state, isFetching: false, data: action.data, errorData: [], errorMsg: '' };
    case GET_CONFIG_FILTERS_PENDING:
      return { ...state, isFetching: action.isFetching, getDataFailed: false, errorMsg: '' };
    case GET_CONFIG_FILTERS_FAILED:
      return {
        ...state,
        getDataFailed: action.requestFailed,
        errorMsg: action.errorMessage,
        isFetching: false,
        errorData: action.errorData,
      };
    case GET_CONFIG_DETAIL_SUCCESS:
      return { ...state, isFetching: false, data: action.data, errorData: [], errorMsg: '' };
    case GET_CONFIG_DETAIL_PENDING:
      return { ...state, isFetching: action.isFetching, getDataFailed: false, errorMsg: '' };
    case GET_CONFIG_DETAIL_FAILED:
      return {
        ...state,
        getDataFailed: action.requestFailed,
        errorMsg: action.errorMessage,
        isFetching: false,
        errorData: action.errorData,
      };
    default:
      return state;
  }
};

export default contentDataReducer;
