/* eslint-disable no-underscore-dangle */
import React from 'react';
import { OK_LBL } from '../../../shared/constant/AppConstants';
// import {
//   USER_MANAGEMENT_LBL,
//   CANCEL_LBL,
//   OK_LBL,
//   RESET_PASSWORD_TEXT,
//   RESET_MFA_LBL,
//   FORGOT_USERNAME_LBL,
//   RESET_PASSWORD_LBL,
//   RESET_MFA_TEXT,
//   FORGOT_USERNAME_TEXT,
//   UPDATE_EMAIL_LBL,
//   UPDATE_USER_EMAIL,
//   CONFIRM_DOB_LBL,
// } from '../../../shared/constant/AppConstants';

interface ownProps {
  userTitle?: any;
  userMessage: any;
  //   //   action: any;
  //   //   show: boolean;
  //   //   onConfirmResetMFA: any;
  //   //   onConfirmForgotPassword: any;
  //   //   onConfirmRecoverUsername: any;
  onOK: any;
  //   //   onConfirmDOB: any;
  //   //   onUserUpdate: any;
}

export default React.memo(function UserMessageModal({
  userTitle,
  userMessage,
  // action,
  // show,
  // onConfirmResetMFA,
  // onConfirmForgotPassword,
  // onConfirmRecoverUsername,
  onOK,
}: ownProps): JSX.Element {
  // data,
  // action,
  // show,
  // onConfirmResetMFA,
  // onConfirmForgotPassword,
  // onConfirmRecoverUsername,
  // onClose,
  // onConfirmDOB,
  // onUserUpdate,
  // ownProps
  const closeModalRef: any = React.createRef();

  const showModal = 'show d-block';

  // const userModalActionHandler = (): void => {};

  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='userMessage'
        aria-labelledby='userMessageLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='userMessageLabel'>
                {userTitle}
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='col-12 m-auto text-center'>
                <label htmlFor='Title' className='form-label lbl text-black fs-18'>
                  {userMessage}
                </label>
              </div>
            </div>
            <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
              <button
                type='button'
                onClick={() => onOK()}
                className='btn btn-primary me-3'
                ref={closeModalRef}>
                {OK_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
