/* eslint no-underscore-dangle: 0 */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MultiselectDropDown from '../../../../../shared/sharedComponent/multiSelectDropDown/MultiSelectDropown';

import Stepper from '../../Stepper';
import * as brandingAction from '../../../../../../redux/screens/content/ContentAction';
import * as configActions from '../../../../../../redux/screens/memberExperience/configurations/ConfigurationsActions';
import { arrayUniqueByKey, onConfigChange } from '../../../../../shared/helperMethods/HelperMethod';
import { ErrorComponent } from '../../../../../shared/sharedComponent/errorComponent/ErrorComponent';

interface ownProps {
  goToStep: any;
  configData: any;
  setConfigData: Function;
}

export default function Step1(props: ownProps): JSX.Element {
  const { configData, setConfigData, goToStep } = props;
  const [viewLayout, setViewLayout] = useState('WebView');
  const [logoList, setlogoList] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [configFilters, setConfigFilters] = useState({
    product: [],
    payor: [],
    plan: [],
    ipa: [],
    employer: [],
    preefective: [],
  });
  const dispatch = useDispatch();

  // component events

  const onChangeViewLayout = (event: any): any => {
    setViewLayout(event.target.value);
  };

  const onLogoChange = (event: any): any => {
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    const selectedLogo: any = logoList.find((x: any) => x._id === event.target.value);
    console.log(selectedLogo);
    const newObj: any = {
      name: selectedLogo?.name,
      location: `${Number(event.target.id) + 1}`,
      type: 'test',
      id: selectedLogo?._id,
      _id: selectedLogo?._id,
    };

    configData.branding[Number(event.target.id)] = newObj;

    console.log(event);
    setConfigData(configData);
  };

  const onChange = (event: any): void => {
    const changedConfigData = onConfigChange(configData, event);
    setConfigData(changedConfigData);
  };

  const onChangeMultiDropdown = (n: any, v: any): void => {
    const event = { target: { name: n, value: v } };
    const changedConfigData = onConfigChange(configData, event);
    setConfigData(changedConfigData);
  };

  const getLogoUrl = (id: any, layout: any): string => {
    const logos: any = logoList.find((x: any) => x._id === id);
    return logos && (layout === 'web' ? logos.logos.horizontalReverse : logos.logos.dot);
  };

  // api calls

  const onGetConfigFiltersData = (): any => {
    const queryString = `?query={"filterContent":["Parameters"]}`;

    dispatch(
      configActions.createGetConfigFiltersDataRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          setConfigFilters(res?.data[0]?.parameterFilterData[0]);
        }
      })
    );
  };

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

  useEffect(() => {
    onGetbrandingsData();
    onGetConfigFiltersData();
  }, []);

  const validate = (): any => {
    // if (
    //   configData.name === '' ||
    //   configData.tag === '' ||
    //   configData.parameters?.product === '' ||
    //   configData.parameters?.payor === '' ||
    //   configData.parameters.plan.length === 0 ||
    //   configData.parameters?.ipa === '' ||
    //   configData.parameters.employer.length === 0 ||
    //   configData?.branding[0]?.id === undefined ||
    //   configData?.branding[1]?.id === undefined ||
    //   configData?.branding[2]?.id === undefined ||
    //   configData?.branding[3]?.id === undefined
    // ) {
    //   return false;
    // }
    return true;
  };

  const onClickNext = (): any => {
    setIsNext(true);
    if (validate()) {
      goToStep(2);
    }
    setConfigData(configData);
  };

  return (
    <>
      <Stepper isEdit={configData._id} step={1} />
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
                  placeholder='Enter Name'
                  name='name'
                  value={configData.name}
                  onChange={onChange}
                />
              </div>
              {isNext && configData.name === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-3 mt-2 mt-sm-0 '>
              <label htmlFor='Tag' className='form-label lbl'>
                Tag
              </label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Tag'
                  name='tag'
                  value={configData.tag}
                  onChange={onChange}
                />
              </div>
              {isNext && configData.tag === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
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
                <select className='form-select' name='parameters.product' onChange={onChange}>
                  <option value=''>Select here</option>
                  {configFilters.product.map((p: any) => (
                    <option selected={configData.parameters?.product === p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              {isNext && configData.parameters?.product === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-md-0'>
              <label htmlFor='Payor' className='form-label lbl'>
                Payor
              </label>
              <div className='col-12'>
                <select className='form-select' name='parameters.payor' onChange={onChange}>
                  <option value=''>Select here</option>
                  {configFilters.payor.map((p: any) => (
                    <option selected={configData.parameters?.payor === p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              {isNext && configData.parameters?.payor === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-md-0'>
              <label htmlFor='Plan' className='form-label lbl'>
                Plan
              </label>
              <div className='col-12'>
                {configFilters.plan.length > 0 && (
                  <MultiselectDropDown
                    name='parameters.plan'
                    data={configFilters.plan}
                    selectedData={configData.parameters.plan}
                    onChange={onChangeMultiDropdown}
                    key='plan'
                  />
                )}
              </div>
              {isNext && configData.parameters?.plan.length === 0 && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-sm-0'>
              <label htmlFor='IPA' className='form-label lbl'>
                IPA
              </label>
              <div className='col-12'>
                <select className='form-select' name='parameters.ipa' onChange={onChange}>
                  <option value={configData.parameters?.ipa}>Select here</option>
                  {configFilters.ipa.map((i: any) => (
                    <option selected={configData.parameters?.ipa === i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              {isNext && configData.parameters?.ipa === '' && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3 mt-sm-0'>
              <label htmlFor='IPA' className='form-label lbl'>
                Employer
              </label>
              <div className='col-12'>
                {configFilters.plan.length > 0 && (
                  <MultiselectDropDown
                    name='parameters.employer'
                    data={configFilters.employer}
                    selectedData={configData.parameters.employer}
                    onChange={onChangeMultiDropdown}
                    key='employer'
                  />
                )}
              </div>
              {isNext && configData.parameters?.employer.length === 0 && (
                <ErrorComponent message={{ error: 'This field is required' }} />
              )}
            </div>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 mt-3'>
              <label htmlFor='IPA' className='form-label lbl'>
                Active / Pre-effective
              </label>
              <div className='col-12'>
                <select
                  className='form-select'
                  name='parameters.isPreffective'
                  onChange={onChange}
                  value={configData.parameters?.isPreffective.toString()}>
                  <option selected>Select here</option>
                  <option selected={configData.parameters?.isPreffective === true} value='true'>
                    Pre-Effective
                  </option>
                  <option selected={configData.parameters?.isPreffective === false} value='false'>
                    Effective
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='col-12  border-bottom ' />
            </div>
          </div>

          <div className='row pb-4 mt-4 align-items-center'>
            <div className='col-auto member-signup-text mt-0 fw-bold lh-1 pb-1 pe-0'>Branding</div>
            <div className='col-auto d-flex aling-items-enter mb-0 mt-1'>
              <div className='container-radio  d-flex aling-items-enter my-0'>
                <div className='radio'>
                  <input
                    type='radio'
                    value='WebView'
                    checked={viewLayout === 'WebView'}
                    onChange={onChangeViewLayout}
                    name='ViewLayout'
                    id='ViewWebLayout'
                  />
                  <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                  <label htmlFor='ViewWebLayout' className='mb-0' />
                </div>
              </div>
              <div className='right my-0'>View Web Layout</div>
            </div>

            <div className='col-auto d-flex aling-items-enter mb-0 mt-1'>
              <div className='container-radio  d-flex aling-items-enter my-0'>
                <div className='radio'>
                  <input
                    type='radio'
                    value='MobileView'
                    checked={viewLayout === 'MobileView'}
                    onChange={onChangeViewLayout}
                    name='ViewLayout'
                    id='ViewMobileLayout'
                  />
                  <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                  <label htmlFor='ViewMobileLayout' className='mb-0' />
                </div>
              </div>
              <div className='right my-0'>View Mobile Layout</div>
            </div>
          </div>
          {viewLayout === 'WebView' && (
            <div className='row pb-4 mt-4 '>
              <div className='col'>
                <label htmlFor='LogoOne' className='form-label lbl'>
                  Logo 1
                </label>
                <div className='row'>
                  <div className='col-12 col-lg-12 px-0'>
                    <select className='form-select' name='logo1' id='0' onChange={onLogoChange}>
                      <option key='logo1w' selected>
                        Select here
                      </option>
                      {logoList.map((logo: any) => (
                        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                        <option
                          key={logo._id}
                          selected={configData?.branding[0]?.id === logo._id}
                          value={logo._id}>
                          {logo.name}
                        </option>
                      ))}
                    </select>
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
                {isNext && configData?.branding[0]?.id === undefined && (
                  <ErrorComponent message={{ error: 'This field is required' }} />
                )}
              </div>
              <div className='col'>
                <label htmlFor='LogoTwo' className='form-label lbl'>
                  Logo 2
                </label>
                <div className='row'>
                  <div className='col-12 col-lg-12 px-0'>
                    <select className='form-select' name='logo2' id='1' onChange={onLogoChange}>
                      <option key='logo2w' selected>
                        Select here
                      </option>
                      {logoList.map((logo: any) => (
                        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                        <option
                          key={logo._id}
                          selected={configData?.branding[1]?.id === logo._id}
                          value={logo._id}>
                          {logo.name}
                        </option>
                      ))}
                    </select>
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
                {isNext && configData?.branding[1]?.id === undefined && (
                  <ErrorComponent message={{ error: 'This field is required' }} />
                )}
              </div>
              <div className='col'>
                <label htmlFor='LogoThree' className='form-label lbl'>
                  Logo 3
                </label>
                <div className='row'>
                  <div className='col-12 col-lg-12 px-0'>
                    <select className='form-select' name='logo3' id='2' onChange={onLogoChange}>
                      <option key='logo3w' selected>
                        Select here
                      </option>
                      {logoList.map((logo: any) => (
                        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                        <option
                          key={logo._id}
                          selected={configData?.branding[2]?.id === logo._id}
                          value={logo._id}>
                          {logo.name}
                        </option>
                      ))}
                    </select>
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
                {isNext && configData?.branding[2]?.id === undefined && (
                  <ErrorComponent message={{ error: 'This field is required' }} />
                )}
              </div>
              <div className='col'>
                <label htmlFor='LogoFour' className='form-label lbl'>
                  Logo 4
                </label>
                <div className='row'>
                  <div className='col-12 col-lg-12 px-0'>
                    <select className='form-select' name='logo4' id='3' onChange={onLogoChange}>
                      <option key='logo4w' selected>
                        Select here
                      </option>
                      {logoList.map((logo: any) => (
                        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                        <option
                          key={logo._id}
                          selected={configData?.branding[3]?.id === logo._id}
                          value={logo._id}>
                          {logo.name}
                        </option>
                      ))}
                    </select>
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
                {isNext && configData?.branding[3]?.id === undefined && (
                  <ErrorComponent message={{ error: 'This field is required' }} />
                )}
              </div>
            </div>
          )}
          {/* View Mobile Layout */}
          {viewLayout === 'MobileView' && (
            <div className='row pb-4 mt-4 '>
              <div>
                <div className='col-12 col-sm-4 col-md-4 col-lg-3'>
                  <label htmlFor='LogoOne' className='form-label lbl'>
                    Logo 1
                  </label>
                  <div className='row'>
                    <div className='col-6  col-sm-8 col-lg-6  px-0'>
                      <select className='form-select' name='logo1' id='0' onChange={onLogoChange}>
                        <option key='logo1m' selected>
                          Select here
                        </option>
                        {logoList.map((logo: any) => (
                          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                          <option
                            key={logo._id}
                            selected={configData?.branding[0]?.id === logo._id}
                            value={logo._id}>
                            {logo.name}
                          </option>
                        ))}
                      </select>
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
                      <select className='form-select' name='logo2' id='1' onChange={onLogoChange}>
                        <option selected key='logo2m'>
                          Select here
                        </option>
                        {logoList.map((logo: any) => (
                          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                          <option
                            key={logo._id}
                            selected={configData?.branding[1]?.id === logo._id}
                            value={logo._id}>
                            {logo.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-6 col-sm-4 col-lg-6 mt-2 pe-0 pe-xl-0'>
                      {configData?.branding[0]?.id && (
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
                      <select className='form-select' name='logo3' id='2' onChange={onLogoChange}>
                        <option key='logo3m' selected>
                          Select here
                        </option>
                        {logoList.map((logo: any) => (
                          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                          <option
                            key={logo._id}
                            selected={configData?.branding[2]?.id === logo._id}
                            value={logo._id}>
                            {logo.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-6 col-sm-4 col-lg-6 mt-2 pe-0 pe-xl-0'>
                      {configData?.branding[0]?.id && (
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
                      <select className='form-select' name='logo4' id='3' onChange={onLogoChange}>
                        <option key='logo4m' selected>
                          Select here
                        </option>
                        {logoList.map((logo: any) => (
                          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                          <option
                            key={logo._id}
                            selected={configData?.branding[3]?.id === logo._id}
                            value={logo._id}>
                            {logo.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-6 col-sm-4 col-lg-6 mt-2 pe-0 pe-xl-0'>
                      {configData?.branding[0]?.id && (
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
          )}
          {/* View Mobile Layout */}

          <div className='row pt-5 pb-5 tab-button justify-content-center justify-content-sm-end'>
            <div className='col-auto'>
              <button
                type='button'
                className='btn btn-radius btn-secondary-color-next px-4'
                onClick={() => goToStep(0)}>
                Cancel
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
