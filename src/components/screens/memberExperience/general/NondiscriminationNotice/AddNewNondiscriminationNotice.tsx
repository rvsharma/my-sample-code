/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import {
  ADD_NEW_NONDISCRIMINATION_NOTICE,
  NAME_LBL,
  TYPE_LBL,
  CANCEL_LBL,
  SAVE_LBL,
  STAGE_LBL,
  TEST_LBL,
  PROD_LBL,
  DEV_LBL,
  UNIQUE_NAME,
} from '../../../../shared/constant/AppConstants';

interface ownProps {
  data: any;
  show: boolean;
  onClose: any;
  onSave: any;
  uniqueNameError?: any;
  setUniqueNameError?: any;
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

export default function AddNewNondiscriminationNotice({
  data,
  show,
  onClose,
  onSave,
  uniqueNameError,
  setUniqueNameError,
}: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);

  const [dev, setDevUrl] = useState(null);
  const [test, setTestUrl] = useState(null);
  const [stage, setStageUrl] = useState(null);
  const [prod, setProdUrl] = useState(null);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setName(data?.name);
    setType(data?.type);
    setDevUrl(data?.values?.dev);
    setTestUrl(data?.values?.test);
    setStageUrl(data?.values?.stage);
    setProdUrl(data?.values?.prod);
    // setEnv(data?.envirnoment);

    return () => {
      setName(null);
      setType(null);
      setDevUrl(null);
      setTestUrl(null);
      setStageUrl(null);
      setProdUrl(null);
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    if (name && type && dev && stage && test && prod) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [name, type, dev, stage, test, prod]);

  const onClear = (): any => {
    setName(null);
    setDevUrl(null);
    setTestUrl(null);
    setStageUrl(null);
    setProdUrl(null);
    onClose();
  };

  function onSaveLink(): any {
    const dataItem = {
      name,
      type,
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
                {ADD_NEW_NONDISCRIMINATION_NOTICE}
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
                    <p className='help-block error'>Nondiscrimination notice {UNIQUE_NAME}</p>
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
                      <option value=''>Select Here</option>
                      <option value='Embedded HTML'>Embedded HTML</option>
                    </select>
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
