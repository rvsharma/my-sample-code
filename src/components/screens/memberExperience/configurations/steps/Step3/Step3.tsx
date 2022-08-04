import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../../../shared/sharedComponent/tableGrid/TableCells';
import { NumericBoxCell, Step3ActionCell, TextBoxCell } from '../../Cells';
import Stepper from '../../Stepper';
import AccountSettings from './Configurations/AccountSetting';
import CostEstimator from './Configurations/CostEstimator';
import Dashboard from './Configurations/Dashboard';
import DoctorsAndServices from './Configurations/DoctorsAndServices';
import MyHealhPlan from './Configurations/MyHealthPlan';
import OutOfPocket from './Configurations/OutOfPocket';
import * as actions from '../../../../../../redux/screens/content/ContentAction';
import { MODULE_NAMES } from '../../../../../shared/constant/AppConstants';

interface ownProps {
  goToStep: any;
  configData: any;
  setConfigData: Function;
}

export default function Step3(ownProps: ownProps): JSX.Element {
  const { configData, setConfigData, goToStep } = ownProps;
  const [configStep, setStep] = useState(MODULE_NAMES.MODULES);
  const dispatch = useDispatch();
  const goToSubStep = (module: any): any => {
    setStep(module);
  };
  const onEnableDisable = (dataItem: any): any => {
    console.log('on deploy data', dataItem);
  };

  const onConfigure = (dataItem: any): any => {
    setStep(dataItem.module);
  };

  const isDuplicateWeight = (value: any): any => {
    return configData.modules.some((x: any) => x.weight === value);
  };

  /* eslint-disable no-param-reassign */
  const onDataChange = (e: any, dataItem: any): any => {
    if (
      e.target.name === 'weight' &&
      (e.target.value < 1 || e.target.value > 100 || isDuplicateWeight(e.target.value))
    ) {
      return false;
    }
    dataItem[e.target.name] = e.target.value;
    const moduleIndex = configData.modules.findIndex((x: any) => x.module === dataItem.module);
    configData.modules[moduleIndex] = dataItem;
    setConfigData({ ...configData });
    return true;
    // setPageData([...pageData]);
  };
  /* eslint-disable no-param-reassign */

  const changeConfigData = (data: any): void => {
    setConfigData({ ...data });
  };

  const createObj = (data: any): any => {
    const obj = {} as any;
    data.forEach((d: any) => {
      obj[d.name as keyof typeof obj] = {
        enabled: true,
        text: d.name,
        displayValue: d.displayValue || d.name,
      };
    });
    return obj;
  };
  const createModuleArray = (data: any): any => {
    const moduleArray: any[] = [];

    data.forEach((d: any) => {
      if (!d.isCustom) {
        moduleArray.push({
          module: d.name,
          weight: d.weight,
          enabled: d.defaultEnabled,
          title: d.displayValue,
          isCustom: d.isCustom,
          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
          contentId: d._id,
          moduleData: {
            branding: [],
            // section: d.sections.map((s: any, index: any) => {
            //   return { index, text: s.name, enabled: false };
            // }),
            SectionName: createObj(d.sections),
            addressableSpaces: d.sections.map((s: any) => {
              return {
                location: s.name,
                name: s.displayValue || s.name,
                items: s.items.map((i: any) => {
                  return { type: i.type, id: i.itemId, text: i.itemDetails.text };
                }),
              };
            }),
            ...(d.name === MODULE_NAMES.DOCTOR_SERVICES && {
              enableDisable: {
                doctor: {
                  enableDisableFeature: true,
                  text: 'doctor',
                },
                hospital: {
                  enableDisableFeature: false,
                  text: 'doctor',
                },
                services: {
                  enableDisableFeature: true,
                  text: 'doctor',
                },
                urgentCare: {
                  enableDisableFeature: true,
                  text: 'doctor',
                },
              },
            }),
          },
        });
      }
    });
    return moduleArray;
  };

  const onGetPageData = (): any => {
    // setLoading(true);
    const queryString = `?type=member-experience&subtype=page&page=1&limit=20`;

    dispatch(
      actions.createGetDataRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          const modData = createModuleArray(res?.data);
          configData.modules = modData;
          setConfigData(configData);
          // setLoading(false);
        }
      })
    );
  };

  useEffect(() => {
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    if (!configData._id && configData.modules.length === 0) {
      onGetPageData();
    }
  }, []);

  return (
    <>
      {configStep === MODULE_NAMES.MODULES && (
        <>
          <Stepper isEdit={configData._id} step={3} />
          <div className='row mt-3'>
            <div className='col-12 member-signup-container shadow py-4 mt-0'>
              {/* <div className='row pb-4 aling-items-center'>
                <div className='col all-Button text-end'>
                  <button
                    type='button'
                    className='btn btn-blue btn-radius text-white fw-normal px-3'
                    onClick={() => goToSubStep(1)}>
                    Add Module
                  </button>
                </div>
              </div> */}
              <GridView data={configData.modules}>
                <TableCells field='module' type='text' title='Module' />
                <TableCells
                  name='displayLabel'
                  field='title'
                  title='Display Label'
                  cell={(props: any) => TextBoxCell({ props, onDataChange })}
                />
                <TableCells
                  name='weight'
                  field='weight'
                  title='Weight'
                  min={1}
                  max={100}
                  cell={(props: any) => NumericBoxCell({ props, onDataChange })}
                />
                <TableCells
                  field='action'
                  title='Action'
                  cell={(props: any) =>
                    Step3ActionCell({ dataItem: props?.dataItem, onEnableDisable, onConfigure })
                  }
                />
              </GridView>
              <div className='row pt-5 pb-5 tab-button justify-content-center justify-content-sm-end'>
                <div className='col-auto'>
                  <button
                    type='button'
                    className='btn btn-radius btn-secondary-color-next px-4'
                    onClick={() => goToStep(2)}>
                    Back
                  </button>
                </div>
                <div className='col-auto'>
                  <button
                    type='button'
                    className='btn btn-blue-next text-white btn-radius'
                    onClick={() => goToStep(4)}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {configStep === MODULE_NAMES.DASHBOARD && (
        <Dashboard
          configData={configData}
          goToSubStep={(step: number) => goToSubStep(step)}
          setConfigData={changeConfigData}
        />
      )}
      {configStep === MODULE_NAMES.MYHEALTH_PLAN && (
        <MyHealhPlan
          configData={configData}
          setConfigData={changeConfigData}
          goToSubStep={(step: number) => goToSubStep(step)}
        />
      )}
      {configStep === MODULE_NAMES.DOCTOR_SERVICES && (
        <DoctorsAndServices
          configData={configData}
          setConfigData={changeConfigData}
          goToSubStep={(step: number) => goToSubStep(step)}
        />
      )}
      {configStep === MODULE_NAMES.OUT_OF_POCKET && (
        <OutOfPocket
          configData={configData}
          setConfigData={changeConfigData}
          goToSubStep={(step: number) => goToSubStep(step)}
        />
      )}
      {configStep === MODULE_NAMES.COST_ESTIMATOR && (
        <CostEstimator
          configData={configData}
          setConfigData={changeConfigData}
          goToSubStep={(step: number) => goToSubStep(step)}
        />
      )}
      {configStep === MODULE_NAMES.SETTINGS && (
        <AccountSettings
          goToStep={goToStep}
          configData={configData}
          setConfigData={changeConfigData}
          goToSubStep={(step: number) => goToSubStep(step)}
        />
      )}
    </>
  );
}
