import React, { PureComponent } from 'react';
import { configSettingsColumns } from '../../shared/constant/AppConstants';
import Grid from '../../shared/sharedComponent/grid/Grid';
import { data } from '../../shared/utils/DummyData';

export default class ConfigSetting extends PureComponent {
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
              <Grid headerData={configSettingsColumns} data={data} />
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
                  <div className='row align-items-center'>
                    <div className='col-12 col-sm-3'>Key Info</div>
                    <div className='col-12 col-sm-9'>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='product'>
                            Product
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='payor'>
                            Payor
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='IPA'>
                            IPA
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='Category'>
                            Category Name
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='group Id'>
                            Group Id
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='isProd'>
                            isProd
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <select id='isProd' className='form-select ms-0'>
                            <option value=''>n/a</option>
                            <option value='true'>True</option>
                          </select>
                        </div>
                      </div>
                      <div className='row justify-content-center justify-content-sm-start'>
                        <div className='col-auto mb-2 mb-sm-0'>
                          <button type='button' className='buttonTop buttonWhite px-2'>
                            Apply Filter
                          </button>
                        </div>
                        <div className='col-auto mb-2 mb-sm-0'>
                          <button type='button' className='buttonTop buttonWhite px-2'>
                            Clear Filters
                          </button>
                        </div>
                        <div className='col-auto mb-2 mb-sm-0'>
                          <button type='button' className='buttonTop buttonWhite px-2'>
                            Last Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3 mb-3'>
                    <hr />
                  </div>

                  <div className='row enableDisableParent align-items-center'>
                    <div className='col-12 col-sm-3'>
                      <label className='col-form-label text-break' htmlFor='enable/disable'>
                        Enable/Disable
                      </label>
                    </div>
                    <div className='col-12 col-sm-9' id='enableDisableDiv'>
                      <div className='row'>
                        <div className='col-8 col-sm-6 col-md-3 col-lg-3'>
                          <select id='isProd' className='form-select ms-0'>
                            <option value='enable'>Enable</option>
                            <option value='disable'>Disable</option>
                          </select>
                        </div>
                        <div className='col-4 col-sm-6  col-md-3 col-lg-2 ps-0'>
                          <label className='col-form-label text-break' htmlFor='notification'>
                            Notification
                          </label>
                        </div>
                        <div className='col-8 col-sm-6  col-md-3 col-lg-3'>
                          <select id='isProd' className='form-select ms-0'>
                            <option value='enable'>Enable</option>
                            <option value='disable'>Disable</option>
                          </select>
                        </div>
                        <div className='col-4 col-sm-6  col-md-3 col-lg-2 ps-0'>
                          <label className='col-form-label text-break' htmlFor='hp'>
                            myHealthPlan
                          </label>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-8 col-sm-6  col-md-3 col-lg-3'>
                          <select id='isProd' className='form-select ms-0'>
                            <option value='enable'>Enable</option>
                            <option value='disable'>Disable</option>
                          </select>
                        </div>
                        <div className='col-4 col-sm-6 col-md-3 col-lg-2 ps-0'>
                          <label className='col-form-label text-break' htmlFor='healthInfo'>
                            healthInfo
                          </label>
                        </div>
                        <div className='col-8 col-sm-6 col-md-3 col-lg-3'>
                          <select id='isProd' className='form-select ms-0'>
                            <option value='enable'>Enable</option>
                            <option value='disable'>Disable</option>
                          </select>
                        </div>
                        <div className='col-4 col-sm-6 col-md-3 col-lg-2 ps-0'>
                          <label className='col-form-label text-break' htmlFor='costestimator'>
                            costEstimator
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-2 mb-3'>
                    <hr />
                  </div>

                  <div className='row fieldsRow align-items-center'>
                    <div className='col-12 col-sm-3'>Video Visit Providers</div>
                    <div className='col-12 col-sm-9'>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='provider'>
                            Providers
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3 mb-2'>
                    <hr />
                  </div>

                  <div className='row fieldsRow align-items-center'>
                    <div className='col-12 col-sm-3'>Grievances</div>
                    <div className='col-12 col-sm-9'>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='url'>
                            HTML Url
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='pdf url'>
                            PDF Url
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-5 col-lg-3'>
                          <label className='col-form-label fieldsRowLabel' htmlFor='content key'>
                            staticContentKey
                          </label>
                        </div>
                        <div className='col-sm-7 col-lg-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-2 mb-3'>
                    <hr />
                  </div>

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

                  <div className='mt-3 mb-2'>
                    <hr />
                  </div>

                  <div className='row fieldsRow align-items-center justify-content-center justify-content-sm-end'>
                    <div className='col-auto leftBarContainer'>
                      <button type='button' className='buttonBlue px-3'>
                        Save Entry
                      </button>
                    </div>
                    <div className='col-auto leftBarContainer'>
                      <button type='button' className='buttonBlue px-3'>
                        Clone
                      </button>
                    </div>
                    <div className='col-auto leftBarContainer'>
                      <button type='button' className='buttonBlue px-3'>
                        Disable
                      </button>
                    </div>
                    <div className='col-auto rightBarContainer ms-sm-auto mt-2 mt-sm-0'>
                      <button type='button' className='buttonDanger px-3'>
                        Delete
                      </button>
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
