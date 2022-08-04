import React, { useState } from 'react';
import {
  CANCEL_LBL,
  CONFIRM_LBL,
  MY_CANOPY_HEALTH_ADMIN_LBL,
} from '../../shared/constant/AppConstants';
import { LOGOUT_CONFIRMATION_MSG } from '../../shared/constant/AppMessages';
import { APP_HOME_URL } from '../../shared/constant/Urls';
import images from '../../shared/utils/Images';

export default function AdminHeader(): JSX.Element {
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const onLogout = (): any => {
    localStorage.clear();
    window.location.href = APP_HOME_URL;
  };

  return (
    <>
      <div id='header' className='is-logged-in'>
        <div className='header-content'>
          <div className='logos ps-4'>
            <div>
              <h4 className='mb-0'>{MY_CANOPY_HEALTH_ADMIN_LBL}</h4>
            </div>
          </div>
          <div>
            {!logoutConfirm ? (
              <div className='name-pic-logout'>
                <div className='user-img-header'>
                  <img
                    alt='header'
                    src={images.imgThumbnail}
                    srcSet={`${images.imgThumbnail}, ${images.imgThumbnail2x} 2x, ${images.imgThumbnail3x} 3x`}
                    className='header-img-tri'
                  />
                </div>
                <p className='navbar-text navbar-right user-name clickable'>Admin User</p>

                <div className='ui-split' />
                <button
                  type='button'
                  onClick={() => setLogoutConfirm(true)}
                  className='btn btn-main btn-logout'>
                  <i className='fa-regular fa-arrow-right-from-bracket' />
                  {/* <FontAwesomeIcon icon="fa-regular fa(-arrow-right-from-bracket" /> */} Logout{' '}
                </button>
              </div>
            ) : (
              <div className='double-check'>
                <div className='warning-logout'>{LOGOUT_CONFIRMATION_MSG}</div>
                <button
                  type='button'
                  className='btn btn-main btn-cancel-confirm'
                  onClick={() => setLogoutConfirm(false)}>
                  {CANCEL_LBL}
                </button>
                <button
                  type='button'
                  className='btn btn-main btn-logout-confirm'
                  onClick={() => onLogout()}>
                  {CONFIRM_LBL}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
