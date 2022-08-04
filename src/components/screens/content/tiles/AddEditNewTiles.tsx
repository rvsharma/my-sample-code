/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import {
  ADD_NEW_TILE_LBL,
  CANCEL_LBL,
  CONTENT_PASCAL_LBL,
  SAVE_LBL,
  HEADING_NAME_LBL,
  TILE_TITLE_LBL,
  ANCHOR_TEXT_LBL,
  DESTINATION_URL_LBL,
  DEV_LBL,
  TEST_LBL,
  STAGE_LBL,
  PROD_LBL,
  UNIQUE_NAME,
  REQUIRED_TILE,
  REQUIRED_ANCHOR,
  REQUIRED_CONTENT,
  REQUIRED_UPPER_DEV,
  REQUIRED_UPPER_TEST,
  REQUIRED_UPPER_STAGE,
  REQUIRED_UPPER_PROD,
  REQUIRED_NAME,
} from '../../../shared/constant/AppConstants';

interface ownProps {
  data: any;
  show?: boolean;
  onClose?: any;
  onSave?: any;
  uniqueNameError?: any;
  setUniqueNameError?: any;
  isLoadRunning?: any;
}

const initialState = {
  name: null,
  title: null,
  anchorText: null,
  content: null,
  dev: null,
  stage: null,
  test: null,
  prod: null,
};

export default React.memo(function AddEditNewTiles({
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
    // console.log(data);
    const { actionUrl, ...tilesInfos } = data;
    setData({
      ...tilesInfos,
      anchorText: tilesInfos?.buttonText,
      dev: actionUrl?.dev,
      prod: actionUrl?.prod,
      stage: actionUrl?.stage,
      test: actionUrl?.test,
    });
  }, []);

  function onSaveTiles(): any {
    const tileDatas = {
      name: dataSet?.name || '',
      title: dataSet?.title || '',
      anchorText: dataSet?.anchorText || '',
      content: dataSet?.content || '',
      dev: dataSet?.dev || '',
      stage: dataSet?.stage || '',
      test: dataSet?.test || '',
      prod: dataSet?.prod || '',
    };

    const tileErrArrays: any = [];

    Object.entries(tileDatas).forEach((key) => {
      const tileDataKey = key[0];
      const tileDataValue = key[1];

      if (!tileDataValue) {
        // setting state of specific input to empty if value of input is undefined.
        setData(tileDatas);
        tileErrArrays.push(tileDataKey);
      }
    });

    if (!tileErrArrays.length) {
      const dataItem = {
        _id: data?._id,
        name: dataSet?.name,
        title: dataSet?.title,
        buttonText: dataSet?.anchorText,
        content: dataSet?.content,
        actionUrl: {
          dev: dataSet?.dev,
          test: dataSet?.test,
          stage: dataSet?.stage,
          prod: dataSet?.prod,
        },
      };
      onSave(dataItem);
    }
  }

  const onChange = async (e: any): Promise<any> => {
    setData({ ...dataSet, [e.target.name]: e.target.value });
    setUniqueNameError();
  };

  const onClear = (): any => {
    setData(initialState);
    onClose();
  };

  const showModal = show ? 'show d-block' : 'd-none';
  return (
    <>
      <div className={`modal-backdrop fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='addEditNewTilesModal'
        aria-labelledby='addEditNewTilesModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addEditNewTilesModalLabel'>
                {ADD_NEW_TILE_LBL}
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='Tile' className='form-label lbl'>
                    {HEADING_NAME_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter tiles'
                      name='name'
                      value={dataSet?.name ?? ''}
                      onChange={onChange}
                    />
                  </div>

                  {dataSet?.name === '' ? (
                    <p className='help-block error'>{REQUIRED_NAME}</p>
                  ) : null}

                  {uniqueNameError ? <p className='help-block error'>Tile {UNIQUE_NAME}</p> : null}
                </div>
                <div className='col-12 col-sm-6 mt-sm-0'>
                  <label htmlFor='ButtonText' className='form-label lbl'>
                    {TILE_TITLE_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter Button Text'
                      name='title'
                      value={dataSet?.title ?? ''}
                      onChange={onChange}
                    />
                  </div>

                  {dataSet?.title === '' ? (
                    <p className='help-block error'>{REQUIRED_TILE}</p>
                  ) : null}
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <label htmlFor='AnchorText' className='form-label lbl'>
                    {ANCHOR_TEXT_LBL}
                  </label>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter Anchor Text'
                      name='anchorText'
                      value={dataSet?.anchorText ?? ''}
                      onChange={onChange}
                    />
                  </div>

                  {dataSet?.anchorText === '' ? (
                    <p className='help-block error'>{REQUIRED_ANCHOR}</p>
                  ) : null}
                </div>
                <div className='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <label htmlFor='Content' className='form-label lbl'>
                    {CONTENT_PASCAL_LBL}
                  </label>
                  <div className='col-12'>
                    <textarea
                      className='form-control'
                      placeholder='Enter Content'
                      name='content'
                      value={dataSet?.content ?? ''}
                      onChange={onChange}
                    />
                  </div>

                  {dataSet?.content === '' ? (
                    <p className='help-block error'>{REQUIRED_CONTENT}</p>
                  ) : null}
                </div>
              </div>

              <div className='row mt-4 '>
                <div className='row mt-2 align-items-center'>
                  <label htmlFor='name' className='form-label lbl'>
                    {DESTINATION_URL_LBL}
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
                  </div>

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
                className='btn btn-secondary me-3'
                data-bs-dismiss='modal'
                ref={closeModalRef}
                onClick={() => onClear()}
                disabled={isLoadRunning}>
                {CANCEL_LBL}
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => onSaveTiles()}
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
