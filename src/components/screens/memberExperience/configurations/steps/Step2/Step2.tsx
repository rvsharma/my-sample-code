import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Stepper from '../../Stepper';
import * as genralAction from '../../../../../../redux/screens/memberExperience/general/GeneralActions';
import { GENERAL_SUB_TYPE } from '../../../../../shared/constant/AppConstants';
import { onConfigChange } from '../../../../../shared/helperMethods/HelperMethod';
import { ErrorComponent } from '../../../../../shared/sharedComponent/errorComponent/ErrorComponent';

interface ownProps {
  goToStep: any;
  configData: any;
  setConfigData: Function;
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

export default function Step2(props: ownProps): JSX.Element {
  const { configData, setConfigData, goToStep } = props;
  const [generalData, setGeneralData] = useState(map);
  const [isNext, setIsNext] = useState(false);
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

  useEffect(() => {
    onGetGeneralData();
  }, []);

  const onChange = (event: any): void => {
    const changedConfigData = onConfigChange(configData, event);
    setConfigData(changedConfigData);
  };

  const getGeneralId = (obj: any): any => {
    if (obj?.id) {
      return obj.id;
    }
    return obj;
  };

  const validate = (): any => {
    // if (
    //   configData.general?.grievancesAndAppeals.id === '' ||
    //   configData.general?.privacyPolicy.id === '' ||
    //   configData.general.nondiscriminationNotice.id === 0 ||
    //   configData.general?.phoneNumber.id === '' ||
    //   configData.general?.termscondition.id === ''
    // ) {
    //   return false;
    // }
    return true;
  };

  const onClickNext = (): any => {
    setIsNext(true);
    if (validate()) {
      goToStep(3);
    }
    setConfigData(configData);
  };

  return (
    <>
      <Stepper isEdit={configData._id} step={2} />
      <div className='row mt-3'>
        <div className='col-12 member-signup-container shadow py-4 mt-0'>
          <div className='row member-signup-text pt-2 mb-4 lh-1'>
            <div className='col-12'>General</div>
          </div>

          <div className='row pb-4 mt-4'>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3'>
              <label htmlFor='PrivacyPolicy' className='form-label lbl'>
                Privacy Policy
              </label>
              <div className='col-12'>
                <select className='form-select' name='general.privacyPolicy.id' onChange={onChange}>
                  <option value=''>Select here</option>
                  {generalData &&
                    generalData[GENERAL_SUB_TYPE.PRIVACY_POLICY].map((d) => (
                      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                      <option
                        selected={getGeneralId(configData.general?.privacyPolicy) === d._id}
                        value={d._id}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </div>
              {isNext && configData.general?.privacyPolicy.id === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3 mt-md-0'>
              <label htmlFor='Terms_Conditions' className='form-label lbl'>
                Terms & Conditions
              </label>
              <div className='col-12'>
                <select
                  className='form-select'
                  name='general.termscondition.id'
                  onChange={onChange}>
                  <option value=''>Select here</option>
                  {generalData &&
                    generalData[GENERAL_SUB_TYPE.TERM_CONDITIONS].map((d) => (
                      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                      <option
                        selected={getGeneralId(configData.general?.termscondition) === d._id}
                        value={d._id}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </div>
              {isNext && configData.general?.termscondition.id === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3 mt-sm-0'>
              <label htmlFor='Grievances_Appeals' className='form-label lbl'>
                Grievances & Appeals
              </label>
              <div className='col-12'>
                <select
                  className='form-select'
                  name='general.grievancesAndAppeals.id'
                  onChange={onChange}>
                  <option value=''>Select here</option>
                  {generalData &&
                    generalData[GENERAL_SUB_TYPE.GRIEVANCE_APPEALS].map((d) => (
                      <option
                        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                        selected={getGeneralId(configData.general?.grievancesAndAppeals) === d._id}
                        value={d._id}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </div>
              {isNext && configData.general?.grievancesAndAppeals.id === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3 mt-sm-0'>
              <label htmlFor='Non_discrimination_Notice' className='form-label lbl'>
                Non-discrimination Notice
              </label>
              <div className='col-12'>
                <select
                  className='form-select'
                  name='general.nondiscriminationNotice.id'
                  onChange={onChange}>
                  <option value=''>Select here</option>
                  {generalData &&
                    generalData[GENERAL_SUB_TYPE.NON_DISC_NOTICE].map((d) => (
                      <option
                        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                        selected={
                          getGeneralId(configData.general?.nondiscriminationNotice) === d._id
                        }
                        value={d._id}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </div>
              {isNext && configData.general?.nondiscriminationNotice.id === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-3 col-lg-4 mt-3'>
              <label htmlFor='PhoneNumbers' className='form-label lbl'>
                Phone Numbers
              </label>
              <div className='col-12'>
                <select className='form-select' name='general.phoneNumber.id' onChange={onChange}>
                  <option value=''>Select here</option>
                  {generalData &&
                    generalData[GENERAL_SUB_TYPE.PHONE_NUMBERS].map((d) => (
                      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                      <option
                        selected={getGeneralId(configData.general?.phoneNumber) === d._id}
                        value={d._id}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </div>
              {isNext && configData.general?.phoneNumber.id === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
          </div>

          <div className='row pt-5 pb-5 tab-button justify-content-center justify-content-sm-end'>
            <div className='col-auto'>
              <button
                type='button'
                className='btn btn-radius btn-secondary-color-next px-4'
                onClick={() => goToStep(1)}>
                Back
              </button>
            </div>
            <div className='col-auto'>
              <button
                type='button'
                className='btn btn-blue-next text-white btn-radius'
                onClick={() => onClickNext()}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
