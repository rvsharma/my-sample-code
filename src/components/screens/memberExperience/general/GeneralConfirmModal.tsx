/* eslint-disable no-underscore-dangle */
import React from 'react';
import { CONFIRM_LBL, GO_BACK_LBL } from '../../../shared/constant/AppConstants';

interface ownProps {
  data: any;
  modalHeading: any;
  modalMessage: any;
  onGoBack: any;
  onOK: any;
}

export default React.memo(function GeneralConfirmModal({
  data,
  modalHeading,
  modalMessage,
  onGoBack,
  onOK,
}: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();

  const showModal = 'show d-block';

  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='generalConfirmModal'
        aria-labelledby='generalConfirmModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='generalConfirmModalLabel'>
                {modalHeading}
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='col-12 m-auto text-center'>
                <label htmlFor='Title' className='form-label lbl text-black fs-20 pb-3'>
                  {modalMessage}
                </label>
                <label htmlFor='Title' className='form-label lbl text-black fs-18'>
                  Click <span className='text-blue'>Confirm</span> to continue or
                  <span className='text-blue'> Go Back</span> to the previous screen
                </label>
              </div>
            </div>
            <div className='modal-footer border-0 px-4 mb-4 d-flex justify-content-between'>
              <button
                type='button'
                onClick={() => onGoBack()}
                className='btn btn-secondary me-3'
                ref={closeModalRef}>
                {GO_BACK_LBL}
              </button>
              <button type='button' className='btn btn-primary' onClick={() => onOK(data)}>
                {CONFIRM_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
