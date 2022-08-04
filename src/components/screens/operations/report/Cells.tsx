import React, { useEffect, useState } from 'react';
import { DOWNLOAD_LBL, MARK_AS_DELETED_LBL } from '../../../shared/constant/AppConstants';

export const LinksTableHeaders = ['col1', 'col2', 'col3', 'col4'];

interface cellProps {
  dataItem: any;
  onDownload: any;
  onDelete: any;
}

export function ReportsCell({ dataItem, onDelete, onDownload }: cellProps): React.ReactNode {
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
            onClick={() => onDownload(dataItem)}>
            {DOWNLOAD_LBL}
          </button>
          <button
            type='button'
            className='for-btn-without-bg text-start'
            onClick={() => onDelete(dataItem)}>
            {MARK_AS_DELETED_LBL}
          </button>
        </div>
      )}
    </td>
  );
}
