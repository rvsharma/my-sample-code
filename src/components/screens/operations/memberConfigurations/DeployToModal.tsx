/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  ACTIVE_LBL,
  CLOSE_LBL,
  DEPLOY_LBL,
  DEPLOY_TO_LBL,
  DEV_LBL,
  ENV_LABLE,
  PRODUCTION_LBL,
  STAGE_LBL,
  TEST_LBL,
} from '../../../shared/constant/AppConstants';

interface ownProps {
  data: any;
  show: boolean;
  onDeploy: any;
  onClose: any;
}

export default function DeployToModal({ data, show, onDeploy, onClose }: ownProps): JSX.Element {
  const closeModalRef: any = React.createRef();

  const showModal = show ? 'show d-block' : 'd-none';

  const { environment } = data;

  const [devToggle, setDevToggle]: any = useState(environment.includes('Dev'));
  const [testToggle, setTestToggle]: any = useState(environment.includes('Test'));
  const [stageToggle, setStageToggle]: any = useState(environment.includes('Stage'));
  const [productionToggle, setProductionToggle]: any = useState(environment.includes('Production'));

  // console.log('data', data);

  const deployConfigurationHandler = (): void => {
    const deployData = {
      destination: '',
      configId: data?._id,
    };

    if (devToggle) {
      deployData.destination = 'dev';
    }

    if (testToggle) {
      deployData.destination = 'test';
    }

    if (stageToggle) {
      deployData.destination = 'stage';
    }

    if (productionToggle) {
      deployData.destination = 'prod';
    }

    onDeploy(deployData);
  };

  return (
    <div
      className={`modal fade ${showModal}`}
      id='deployToModal'
      aria-labelledby='deployToModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='deployToModalLabel'>
              {DEPLOY_TO_LBL}
            </h5>
          </div>
          <div className='modal-body pb-0'>
            <div className='table-responsive table-bg'>
              <table className='table shadow-sm'>
                <thead>
                  <tr>
                    <th>{ENV_LABLE}</th>
                    <th>{ACTIVE_LBL}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-blue'>{DEV_LBL}</td>
                    <td>
                      <div className='tg-list'>
                        <div className='tg-list-item'>
                          <input
                            className='tgl tgl-ios'
                            id='dev'
                            type='checkbox'
                            onChange={(e) =>
                              environment.includes('Dev') ||
                              (environment.includes('Admin') && setDevToggle(e.target.checked))
                            }
                            checked={devToggle}
                            disabled={!environment.includes('Admin')}
                          />
                          <label className='tgl-btn' htmlFor='dev'>
                            {}
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-blue'>{TEST_LBL}</td>
                    <td>
                      <div className='tg-list'>
                        <div className='tg-list-item'>
                          <input
                            className='tgl tgl-ios'
                            id='test'
                            type='checkbox'
                            onChange={(e) =>
                              environment.includes('Test') ||
                              (environment.includes('Dev') && setTestToggle(e.target.checked))
                            }
                            checked={testToggle}
                            disabled={!environment.includes('Dev')}
                          />
                          <label className='tgl-btn' htmlFor='test'>
                            {}
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-blue'>{STAGE_LBL}</td>
                    <td>
                      <div className='tg-list'>
                        <div className='tg-list-item'>
                          <input
                            className='tgl tgl-ios'
                            id='stage'
                            type='checkbox'
                            onChange={(e) =>
                              environment.includes('Stage') ||
                              (environment.includes('Test') && setStageToggle(e.target.checked))
                            }
                            checked={stageToggle}
                            disabled={!environment.includes('Test')}
                          />
                          <label className='tgl-btn' htmlFor='stage'>
                            {}
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-blue'>{PRODUCTION_LBL}</td>
                    <td>
                      <div className='tg-list'>
                        <div className='tg-list-item'>
                          <input
                            className='tgl tgl-ios'
                            id='production'
                            type='checkbox'
                            onChange={(e) =>
                              environment.includes('Production') ||
                              (environment.includes('Stage') &&
                                setProductionToggle(e.target.checked))
                            }
                            checked={productionToggle}
                            disabled={!environment.includes('Stage')}
                          />
                          <label className='tgl-btn' htmlFor='production'>
                            {}
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='modal-footer border-0 justify-content-center justify-content-sm-end mb-4'>
            <button
              type='button'
              onClick={() => onClose()}
              className='btn btn-secondary me-3'
              ref={closeModalRef}>
              {CLOSE_LBL}
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => deployConfigurationHandler()}
              disabled={!(devToggle || testToggle || stageToggle || productionToggle)}>
              {DEPLOY_LBL}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
