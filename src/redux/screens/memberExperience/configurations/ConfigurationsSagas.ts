import { takeEvery, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import * as actions from './ConfigurationsTypeConstant';
import { HEADER_NO_AUTH } from '../../../services/httpServices';
import {
  DELETE_CONTENT_DATA,
  FETCH_CONFIG,
  FETCH_CONFIG_DATA_COUNT,
  FETCH_CONFIG_FILTERS,
  CREATE_CONFIG,
  UPDATE_CONFIG,
  FETCH_CONFIG_DETAIL,
} from '../../../services/Apis';

// workers

function* getData({ payload, callback }: actions.getConfigurationDataRequest): any {
  try {
    yield put({ type: actions.GET_CONFIGURATION_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.get,
      `${FETCH_CONFIG}${payload}`
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.getConfigurationDataRequestSuccess = {
          type: actions.GET_CONFIGURATION_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.getConfigurationDataRequestFailed = {
          type: actions.GET_CONFIGURATION_FAILED,
          requestFailed: true,
          errorMessage: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.getConfigurationDataRequestFailed = {
      type: actions.GET_CONFIGURATION_FAILED,
      requestFailed: true,
      errorMessage: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}
// Update
function* updateData({ payload, callback }: actions.updateConfigurationsDataRequest): any {
  try {
    yield put({ type: actions.UPDATE_CONFIGURATION_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.put,
      `${UPDATE_CONFIG}`,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.updateConfigurationsDataSuccess = {
          type: actions.UPDATE_CONFIGURATION_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.updateConfigurationsDataRequestFailed = {
          type: actions.UPDATE_CONFIGURATION_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.updateConfigurationsDataRequestFailed = {
      type: actions.UPDATE_CONFIGURATION_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}
// CREATE
function* addNewData({ payload, callback }: actions.addNewConfigurations): any {
  try {
    yield put({ type: actions.ADD_NEW_CONFIGURATION_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.post,
      `${CREATE_CONFIG}`,
      // options
      JSON.stringify(payload)
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.addConfigurationsSuccess = {
          type: actions.ADD_NEW_CONFIGURATION_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.addConfigurationsFailed = {
          type: actions.ADD_NEW_CONFIGURATION_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.addConfigurationsFailed = {
      type: actions.ADD_NEW_CONFIGURATION_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}
// Delete
function* deleteData({ payload, callback }: actions.deleteConfigurationsDataRequest): any {
  try {
    yield put({ type: actions.DELETE_CONFIGURATION_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.put,
      `${DELETE_CONTENT_DATA}`,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.deleteConfigurationsDataRequestSuccess = {
          type: actions.DELETE_CONFIGURATION_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.deletConfigurationsDataRequestFailed = {
          type: actions.DELETE_CONFIGURATION_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.deletConfigurationsDataRequestFailed = {
      type: actions.DELETE_CONFIGURATION_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}
// get Data count
function* getDataCount({ payload, callback }: actions.getConfigurationDataCountRequest): any {
  try {
    yield put({ type: actions.GET_DATA_COUNT_REQUEST_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.get,
      `${FETCH_CONFIG_DATA_COUNT}${payload}`
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.getConfigurationDataCountRequestSuccess = {
          type: actions.GET_DATA_COUNT_REQUEST_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.getConfigurationDataCountRequestFailed = {
          type: actions.GET_DATA_COUNT_REQUEST_FAILED,
          requestFailed: true,
          errorMessage: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.getConfigurationDataCountRequestFailed = {
      type: actions.GET_DATA_COUNT_REQUEST_FAILED,
      requestFailed: true,
      errorMessage: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

function* getConfigFilterData({ payload, callback }: actions.getConfigFilterRequest): any {
  try {
    yield put({ type: actions.GET_CONFIG_FILTERS_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.get,
      `${FETCH_CONFIG_FILTERS}${payload}`
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.getConfigFilterRequestSuccess = {
          type: actions.GET_CONFIG_FILTERS_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.getConfigFilterRequestFailed = {
          type: actions.GET_CONFIG_FILTERS_FAILED,
          requestFailed: true,
          errorMessage: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.getConfigurationDataRequestFailed = {
      type: actions.GET_CONFIGURATION_FAILED,
      requestFailed: true,
      errorMessage: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

function* getConfigDetailData({ payload, callback }: actions.getConfigDetailRequest): any {
  try {
    yield put({ type: actions.GET_CONFIG_DETAIL_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.get,
      `${FETCH_CONFIG_DETAIL}${payload}`
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.getConfigDetailRequestSuccess = {
          type: actions.GET_CONFIG_DETAIL_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.getConfigDetailRequestFailed = {
          type: actions.GET_CONFIG_DETAIL_FAILED,
          requestFailed: true,
          errorMessage: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.getConfigDetailRequestFailed = {
      type: actions.GET_CONFIG_DETAIL_FAILED,
      requestFailed: true,
      errorMessage: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

export default function* LoginSaga(): any {
  yield takeEvery(actions.GET_CONFIGURATION_REQUEST, getData);
  yield takeEvery(actions.UPDATE_CONFIGURATION_REQUEST, updateData);
  yield takeEvery(actions.ADD_NEW_CONFIGURATION_REQUEST, addNewData);
  yield takeEvery(actions.DELETE_CONFIGURATION_REQUEST, deleteData);
  yield takeEvery(actions.GET_DATA_COUNT_REQUEST, getDataCount);
  yield takeEvery(actions.GET_CONFIG_FILTERS_REQUEST, getConfigFilterData);
  yield takeEvery(actions.GET_CONFIG_DETAIL_REQUEST, getConfigDetailData);
}
