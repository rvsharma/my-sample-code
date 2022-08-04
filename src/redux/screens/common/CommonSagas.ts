/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { takeEvery, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  FETCH_CONTENT_DATA,
  CREATE_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
  DELETE_CONTENT_DATA,
  // FETCH_USERS_DATA,
  // FETCH_USERS_DATA_COUNT,
} from '../../services/Apis';

import * as action from './CommonTypeConstant';
import { HEADER_NO_AUTH } from '../../services/httpServices';

// fetch data
function* getCommonRequest({ payload, callBack, url }: action.getRequestInterface) {
  // console.log(payload);
  // console.log(HEADER_NO_AUTH.get);

  const getUrl = url ? `${url}${payload}` : `${FETCH_CONTENT_DATA}?type=${payload}`;

  // console.log(getUrl);
  try {
    yield put({ type: action.PENDING_GET_REQUEST, isProcessing: true });
    const response: AxiosResponse<any> = yield call(HEADER_NO_AUTH.get, getUrl);

    if (response) {
      if (response.data.isSuccess) {
        const data: action.successGetRequestInterface = {
          type: action.SUCCESSED_GET_REQUEST,
          data: response.data,
        };
        yield put(data);
        callBack(response.data);
      } else {
        const data: action.failedGetRequestInterface = {
          type: action.FAILED_GET_REQUEST,
          requestFailed: true,
          errorMessage: response.data.message,
          errorData: response,
        };
        yield put(data);
        callBack(response);
      }
    }
  } catch (err: any) {
    const data: action.failedGetRequestInterface = {
      type: action.FAILED_GET_REQUEST,
      requestFailed: true,
      errorMessage: err.message,
      errorData: err,
    };
    yield put(data);
    callBack(err);
  }
}

// create / add data
function* addDataRequest({ url, payload, callback }: action.addRequestInterface): any {
  const addUrl = url || CREATE_CONTENT_DATA;
  try {
    yield put({ type: action.PENDING_ADD_REQUEST, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.post,
      `${addUrl}`,
      // options
      JSON.stringify(payload)
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: action.successAddRequestInterface = {
          type: action.SUCCESSED_ADD_REQUEST,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: action.failedAddRequestInterface = {
          type: action.FAILED_ADD_REQUEST,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: action.failedAddRequestInterface = {
      type: action.FAILED_ADD_REQUEST,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

// update data
function* updateDataRequest({ url, payload, callback }: action.updateRequestInterface): any {
  const updateUrl = url || UPDATE_CONTENT_DATA;
  try {
    yield put({ type: action.PENDING_UPDATE_REQUEST, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.put,
      `${updateUrl}`,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: action.successUpdateRequestInterface = {
          type: action.SUCCESSED_UPDATE_REQUEST,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: action.failedUpdateRequestInterface = {
          type: action.FAILED_UPDATE_REQUEST,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: action.failedUpdateRequestInterface = {
      type: action.FAILED_UPDATE_REQUEST,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

// delete data
function* deleteDataRequest({ payload, callback }: action.deleteRequestInterface): any {
  try {
    yield put({ type: action.PENDING_DELETE_REQUEST, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.put,
      `${DELETE_CONTENT_DATA}`,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: action.successDeleteRequestInterface = {
          type: action.SUCCESSED_DELETE_REQUEST,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: action.failedDeleteRequestInterface = {
          type: action.FAILED_DELETE_REQUEST,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: action.failedDeleteRequestInterface = {
      type: action.FAILED_DELETE_REQUEST,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

// get data count
function* getDataCount({ payload, callBack, url }: action.getCountRequestInterface): any {
  // const getDataCountUrl = url
  //   ? `${FETCH_USERS_DATA_COUNT}${payload}`
  //   : `${FETCH_USERS_DATA}?type=${payload}`;

  const getDataCountUrl = `${url}${payload}`;

  try {
    yield put({ type: action.PENDING_GET_COUNT_DATA_REQUEST, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.get,
      getDataCountUrl
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: action.successGetCountRequestInterface = {
          type: action.SUCCESSED_GET_COUNT_DATA_REQUEST,
          data: response.data.data,
        };
        yield put(data);
        callBack(response.data);
      } else {
        const data: action.failedGetCountRequestInterface = {
          type: action.FAILED_GET_COUNT_DATA_REQUEST,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callBack(response);
      }
    }
  } catch (err: any) {
    const data: action.failedGetCountRequestInterface = {
      type: action.FAILED_GET_COUNT_DATA_REQUEST,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callBack(err);
  }
}

export default function* CommonSaga() {
  yield takeEvery(action.GET_REQUEST, getCommonRequest);
  yield takeEvery(action.ADD_REQUEST, addDataRequest);
  yield takeEvery(action.UPDATE_REQUEST, updateDataRequest);
  yield takeEvery(action.DELETE_REQUEST, deleteDataRequest);
  yield takeEvery(action.GET_COUNT_DATA_REQUEST, getDataCount);
}
