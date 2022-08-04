import React, { useState } from 'react';

export default function AdminSearch({ onSearch, placeholder }: any): JSX.Element {
  const [text, setText] = useState('');

  const onTextChange = (e: any): void => {
    setText(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  const handleKeyDown = (e: any): void => {
    if (e.key === 'Enter') {
      onSearch(text);
    }
  };

  return (
    <div className='col-12 col-sm-6 col-md-4 col-xl-4 search-icon'>
      <div className='input-group'>
        <input
          className='form-control rounded'
          type='search'
          id='Search'
          placeholder={placeholder || 'Search by name'}
          value={text}
          onChange={onTextChange}
          onKeyDown={(e: any) => handleKeyDown(e)}
        />
        <span
          aria-hidden
          className='input-group-append input-group-append-search'
          onClick={() => onSearch(text)}
          onKeyDown={(e: any) => handleKeyDown(e)}>
          <i className='fa fa-search' />
        </span>
      </div>
    </div>
  );
}
