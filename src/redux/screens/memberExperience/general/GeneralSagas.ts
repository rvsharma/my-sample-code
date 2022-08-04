/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { takeEvery, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  FETCH_CONTENT_DATA,
  CREATE_CONTENT_DATA,
  UPDATE_CONTENT_DATA,
  DELETE_CONTENT_DATA,
} from '../../../services/Apis';

import * as action from './GeneralTypeConstant';
import { HEADER_NO_AUTH } from '../../../services/httpServices';

function* getAdminTermsRequest({ payload, callBack }: action.getGeneralDataRequest) {
  try {
    yield put({ type: action.GET_GENERAL_PENDING, isProcessing: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.get,
      `${FETCH_CONTENT_DATA}?type=${payload}`
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: action.getGeneralDataRequestSuccess = {
          type: action.GET_GENERAL_SUCCESS,
          data: response.data,
        };
        yield put(data);
        callBack(response.data);
      } else {
        const data: action.getGeneralDataRequestFailed = {
          type: action.GET_GENERAL_FAILED,
          requestFailed: true,
          errorMessage: response.data.message,
          errorData: response,
        };
        yield put(data);
        callBack(response);
      }
    }
  } catch (err: any) {
    const data: action.getGeneralDataRequestFailed = {
      type: action.GET_GENERAL_FAILED,
      requestFailed: true,
      errorMessage: err.message,
      errorData: err,
    };
    yield put(data);
    callBack(err);
  }
}
// CREATE
function* addNewTerms({ payload, callback }: action.addNewGeneral): any {
  try {
    yield put({ type: action.ADD_NEW_GENERAL_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.post,
      `${CREATE_CONTENT_DATA}`,
      // options
      JSON.stringify(payload)
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: action.addGeneralSuccess = {
          type: action.ADD_NEW_GENERAL_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: action.addGeneralFailed = {
          type: action.ADD_NEW_GENERAL_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: action.addGeneralFailed = {
      type: action.ADD_NEW_GENERAL_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

function* updateData({ payload, callback }: action.updateGeneralDataRequest): any {
  try {
    yield put({ type: action.UPDATE_GENERAL_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.put,
      `${UPDATE_CONTENT_DATA}`,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: action.updateGeneralDataSuccess = {
          type: action.UPDATE_GENERAL_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: action.updateGeneralDataRequestFailed = {
          type: action.UPDATE_GENERAL_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: action.updateGeneralDataRequestFailed = {
      type: action.UPDATE_GENERAL_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

function* deleteData({ payload, callback }: action.deleteGeneralDataRequest): any {
  try {
    yield put({ type: action.DELETE_GENERAL_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.put,
      `${DELETE_CONTENT_DATA}`,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: action.deleteGeneralDataRequestSuccess = {
          type: action.DELETE_GENERAL_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: action.deletGeneralDataRequestFailed = {
          type: action.DELETE_GENERAL_FAILED,
          getDataFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: action.deletGeneralDataRequestFailed = {
      type: action.DELETE_GENERAL_FAILED,
      getDataFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

export default function* GetAdminTermsAndConditionSaga() {
  yield takeEvery(action.CREATE_GET_GENERAL_REQUEST, getAdminTermsRequest);
  yield takeEvery(action.ADD_NEW_GENERAL, addNewTerms);
  yield takeEvery(action.CREATE_UPDATE_GENERAL_REQUEST, updateData);
  yield takeEvery(action.CREATE_DELETE_GENERAL_REQUEST, deleteData);
}
