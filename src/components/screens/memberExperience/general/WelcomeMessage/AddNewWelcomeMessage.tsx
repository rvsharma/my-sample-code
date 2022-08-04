/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import {
  ADD_NEW_WELCOME_MESSAGE,
  CALL_TO_ACTION,
  // TITLE_LBL,
  // ENV_LABLE,
  // ENV_OPTIONS,
  // SELECT_ENV_LBL,
  CANCEL_LBL,
  SAVE_LBL,
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

export default function AddNewWelcomeMessage({
  data,
  show,
  onClose,
  onSave,
}: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();
  const [preEffective, setPreEffective] = useState('Effective');
  const [welcomeMsg, setWelcomeMsg] = useState(null);

  const [actionTitle, setActionTitle] = useState(null);
  const [actionMsg, setActionMsg] = useState(null);
  const [actionLink, setActionLink] = useState(null);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // console.log(data);
    setPreEffective(data?.isPreEffective ? 'Pre Effective' : 'Effective');
    setWelcomeMsg(data?.message);
    setActionTitle(data?.callToAction?.title);
    setActionMsg(data?.callToAction?.message);
    setActionLink(data?.callToAction?.link);

    return () => {
      setPreEffective('Effective');
      setWelcomeMsg(null);
      setActionTitle(null);
      setActionMsg(null);
      setActionLink(null);
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    if (preEffective && welcomeMsg && actionTitle && actionMsg && actionLink) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [preEffective, welcomeMsg, actionTitle, actionMsg, actionLink]);

  const onClear = (): any => {
    setPreEffective('Effective');
    setWelcomeMsg(null);
    setActionTitle(null);
    setActionMsg(null);
    setActionLink(null);
    onClose();
  };

  function onSaveLink(): any {
    const dataItem = {
      _id: data?._id,
      isPreEffective: preEffective === 'Pre Effective',
      message: welcomeMsg,
      callToAction: {
        title: actionTitle,
        message: actionMsg,
        link: actionLink,
      },
    };
    onSave(dataItem);
  }

  const onDefaultValueChange = (event: any): any => {
    setPreEffective(event.target.name);
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
                {ADD_NEW_WELCOME_MESSAGE}
              </h5>
            </div>
            <div className='modal-body pb-0 mb-4'>
              <div className='row'>
                <div className='col-12'>
                  <div className='col-12 d-flex flex-row'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='Pre Effective'
                        id='preEffectiveRadioBtn'
                        checked={!!(preEffective && preEffective === 'Pre Effective')}
                        onChange={onDefaultValueChange}
                      />
                      <label className='form-label lb2' htmlFor='preEffectiveRadioBtn'>
                        Pre Effective
                      </label>
                    </div>
                    <div className='form-check radio-left-margin'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='Effective'
                        id='effectiveRadioBtn'
                        checked={!!(preEffective && preEffective === 'Effective')}
                        onChange={onDefaultValueChange}
                      />
                      <label className='form-label lb2' htmlFor='effectiveRadioBtn'>
                        Effective
                      </label>
                    </div>
                  </div>

                  <div className='col-12 d-flex flex-row my-3'>
                    <div className='col-12'>
                      <textarea
                        className='form-control'
                        name='welcomeMsg'
                        value={welcomeMsg ?? ''}
                        onChange={(e: any) => setWelcomeMsg(e.target.value)}
                        // placeholder='Type Here'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mt-2'>
                <div className='col-12 col-sm-6'>
                  <h4>{CALL_TO_ACTION}</h4>
                </div>
              </div>

              <div className='row mt-2 '>
                <div className='col-6 mt-3 mt-sm-0'>
                  <input
                    type='text'
                    className='form-control'
                    name='actionTitle'
                    value={actionTitle ?? ''}
                    onChange={(e: any) => setActionTitle(e.target.value)}
                    placeholder='Enter your title here'
                  />
                </div>
              </div>

              <div className='row mt-2 '>
                <div className='col-12 d-flex flex-row my-3'>
                  <div className='col-12'>
                    <textarea
                      className='form-control'
                      name='actionMsg'
                      value={actionMsg ?? ''}
                      onChange={(e: any) => setActionMsg(e.target.value)}
                      placeholder='Enter your message here'
                    />
                  </div>
                </div>
              </div>

              <div className='row mt-2'>
                <div className='col-12 col-sm-6'>
                  <div className='col-12'>
                    <select className='form-select' aria-label='Default select example'>
                      <option value='Link'>Link</option>
                    </select>
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <div className='col-12'>
                    <input
                      type='text'
                      className='form-control'
                      name='actionLink'
                      value={actionLink ?? ''}
                      onChange={(e: any) => setActionLink(e.target.value)}
                      placeholder='Enter your link here'
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
