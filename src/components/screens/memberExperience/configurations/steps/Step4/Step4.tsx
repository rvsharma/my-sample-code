/* eslint no-underscore-dangle: 0 */
/* eslint consistent-return: off */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../../../shared/sharedComponent/tableGrid/TableCells';
import Stepper from '../../Stepper';
import { ToolTipCell } from './cell';
import * as actions from '../../../../../../redux/screens/memberExperience/configurations/ConfigurationsActions';
import ComfirmationModal from '../../../../../shared/sharedComponent/confirmationModal/ConfirmationModal';
import { arrayUniqueByKey, getGeneral } from '../../../../../shared/helperMethods/HelperMethod';
import * as brandingAction from '../../../../../../redux/screens/content/ContentAction';
import * as genralAction from '../../../../../../redux/screens/memberExperience/general/GeneralActions';
import { GENERAL_SUB_TYPE } from '../../../../../shared/constant/AppConstants';

interface ownProps {
  goToStep: any;
  configData: any;
  allData: any;
}

const subTypes: { [key: string]: any } = [
  { name: GENERAL_SUB_TYPE.PRIVACY_POLICY, subtype: 'privacy-policy' },
  { name: GENERAL_SUB_TYPE.TERM_CONDITIONS, subtype: 'term-condition' },
  { name: GENERAL_SUB_TYPE.GRIEVANCE_APPEALS, subtype: 'grievance-appeal' },
  { name: GENERAL_SUB_TYPE.NON_DISC_NOTICE, subtype: 'nondiscrimination-notice' },
  { name: GENERAL_SUB_TYPE.PHONE_NUMBERS, subtype: 'phone-number' },
];
const map: { [key: string]: any[] } = {
  privacyPolicy: [],
  termsCoditions: [],
  grievancesAppeals: [],
  noDiscNotice: [],
  phoneNumbers: [],
};

export default function Step4(props4: ownProps): JSX.Element {
  const { configData, goToStep, allData } = props4;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [message, setMessage] = useState('');
  const [logoList, setlogoList] = useState([]);
  const [generalData, setGeneralData] = useState(map);
  const dispatch = useDispatch();

  // api calls
  const onGetGeneralData = (): any => {
    subTypes.forEach((sub: any): void => {
      const queryParams = `member-experience&subtype=${sub.subtype}`;
      dispatch(
        genralAction.createGetGeneralDataRequest(queryParams, (res: any) => {
          if (res?.isSuccess) {
            generalData[sub.name] = res.data;
            setGeneralData({ ...generalData });
          }
        })
      );
    });
  };

  const validateData = (): any => {
    const errorArray: any[] = [];
    configData.modules.forEach((m: any) => {
      m.moduleData.addressableSpaces.forEach((a: any) => {
        if (
          a.items.length > 0 &&
          a.items.some((x: any): any => x.id === '' || x.id === undefined)
        ) {
          setMessage(
            `Please select a value in '${a.location}' in '${m.module}' module addresaable spaces.`
          );
          errorArray.push(false);
        }
      });
    });
    return errorArray.some((x: any) => x === false);
  };

  const validateDuplicate = (): any => {
    if (
      allData.some((x: any): any => {
        return (
          x?.name?.toLowerCase() === configData?.name?.toLowerCase() &&
          x?.tag?.toLowerCase() === configData?.tag?.toLowerCase() &&
          x?.parameters?.product?.toLowerCase() ===
            configData?.parameters?.product?.toLowerCase() &&
          x?.parameters?.payor?.toLowerCase() === configData?.parameters?.payor?.toLowerCase() &&
          x?.parameters?.ipa?.toLowerCase() === configData?.parameters?.ipa?.toLowerCase() &&
          x.parameters?.plan.every(
            (value: any, index: any) => value === configData?.parameters?.plan[index]
          ) &&
          x.parameters?.employer.every(
            (value: any, index: any) => value === configData?.parameters?.employer[index]
          )
        );
      })
    ) {
      setMessage(
        `Configuration cannot be created for similar set of Name, Tag, Product, Payor, IPA, Plan and Employer`
      );
      return false;
    }
    return true;
  };

  const onCreateOrUpdate = (): void => {
    if (!validateData() && validateDuplicate()) {
      configData.parameters.isPreffective = configData.parameters?.isPreffective === 'true';
      configData.modules.forEach((m: any) => {
        delete m.isCustom; // eslint-disable-line no-param-reassign
        m.moduleData.addressableSpaces.forEach((a: any) => {
          delete a.name; // eslint-disable-line no-param-reassign
          a.items.forEach((i: any) => {
            delete i.items; // eslint-disable-line no-param-reassign
            delete i.text; // eslint-disable-line no-param-reassign
          });
        });
      });
      const data = configData;
      configData.general = getGeneral(configData.general, {});
      if (configData._id) {
        dispatch(
          actions.createUpdateConfigurationDataRequest(configData, (res: any) => {
            if (res?.isSuccess || res?.data?.isSuccess) {
              setMessage('Config Updated Successfully.');
              setShowSuccessModal(true);
            } else {
              setMessage(res?.data?.message || res?.message);
              setShowFailModal(true);
            }
          })
        );
      } else {
        dispatch(
          actions.createAddConfigurationDataRequest(data, (res: any) => {
            if (res?.isSuccess || res?.data?.isSuccess) {
              setMessage('Config Created Successfully.');
              setShowSuccessModal(true);
            } else {
              setMessage(res?.data?.message || res?.message);
              setShowFailModal(true);
            }
          })
        );
      }
    } else {
      setShowFailModal(true);
    }
  };

  const onCloseSuccessModal = (): void => {
    setShowSuccessModal(false);
    goToStep(0);
  };

  const getLogoUrl = (id: any, layout: any): string => {
    const logos: any = logoList.find((x: any) => x._id === id);
    return logos && (layout === 'web' ? logos.logos.horizontalReverse : logos.logos.dot);
  };
  const getLogoName = (id: any): string => {
    const logos: any = logoList.find((x: any) => x._id === id);
    return logos && logos.name;
  };

  // api calls

  const onGetbrandingsData = (): any => {
    const queryString = `?type=content&subtype=branding`;
    dispatch(
      brandingAction.createGetDataRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          setlogoList(arrayUniqueByKey(res?.data, 'name'));
        }
      })
    );
  };

  const getGeneralId = (obj: any): any => {
    if (obj?.id) {
      return obj.id;
    }
    return obj;
  };

  const getName = (gen: any, subType: any): any => {
    const id = getGeneralId(gen);
    const general = generalData[subType].find((x) => x._id === id);
    return general?.name;
  };

  useEffect(() => {
    onGetbrandingsData();
    onGetGeneralData();
  }, []);

  return (
    <>
      <Stepper isEdit={configData._id} step={4} />
      <div className='row member-signup-text mt-4 mb-4 lh-1'>
        <div className='col-12 px-0'>Review Configuration</div>
      </div>
      <div className='row mt-3'>
        <div className='col-12 member-signup-container shadow py-4 mt-0'>
          <div className='row pb-4'>
            <div className='col-12 col-sm-6 col-md-4 col-lg-3 mt-2'>
              <label htmlFor='name' className='form-label lbl'>
                Name
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  value={configData.name}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-3 mt-2 mt-sm-0 '>
              <label htmlFor='Tag' className='form-label lbl'>
                Tag
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='tag'
                  value={configData.tag}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='col-12  border-bottom ' />
            </div>
          </div>

          <div className='row pb-4 mt-4'>
            <div className='col-12 member-signup-text mt-0 fw-bold lh-1 pb-4'>Parameters</div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-md-0'>
              <label htmlFor='Payor' className='form-label lbl'>
                Product
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='product'
                  value={configData.parameters.product}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-md-0'>
              <label htmlFor='Payor' className='form-label lbl'>
                Payor
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='payor'
                  value={configData.parameters.payor}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-md-0'>
              <label htmlFor='Plan' className='form-label lbl'>
                Plan
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='plan'
                  value={configData.parameters.plan}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-sm-0'>
              <label htmlFor='IPA' className='form-label lbl'>
                IPA
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='ipa'
                  value={configData.parameters.ipa}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-sm-0'>
              <label htmlFor='IPA' className='form-label lbl'>
                Employer
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='employer'
                  value={configData.parameters.employer}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3'>
              <label htmlFor='IPA' className='form-label lbl'>
                Effective / Pre-effective
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='employer'
                  value={configData.parameters?.isPreffective ? 'Pre-Effective' : 'Effective'}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='col-12  border-bottom ' />
            </div>
          </div>

          <div className='row pb-4 mt-4 align-items-center'>
            <div className='col-auto member-signup-text mt-0 fw-bold lh-1 pb-1 pe-0'>
              Layout On Web
            </div>
          </div>
          <div className='row pb-4 mt-4 '>
            <div className='col'>
              <label htmlFor='LogoOne' className='form-label lbl'>
                Logo 1
              </label>
              <div className='row'>
                <div className='col-12 col-lg-12 px-0'>
                  <input
                    type='text'
                    className='form-control'
                    value={getLogoName(configData?.branding[0]?.id)}
                    disabled
                  />
                </div>
                <div className='col-12 col-lg-12 mt-2 pe-0 px-xl-0'>
                  {configData?.branding[0]?.id && (
                    <img
                      src={getLogoUrl(configData?.branding[0]?.id, 'web')}
                      alt='Horizontal'
                      width='100%'
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='col'>
              <label htmlFor='LogoTwo' className='form-label lbl'>
                Logo 2
              </label>
              <div className='row'>
                <div className='col-12 col-lg-12 px-0'>
                  <input
                    type='text'
                    className='form-control'
                    name='employer'
                    value={getLogoName(configData?.branding[1]?.id)}
                    disabled
                  />
                </div>
                <div className='col-12 col-lg-12 mt-2 pe-0 px-xl-0'>
                  {configData?.branding[1]?.id && (
                    <img
                      src={getLogoUrl(configData?.branding[1]?.id, 'web')}
                      alt='Horizontal'
                      width='100%'
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='col'>
              <label htmlFor='LogoThree' className='form-label lbl'>
                Logo 3
              </label>
              <div className='row'>
                <div className='col-12 col-lg-12 px-0'>
                  <input
                    type='text'
                    className='form-control'
                    name='employer'
                    value={getLogoName(configData?.branding[2]?.id)}
                    disabled
                  />
                </div>
                <div className='col-12 col-lg-12 mt-2 pe-0 px-xl-0'>
                  {configData?.branding[2]?.id && (
                    <img
                      src={getLogoUrl(configData?.branding[2]?.id, 'web')}
                      alt='Horizontal'
                      width='100%'
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='col'>
              <label htmlFor='LogoFour' className='form-label lbl'>
                Logo 4
              </label>
              <div className='row'>
                <div className='col-12 col-lg-12 px-0'>
                  <input
                    type='text'
                    className='form-control'
                    name='employer'
                    value={getLogoName(configData?.branding[3]?.id)}
                    disabled
                  />
                </div>
                <div className='col-12 col-lg-12 mt-2 pe-0 px-xl-0'>
                  {configData?.branding[3]?.id && (
                    <img
                      src={getLogoUrl(configData?.branding[3]?.id, 'web')}
                      alt='Horizontal'
                      width='100%'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='col-12  border-bottom ' />
            </div>
          </div>

          {/* View Mobile Layout */}
          <div className='row pb-4 mt-4 align-items-center'>
            <div className='col-auto member-signup-text mt-0 fw-bold lh-1 pb-1 pe-0'>
              Layout On Application
            </div>
          </div>
          <div className='row pb-4 mt-4 '>
            <div>
              <div className='col-12 col-sm-4 col-md-4 col-lg-3'>
                <label htmlFor='LogoOne' className='form-label lbl'>
                  Logo 1
                </label>
                <div className='row'>
                  <div className='col-6  col-sm-8 col-lg-6  px-0'>
                    <input
                      type='text'
                      className='form-control'
                      name='employer'
                      value={getLogoName(configData?.branding[0]?.id)}
                      disabled
                    />
                  </div>
                  <div className='col-6 col-sm-4 col-lg-6 mt-2 pe-0 pe-xl-0'>
                    {configData?.branding[0]?.id && (
                      <img
                        src={getLogoUrl(configData?.branding[0]?.id, 'mob')}
                        alt='dot'
                        width='100%'
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-4 col-md-4 col-lg-3 mt-3'>
                <label htmlFor='LogoTwo' className='form-label lbl'>
                  Logo 2
                </label>
                <div className='row'>
                  <div className='col-6  col-sm-8 col-lg-6  px-0'>
                    <input
                      type='text'
                      className='form-control'
                      name='employer'
                      value={getLogoName(configData?.branding[1]?.id)}
                      disabled
                    />
                  </div>
                  <div className='col-6 col-sm-4 col-lg-6 mt-2 pe-0 pe-xl-0'>
                    {configData?.branding[1]?.id && (
                      <img
                        src={getLogoUrl(configData?.branding[1]?.id, 'mob')}
                        alt='dot'
                        width='100%'
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-4 col-md-4 col-lg-3 mt-3 '>
                <label htmlFor='LogoThree' className='form-label lbl'>
                  Logo 3
                </label>
                <div className='row'>
                  <div className='col-6  col-sm-8 col-lg-6  px-0'>
                    <input
                      type='text'
                      className='form-control'
                      name='employer'
                      value={getLogoName(configData?.branding[2]?.id)}
                      disabled
                    />
                  </div>
                  <div className='col-6 col-sm-4 col-lg-6 mt-2 pe-0 pe-xl-0'>
                    {configData?.branding[2]?.id && (
                      <img
                        src={getLogoUrl(configData?.branding[2]?.id, 'mob')}
                        alt='dot'
                        width='100%'
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-4 col-md-4 col-lg-3 mt-3'>
                <label htmlFor='LogoFour' className='form-label lbl'>
                  Logo 4
                </label>
                <div className='row'>
                  <div className='col-6  col-sm-8 col-lg-6  px-0'>
                    <input
                      type='text'
                      className='form-control'
                      name='employer'
                      value={getLogoName(configData?.branding[3]?.id)}
                      disabled
                    />
                  </div>
                  <div className='col-6 col-sm-4 col-lg-6 mt-2 pe-0 pe-xl-0'>
                    {configData?.branding[3]?.id && (
                      <img
                        src={getLogoUrl(configData?.branding[3]?.id, 'mob')}
                        alt='dot'
                        width='100%'
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='col-12  border-bottom ' />
            </div>
          </div>
          <div className='row member-signup-text pt-2 mb-4 lh-1'>
            <div className='col-12'>General</div>
          </div>

          <div className='row pb-4 mt-4'>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3'>
              <label htmlFor='PrivacyPolicy' className='form-label lbl'>
                Privacy Policy
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='privacyPolicy'
                  value={getName(
                    configData.general?.privacyPolicy,
                    GENERAL_SUB_TYPE.PRIVACY_POLICY
                  )}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3 mt-md-0'>
              <label htmlFor='Terms_Conditions' className='form-label lbl'>
                Terms & Conditions
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='termscondition'
                  value={getName(
                    configData.general?.termscondition,
                    GENERAL_SUB_TYPE.TERM_CONDITIONS
                  )}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3 mt-sm-0'>
              <label htmlFor='Grievances_Appeals' className='form-label lbl'>
                Grievances & Appeals
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='grievancesAndAppeals'
                  value={getName(
                    configData.general?.grievancesAndAppeals,
                    GENERAL_SUB_TYPE.GRIEVANCE_APPEALS
                  )}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3 mt-sm-0'>
              <label htmlFor='Non_discrimination_Notice' className='form-label lbl'>
                Non-discrimination Notice
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='nondiscriminationNotice'
                  value={getName(
                    configData.general?.nondiscriminationNotice,
                    GENERAL_SUB_TYPE.NON_DISC_NOTICE
                  )}
                  disabled
                />
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3'>
              <label htmlFor='PhoneNumbers' className='form-label lbl'>
                Phone Numbers
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  name='phoneNumber'
                  value={getName(configData.general?.phoneNumber, GENERAL_SUB_TYPE.PHONE_NUMBERS)}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className='col drag-inst'>
          <div className='row  mt-4 mb-4 lh-1'>
            <div className='col-2 member-signup-text px-0'>Modules</div>
            <label className='col-10 pb-2 mb-0 brdr-btm-color' htmlFor='accelerationmark'>
              <span className='accelerationmark font-family-fontawesome' />
              <span className='text-black fw-normal ms-2'>
                Sectons are ordered on basis of weight
              </span>
            </label>
          </div>
        </div>

        {configData.modules.map((m: any, index: number) => (
          <div className='collapse-directive white-panel pt-2'>
            <div className='row'>
              <div className='accordion px-0' id={`generalAccordion${index}`}>
                <div className='accordion-item border-0'>
                  <h2 className='accordion-header p-0 mb-0' id='headingOne'>
                    <button
                      className='accordion-button pt-2 pb-2'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target={`#collapseOne${index}`}
                      aria-expanded='false'
                      aria-controls={`collapseOne${index}`}>
                      <h2 className='mb-0 col'>{m.title}</h2>
                    </button>
                  </h2>
                </div>

                <div
                  id={`collapseOne${index}`}
                  className='accordion-collapse collapse hide'
                  aria-labelledby={`headingOne${index}`}
                  data-bs-parent={`#generalAccordion${index}`}>
                  <div className='accordion-body px-0 pt-0'>
                    <div className='row mt-3'>
                      <div className='col-12 position-relative'>
                        <div className='row pb-4'>
                          <div className='col-12 col-sm-6 col-md-4 col-lg-3 mt-2'>
                            <label htmlFor='name' className='form-label lbl'>
                              Display Name
                            </label>
                            <div className='col-12'>
                              <input
                                type='text'
                                className='form-control'
                                name='name'
                                value={m.title}
                                disabled
                              />
                            </div>
                          </div>
                          <div className='col-12 col-sm-6 col-md-4 col-lg-3 mt-2 mt-sm-0 '>
                            <label htmlFor='Tag' className='form-label lbl'>
                              Weight
                            </label>
                            <div className='col-12'>
                              <input
                                type='text'
                                className='form-control'
                                name='tag'
                                value={m.weight}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row pb-4'>
                          <div className='col-6 px-0'>
                            <div className='table-bg'>
                              <table className='table shadow-sm simple-table '>
                                <thead>
                                  <tr className='header'>
                                    <th>Name</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {m.moduleData ? (
                                    Object.keys(m.moduleData?.SectionName).map((key: any) => (
                                      <tr className='body'>
                                        <td>{m.moduleData?.SectionName[key]?.displayValue}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr className='text-center w-100 col-12'>
                                      <td className='2'>No Record Found</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className='col-6 px-0'>
                            <GridView
                              data={m.moduleData ? m.moduleData.addressableSpaces : []}
                              key='t2'>
                              <TableCells
                                field='name'
                                title='Addressable Spaces'
                                cell={(props: any) => ToolTipCell({ dataItem: props?.dataItem })}
                              />
                              <TableCells field='d' title='' />
                            </GridView>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className='row pt-5 pb-5 tab-button justify-content-center justify-content-sm-end'>
          <div className='col-auto'>
            <button
              type='button'
              className='btn btn-radius btn-secondary-color-next px-4'
              onClick={() => goToStep(3)}>
              Go Back
            </button>
          </div>
          <div className='col-auto'>
            <button
              type='button'
              className='btn btn-blue-next text-white btn-radius'
              onClick={() => onCreateOrUpdate()}>
              {configData._id ? 'Update Configuration' : 'Create Configuration'}
            </button>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <ComfirmationModal
          title='Success'
          message={message}
          closeModal={() => onCloseSuccessModal()}
          showModal={showSuccessModal}
        />
      )}
      {showFailModal && (
        <ComfirmationModal
          title='Error'
          message={message}
          closeModal={() => setShowFailModal(false)}
          showModal={showFailModal}
        />
      )}
    </>
  );
}
