/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  ADD_NEW_VIRTUAL_VISIT,
  ANDROID_DESTINATION_URL,
  DEV_LBL,
  IOS_DESTINATION_URL,
  PROD_LBL,
  REQUIRED_ACTION,
  REQUIRED_DESCRIPTION,
  REQUIRED_LOGO,
  REQUIRED_LOWER_DEV,
  REQUIRED_LOWER_PROD,
  REQUIRED_LOWER_STAGE,
  REQUIRED_LOWER_TEST,
  REQUIRED_NAME,
  REQUIRED_POWERED,
  REQUIRED_POWEREDBY,
  REQUIRED_TITLE,
  STAGE_LBL,
  TEST_LBL,
  UNIQUE_NAME,
  WEB_DESTINATION_URL,
} from '../../../shared/constant/AppConstants';
import { file2Base64, isValidHttpUrl } from '../../../shared/helperMethods/HelperMethod';

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
  title: null,
  description: null,
  logoImage: null,
  poweredByImage: null,
  actionText: null,
  poweredByText: null,
  iosDevUrl: null,
  iosProdUrl: null,
  iosStageUrl: null,
  iosTestUrl: null,
  androidDevUrl: null,
  androidProdUrl: null,
  androidStageUrl: null,
  androidTestUrl: null,
  webDevUrl: null,
  webProdUrl: null,
  webStageUrl: null,
  webTestUrl: null,
};

export default function AddEditVirtualVisit({
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
  const [{ logoImage, poweredByImage }, setDragActive] = useState({
    logoImage: false,
    poweredByImage: false,
  });

  const onChange = async (e: any): Promise<any> => {
    // const logo = { ...dataSet?.logos };
    if (
      e.target.name === 'logoImage' ||
      e.target.title === 'logoImage' ||
      e.target.name === 'poweredByImage' ||
      e.target.title === 'poweredByImage'
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
    const { iosTargetUrl, androidTargetUrl, webTargetUrl, ...vvInfos } = data;

    setData({
      ...vvInfos,
      iosDevUrl: iosTargetUrl?.dev,
      iosProdUrl: iosTargetUrl?.prod,
      iosStageUrl: iosTargetUrl?.stage,
      iosTestUrl: iosTargetUrl?.test,
      androidDevUrl: androidTargetUrl?.dev,
      androidProdUrl: androidTargetUrl?.prod,
      androidStageUrl: androidTargetUrl?.stage,
      androidTestUrl: androidTargetUrl?.test,
      webDevUrl: webTargetUrl?.dev,
      webProdUrl: webTargetUrl?.prod,
      webStageUrl: webTargetUrl?.stage,
      webTestUrl: webTargetUrl?.test,
    });

    // console.log(data);
  }, []);

  // const onChange = (e: any): any => {
  //   setData({ ...dataSet, [e.target.name]: e.target.value });
  // };

  function onSaveVirtualVisit(): any {
    const vvDatas = {
      name: dataSet?.name || '',
      title: dataSet?.title || '',
      description: dataSet?.description || '',
      logoImage: dataSet?.logoImage || '',
      poweredByImage: dataSet?.poweredByImage || '',
      actionText: dataSet?.actionText || '',
      poweredByText: dataSet?.poweredByText || '',
      iosDevUrl: dataSet?.iosDevUrl || '',
      iosProdUrl: dataSet?.iosProdUrl || '',
      iosStageUrl: dataSet?.iosStageUrl || '',
      iosTestUrl: dataSet?.iosTestUrl || '',
      androidDevUrl: dataSet?.androidDevUrl || '',
      androidProdUrl: dataSet?.androidProdUrl || '',
      androidStageUrl: dataSet?.androidStageUrl || '',
      androidTestUrl: dataSet?.androidTestUrl || '',
      webDevUrl: dataSet?.webDevUrl || '',
      webProdUrl: dataSet?.webProdUrl || '',
      webStageUrl: dataSet?.webStageUrl || '',
      webTestUrl: dataSet?.webTestUrl || '',
    };

    // console.log('data', dataItem);

    const vvErrArrays: any = [];

    Object.entries(vvDatas).forEach((key) => {
      const vvDataKey = key[0];
      const vvDataValue = key[1];

      if (!vvDataValue) {
        // setting state of specific input to empty if value of input is undefined.

        setData(vvDatas);
        vvErrArrays.push(vvDataKey);
      }
    });

    if (!vvErrArrays.length) {
      const dataItem: any = {
        _id: data?._id,
        name: dataSet?.name,
        title: dataSet?.title,
        description: dataSet?.description,
        logoImage: dataSet?.logoImage,
        actionText: dataSet?.actionText,
        iosTargetUrl: {
          dev: dataSet?.iosDevUrl,
          test: dataSet?.iosTestUrl,
          stage: dataSet?.iosStageUrl,
          prod: dataSet?.iosProdUrl,
        },
        androidTargetUrl: {
          dev: dataSet?.androidDevUrl,
          test: dataSet?.androidTestUrl,
          stage: dataSet?.androidStageUrl,
          prod: dataSet?.androidProdUrl,
        },
        webTargetUrl: {
          dev: dataSet?.webDevUrl,
          test: dataSet?.webTestUrl,
          stage: dataSet?.webStageUrl,
          prod: dataSet?.webProdUrl,
        },
        poweredByText: dataSet?.poweredByText,
        poweredByImage: dataSet?.poweredByImage,
        weight: '10',
      };

      if (data?._id) {
        if (isValidHttpUrl(dataSet?.poweredByImage ?? '')) {
          delete dataItem.poweredByImage;
        }

        if (isValidHttpUrl(dataSet?.logoImage ?? '')) {
          delete dataItem.logoImage;
        }
      }
      onSave(dataItem);
    }
  }

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

  const showModal = show ? 'show d-block' : 'd-none';

  // console.log(dataSet);
  return (
    <>
      <div className={`modal-backdrop modal-dialog-scrollable fade ${showModal}`} />
      <div
        className={`modal fade ${showModal}`}
        id='addVirtualVisit'
        aria-labelledby='addVirtualVisitLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addVirtualVisitLabel'>
                {ADD_NEW_VIRTUAL_VISIT}
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
                      type='text'
                      name='name'
                      value={dataSet?.name ?? ''}
                      className='form-control'
                      placeholder='Enter Name'
                      onChange={onChange}
                    />
                  </div>

                  {dataSet?.name === '' ? (
                    <p className='help-block error'>{REQUIRED_NAME}</p>
                  ) : null}

                  {uniqueNameError ? (
                    <p className='help-block error'>Virtual visit {UNIQUE_NAME}</p>
                  ) : null}
                </div>
                <div className='col-12 col-sm-6 mt-sm-0'>
                  <label htmlFor='name' className='form-label lbl'>
                    Title
                  </label>
                  <div className='col-12'>
                    <input
                      name='title'
                      type='text'
                      value={dataSet?.title ?? ''}
                      className='form-control'
                      placeholder='Enter Title'
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.title === '' ? (
                    <p className='help-block error'>{REQUIRED_TITLE}</p>
                  ) : null}
                </div>
              </div>

              <div className='row'>
                <div className='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <label htmlFor='name' className='form-label lbl'>
                    Description
                  </label>
                  <div className='col-12'>
                    <textarea
                      className='form-control'
                      name='description'
                      onChange={onChange}
                      value={dataSet?.description ?? ''}
                      style={{ height: 105 }}
                    />
                  </div>
                  {dataSet?.description === '' ? (
                    <p className='help-block error'>{REQUIRED_DESCRIPTION}</p>
                  ) : null}
                </div>

                <div
                  className='d-flex flex-row mt-3'
                  style={{ width: '50%', justifyContent: 'space-between' }}>
                  <div className='col-6 col-sm-6'>
                    <label htmlFor='name' className='form-label lbl'>
                      Upload Logo Image
                    </label>
                    <div className='col-12'>
                      <label
                        title='logoImage'
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        htmlFor='file-upload-logo-image'
                        className={`custom-file-upload logo-variations-bg shadow-sm text-center  ${
                          logoImage ? 'active' : ''
                        }`}>
                        <label className='w-100 cursur-pointer' htmlFor='file-upload-logo-image'>
                          <i className='fa fa-cloud-upload azure-clr lead fw-bold' />
                        </label>

                        {dataSet?.logoImage === '' || dataSet?.logoImage === undefined ? (
                          <label
                            title='logoImage'
                            htmlFor='file-upload-logo-image'
                            className='w-100 px-0 logo-text fw-normal cursur-pointer'>
                            Choose a logo file
                            <br />
                            or <br /> drag it here
                          </label>
                        ) : (
                          <img
                            src={dataSet?.logoImage ?? ''}
                            alt='Logo'
                            className='img-thumbnail customImage'
                          />
                        )}
                      </label>
                      <input
                        id='file-upload-logo-image'
                        type='file'
                        name='logoImage'
                        onChange={(e: any) => onChange(e)}
                      />
                      {dataSet?.logoImage === '' ? (
                        <p className='help-block error'>{REQUIRED_LOGO}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className='col-6 col-sm-6' style={{ marginLeft: 16 }}>
                    <label htmlFor='PoweredbyImage' className='form-label lbl'>
                      Powered by Image
                    </label>
                    <div className='col-12'>
                      <label
                        title='poweredByImage'
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        htmlFor='file-upload-image-powered-by'
                        className={`custom-file-upload logo-variations-bg shadow-sm text-center ${
                          poweredByImage ? 'active' : ''
                        }`}>
                        <label
                          className='w-100 cursur-pointer'
                          htmlFor='file-upload-image-powered-by'>
                          <i className='fa fa-cloud-upload azure-clr lead fw-bold' />
                        </label>

                        {dataSet?.poweredByImage === '' || dataSet?.poweredByImage === undefined ? (
                          <label
                            title='poweredByImage'
                            htmlFor='file-upload-image-powered-by'
                            className='w-100 px-0 logo-text fw-normal cursur-pointer'>
                            Choose a logo file
                            <br />
                            or <br /> drag it here
                          </label>
                        ) : (
                          <img
                            src={dataSet?.poweredByImage ?? ''}
                            alt='Powered'
                            className='img-thumbnail customImage'
                          />
                        )}
                      </label>
                      <input
                        id='file-upload-image-powered-by'
                        type='file'
                        name='poweredByImage'
                        onChange={(e: any) => onChange(e)}
                      />
                      {dataSet?.poweredByImage === '' ? (
                        <p className='help-block error'>{REQUIRED_POWERED}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <label htmlFor='name' className='form-label lbl'>
                    Action Text
                  </label>
                  <div className='col-12'>
                    <input
                      name='actionText'
                      type='text'
                      className='form-control'
                      value={dataSet?.actionText ?? ''}
                      placeholder='Enter Action Text'
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.actionText === '' ? (
                    <p className='help-block error'>{REQUIRED_ACTION}</p>
                  ) : null}
                </div>
                <div className='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <label htmlFor='PoweredByText' className='form-label lbl'>
                    Powered By Text
                  </label>
                  <div className='col-12'>
                    <textarea
                      name='poweredByText'
                      value={dataSet.poweredByText ?? ''}
                      className='form-control'
                      placeholder='Enter Url'
                      onChange={onChange}
                      style={{ height: 105 }}
                    />
                  </div>
                  {dataSet.poweredByText === '' ? (
                    <p className='help-block error'>{REQUIRED_POWEREDBY}</p>
                  ) : null}
                </div>
              </div>

              <label htmlFor='AndroidTargetURL' className='form-label lb0'>
                {IOS_DESTINATION_URL}
              </label>

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
                      name='iosDevUrl'
                      value={dataSet?.iosDevUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.iosDevUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Ios {REQUIRED_LOWER_DEV}
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
                      name='iosTestUrl'
                      value={dataSet?.iosTestUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.iosTestUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Ios {REQUIRED_LOWER_TEST}
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
                      name='iosStageUrl'
                      value={dataSet?.iosStageUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.iosStageUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Ios {REQUIRED_LOWER_STAGE}
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
                      name='iosProdUrl'
                      value={dataSet?.iosProdUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.iosProdUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Ios {REQUIRED_LOWER_PROD}
                    </p>
                  ) : null}
                </div>
              </div>

              <label htmlFor='AndroidTargetURL' className='form-label lb0'>
                {ANDROID_DESTINATION_URL}
              </label>

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
                      name='androidDevUrl'
                      value={dataSet?.androidDevUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.androidDevUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Android {REQUIRED_LOWER_DEV}
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
                      name='androidTestUrl'
                      value={dataSet?.androidTestUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.androidTestUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Android {REQUIRED_LOWER_TEST}
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
                      name='androidStageUrl'
                      value={dataSet?.androidStageUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.androidStageUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Andoird {REQUIRED_LOWER_STAGE}
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
                      name='androidProdUrl'
                      value={dataSet?.androidProdUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.androidProdUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Andoird {REQUIRED_LOWER_PROD}
                    </p>
                  ) : null}
                </div>
              </div>

              <label htmlFor='AndroidTargetURL' className='form-label lb0'>
                {WEB_DESTINATION_URL}
              </label>

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
                      name='webDevUrl'
                      value={dataSet?.webDevUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.webDevUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Web {REQUIRED_LOWER_DEV}
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
                      name='webTestUrl'
                      value={dataSet?.webTestUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.webTestUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Web {REQUIRED_LOWER_TEST}
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
                      name='webStageUrl'
                      value={dataSet?.webStageUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.webStageUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Web {REQUIRED_LOWER_STAGE}
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
                      name='webProdUrl'
                      value={dataSet?.webProdUrl ?? ''}
                      onChange={onChange}
                    />
                  </div>
                  {dataSet?.webProdUrl === '' ? (
                    <p className='col-12 offset-sm-1 col-sm-8 col-md-10 col-xl-11 help-block error mt-2 mb-0'>
                      Web {REQUIRED_LOWER_PROD}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
              <button
                type='button'
                className='btn btn-secondary me-3'
                ref={closeModalRef}
                onClick={() => onClear()}
                disabled={isLoadRunning}>
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => onSaveVirtualVisit()}
                disabled={isLoadRunning}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
