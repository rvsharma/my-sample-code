import React from 'react';

export default function Tabs(props: any): JSX.Element {
  const { data, active, onSelect } = props;
  return (
    <div className='row my-4 mt-2'>
      {data?.map((i: any) => (
        <div key={i.value} className='col-auto tab-button mb-2 mb-md-0'>
          <button
            className={`btn btn-blue btn-radius px-4 shadow-sm ${
              active === i.value ? 'btn-primary' : 'btn-primary btn-secondary-color'
            }`}
            type='button'
            onClick={() => onSelect(i.value)}>
            {i.title}
          </button>
        </div>
      ))}
    </div>
  );
}
