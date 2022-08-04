/* eslint-disable no-underscore-dangle */
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import {
  CANCEL_LBL,
  CONFIRM_LBL,
  DOB_MODAL_TITLE,
  DOB_TITLE_LABEL,
  MEMBER_DOB_LABEL,
} from '../../../shared/constant/AppConstants';

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
  onClose: any;
  onConfirmDOB: any;
}

export default React.memo(function EnterDOB({ onConfirmDOB, onClose }: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();

  const showModal = 'show d-block';
  const [dob, setDob]: any = useState(null);

  // const userModalActionHandler = (): void => {};

  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='enterDobLink'
        aria-labelledby='dobModal'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='dobModal'>
                {DOB_MODAL_TITLE}
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='col-12 m-auto text-center'>
                <label htmlFor='dobTitle' className='form-label lbl text-black fs-18'>
                  {DOB_TITLE_LABEL}
                </label>
              </div>
              <div className='row mt-4 '>
                <div className='col-12 col-sm-7 m-auto'>
                  <label htmlFor='memberDob' className='form-label lbl'>
                    {MEMBER_DOB_LABEL}
                  </label>
                </div>
                <div className='col-12 col-sm-7 m-auto mt-3 mt-sm-0 cal-wrp'>
                  <div className='btnCal-wrp date-picker'>
                    {/* <input
                      id='datapickerfield'
                      placeholder='mm/dd/yyyy'
                      name='dob'
                      type='date'
                      className='btnCal-click'
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={dob}
                        mask='__/__/____'
                        onChange={(date) => setDob(date)}
                        renderInput={(params) => <TextField placeholder='MM/DD/YYYY' {...params} />} // eslint-disable-line react/jsx-props-no-spreading
                      />
                    </LocalizationProvider>
                  </div>
                  {/* <button type='button' className='btnCal'>
                    <span className='fa-solid fa-calendar-days' aria-hidden='true' />
                  </button> */}
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
              <button
                type='button'
                className='btn btn-primary'
                disabled={!dob}
                onClick={() => onConfirmDOB(dob)}>
                {CONFIRM_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
