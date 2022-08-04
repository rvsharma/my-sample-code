import React, { PureComponent } from 'react';
import { OK_LABEL } from '../../constant/AppConstants';

interface ComfirmationModalProps {
  showModal: boolean;
  closeModal: any;
  title: string;
  message: any;
}
interface ComfirmationModalState {}
class ComfirmationModal extends PureComponent<ComfirmationModalProps, ComfirmationModalState> {
  render(): JSX.Element {
    const { showModal, closeModal, message, title } = this.props;
    const show = showModal ? 'show' : 'd-none';
    return (
      <>
        <div className={`modal-backdrop fade ${show}`} />
        <div className={`modal fade ${show}`}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content modal-dialog-wider' style={{ margin: '0 auto' }}>
              <div className='modal-header'>
                <h4 className='modal-title'>{title}</h4>
              </div>
              <div className='modal-body'>
                <p>{message}</p>
              </div>
              <div className='modal-footer text-sm-end justify-content-sm-end'>
                <button
                  onClick={() => closeModal(false)}
                  type='button'
                  className='btn btn-confirm float-end'
                  data-bs-dismiss='modal'>
                  {OK_LABEL}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ComfirmationModal;
