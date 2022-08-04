import React, { useEffect, useState } from 'react';

import { arraysEqual } from '../../../shared/helperMethods/HelperMethod';
import { DEPLOY_TO_LBL } from '../../../shared/constant/AppConstants';

export const LinksTableHeaders = ['col1', 'col2', 'col3', 'col4'];

interface cellProps {
  dataItem: any;
  deployModalHandler: any;
}

export function MemberConfigCell({ dataItem, deployModalHandler }: cellProps): React.ReactNode {
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
            onClick={() => deployModalHandler(dataItem)}>
            {DEPLOY_TO_LBL}
          </button>
        </div>
      )}
    </td>
  );
}

export function ParameterCell(props: any): React.ReactNode {
  const { dataItem, field } = props;
  const value = dataItem.parameters[field];
  let cell = value;
  if (Array.isArray(value)) {
    cell = value ? value.join(', ').toString() : [].toString();
  }
  return <td title={cell}>{cell}</td>;
}

export function NameTagCell({ dataItem }: any): React.ReactNode {
  const cell = `${dataItem.name} - ${dataItem.tag}`;
  return <td title={cell}>{cell}</td>;
}

export function EnvCell({ dataItem }: any): React.ReactNode {
  const { environment } = dataItem;

  const adminIdx = environment.indexOf('Admin');
  // const qaIdx = environment.indexOf('Qa');

  // if (qaIdx > -1) {
  //   environment[qaIdx] = 'Test';
  // }

  if (adminIdx > -1) {
    environment.splice(adminIdx, 1);
  }

  const cell = `${environment ? environment.join(', ').toString() : [].toString()}`;

  return <td title={cell}>{cell}</td>;
}

export function PlanCell({ dataItem, configFilters }: any): React.ReactNode {
  let cell = `${dataItem.plan ? dataItem.plan.join(', ').toString() : [].toString()}`;
  if (arraysEqual(dataItem.plan, configFilters.plan)) {
    cell = 'All';
  }
  return <td title={cell}>{cell}</td>;
}

export function EmployerCell({ dataItem, configFilters }: any): React.ReactNode {
  let cell = `${dataItem.employer ? dataItem.employer.join(', ').toString() : [].toString()}`;
  if (arraysEqual(dataItem.employer, configFilters.employer)) {
    cell = 'All';
  }
  return <td title={cell}>{cell}</td>;
}

export function EffectiveCell({ dataItem }: any): React.ReactNode {
  const cell = `${dataItem.parameters.isPreffective ? 'Pre-Effective' : 'Effective'}`;
  return <td title={cell}>{cell}</td>;
}
