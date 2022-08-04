/* eslint-disable no-underscore-dangle */
import React from 'react';
import { OK_LBL } from '../../constant/AppConstants';

interface ownProps {
  title: any;
  text: any;
  onOK: any;
}

export default React.memo(function UserMessageModal({ title, text, onOK }: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();

  const showModal = 'show d-block';

  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='messageModal'
        aria-labelledby='messageModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='messageModalLabel'>
                {title}
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='col-12 m-auto text-center'>
                <label htmlFor='Title' className='form-label lbl text-black fs-18'>
                  {text}
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
