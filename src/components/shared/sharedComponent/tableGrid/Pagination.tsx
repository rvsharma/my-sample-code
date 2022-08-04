/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.scss';

const Pagination = (props: any): any => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    dataState,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onPageNumberUpdate = (pagenumber: any): any => {
    // eslint-disable-next-line no-unused-expressions
    dataState && Object.assign(dataState, { skip: pagenumber });
    onPageChange(dataState);
  };

  const onNext = (): void => {
    Object.assign(dataState, { skip: currentPage + 1 });
    onPageChange(dataState);
  };

  const onPrevious = (): void => {
    Object.assign(dataState, { skip: currentPage - 1 });
    onPageChange(dataState);
  };

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('justify-content-end pagination-container', {
        [className]: className,
      })}>
      {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}>
        <div className='arrow left mb-1' />
        <div className='mx-2 mt-2'>PREVIOUS</div>
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber: {} | null | undefined) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className='pagination-item dots'>&#8230;</li>;
          }

          // Render our Page Pills
          return (
            <li
              className={classnames('pagination-item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageNumberUpdate(pageNumber)}>
              {pageNumber}
            </li>
          );
        })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}>
        <div className='mx-2 mt-2'>NEXT</div>
        <div className='arrow right' />
      </li>
    </ul>
  );
};

export default Pagination;
