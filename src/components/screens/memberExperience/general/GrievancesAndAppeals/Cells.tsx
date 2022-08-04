import React, { useEffect, useState } from 'react';
import { EDIT_LBL } from '../../../../shared/constant/AppConstants';

interface cellProps {
  dataItem: any;
  onEdit: any;
  // onDelete: any;
}

export function GrievancesAndAppealsCell({ dataItem, onEdit }: cellProps): React.ReactNode {
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

  return (
    <td className='positon-relative' id={dataItem?.id} ref={wrapperRef}>
      <button
        className='fa-thin fa-angle-right for-btn-without-bg'
        onClick={() => setShowActions(!showActions)}
        onKeyPress={() => setShowActions(!showActions)}
        tabIndex={0}
        type='button'>
        {' '}
      </button>
      {showActions && (
        <div className='positon-absolute-table shadow' id={dataItem?.id}>
          <button
            type='button'
            className='for-btn-without-bg text-start'
            onClick={() => onEdit(dataItem)}
            // data-bs-toggle='modal'
            // data-bs-target='#addNewLink'
          >
            {EDIT_LBL}
          </button>
          {/* <button
            type='button'
            className='for-btn-without-bg text-start'
            onClick={() => onDelete(dataItem)}>
            {DELETE_LBL}
          </button> */}
        </div>
      )}
    </td>
  );
}

export function CheckBoxCell({ props, onDataChange }: any): React.ReactNode {
  const { dataItem } = props;
  return (
    <td>
      <label className='check-wrap' htmlFor={dataItem.id}>
        <input
          id={dataItem.id}
          onChange={(e) => onDataChange(e, dataItem)}
          type='checkbox'
          checked={dataItem.defaultEnabled}
        />
        <span className='checkmark member_experience' />
      </label>
    </td>
  );
}
