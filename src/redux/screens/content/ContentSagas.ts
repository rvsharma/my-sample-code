import { takeEvery, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import * as actions from './ContentTypeConstants';
import { HEADER_NO_AUTH } from '../../services/httpServices';
import {
  FETCH_CONTENT_DATA_COUNT,
  FETCH_CONTENT_DATA,
  CREATE_CONTENT_DATA,
  DELETE_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
} from '../../services/Apis';

// workers

function* getData({ payload, callback }: actions.CreateGetDataRequest): any {
  try {
    yield put({ type: actions.GET_DATA_REQUEST_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.get,
      `${FETCH_CONTENT_DATA}${payload}`
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.getDataSuccess = {
          type: actions.GET_DATA_REQUEST_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.getDataRequestFailed = {
          type: actions.GET_DATA_REQUEST_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.getDataRequestFailed = {
      type: actions.GET_DATA_REQUEST_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}
// Update
function* updateData({ payload, callback }: actions.CreateUpdateDataRequest): any {
  try {
    yield put({ type: actions.UPDATE_DATA_REQUEST_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.put,
      `${UPDATE_CONTENT_DATA}`,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.updateDataSuccess = {
          type: actions.UPDATE_DATA_REQUEST_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.updateDataRequestFailed = {
          type: actions.UPDATE_DATA_REQUEST_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.updateDataRequestFailed = {
      type: actions.UPDATE_DATA_REQUEST_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}
// CREATE
function* addNewData({ payload, callback }: actions.CreateAddNewDataRequest): any {
  try {
    yield put({ type: actions.ADD_NEW_DATA_REQUEST_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.post,
      `${CREATE_CONTENT_DATA}`,
      // options
      JSON.stringify(payload)
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.addNewDataSuccess = {
          type: actions.ADD_NEW_DATA_REQUEST_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.addNewDataRequestFailed = {
          type: actions.ADD_NEW_DATA_REQUEST_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.addNewDataRequestFailed = {
      type: actions.ADD_NEW_DATA_REQUEST_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}
// Delete
function* deleteData({ payload, callback }: actions.CreateDeleteDataRequest): any {
  try {
    yield put({ type: actions.DELETE_DATA_REQUEST_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.put,
      `${DELETE_CONTENT_DATA}`,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.deleteDataSuccess = {
          type: actions.DELETE_DATA_REQUEST_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.deleteDataRequestFailed = {
          type: actions.DELETE_DATA_REQUEST_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.deleteDataRequestFailed = {
      type: actions.DELETE_DATA_REQUEST_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}
// get Data count
function* getDataCount({ payload, callback }: actions.CreateGetDataCountRequest): any {
  try {
    yield put({ type: actions.GET_DATA_COUNT_REQUEST_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.get,
      `${FETCH_CONTENT_DATA_COUNT}${payload}`
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.getDataCountSuccess = {
          type: actions.GET_DATA_COUNT_REQUEST_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.getDataCountRequestFailed = {
          type: actions.GET_DATA_COUNT_REQUEST_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.getDataCountRequestFailed = {
      type: actions.GET_DATA_COUNT_REQUEST_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

export default function* LoginSaga(): any {
  yield takeEvery(actions.CREATE_GET_DATA_REQUEST, getData);
  yield takeEvery(actions.CREATE_UPDATE_DATA_REQUEST, updateData);
  yield takeEvery(actions.CREATE_ADD_NEW_DATA_REQUEST, addNewData);
  yield takeEvery(actions.CREATE_DELETE_DATA_REQUEST, deleteData);
  yield takeEvery(actions.CREATE_GET_DATA_COUNT_REQUEST, getDataCount);
}
