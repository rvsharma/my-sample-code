/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  NAME_LBL,
  CANCEL_LBL,
  SAVE_LBL,
  TEXT_LBL,
  STAGE_LBL,
  TEST_LBL,
  PROD_LBL,
  DEV_LBL,
  ADD_NEW_SSO_LBL,
  DESTINATION_TARGET_LBL,
  UNIQUE_NAME,
  REQUIRED_TEXT,
  REQUIRED_UPPER_DEV,
  REQUIRED_UPPER_TEST,
  REQUIRED_UPPER_STAGE,
  REQUIRED_UPPER_PROD,
  REQUIRED_NAME,
} from '../../../shared/constant/AppConstants';

interface ownProps {
  data: any;
  show: boolean;
  onClose: any;
  onSave: any;
  uniqueNameError?: any;
  setUniqueNameError?: any;
  isLoadRunning?: any;
}

// interface urls{
//   dev:string,
//   stage: string;
//   test: string;
//   prod: string;
// }

const initialState = {
  name: null,
  text: null,
  dev: null,
  stage: null,
  test: null,
  prod: null,
};

export default React.memo(function AddNewSSO({
  data,
  show,
  onClose,
  onSave,
  uniqueNameError,
  setUniqueNameError,
  isLoadRunning,
}: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();
  const [dataSet, setData]: any = useState(initialState);

  useEffect(() => {
    console.log(data);
    const { target, ...linksInfo } = data;
    setData({
      ...linksInfo,
      dev: target?.dev,
      stage: target?.stage,
      test: target?.test,
      prod: target?.prod,
    });
  }, []);

  const onChange = async (e: any): Promise<any> => {
    setData({ ...dataSet, [e.target.name]: e.target.value });
    setUniqueNameError();
  };

  const onClear = (): any => {
    setData(initialState);
    onClose();
  };

  function onSaveSSO(): any {
    // console.log('teststs', data);
    const ssoDatas = {
      name: dataSet?.name || '',
      text: dataSet?.text || '',
      dev: dataSet?.dev || '',
      stage: dataSet?.stage || '',
      test: dataSet?.test || '',
      prod: dataSet?.prod || '',
    };

    const ssoErrArrays: any = [];

    Object.entries(ssoDatas).forEach((key) => {
      const ssoDataKey = key[0];
      const ssoDataValue = key[1];

      if (!ssoDataValue) {
        // setting state of specific input to empty if value of input is undefined.
        setData(ssoDatas);
        ssoErrArrays.push(ssoDataKey);
      }
    });

    if (!ssoErrArrays.length) {
      const dataItem = {
        _id: data?._id,
        name: dataSet?.name,
        text: dataSet?.text,
        target: {
          dev: dataSet?.dev,
          test: dataSet?.test,
          stage: dataSet?.stage,
          prod: dataSet?.prod,
        },
      };
      onSave(dataItem);
    }
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
                {ADD_NEW_SSO_LBL}
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
                      value={dataSet?.name ?? ''}
                      onChange={onChange}
                      placeholder='Enter Name'
                    />
                  </div>

                  {dataSet?.name === '' ? (
                    <p className='help-block error'>{REQUIRED_NAME}</p>
                  ) : null}

                  {uniqueNameError ? <p className='help-block error'>Sso {UNIQUE_NAME}</p> : null}
                </div>
                {/* <div className='col-12 col-sm-6 mt-3 mt-sm-0'> */}
                <div className='col-12 col-sm-6 mt-sm-0'>
                  <label htmlFor='name' className='form-label lbl'>
                    {TEXT_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      name='text'
                      value={dataSet?.text ?? ''}
                      onChange={onChange}
                      placeholder='Enter Name'
                    />
                  </div>
                  {dataSet?.text === '' ? (
                    <p className='help-block error'>{REQUIRED_TEXT}</p>
                  ) : null}
                </div>
              </div>

              <div className='row mt-4 '>
                <div className='row mt-2 align-items-center'>
                  <label htmlFor='name' className='form-label lbl'>
                    {DESTINATION_TARGET_LBL}
                  </label>
                </div>
                <div className='row mt-2 align-items-center'>
                  <div className='col-12 col-sm-4 col-md-2 col-xl-1 mt-3 mt-sm-0'>
                    <label htmlFor='dev' className='form-label lbl mb-0'>
                      {DEV_LBL}
                    </label>
                  </div>
                  <div className='col-12 col-sm-8 col-md-10 col-xl-11 mt-3 mt-sm-0'>
                    {' '}
                    <input
                      type='text'
                      className='form-control'
                      name='dev'
                      value={dataSet?.dev ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.dev === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      {REQUIRED_UPPER_DEV}
                    </p>
                  ) : null}
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
                      value={dataSet?.test ?? ''}
                      onChange={onChange}
                    />
                  </div>{' '}
                  {dataSet?.test === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      {REQUIRED_UPPER_TEST}
                    </p>
                  ) : null}
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
                      value={dataSet?.stage ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.stage === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      {REQUIRED_UPPER_STAGE}
                    </p>
                  ) : null}
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
                      value={dataSet?.prod ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.prod === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      {REQUIRED_UPPER_PROD}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
              <button
                type='button'
                onClick={() => onClear()}
                className='btn btn-secondary me-3'
                ref={closeModalRef}
                disabled={isLoadRunning}>
                {CANCEL_LBL}
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => onSaveSSO()}
                disabled={isLoadRunning}>
                {SAVE_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
