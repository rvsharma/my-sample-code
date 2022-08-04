import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as action from '../../../redux/accounts/login/LoginAction';
import {
  // ENV_OPTIONS,
  PLEASE_SIGH_IN,
  // SELECT_ENV_LBL,
  SIGN_IN_LBL,
} from '../../shared/constant/AppConstants';
import {
  // DOMAIN_USERE_ERROR,
  PASSWORD_EMPTY_ERROR,
  USERNAME_ERROR,
} from '../../shared/constant/AppMessages';
import { BRANDING_PAGE_URL } from '../../shared/constant/Urls';
import { history } from '../../shared/helperMethods/HelperMethod';
// import { validateDomainEmail, validateEmail } from '../../shared/utils/Validators';

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false);
  const [loginData, setLoginData] = useState('');
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  // const [selectedEnv, setEnv] = useState('');
  const dispatch = useDispatch();

  const checkError = (): any => {
    if (
      username === '' ||
      // !validateEmail(username) ||
      password === ''
      // || !validateDomainEmail(username)
    ) {
      return true;
    }
    return false;
  };

  function onLogin(): void {
    setIsLoginFailed(false);
    const data = {
      username,
      password,
    };
    if (!checkError()) {
      dispatch(
        action.createLoginRequest(data, (res: any) => {
          if (res?.isSuccess) {
            setLoginData(res?.data.message);
            localStorage.setItem('isLoggedIn', JSON.stringify(res));
            history.push(BRANDING_PAGE_URL);
          } else {
            setIsLoginFailed(true);
            setLoginData(res?.data.message);
          }
        })
      );
    } else {
      setError(true);
      setIsLoginFailed(true);
    }
    console.log('Login Data', data);
  }

  return (
    <div className='adminloginHeader'>
      <div className='form-signin text-center'>
        <div className='row'>
          <h1 className='h3 mb-3 font-weight-normal'>{PLEASE_SIGH_IN}</h1>
        </div>

        {isLoginFailed && (
          <div className='alert alert-primary d-flex align-items-center p-0 mt-3' role='alert'>
            <div className='row align-items-center'>
              <div className='col-auto pt-2 pb-2 accerlationmark'>
                <i className='fas fa-exclamation-circle text-white' />
              </div>

              <div className='col fs-12'>
                {/* {!validateDomainEmail(username) ? DOMAIN_USERE_ERROR : loginData} */}
                {loginData}
              </div>
            </div>
          </div>
        )}
        <div className='row'>
          <input
            type='text'
            id='userid'
            className='form-control mb-0'
            placeholder='User Id'
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
          {isError && username === '' && (
            <div className='col-12 username-form-label-text accerlationmark-error mb-2'>
              <div className='row align-items-center'>
                <div className='col-auto px-0'>
                  <i className='fas fa-exclamation-circle' />
                </div>
                <div className='col ps-2 text-start'>
                  <p>{USERNAME_ERROR}</p>
                </div>
              </div>
            </div>
          )}
          <input
            type='password'
            id='password'
            className='form-control mb-0'
            placeholder='Password'
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            autoComplete='off'
          />
          {isError && username === '' && (
            <div className='col-12 username-form-label-text accerlationmark-error mb-2'>
              <div className='row align-items-center'>
                <div className='col-auto px-0'>
                  <i className='fas fa-exclamation-circle' />
                </div>
                <div className='col ps-2 text-start'>
                  <p>{PASSWORD_EMPTY_ERROR}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div className='row align-items-center mb-2 mt-2'>
          <div className='col-6 col-sm-5 text-start px-0'>{SELECT_ENV_LBL}:</div>
          <div className='col-6 col-sm-7 text-end px-0'>
            <select
              id='envDropDown'
              className='enableDisableDD mb-0 form-select'
              onChange={(e: any) => setEnv(e.target.value)}>
              <option value=''>{SELECT_ENV_LBL}</option>
              <option value={ENV_OPTIONS.TEST} selected={selectedEnv === ENV_OPTIONS.TEST}>
                {ENV_OPTIONS.TEST}
              </option>
              <option value={ENV_OPTIONS.STAGE} selected={selectedEnv === ENV_OPTIONS.STAGE}>
                {ENV_OPTIONS.STAGE}
              </option>
              <option value={ENV_OPTIONS.PRE_PROD} selected={selectedEnv === ENV_OPTIONS.PRE_PROD}>
                {ENV_OPTIONS.PRE_PROD}
              </option>
            </select>
          </div>
        </div> */}

        <div className='row'>
          <button
            id='btnLogin'
            type='button'
            className='btn btn btn-primary btn-block w-100 mt-3'
            onClick={() => onLogin()}>
            {SIGN_IN_LBL}
          </button>
        </div>
      </div>
    </div>
  );
}
