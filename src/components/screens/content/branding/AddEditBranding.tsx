/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  CANCEL_LBL,
  REQUIRED_DOT,
  REQUIRED_HORIZONTAL,
  REQUIRED_HORIZONTAL_REVERSE,
  REQUIRED_NAME,
  REQUIRED_TYPE,
  REQUIRED_VERTICAL,
  SAVE_LBL,
  UNIQUE_NAME,
} from '../../../shared/constant/AppConstants';
import { file2Base64 } from '../../../shared/helperMethods/HelperMethod';

interface ownProps {
  data: any;
  show: boolean;
  onClose: any;
  onSave: any;
  uniqueNameError?: any;
  setUniqueNameError?: any;
  isLoadRunning?: any;
}

const initialState = {
  name: null,
  type: null,
  dot: null,
  vertical: null,
  horizontalReverse: null,
  horizontal: null,
};

export default function AddEditBranding({
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

  // const [dragActive, setDragActive] = React.useState(false);
  const [{ horizontalReverse, horizontal, vertical, dot }, setDragActive] = useState({
    horizontalReverse: false,
    horizontal: false,
    vertical: false,
    dot: false,
  });

  const onChange = async (e: any): Promise<any> => {
    // const logo = { ...dataSet?.logos };
    if (
      e.target.name === 'dot' ||
      e.target.title === 'dot' ||
      e.target.name === 'vertical' ||
      e.target.title === 'vertical' ||
      e.target.name === 'horizontalReverse' ||
      e.target.title === 'horizontalReverse' ||
      e.target.name === 'horizontal' ||
      e.target.title === 'horizontal'
    ) {
      let fileData = '';
      const file = e?.target?.files ? e.target.files[0] : e?.dataTransfer?.files[0];
      await file2Base64(file).then((res: any) => {
        fileData = res;
      });
      const updatedDataSet = { ...dataSet, [e.target.name || e.target.title]: fileData };
      // const updatedDataSet = { ...dataSet, logos };
      setData(updatedDataSet);
      // console.log(
      //   'file Change',
      //   e.target.name,
      //   // logos,
      //   updatedDataSet,
      //   dataSet
      //   // file2Base64(e?.target?.files[0]).then((res: any) => console.log('test promis', res))
      // );
    } else {
      setData({ ...dataSet, [e.target.name]: e.target.value });
      setUniqueNameError();
    }
  };

  useEffect(() => {
    // console.log(data);
    const { logos, ...brandingInfos } = data;
    setData({
      ...brandingInfos,
      horizontalReverse: logos?.horizontalReverse,
      horizontal: logos?.horizontal,
      vertical: logos?.vertical,
      dot: logos?.dot,
    });
  }, []);

  const onClear = (): any => {
    setData(initialState);
    onClose();
  };

  // handle drag events
  const handleDrag = function (e: any): any {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive((prevState) => ({ ...prevState, [e.target.title]: true }));
    } else if (e.type === 'dragleave') {
      setDragActive((prevState) => ({ ...prevState, [e.target.title]: false }));
    }
  };

  const handleFile = (e: any): void => {
    onChange(e);
  };

  // triggers when file is dropped
  const handleDrop = function (e: any): any {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prevState) => ({ ...prevState, [e.target.title]: false }));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e);
    }
  };

  function onSaveBranding(): any {
    const brandingDatas = {
      name: dataSet?.name || '',
      type: dataSet?.type || '',
      horizontalReverse: dataSet?.horizontalReverse || '',
      horizontal: dataSet?.horizontal || '',
      vertical: dataSet?.vertical || '',
      dot: dataSet?.dot || '',
    };

    // console.log(brandingDatas);

    const brandingErrArrays: any = [];

    Object.entries(brandingDatas).forEach((key) => {
      const brandingDataKey = key[0];
      const brandingDataValue = key[1];

      if (!brandingDataValue) {
        // setting state of specific input to empty if value of input is undefined.
        setData(brandingDatas);
        brandingErrArrays.push(brandingDataKey);
      }
    });

    // console.log(brandingErrArrays);

    if (!brandingErrArrays.length) {
      const dataItem = {
        _id: data?._id,
        name: dataSet?.name,
        type: dataSet?.type,
        logos: {
          horizontalReverse: dataSet?.horizontalReverse,
          horizontal: dataSet?.horizontal,
          vertical: dataSet?.vertical,
          dot: dataSet?.dot,
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
        id='addEditBrandingModal'
        aria-labelledby='addEditBrandingModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addEditBrandingModalLabel'>
                Add New Branding / Logos
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <label htmlFor='name' className='form-label lbl'>
                    Name
                  </label>
                  <div className='col-12'>
                    <input
                      name='name'
                      className='form-control'
                      placeholder='Enter branding'
                      value={dataSet?.name ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.name === '' ? (
                    <p className='help-block error'>{REQUIRED_NAME}</p>
                  ) : null}

                  {uniqueNameError ? (
                    <p className='help-block error'>Branding {UNIQUE_NAME}</p>
                  ) : null}
                </div>
                <div className='col-12 col-sm-6 mt-sm-0'>
                  <label htmlFor='name' className='form-label lbl'>
                    Brand Type
                  </label>
                  <div className='col-12'>
                    <select
                      className='form-select'
                      name='type'
                      onChange={onChange}
                      value={dataSet?.type ?? ''}>
                      <option value=''>Select here</option>
                      <option value='Payor'>Payor</option>
                      <option value='Ipa'>Ipa</option>
                      <option value='Employer'>Employer</option>
                    </select>
                  </div>

                  {dataSet?.type === '' ? (
                    <p className='help-block error'>{REQUIRED_TYPE}</p>
                  ) : null}
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col-12'>
                  <label
                    className='col-12 border-bottom pb-2 mb-0 brdr-btm-color'
                    htmlFor='resolution'>
                    <span className='lbl me-2'>Logo Variations (in order)</span>
                    <span className='accelerationmark font-family-fontawesome' />
                    <span className='text-black fw-normal ms-2'>
                      File resolution should 40x40 pixels.
                    </span>
                  </label>
                </div>
              </div>
              <div className='container  mt-4'>
                <div className='row'>
                  <div className='col-12 col-sm-6 col-md mb-2 text-center'>
                    <div>
                      <label className='w-100 px-0 logo-text fw-normal' htmlFor='fileUpload'>
                        Horizontal Reverse
                      </label>
                    </div>
                    <label
                      title='horizontalReverse'
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      htmlFor='file-upload-rev-horizontal'
                      className={`custom-file-upload logo-variations-bg shadow-sm ${
                        horizontalReverse ? 'active' : ''
                      }`}>
                      <label className='w-100 cursur-pointer' htmlFor='file-upload-rev-horizontal'>
                        <i className='fa fa-cloud-upload azure-clr lead fw-bold' />
                      </label>

                      {dataSet?.horizontalReverse === '' ||
                      dataSet?.horizontalReverse === undefined ? (
                        <label
                          title='horizontalReverse'
                          htmlFor='file-upload-rev-horizontal'
                          className='w-100 px-0 logo-text fw-normal cursur-pointer'>
                          Choose a logo file
                          <br />
                          or <br /> drag it here
                        </label>
                      ) : (
                        <img
                          style={{ height: '70%', width: '100%' }}
                          src={dataSet?.horizontalReverse ?? ''}
                          alt='Horizontal Reverse'
                        />
                      )}
                    </label>
                    <input
                      id='file-upload-rev-horizontal'
                      type='file'
                      name='horizontalReverse'
                      onChange={(e: any) => onChange(e)}
                    />

                    {dataSet?.horizontalReverse === '' ? (
                      <p className='help-block error'>{REQUIRED_HORIZONTAL_REVERSE}</p>
                    ) : null}
                  </div>

                  <div className='col-12 col-sm-6 col-md mb-2 text-center'>
                    <div>
                      <label className='w-100 px-0 logo-text fw-normal' htmlFor='fileUpload'>
                        Horizontal
                      </label>
                    </div>
                    <label
                      title='horizontal'
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      htmlFor='file-upload-horizontal'
                      className={`custom-file-upload logo-variations-bg shadow-sm ${
                        horizontal ? 'active' : ''
                      }`}>
                      <label className='w-100 cursur-pointer' htmlFor='file-upload-horizontal'>
                        <i className='fa fa-cloud-upload azure-clr lead fw-bold' />
                      </label>

                      {dataSet?.horizontal === '' || dataSet?.horizontal === undefined ? (
                        <label
                          title='horizontal'
                          htmlFor='file-upload-horizontal'
                          className='w-100 px-0 logo-text fw-normal cursur-pointer'>
                          Choose a logo file
                          <br />
                          or <br /> drag it here
                        </label>
                      ) : (
                        <img
                          style={{ height: '70%', width: '100%' }}
                          src={dataSet?.horizontal ?? ''}
                          alt='Horizontal'
                        />
                      )}
                    </label>
                    <input
                      id='file-upload-horizontal'
                      type='file'
                      name='horizontal'
                      onChange={(e: any) => onChange(e)}
                    />
                    {dataSet?.horizontal === '' ? (
                      <p className='help-block error'>{REQUIRED_HORIZONTAL}</p>
                    ) : null}
                  </div>

                  <div className='col-12 col-sm-6 col-md mb-2 text-center'>
                    <div>
                      <label className='w-100 px-0 logo-text fw-normal' htmlFor='file'>
                        Vertical
                      </label>
                    </div>
                    <label
                      title='vertical'
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      htmlFor='file-upload-vertical'
                      className={`custom-file-upload logo-variations-bg shadow-sm ${
                        vertical ? 'active' : ''
                      }`}>
                      <label className='w-100 cursur-pointer' htmlFor='file-upload-vertical'>
                        <i className='fa fa-cloud-upload azure-clr lead fw-bold' />
                      </label>

                      {dataSet?.vertical === '' || dataSet?.vertical === undefined ? (
                        <label
                          title='vertical'
                          htmlFor='file-upload-vertical'
                          className='w-100 px-0 logo-text fw-normal cursur-pointer'>
                          Choose a logo file
                          <br />
                          or <br /> drag it here
                        </label>
                      ) : (
                        <img
                          style={{ height: '70%', width: '100%' }}
                          src={dataSet?.vertical ?? ''}
                          alt='Vertical'
                        />
                      )}
                    </label>
                    <input
                      id='file-upload-vertical'
                      type='file'
                      name='vertical'
                      onChange={(e: any) => onChange(e)}
                    />
                    {dataSet?.vertical === '' ? (
                      <p className='help-block error'>{REQUIRED_VERTICAL}</p>
                    ) : null}
                  </div>

                  <div className='col-12 col-sm-6 col-md mb-2 text-center'>
                    <div>
                      <label className='w-100 px-0 logo-text fw-normal' htmlFor='file'>
                        Dot
                      </label>
                    </div>
                    <label
                      title='dot'
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      htmlFor='file-upload-dot'
                      className={`custom-file-upload logo-variations-bg shadow-sm ${
                        dot ? 'active' : ''
                      }`}>
                      <label className='w-100 cursur-pointer' htmlFor='file-upload-dot'>
                        <i className='fa fa-cloud-upload azure-clr lead fw-bold' />
                      </label>

                      {dataSet?.dot === '' || dataSet?.dot === undefined ? (
                        <label
                          title='dot'
                          htmlFor='file-upload-dot'
                          className='w-100 px-0 logo-text fw-normal cursur-pointer'>
                          Choose a logo file
                          <br />
                          or <br /> drag it here
                        </label>
                      ) : (
                        <img
                          style={{ height: '70%', width: '100%' }}
                          src={dataSet?.dot ?? ''}
                          alt='Dot'
                        />
                      )}
                    </label>
                    <input
                      id='file-upload-dot'
                      type='file'
                      name='dot'
                      onChange={(e: any) => onChange(e)}
                    />
                    {dataSet?.dot === '' ? (
                      <p className='help-block error'>{REQUIRED_DOT}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
              <button
                type='button'
                className='btn btn-secondary me-3'
                onClick={onClear}
                ref={closeModalRef}
                disabled={isLoadRunning}>
                {CANCEL_LBL}
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => onSaveBranding()}
                disabled={isLoadRunning}>
                {SAVE_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
