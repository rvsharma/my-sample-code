import {
  Action,
  SUCCESSED_GET_REQUEST,
  PENDING_GET_REQUEST,
  FAILED_GET_REQUEST,
  SUCCESSED_GET_COUNT_DATA_REQUEST,
  PENDING_GET_COUNT_DATA_REQUEST,
  FAILED_GET_COUNT_DATA_REQUEST,
  SUCCESSED_ADD_REQUEST,
  PENDING_ADD_REQUEST,
  FAILED_ADD_REQUEST,
  SUCCESSED_UPDATE_REQUEST,
  PENDING_UPDATE_REQUEST,
  FAILED_UPDATE_REQUEST,
  SUCCESSED_DELETE_REQUEST,
  PENDING_DELETE_REQUEST,
} from './CommonTypeConstant';

export interface commonDataType {
  isFetching: boolean;
  accessToken?: string;
  data?: any;
  getDataFailed?: boolean;
  errorMsg: string;
  errorData: any;
  show: boolean;

  // count data type
  getDataCountProcessing: boolean;
  dataCount: any;
  getDataCountFailed: boolean;
  getDataCountSuccess: boolean;
  getDataCountError: any;

  // add data type
  addNewDataProcessing: boolean;
  addNewData: any;
  addNewDataFailed: boolean;
  addNewDataSuccess: boolean;
  addNewDataError: any;

  // delete data type
  deleteDataProcessing: boolean;
  deleteData: any;
  deleteDataFailed: boolean;
  deleteDataSuccess: boolean;
  deleteDataError: any;

  // update data type
  updateDataProcessing: boolean;
  updateData: any;
  updateDataFailed: boolean;
  updateDataSuccess: boolean;
  updateDataError: any;
}

export const defaultState: commonDataType = {
  isFetching: false,
  accessToken: '',
  getDataFailed: false,
  data: [],
  errorData: [],
  errorMsg: '',
  show: false,

  // count data values
  getDataCountError: '',
  getDataCountFailed: false,
  getDataCountProcessing: false,
  getDataCountSuccess: false,
  dataCount: [],

  // add data values
  addNewDataError: '',
  addNewDataFailed: false,
  addNewDataProcessing: false,
  addNewDataSuccess: false,
  addNewData: [],

  // delete values
  deleteDataError: '',
  deleteDataFailed: false,
  deleteDataProcessing: false,
  deleteDataSuccess: false,
  deleteData: [],

  // update values
  updateDataError: '',
  updateDataFailed: false,
  updateDataProcessing: false,
  updateDataSuccess: false,
  updateData: [],
};

const commonDataReducer = (
  state: commonDataType = defaultState,
  action: Action
): commonDataType => {
  switch (action.type) {
    // case GET_CONFIGURATION_SUCCESS:
    //   return { ...state, isFetching: false, data: action.data, errorData: [], errorMsg: '' };
    // case GET_CONFIGURATION_PENDING:
    //   return { ...state, isFetching: true, getDataFailed: false, errorMsg: '' };
    // case GET_CONFIGURATION_FAILED:
    //   return {
    //     ...state,
    //     getDataFailed: false,
    //     errorMsg: 'failed',
    //     isFetching: false,
    //     errorData: action.errorData,
    //   };

    // get data

    case SUCCESSED_GET_REQUEST:
      return { ...state, isFetching: false, data: action.data, errorData: [], errorMsg: '' };

    case PENDING_GET_REQUEST:
      return { ...state, isFetching: true, getDataFailed: false, errorMsg: '' };

    case FAILED_GET_REQUEST:
      return {
        ...state,
        getDataFailed: false,
        errorMsg: 'failed',
        isFetching: false,
        errorData: action.errorData,
      };

    // count get data
    case SUCCESSED_GET_COUNT_DATA_REQUEST:
      return {
        ...state,
        getDataCountProcessing: false,
        dataCount: action.data,
        getDataCountError: [],
      };

    case PENDING_GET_COUNT_DATA_REQUEST:
      return {
        ...state,
        getDataCountProcessing: action.isFetching,
        getDataCountFailed: false,
        getDataCountError: '',
      };

    case FAILED_GET_COUNT_DATA_REQUEST:
      return {
        ...state,
        getDataCountFailed: action.getDataFailed,
        getDataCountProcessing: false,
        getDataCountSuccess: false,
      };

    // add data
    case SUCCESSED_ADD_REQUEST:
      return {
        ...state,
        addNewDataProcessing: false,
        addNewData: action.data,
        addNewDataError: [],
      };

    case PENDING_ADD_REQUEST:
      return {
        ...state,
        addNewDataProcessing: action.isFetching,
        addNewDataFailed: false,
        addNewDataError: '',
      };

    case FAILED_ADD_REQUEST:
      return {
        ...state,
        addNewDataFailed: action.getDataFailed,
        addNewDataProcessing: false,
        addNewDataSuccess: false,
      };

    // update data
    case SUCCESSED_UPDATE_REQUEST:
      return {
        ...state,
        updateDataProcessing: false,
        updateData: action.data,
        updateDataError: [],
      };

    case PENDING_UPDATE_REQUEST:
      return {
        ...state,
        updateDataProcessing: action.isFetching,
        updateDataFailed: false,
        updateDataError: '',
      };

    case FAILED_UPDATE_REQUEST:
      return {
        ...state,
        updateDataFailed: action.getDataFailed,
        updateDataProcessing: false,
        updateDataSuccess: false,
      };

    // delete data
    case SUCCESSED_DELETE_REQUEST:
      return {
        ...state,
        deleteDataProcessing: false,
        deleteData: action.data,
        deleteDataError: [],
      };

    case PENDING_DELETE_REQUEST:
      return {
        ...state,
        deleteDataProcessing: action.isFetching,
        deleteDataFailed: false,
        deleteDataError: '',
      };

    case FAILED_UPDATE_REQUEST:
      return {
        ...state,
        deleteDataFailed: action.getDataFailed,
        deleteDataProcessing: false,
        deleteDataSuccess: false,
      };

    default:
      return state;
  }
};

export default commonDataReducer;
