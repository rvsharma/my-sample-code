/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  SAVE_LBL,
  CANCEL_LBL,
  UPDATE_LBL,
  SCHEDULE_NEW_NOTIFICATION,
  UNIQUE_NAME,
  TITLE_LBL,
  DATE_LBL,
  ENV_LABLE,
  CONTENT_LBL,
  ACTION_URL_LBL,
  MEMBERS_LBL,
  ACTION_TEXT_LBL,
  CONTENT_PASCAL_LBL,
  CATEGORY_LBL,
} from '../../../shared/constant/AppConstants';

interface ownProps {
  onClose: any;
  onSave: any;
  envMembers: any;
  commaMembers: any;
}

export default React.memo(function AddEditNotification({
  onClose,
  onSave,
  envMembers,
  commaMembers,
}: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();
  const [title, setTitle] = useState(null);
  const [env, setEnv] = useState('dev');
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState('gen');
  const [actionText, setActionText] = useState(null);
  const [ntfDate, setNtfDate]: any = useState(null);
  const [actionUrl, setActionUrl] = useState(null);
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);

  const onClear = (): any => {
    setTitle(null);
    setEnv('dev');
    setContent(null);
    setCategory('gen');
    setActionText(null);
    setNtfDate(null);
    setActionUrl(null);
    onClose();
  };

  useEffect(() => {
    if (title && env && content && category && actionText && ntfDate && actionUrl && envMembers) {
      setSaveButtonEnabled(true);
    } else {
      setSaveButtonEnabled(false);
    }
  }, [title, env, content, category, actionText, ntfDate, actionUrl, envMembers]);

  const onSaveNotification = (): any => {
    let notificationFullDate: any = new Date(ntfDate);
    const notificationYear = notificationFullDate.getFullYear().toString();
    const notificationMonth = notificationFullDate.getMonth() + 1;
    const notificationDate = notificationFullDate.getDate();
    const notificationStringMonth =
      notificationMonth <= 9 ? `0${notificationMonth}` : notificationMonth;
    const notificationStringDate =
      notificationDate <= 9 ? `0${notificationDate}` : notificationDate;
    notificationFullDate = `${notificationStringMonth}/${notificationStringDate}/${notificationYear}`;

    const dataItem = {
      title,
      environment: env,
      content,
      category,
      actionText,
      actionUrl,
      date: notificationFullDate,
      members: envMembers,
    };

    onSave(dataItem);
  };

  const showModal = 'show d-block';

  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='addNewNotification'
        aria-labelledby='addNewNotificationLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addNewNotificationLabel'>
                {SCHEDULE_NEW_NOTIFICATION}
              </h5>
            </div>

            <div className='modal-body pb-0 mb-4'>
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='title' className='form-label lbl'>
                    {TITLE_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      name='title'
                      value={title ?? ''}
                      onChange={(e: any) => setTitle(e.target.value)}
                      placeholder='Notification'
                    />
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <label htmlFor='date' className='form-label lbl'>
                    {ENV_LABLE}
                  </label>
                  <div className='col-12'>
                    <select
                      className='form-select'
                      value={env ?? ''}
                      onChange={(event: any) => setEnv(event.target.value)}>
                      <option value='dev'>Dev</option>
                      <option value='qa'>Test</option>
                      <option value='stage'>Stage</option>
                      <option value='prod'>Production</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='row mt-4'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='content' className='form-label lbl'>
                    {CONTENT_PASCAL_LBL}
                  </label>
                  <div className='col-12'>
                    <textarea
                      className='form-control'
                      placeholder='Content here...'
                      name='content'
                      value={content ?? ''}
                      onChange={(e: any) => setContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <label htmlFor='category' className='form-label lbl'>
                    {CATEGORY_LBL}
                  </label>
                  <div className='col-12'>
                    <select
                      className='form-select'
                      value={category ?? ''}
                      onChange={(event: any) => setCategory(event.target.value)}>
                      <option value='gen'>General</option>
                      <option value='healthInfo'>Health Info</option>
                      <option value='myHealthPlan'>My Health Plan</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='row mt-4 pt-4'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='actionText' className='form-label lbl'>
                    {ACTION_TEXT_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Go To Blog Post (Link)'
                      name='actionText'
                      value={actionText ?? ''}
                      onChange={(e: any) => setActionText(e.target.value)}
                    />
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <label htmlFor='ntfDate' className='form-label lbl'>
                    {DATE_LBL}
                  </label>

                  <div className='cal-wrp col-12 date-picker'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={ntfDate ?? ''}
                        mask='__/__/____'
                        onChange={(e: any) => setNtfDate(e)}
                        renderInput={(params) => (
                          <TextField
                            onChange={(e: any) => setNtfDate(e.target.value)}
                            placeholder='MM/DD/YYYY'
                            {...params} // eslint-disable-line react/jsx-props-no-spreading
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='actionUrl' className='form-label lbl'>
                    {ACTION_URL_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Go To Blog Post (Link)'
                      name='actionUrl'
                      value={actionUrl ?? ''}
                      onChange={(e: any) => setActionUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <label htmlFor='members' className='form-label lbl'>
                    {MEMBERS_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Members'
                      name='members'
                      value={commaMembers}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
              <button
                type='button'
                onClick={() => onClear()}
                className='btn btn-secondary me-3'
                ref={closeModalRef}>
                {CANCEL_LBL}
              </button>

              <button
                type='button'
                className='btn btn-primary'
                disabled={!isSaveButtonEnabled}
                onClick={() => {
                  setSaveButtonEnabled(false);
                  onSaveNotification();
                }}>
                {SAVE_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
