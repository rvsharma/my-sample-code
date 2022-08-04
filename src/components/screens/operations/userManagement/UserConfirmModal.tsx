/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  USER_MANAGEMENT_LBL,
  CANCEL_LBL,
  OK_LBL,
  RESET_PASSWORD_TEXT,
  RESET_MFA_LBL,
  FORGOT_USERNAME_LBL,
  RESET_PASSWORD_LBL,
  RESET_MFA_TEXT,
  FORGOT_USERNAME_TEXT,
  UPDATE_EMAIL_LBL,
  UPDATE_USER_EMAIL,
  // CONFIRM_DOB_LBL,
} from '../../../shared/constant/AppConstants';

interface ownProps {
  // data: any;
  action: any;
  show: boolean;
  onClose: any;
  onOK: any;
  // onUserUpdate: any;
}

export default React.memo(function UserConfirmModal({
  // data,
  action,
  show,
  onClose,
  onOK,
}: // onUserUpdate,
ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();

  const showModal = show ? 'show d-block' : 'd-none';

  // const userModalActionHandler = (): void => {
  //   onOK();

  //   // if (action === RESET_PASSWORD_LBL) {
  //   //   onConfirmForgotPassword();
  //   // }
  //   // if (action === FORGOT_USERNAME_LBL) {
  //   //   onConfirmRecoverUsername();
  //   // }
  //   // if (action === RESET_MFA_LBL) {
  //   //   onConfirmResetMFA();
  //   // }
  //   // if (action === UPDATE_EMAIL_LBL) {
  //   //   onOK();
  //   // }

  //   // if (action === '') {
  //   //   onUserUpdate();
  //   // }
  // };

  // console.log(data);
  // console.log(action);
  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='userConfirm'
        aria-labelledby='userConfirmLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='userConfirmLabel'>
                {USER_MANAGEMENT_LBL}
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='row mt-4 '>
                <div className='row mt-2 align-items-center'>
                  <label htmlFor='name' className='form-label lbl text-center'>
                    {action === RESET_PASSWORD_LBL && RESET_PASSWORD_TEXT}
                    {action === FORGOT_USERNAME_LBL && FORGOT_USERNAME_TEXT}
                    {action === RESET_MFA_LBL && RESET_MFA_TEXT}
                    {action === UPDATE_EMAIL_LBL && UPDATE_USER_EMAIL}
                  </label>
                </div>
              </div>
            </div>
            <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
              <button
                type='button'
                onClick={() => onClose()}
                className='btn btn-secondary me-3'
                ref={closeModalRef}>
                {CANCEL_LBL}
              </button>
              <button type='button' className='btn btn-primary' onClick={() => onOK()}>
                {OK_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
