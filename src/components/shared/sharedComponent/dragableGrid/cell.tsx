import React, { useEffect, useState } from 'react';
import { REMOVE_LBL } from '../../constant/AppConstants';

export const LinksTableHeaders = ['col1', 'col2', 'col3', 'col4'];

export function MenueItemsCell(props: any): React.ReactNode {
  const { onRemove, data, index } = props;
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
    <div className='positon-relative' id={data?.id} ref={wrapperRef}>
      <button
        className='fa-thin fa-angle-right for-btn-without-bg'
        onClick={() => setShowActions(!showActions)}
        onKeyPress={() => setShowActions(!showActions)}
        tabIndex={0}
        type='button'>
        {' '}
      </button>
      {showActions && (
        <div className='positon-absolute-table shadow dragable-col' id={data?.id}>
          <div>
            {/* <button
              type='button'
              className='for-btn-without-bg text-start'
              onClick={() => onRemove(data)}>
              {OPEN_LINK_LBL}
            </button> */}
            <button
              type='button'
              className='for-btn-without-bg text-start'
              onClick={() => onRemove(index)}>
              {REMOVE_LBL}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function DropDownCell(props: any): React.ReactNode {
  const { value, onChange, data, items, index, name } = props;
  // const [color, setColor] = useState(value);

  console.log(data);
  const onTypeChange = (event: any, itemIndex: number): any => {
    onChange(event, itemIndex);
    // setColor(event.target.value);
  };
  return (
    <select
      className='form-select table-select'
      name={name}
      onChange={(e) => onTypeChange(e, index)}
      value={value}>
      <option value=''>Select here</option>
      {items.map((i: any) => (
        <option selected={value === i.value} value={i.value} title={i.text}>
          {i.text}
        </option>
      ))}
    </select>
  );
}
