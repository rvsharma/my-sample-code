/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React from 'react';

export default function TableCells(props: any): JSX.Element {
  const { displayText, type, onDataChange, dataItem, width, onListItemClick } = props;
  let displayObject: any = '';
  if (type === 'url_list') {
    displayObject = Object.keys(displayText);
  }

  const handleChange = (section: any): void => {
    if (onDataChange) {
      onDataChange(section);
    }
  };

  return (
    <>
      {type === 'checkbox' ? (
        <td width={width}>
          <label className='check-wrap' htmlFor={dataItem.id}>
            <input
              id={dataItem.id}
              onChange={() => handleChange(dataItem)}
              type='checkbox'
              checked={dataItem.enabled}
            />
            <span className='checkmark' />
          </label>
        </td>
      ) : type === 'url' ? (
        <td title={displayText}>
          <a href={displayText} target='_blank' rel='noreferrer'>
            {displayText}
          </a>
        </td>
      ) : type === 'url_list' ? (
        <div className='d-flex flex-row'>
          {displayObject?.map((e: string, index: number) => {
            return (
              <>
                <div>{index !== 0 ? '\xa0|\xa0' : ''}</div>
                <td title={e}>
                  <a // eslint-disable-line jsx-a11y/anchor-is-valid
                    href='javascript:function() { return false; }'
                    rel='noreferrer'
                    onClick={() => onListItemClick(e, dataItem)}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </a>
                </td>
              </>
            );
          })}
        </div>
      ) : type === 'inputText' ? (
        <td width={width}>
          <input
            onChange={() => onDataChange(dataItem)}
            type='text'
            value={displayText}
            className='form-control w-50'
          />
        </td>
      ) : type === 'number' ? (
        <td>
          {' '}
          <span className='number-wrapper'>
            <input
              type='number'
              value={displayText}
              className='pe-0 form-control d-inline w-50'
              onChange={() => onDataChange(dataItem)}
            />
          </span>
        </td>
      ) : (
        <td title={displayText}>{displayText}</td>
      )}
    </>
  );
}
