import React from 'react';

interface ownProps {
  onPageChange: any;
  totalCount: any;
  dataState: any;
}

export default function Paginations({ onPageChange, totalCount, dataState }: ownProps): any {
  const onPageNumberUpdate = (pagenumber: any): any => {
    // eslint-disable-next-line no-unused-expressions
    dataState && Object.assign(dataState, { skip: pagenumber });
    onPageChange(dataState);
  };

  const totalPages = Math.ceil(totalCount / dataState?.take);
  const currentPage = dataState?.skip;
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination justify-content-end'>
        <li className='page-item mx-1'>
          <button
            className='page-link'
            type='button'
            disabled={dataState?.skip === 0}
            onClick={() => onPageNumberUpdate(currentPage - 1)}>
            Previous
          </button>
        </li>
        <li className='page-item mx-1'>
          <button
            className={`page-link ${currentPage === 1 ? 'active' : ''}`}
            type='button'
            onClick={() => onPageNumberUpdate(currentPage)}
            disabled={currentPage === 0}>
            {currentPage}
          </button>
        </li>
        {totalPages > 1 && (
          <li className='page-item mx-1'>
            <button
              className={`page-link ${currentPage === 2 ? 'active' : ''}`}
              type='button'
              onClick={() => onPageNumberUpdate(currentPage + 1)}>
              {currentPage + 1}
            </button>
          </li>
        )}
        {totalPages > 2 && (
          <li className='page-item mx-1'>
            <button
              className={`page-link ${currentPage === 3 ? 'active' : ''}`}
              type='button'
              onClick={() => onPageNumberUpdate(currentPage + 2)}>
              {currentPage + 2}
            </button>
          </li>
        )}
        {totalPages > 3 && (
          <li className='page-item mx-1'>
            {' '}
            <button disabled className='page-link border-0 disableHover' type='button'>
              ...
            </button>
          </li>
        )}
        {totalPages > 3 && (
          <li className='page-item mx-1'>
            <button
              className={`page-link ${currentPage === totalPages ? 'active' : ''}`}
              type='button'
              onClick={() => onPageNumberUpdate(totalPages)}>
              {totalPages}
            </button>
          </li>
        )}
        <li className='page-item mx-1'>
          <button
            className='page-link'
            type='button'
            disabled={dataState?.take === totalPages}
            onClick={() => onPageNumberUpdate(dataState?.skip + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
