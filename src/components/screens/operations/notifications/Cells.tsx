import React, { useEffect, useState } from 'react';
import { BLOG_POST, HEALTH_INFO, PLAN_SUMMARY } from '../../../shared/constant/AppConstants';

interface cellProps {
  dataItem: any;
  // onBlogPost: any;
  // onPlanSummary: any;
}

export function NotificationsCell({
  dataItem,
}: // onBlogPost,
// onPlanSummary,
// onCancelEdit,
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
    <>
      {!dataItem?.inEdit && (
        <>
          {' '}
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
                {/* <button
                  type='button'
                  className='for-btn-without-bg text-start'
                  onClick={() => onBlogPost(dataItem)}>
                  {BLOG_POST}
                </button>
                <button
                  type='button'
                  className='for-btn-without-bg text-start'
                  onClick={() => onPlanSummary(dataItem)}>
                  {PLAN_SUMMARY}
                </button> */}

                <a href={dataItem?.actionUrl}>
                  <button type='button' className='for-btn-without-bg text-start'>
                    {dataItem?.category === 'gen' && BLOG_POST}
                    {dataItem?.category === 'healthInfo' && PLAN_SUMMARY}
                    {dataItem?.category === 'myHealthPlan' && HEALTH_INFO}
                  </button>
                </a>
              </div>
            )}
          </td>
        </>
      )}
    </>
  );
}
