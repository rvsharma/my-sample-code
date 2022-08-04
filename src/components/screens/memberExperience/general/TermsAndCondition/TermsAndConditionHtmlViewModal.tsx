/* eslint-disable no-nested-ternary */
import React from 'react';
import { CANCEL_LBL } from '../../../../shared/constant/AppConstants';

interface ownProps {
  data: any;
  show: boolean;
  onClose: any;
}
export default function TermsAndConditionHtmlViewModal({
  data,
  show,
  onClose,
}: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();
  const onClear = (): any => {
    onClose();
  };

  // console.log(data);

  const serverType = data?.type;
  const type = data?.dataItem?.type;
  const values = data?.dataItem?.values[data?.type];

  const serverName = serverType
    ? `Terms and Conditions -${serverType.charAt(0).toUpperCase() + serverType.slice(1)}`
    : null;

  const showModal = show ? 'show d-block' : 'd-none';

  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='termAndCondHtmlModal'
        tabIndex={-1}
        aria-labelledby='termsofuseHTMLLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='termsofuseHTMLLabel'>
                {serverName}
              </h5>
            </div>

            <div className='modal-body pb-0 mb-4'>
              {type && type === 'Html' ? (
                <div dangerouslySetInnerHTML={{ __html: values }} />
              ) : type && type === 'Text' ? (
                <div> {values} </div>
              ) : null}
            </div>

            <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
              <button
                type='button'
                className='btn btn-secondary me-3'
                data-bs-dismiss='modal'
                ref={closeModalRef}
                onClick={() => onClear()}>
                {CANCEL_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
