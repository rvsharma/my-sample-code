/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { GENERAL_HEADER_LABEL } from '../../../shared/constant/AppConstants';
import GrievancesAndAppeals from './GrievancesAndAppeals/GrievancesAndAppeals';
import TermsAndCondition from './TermsAndCondition/TermsAndCondition';
// import { configSettingsColumns } from '../../shared/constant/AppConstants';
// import Grid from '../../shared/sharedComponent/grid/Grid';
// import { data } from '../../shared/utils/DummyData';

export default class GeneralTest extends PureComponent {
  sectionList: string[] = [
    GENERAL_HEADER_LABEL.GRIEVANCES_APPEALS_LBL,
    // GENERAL_HEADER_LABEL.TERMS_AND_CONDITION_LBL,
  ];

  getComponent = (type: string): any => {
    // switch (type) {
    //   case GENERAL_HEADER_LABEL.GRIEVANCES_APPEALS_LBL:
    //     return <GrievancesAndAppeals />;

    //   case GENERAL_HEADER_LABEL.TERMS_AND_CONDITION_LBL:
    //     return <TermsAndCondition />;

    //   default:
    //     break;
    // }

    return null;
  };

  render(): React.ReactElement {
    return (
      <>
        <main role='main' className='container'>
          <div className='accordion' id='accordionPanelsStayOpenExample'>
            <div className='accordion-item  mt-3'>
              <h4 className='accordion-header ' id='panelsStayOpen-headingOne'>
                <button
                  className='accordion-button pt-2 pb-2  heading1'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#panelsStayOpen-collapseOne'
                  aria-expanded='true'
                  aria-controls='panelsStayOpen-collapseOne'>
                  Collections Canopy can edit
                </button>
              </h4>
              {/* <Grid headerData={configSettingsColumns} data={data} /> */}
            </div>
            <div className='accordion-item mt-3 mb-2'>
              <h4 className='accordion-header' id='panelsStayOpen-headingTwo'>
                <button
                  className='accordion-button pt-2 pb-2 collapsed heading1'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#panelsStayOpen-collapseTwo'
                  aria-expanded='false'
                  aria-controls='panelsStayOpen-collapseTwo'>
                  Config Entry Details
                </button>
              </h4>
              <div
                id='panelsStayOpen-collapseTwo'
                className='accordion-collapse collapse '
                aria-labelledby='panelsStayOpen-headingTwo'>
                <div className='accordion-body dashboardMainLinks pt-2'>
                  <div className='row fieldsRow  align-items-center'>
                    <div className='row logosRow'>
                      <div className='col-12 col-sm-3'>
                        <label className='col-form-label text-break' htmlFor='logos'>
                          Logos
                        </label>
                      </div>
                      <div className='col-12 col-sm-9' id='enableDisableDiv'>
                        <div className='row'>
                          <div className='col-6 col-sm-4 col-lg-3'>
                            <select id='isProd' className='form-select ms-0'>
                              <option value='canopy'>Canopy </option>
                              <option value='dignity'>Dignity</option>
                              <option value='SCCIPA'>SCCIPA </option>
                              <option value='UHC'>UHC</option>
                              <option value='JMH'>JMH </option>
                              <option value='hill'>Hill</option>
                              <option value='healthNet'>HealthNet </option>
                              <option value='marinhealth'>Marinhealth</option>
                              <option value='hncanopy'>hncanopy </option>
                              <option value='genricCo'>GenricCo</option>
                            </select>
                          </div>

                          <div className='col-6 col-sm-4 col-lg-3'>
                            <select id='isProd' className='form-select ms-0'>
                              <option value=''>n/a</option>
                              <option value='Canopy'>Canopy</option>
                              <option value='Dignity'>Dignity</option>
                              <option value='SCCIPA'>SCCIPA</option>
                              <option value='UHC'>UHC</option>
                              <option value='Meritage'>Meritage</option>
                              <option value='JMH'>JMH</option>
                              <option value='Hill'>Hill</option>
                              <option value='HealthNet'>HealthNet</option>
                              <option value='marinhealth'>marinhealth</option>
                              <option value='hncanopy'>hncanopy</option>
                              <option value='GenericCo'>GenericCo</option>
                            </select>
                          </div>
                          <div className='col-6 col-sm-4 col-lg-3'>
                            <select id='LogoPosition3' className='form-select ms-0'>
                              <option value=''>n/a</option>
                              <option value='Canopy'>Canopy</option>
                              <option value='Dignity'>Dignity</option>
                              <option value='SCCIPA'>SCCIPA</option>
                              <option value='UHC'>UHC</option>
                              <option value='Meritage'>Meritage</option>
                              <option value='JMH'>JMH</option>
                              <option value='Hill'>Hill</option>
                              <option value='HealthNet'>HealthNet</option>
                              <option value='marinhealth'>marinhealth</option>
                              <option value='hncanopy'>hncanopy</option>
                              <option value='GenericCo'>GenericCo</option>
                            </select>
                          </div>

                          <div className='col-6 col-sm-4 col-lg-3'>
                            <select id='LogoPosition4' className='form-select ms-0'>
                              <option value=''>n/a</option>
                              <option value='Canopy'>Canopy</option>
                              <option value='Dignity'>Dignity</option>
                              <option value='SCCIPA'>SCCIPA</option>
                              <option value='UHC'>UHC</option>
                              <option value='Meritage'>Meritage</option>
                              <option value='JMH'>JMH</option>
                              <option value='Hill'>Hill</option>
                              <option value='HealthNet'>HealthNet</option>
                              <option value='marinhealth'>marinhealth</option>
                              <option value='hncanopy'>hncanopy</option>
                              <option value='GenericCo'>GenericCo</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
