import React from 'react';

export const InputField = (props: any): any => {
  const { dataItem, field, updateState } = props;
  return (
    <td>
      {dataItem.inEdit ? (
        <div className='input-desciption'>
          <input
            type='text'
            className='form-control '
            placeholder=''
            value={dataItem[field]}
            onChange={(event) => {
              updateState(event.target.value, props);
            }}
            name='name'
          />
        </div>
      ) : (
        <span title={dataItem[field]}>{dataItem[field]}</span>
      )}
    </td>
  );
};
