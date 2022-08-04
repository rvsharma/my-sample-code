import React, { useEffect, useState } from 'react';
import {
  // CLONE_LBL,
  DELETE_LBL,
  // DISABLE_LBL,
  EDIT_LBL,
  // ENABLE_LBL,
} from '../../../shared/constant/AppConstants';

export const LinksTableHeaders = ['col1', 'col2', 'col3', 'col4'];

interface cellProps {
  dataItem: any;
  onEdit: any;
  onDelete: any;
  // onClone: any;
  // onToggle: any;
}

export function SsoCell({
  dataItem,
  onEdit,
  onDelete,
}: // onClone,
// onToggle,
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
            onClick={() => onEdit(dataItem)}>
            {EDIT_LBL}
          </button>
          {/* <button
            type='button'
            className='for-btn-without-bg text-start'
            onClick={() => onClone(dataItem)}>
            {CLONE_LBL}
          </button> */}
          <button
            type='button'
            className='for-btn-without-bg text-start'
            onClick={() => onDelete(dataItem)}>
            {DELETE_LBL}
          </button>
          {/* <button
            type='button'
            className='for-btn-without-bg text-start'
            onClick={() => onToggle(dataItem)}>
            {dataItem?.enabled ? DISABLE_LBL : ENABLE_LBL}
          </button> */}
        </div>
      )}
    </td>
  );
}
