import React, { useEffect, useState } from 'react';
import {
  CLONE_LBL,
  CONFIG_LBL,
  DISABLE_LBL,
  EDIT_LBL,
  ENABLE_LBL,
} from '../../../shared/constant/AppConstants';
import { arraysEqual } from '../../../shared/helperMethods/HelperMethod';

export const LinksTableHeaders = ['col1', 'col2', 'col3', 'col4'];

const iff = (condition: any, then: any, otherwise: any): any => (condition ? then : otherwise);

export function MemberConfigCell({ dataItem, onDisable, onClone, onEdit }: any): React.ReactNode {
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

  // const { id } = dataItem;
  return (
    <td className='positon-relative' id={dataItem?.id} ref={wrapperRef}>
      <button
        className='fa-thin fa-angle-right for-btn-without-bg'
        onClick={() => setShowActions(!showActions)}
        onKeyPress={() => setShowActions(!showActions)}
        tabIndex={0}
        type='button'>
        {' '}
      </button>
      {showActions && (
        <div className='positon-absolute-table shadow' id={dataItem?.id}>
          <button
            type='button'
            className='for-btn-without-bg text-start'
            onClick={() => onEdit(dataItem)}>
            {EDIT_LBL}
          </button>
          <button
            type='button'
            className='for-btn-without-bg text-start'
            onClick={() => onClone(dataItem)}>
            {CLONE_LBL}
          </button>
          {dataItem.status !== 'disabled' && (
            <button
              type='button'
              className='for-btn-without-bg text-start'
              onClick={() => onDisable(dataItem)}>
              {DISABLE_LBL}
            </button>
          )}
        </div>
      )}
    </td>
  );
}

export function Step3ActionCell({ dataItem, onEnableDisable, onConfigure }: any): React.ReactNode {
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

  // const { id } = dataItem;
  return (
    <td className='positon-relative' id={dataItem?.id} ref={wrapperRef}>
      <button
        className='fa-thin fa-angle-right for-btn-without-bg'
        onClick={() => setShowActions(!showActions)}
        onKeyPress={() => setShowActions(!showActions)}
        tabIndex={0}
        type='button'>
        {' '}
      </button>
      {showActions && (
        <div className='positon-absolute-table shadow' id={dataItem?.id}>
          {dataItem.enabled === true && (
            <button
              type='button'
              className='for-btn-without-bg text-start'
              onClick={() => onEnableDisable(dataItem)}
              data-bs-toggle='modal'
              data-bs-target='#deployToModal'>
              {DISABLE_LBL}
            </button>
          )}
          {dataItem.enabled === false && (
            <button
              type='button'
              className='for-btn-without-bg text-start'
              onClick={() => onEnableDisable(dataItem)}
              data-bs-toggle='modal'
              data-bs-target='#deployToModal'>
              {ENABLE_LBL}
            </button>
          )}
          {(dataItem.isCustom === false || !dataItem.isCustom) && (
            <button
              type='button'
              className='for-btn-without-bg text-start'
              onClick={() => onConfigure(dataItem)}>
              {CONFIG_LBL}
            </button>
          )}
        </div>
      )}
    </td>
  );
}

export function MemberConfigStatusCell({ dataItem }: any): React.ReactNode {
  return (
    <td>
      <span
        className={`fw-bold ${
          dataItem.status === 'New'
            ? 'dark-sky-blue'
            : iff(dataItem.status === 'disabled', 'bright-red', 'active-green')
        }`}>
        {dataItem.status}
      </span>
    </td>
  );
}

export function ParameterCell(props: any): React.ReactNode {
  const { dataItem, field } = props;
  const value = dataItem.parameters[field];
  let cell = value;
  if (Array.isArray(value)) {
    cell = value ? value.toString() : [].toString();
  }
  return <td title={cell}>{cell}</td>;
}

export function NameTagCell({ dataItem }: any): React.ReactNode {
  const cell = `${dataItem.name} - ${dataItem.tag}`;
  return <td title={cell}>{cell}</td>;
}

export function EnvCell({ dataItem }: any): React.ReactNode {
  const cell = `${dataItem.environment ? dataItem.environment.toString() : [].toString()}`;
  return <td title={cell}>{cell}</td>;
}

export function PlanCell({ dataItem, configFilters }: any): React.ReactNode {
  let cell = `${dataItem.plan ? dataItem.plan.toString() : [].toString()}`;
  if (arraysEqual(dataItem.plan, configFilters.plan)) {
    cell = 'All';
  }
  return <td title={cell}>{cell}</td>;
}

export function EmployerCell({ dataItem, configFilters }: any): React.ReactNode {
  let cell = `${dataItem.employer ? dataItem.employer.toString() : [].toString()}`;
  if (arraysEqual(dataItem.employer, configFilters.employer)) {
    cell = 'All';
  }
  return <td title={cell}>{cell}</td>;
}

export function EffectiveCell({ dataItem }: any): React.ReactNode {
  const cell = `${dataItem.parameters.isPreffective ? 'Pre-Effective' : 'Effective'}`;
  return <td title={cell}>{cell}</td>;
}

export function TextBoxCell({ props, onDataChange }: any): React.ReactNode {
  const { dataItem, field } = props;
  return (
    <td>
      <input
        name={field}
        onChange={(e) => onDataChange(e, dataItem)}
        type='text'
        value={dataItem[field]}
        className='form-control w-50'
      />
    </td>
  );
}

export function CheckBoxCell({ props, onDataChange }: any): React.ReactNode {
  const { dataItem, field, key } = props;
  return (
    <td>
      <label className='check-wrap' htmlFor={key}>
        <input
          id={key}
          name={field}
          onChange={(e) => onDataChange(e, dataItem, key)}
          type='checkbox'
          checked={dataItem.enabled || dataItem.enableDisableFeature}
        />
        <span className='checkmark member_experience' />
      </label>
    </td>
  );
}

export function NumericBoxCell({ props, onDataChange }: any): React.ReactNode {
  const { dataItem, field, min, max } = props;
  return (
    <td>
      {' '}
      <span className='number-wrapper'>
        <input
          pattern='[0-9]'
          min={min}
          name={field}
          max={max}
          type='number'
          value={Number(dataItem.weight)}
          className='pe-0 form-control d-inline w-50'
          onKeyDown={(e) => {
            if (e.key === '.') {
              e.preventDefault();
            }
          }}
          onChange={(e) => onDataChange(e, dataItem)}
        />
      </span>
    </td>
  );
}
