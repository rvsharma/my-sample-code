import React from 'react';
import {
  CLOSE_LBL,
  CONNECTION_LBL,
  DATE_AND_TIME_LBL,
  ERROR_RETURNED_LBL,
  FILE_IMPORT_ERROR_LBL,
  FILE_NAME_LBL,
  LOCATION_LBL,
  VIEW_DETAILS_LBL,
} from '../../../shared/constant/AppConstants';
import { dateFormat } from '../../../shared/helperMethods/HelperMethod';

interface ownProps {
  data: any;
  onClose: any;
}

export default function ViewErrorDetails({ data, onClose }: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();

  const showModal = 'show d-block';

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
                {VIEW_DETAILS_LBL}
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='row'>
                <label htmlFor='Title' className='form-label lbl text-black'>
                  {FILE_IMPORT_ERROR_LBL}
                </label>
              </div>

              <div className='row'>
                <div className='col-12 col-sm text-end'>
                  <label htmlFor='File Name' className='form-label lbl'>
                    {FILE_NAME_LBL}:
                  </label>
                </div>
                <div className='col-12 col-sm mt-sm-0'>
                  <label htmlFor='Title' className='form-label lbl text-secondary'>
                    {data?.fileName?.toUpperCase()}
                  </label>
                </div>
              </div>
              <div className='row mt-1'>
                <div className='col-12 col-sm text-end'>
                  <label htmlFor='Location' className='form-label lbl'>
                    {LOCATION_LBL}:
                  </label>
                </div>
                <div className='col-12 col-sm mt-sm-0'>
                  <label htmlFor='ContainerName' className='form-label lbl text-secondary'>
                    {data?.location}
                  </label>
                </div>
              </div>
              <div className='row mt-1'>
                <div className='col-12 col-sm text-end'>
                  <label htmlFor='DateTime' className='form-label lbl'>
                    {DATE_AND_TIME_LBL}:
                  </label>
                </div>
                <div className='col-12 col-sm mt-sm-0'>
                  <label htmlFor='date' className='form-label lbl text-secondary'>
                    {dateFormat(new Date(data?.date))}
                  </label>
                </div>
              </div>

              <div className='row mt-2'>
                <label htmlFor='Connection' className='form-label lbl text-black'>
                  {CONNECTION_LBL}
                </label>
              </div>
              <div className='row mt-1'>
                <div className='col-12 col-sm text-end'>
                  <label htmlFor='Errorreturned' className='form-label lbl'>
                    {ERROR_RETURNED_LBL}:
                  </label>
                </div>
                <div className='col-12 col-sm mt-sm-0'>
                  <label htmlFor='Time-Out' className='form-label lbl text-secondary'>
                    {data?.error?.toUpperCase()}
                  </label>
                </div>
              </div>
            </div>
            <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
              <button
                type='button'
                onClick={() => onClose()}
                className='btn btn-primary'
                ref={closeModalRef}>
                {CLOSE_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
