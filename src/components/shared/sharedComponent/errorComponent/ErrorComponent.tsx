import React from 'react';

export const ErrorComponent = (messages: any): JSX.Element => {
  const { message } = messages;
  return <div className='help-block error'>{message.error}</div>;
};
