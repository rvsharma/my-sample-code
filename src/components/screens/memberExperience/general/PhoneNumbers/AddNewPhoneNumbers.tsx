/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import {
  ADD_NEW_PHONE_NUMBER,
  NAME_LBL,
  TYPE_LBL,
  LABEL_LBL,
  // TITLE_LBL,
  // ENV_LABLE,
  // ENV_OPTIONS,
  // SELECT_ENV_LBL,
  CANCEL_LBL,
  SAVE_LBL,
  STAGE_LBL,
  TEST_LBL,
  PROD_LBL,
  DEV_LBL,
  DEFAULT_LBL,
} from '../../../../shared/constant/AppConstants';

interface ownProps {
  data: any;
  show: boolean;
  onClose: any;
  onSave: any;
}

// interface urls{
//   dev:string,
//   stage: string;
//   test: string;
//   prod: string;
// }

// const initialState={
//   name:'',
//   text:'',
//   urls:{dev:'', stage:'', test:'', prod:'' }
// }

export default function AddNewPhoneNumbers({ data, show, onClose, onSave }: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();
  const [name, setName] = useState(null);
  const [label, setLabel] = useState(null);
  const [type, setType] = useState(null);
  const [defaultEnabled, setDefaultEnable] = useState('No');

  const [dev, setDevUrl] = useState(null);
  const [test, setTestUrl] = useState(null);
  const [stage, setStageUrl] = useState(null);
  const [prod, setProdUrl] = useState(null);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setName(data?.name);
    setType(data?.type);
    setLabel(data?.label);
    setDefaultEnable(data?.defaultEnabled ? 'Yes' : 'No');
    setDevUrl(data?.values?.dev);
    setTestUrl(data?.values?.test);
    setStageUrl(data?.values?.stage);
    setProdUrl(data?.values?.prod);
    // setEnv(data?.envirnoment);

    return () => {
      setName(null);
      setLabel(null);
      setType(null);
      setDefaultEnable('No');
      setDevUrl(null);
      setTestUrl(null);
      setStageUrl(null);
      setProdUrl(null);
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    if (name && type && label && defaultEnabled && dev && stage && test && prod) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [name, type, label, defaultEnabled, dev, stage, test, prod]);

  const onClear = (): any => {
    setName(null);
    setLabel(null);
    setDevUrl(null);
    setTestUrl(null);
    setStageUrl(null);
    setProdUrl(null);
    setDefaultEnable('No');
    onClose();
  };

  function onSaveLink(): any {
    const dataItem = {
      name,
      label,
      type,
      defaultEnabled: defaultEnabled === 'Yes',
      _id: data?._id,
      values: {
        dev,
        test,
        stage,
        prod,
      },
    };
    onSave(dataItem);
  }

  const onDefaultValueChange = (event: any): any => {
    setDefaultEnable(event.target.name);
  };
  const showModal = show ? 'show d-block' : 'd-none';
  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='addNewLink'
        aria-labelledby='addNewLinkLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addNewLinkLabel'>
                {ADD_NEW_PHONE_NUMBER}
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
                      onChange={(e: any) => setName(e.target.value)}
                      placeholder='Type Here'
                    />
                  </div>
                </div>
                <div className='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <label htmlFor='name' className='form-label lbl'>
                    {DEFAULT_LBL}
                  </label>
                  <div className='col-12 d-flex flex-row'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='Yes'
                        id='flexRadioDefault1'
                        checked={!!(defaultEnabled && defaultEnabled === 'Yes')}
                        onChange={onDefaultValueChange}
                      />
                      <label className='form-label lb2' htmlFor='flexRadioDefault1'>
                        Yes
                      </label>
                    </div>
                    <div className='form-check radio-left-margin'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='No'
                        id='flexRadioDefault2'
                        checked={!!(defaultEnabled && defaultEnabled === 'No')}
                        onChange={onDefaultValueChange}
                      />
                      <label className='form-label lb2' htmlFor='flexRadioDefault2'>
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mt-2'>
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
                      <option value=''>Select Here</option>
                      <option value='Link'>Link</option>
                    </select>
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    {LABEL_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      name='label'
                      value={label ?? ''}
                      onChange={(e: any) => setLabel(e.target.value)}
                      placeholder='Type Here'
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className='row mt-2 align-items-center'>
                  <div className='col-12 col-sm-4 col-md-2 col-xl-1 mt-3 mt-sm-0'>
                    <label htmlFor='dev' className='form-label lbl mb-0'>
                      {DEV_LBL}
                    </label>
                  </div>
                  <div className='col-12 col-sm-8 col-md-10 col-xl-11 mt-3 mt-sm-0'>
                    <input
                      type='text'
                      className='form-control'
                      name='dev'
                      value={dev ?? ''}
                      onChange={(e: any) => setDevUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className='row mt-2 align-items-center'>
                  <div className='col-12 col-sm-4 col-md-2 col-xl-1 mt-3 mt-sm-0'>
                    <label htmlFor='dev' className='form-label lbl mb-0'>
                      {TEST_LBL}
                    </label>
                  </div>
                  <div className='col-12 col-sm-8 col-md-10 col-xl-11 mt-3 mt-sm-0'>
                    {' '}
                    <input
                      type='text'
                      className='form-control'
                      name='test'
                      value={test ?? ''}
                      onChange={(e: any) => setTestUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className='row mt-2 align-items-center'>
                  <div className='col-12 col-sm-4 col-md-2 col-xl-1 mt-3 mt-sm-0'>
                    <label htmlFor='dev' className='form-label lbl mb-0'>
                      {STAGE_LBL}
                    </label>
                  </div>
                  <div className='col-12 col-sm-8 col-md-10 col-xl-11 mt-3 mt-sm-0'>
                    <input
                      type='text'
                      className='form-control'
                      name='stage'
                      value={stage ?? ''}
                      onChange={(e: any) => setStageUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className='row mt-2 align-items-center'>
                  <div className='col-12 col-sm-4 col-md-2 col-xl-1 mt-3 mt-sm-0'>
                    <label htmlFor='Prod' className='form-label lbl mb-0'>
                      {PROD_LBL}
                    </label>
                  </div>
                  <div className='col-12 col-sm-8 col-md-10 col-xl-11 mt-3 mt-sm-0'>
                    <input
                      type='text'
                      className='form-control'
                      name='prod'
                      value={prod ?? ''}
                      onChange={(e: any) => setProdUrl(e.target.value)}
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
                onClick={() => onSaveLink()}
                disabled={!enabled}>
                {SAVE_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
