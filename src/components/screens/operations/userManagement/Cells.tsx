import React, { useEffect, useState } from 'react';
import {
  EDIT_LBL,
  FORGOT_USERNAME_LBL,
  RESET_MFA_LBL,
  RESET_PASSWORD_LBL,
  SAVE_CHANGES_LBL,
  // UPDATE_LBL,
  // CANCEL_LBL,
} from '../../../shared/constant/AppConstants';

export const LinksTableHeaders = ['col1', 'col2', 'col3', 'col4'];

interface cellProps {
  dataItem: any;
  onChooseEdit: any;
  onResetPassword: any;
  onForgotUsername: any;
  onResetMFA: any;
  onClickedEditSave: any;
  // onCancelEdit: any;
}

export function UserManagementCell({
  dataItem,
  onChooseEdit,
  onResetPassword,
  onForgotUsername,
  onResetMFA,
  onClickedEditSave,
}: // onCancelEdit,
cellProps): React.ReactNode {
  const wrapperRef: any = React.createRef();
  const [showActions, setShowActions] = useState(false);

  const handleClickOutside = (event: any): void => {
    if (wrapperRef && !wrapperRef?.current?.contains(event?.target)) {
      setShowActions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const { id } = dataItem;
  return (
    <>
      {!dataItem?.inEdit ? (
        <>
          {' '}
          <td className='positon-relative' id={id} ref={wrapperRef}>
            <button
              className='fa-thin fa-angle-right for-btn-without-bg'
              onClick={() => setShowActions(!showActions)}
              onKeyPress={() => setShowActions(!showActions)}
              tabIndex={0}
              type='button'>
              {' '}
            </button>
            {showActions && (
              <div className='positon-absolute-table shadow' id={id}>
                <button
                  type='button'
                  className='for-btn-without-bg text-start'
                  onClick={() => onChooseEdit(dataItem)}>
                  {EDIT_LBL}
                </button>
                <button
                  type='button'
                  className='for-btn-without-bg text-start'
                  onClick={() => onResetPassword(dataItem)}>
                  {RESET_PASSWORD_LBL}
                </button>
                <button
                  type='button'
                  className='for-btn-without-bg text-start'
                  onClick={() => onForgotUsername(dataItem)}>
                  {FORGOT_USERNAME_LBL}
                </button>
                <button
                  type='button'
                  className='for-btn-without-bg text-start'
                  onClick={() => onResetMFA(dataItem)}>
                  {RESET_MFA_LBL}
                </button>
              </div>
            )}
          </td>
        </>
      ) : (
        <td className='positon-relative' id={id}>
          {' '}
          <button
            type='button'
            className='for-btn-without-bg text-start text-white action-save'
            onClick={() => onClickedEditSave()}>
            {/* {UPDATE_LBL} */}
            {SAVE_CHANGES_LBL}
          </button>
          {/* <button
            type='button'
            className='for-btn-without-bg text-start text-danger'
            onClick={() => onCancelEdit()}>
            {CANCEL_LBL}
          </button> */}
        </td>
      )}
    </>
  );
}
