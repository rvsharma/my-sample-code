import { takeEvery, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import * as actions from './LoginTypeConstants';
import { HEADER_NO_AUTH } from '../../services/httpServices';
import { LOGIN_ENDPOINT } from '../../services/Apis';

// workers

function* Login({ payload, callback }: actions.CreateLoginRequest): any {
  try {
    yield put({ type: actions.LOGIN_REQUEST_PENDING, isFetching: true });
    const response: AxiosResponse<any> = yield call(
      HEADER_NO_AUTH.post,
      LOGIN_ENDPOINT,
      JSON.stringify(payload)
      // options
    );
    if (response) {
      if (response.data.isSuccess) {
        const data: actions.LoginSuccess = {
          type: actions.LOGIN_SUCCESS,
          data: response.data.data,
        };
        yield put(data);
        callback(response.data);
      } else {
        const data: actions.LoginRequestFailed = {
          type: actions.LOGIN_FAILED,
          loginFailed: true,
          errorMsg: response.data.message,
          errorData: response,
        };
        yield put(data);
        callback(response);
      }
    }
  } catch (err: any) {
    const data: actions.LoginRequestFailed = {
      type: actions.LOGIN_FAILED,
      loginFailed: true,
      errorMsg: err.message,
      errorData: err,
    };
    yield put(data);
    callback(err);
  }
}

export default function* LoginSaga(): any {
  yield takeEvery(actions.CREATE_LOGIN_REQUEST, Login);
}
