/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
  DEV_LBL,
  EFFECTIVE_FROM,
  NAME_LBL,
  PROD_LBL,
  TEST_LBL,
  TYPE_LBL,
  STAGE_LBL,
  SAVE_LBL,
  CANCEL_LBL,
  UPDATE_LBL,
  ADD_NEW_TERMS_AND_CONDITION,
  UNIQUE_NAME,
} from '../../../../shared/constant/AppConstants';
import GeneralModal from '../GeneralModal';

interface ownProps {
  data: any;
  show: boolean;
  onClose: any;
  onSave: any;
  uniqueNameError?: any;
  setUniqueNameError?: any;
}

export default function AddUpdateTermsConditionsModel({
  data,
  show,
  onClose,
  onSave,
  uniqueNameError,
  setUniqueNameError,
}: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();
  const [name, setName] = useState(null);
  const [devContent, setDevContent] = useState(null);
  const [testContent, setTestContent] = useState(null);
  const [stageContent, setStageContent] = useState(null);
  const [prodContent, setProdContent] = useState(null);
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [type, setType] = useState('Html');
  const [effectiveFrom, setEffectiveFrom]: any = useState(null);
  const [generalModalTitle, setGeneralModalTitle] = useState('');
  const [generalModalMsg, setGeneralModalMsg] = useState('');
  const [showGeneralMsgModal, setShowGeneralMsgModal] = useState(false);

  const onClear = (): any => {
    setName(null);
    setDevContent(null);
    setTestContent(null);
    setStageContent(null);
    setProdContent(null);
    setEffectiveFrom(null);
    setType('Html');
    setGeneralModalTitle('');
    setGeneralModalMsg('');
    setShowGeneralMsgModal(false);
    onClose();
  };

  // const datePickerElem: any = document.querySelectorAll('.MuiOutlinedInput-input')[0];
  // // console.log(datePickerElem);

  // if (datePickerElem) {
  //   datePickerElem.disabled = true;
  // }

  useEffect(() => {
    if (data) {
      // console.log(data);
      // if (data) {
      setName(data?.name || null);
      setDevContent(data.values?.dev || null);
      setTestContent(data.values?.test || null);
      setStageContent(data.values?.stage || null);
      setProdContent(data.values?.prod || null);
      let currentDate = null;
      if (data && data?.effectiveFrom) {
        const dateArray: any = data?.effectiveFrom ? data?.effectiveFrom.split('/') : null;
        currentDate = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
      }
      setEffectiveFrom(currentDate || null);
      setType(data?.type || 'Html');
    } else {
      onClear();
    }
  }, [data]);

  useEffect(() => {
    if (name && devContent && testContent && stageContent && prodContent && effectiveFrom && type) {
      setSaveButtonEnabled(true);
    } else {
      setSaveButtonEnabled(false);
    }
  }, [name, devContent, testContent, stageContent, prodContent, effectiveFrom, type]);

  const onSaveTermsAndCondition = (): any => {
    // const selectedEffectiveDob = effectiveFrom || null;
    const selectedEffectiveFromString: any = new Date(effectiveFrom).toDateString();
    // let selectedEffectiveFrom: any = new Date(effectiveFrom);

    let effectiveFromFullDate: any = new Date(effectiveFrom);
    const effectiveFromMonth = effectiveFromFullDate.getMonth();
    const effectiveFromDate = effectiveFromFullDate.getDay();
    const effectiveFromYear = effectiveFromFullDate.getFullYear();
    effectiveFromFullDate = new Date(effectiveFromYear, effectiveFromMonth, effectiveFromDate);

    let currentFullDate: any = new Date();
    const currentMonth = currentFullDate.getMonth();
    const currentDate = currentFullDate.getDay();
    const currentYear = currentFullDate.getFullYear();
    currentFullDate = new Date(currentYear, currentMonth, currentDate);

    // console.log(selectedEffectiveFrom);

    if (selectedEffectiveFromString === 'Invalid Date') {
      setGeneralModalTitle('Failed');
      setGeneralModalMsg('Please provide proper effective from date');
      setShowGeneralMsgModal(true);
    } else if (currentFullDate > effectiveFromFullDate) {
      setGeneralModalTitle('Failed');
      setGeneralModalMsg('Effective from date cannot be a past date');
      setShowGeneralMsgModal(true);
    } else if (currentFullDate <= effectiveFromFullDate) {
      setShowGeneralMsgModal(false);
      if (effectiveFrom) {
        const effectiveDobFullDate = new Date(effectiveFrom);
        const effectiveDobYear = effectiveDobFullDate.getFullYear().toString();
        const effectiveDobMonth = effectiveDobFullDate.getMonth() + 1;
        const effectiveDobDate = effectiveDobFullDate.getDate();
        const effectiveDobStringMonth =
          effectiveDobMonth <= 9 ? `0${effectiveDobMonth}` : effectiveDobMonth;
        const effectiveDobStringDate =
          effectiveDobDate <= 9 ? `0${effectiveDobDate}` : effectiveDobDate;
        effectiveFromFullDate = `${effectiveDobStringMonth}/${effectiveDobStringDate}/${effectiveDobYear}`;
      }
      const dataItem = {
        _id: data?._id,
        name,
        type,
        effectiveFrom: effectiveFromFullDate,
        values: {
          dev: devContent,
          test: testContent,
          stage: stageContent,
          prod: prodContent,
        },
      };
      onSave(dataItem);
    }
  };

  const showModal = show ? 'show d-block' : 'd-none';

  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='addNewTermsAndCond'
        aria-labelledby='addNewTermsAndCondModal'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addNewTermsAndCondModal'>
                {ADD_NEW_TERMS_AND_CONDITION}
              </h5>
            </div>

            <div className='modal-body pb-0 mb-4'>
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    {NAME_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      name='name'
                      value={name ?? ''}
                      onChange={(e: any) => {
                        setName(e.target.value);
                        setUniqueNameError();
                      }}
                      placeholder='Type Here'
                    />
                  </div>
                  {uniqueNameError ? (
                    <p className='help-block error'>Terms & Conditions {UNIQUE_NAME}</p>
                  ) : null}
                </div>

                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    {TYPE_LBL}
                  </label>
                  <div className='col-12'>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      value={type ?? ''}
                      onChange={(event: any) => setType(event.target.value)}>
                      <option value='Html'>Html</option>
                      <option value='Text'>Text</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='row mt-4'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    {EFFECTIVE_FROM}
                  </label>

                  <div className='cal-wrp col-12 date-picker'>
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TextField
                        id='date'
                        type='date'
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={effectiveFrom ?? ''}
                        onChange={(event: any) => setEffectiveFrom(event.target.value)}
                      />
                    </LocalizationProvider> */}

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        // minDate={new Date()}
                        value={effectiveFrom ?? ''}
                        mask='__/__/____'
                        onChange={(date: any) => setEffectiveFrom(date)}
                        renderInput={(params) => (
                          <TextField
                            onChange={(e: any) => setEffectiveFrom(e.target.value)}
                            placeholder='MM/DD/YYYY'
                            {...params} // eslint-disable-line react/jsx-props-no-spreading
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>

              <div className='row mt-4'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    {DEV_LBL}
                  </label>
                  <div className='col-12'>
                    <textarea
                      className='form-control'
                      placeholder='Enter Content'
                      name='content'
                      value={devContent ?? ''}
                      onChange={(e: any) => setDevContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    {TEST_LBL}
                  </label>
                  <div className='col-12'>
                    <textarea
                      className='form-control'
                      placeholder='Enter Content'
                      name='content'
                      value={testContent ?? ''}
                      onChange={(e: any) => setTestContent(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='row mt-4'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    {STAGE_LBL}
                  </label>
                  <div className='col-12'>
                    <textarea
                      className='form-control'
                      placeholder='Enter Content'
                      name='content'
                      value={stageContent ?? ''}
                      onChange={(e: any) => setStageContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    {PROD_LBL}
                  </label>
                  <div className='col-12'>
                    <textarea
                      className='form-control'
                      placeholder='Enter Content'
                      name='content'
                      value={prodContent ?? ''}
                      onChange={(e: any) => setProdContent(e.target.value)}
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
                onClick={() => onSaveTermsAndCondition()}>
                {data ? UPDATE_LBL : SAVE_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showGeneralMsgModal && (
        <GeneralModal
          modalHeading={generalModalTitle}
          modalMessage={generalModalMsg}
          onOK={() => setShowGeneralMsgModal(false)}
        />
      )}
    </>
  );
}
