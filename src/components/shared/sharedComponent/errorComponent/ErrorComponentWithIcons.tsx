import React from 'react';

interface IProps {
  message: string;
}
export const ErrorComponentIcon = ({ message: messages }: IProps): JSX.Element => {
  return (
    <div className='alert alert-primary d-flex align-items-center p-0 mt-3' role='alert'>
      <div className='row'>
        <div className='col-auto pt-2 pb-2 accerlationmark'>
          <i className='fas fa-exclamation-circle text-white' />
        </div>

        <div className='col'>{messages}</div>
      </div>
    </div>
  );
};
