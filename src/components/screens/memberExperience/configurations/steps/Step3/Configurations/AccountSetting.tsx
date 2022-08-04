import React from 'react';
import { MODULE_NAMES } from '../../../../../../shared/constant/AppConstants';
import HOCTable from '../../../../../../shared/sharedComponent/dragableGrid/HOC';
import Sections from './Sections';

interface ownProps {
  goToSubStep: any;
  goToStep: any;
  configData: any;
  setConfigData: Function;
}

export default function AccountSettings({
  goToSubStep,
  goToStep,
  configData,
  setConfigData,
}: ownProps): JSX.Element {
  const addressableSpace = configData.modules.find((x: any) => x.module === MODULE_NAMES.SETTINGS)
    ?.moduleData?.addressableSpaces;
  const sections = configData.modules.find((x: any) => x.module === MODULE_NAMES.DASHBOARD)
    ?.moduleData?.SectionName;
  const changeConfigData = (data: any): void => {
    const moduleIndex = configData.modules.findIndex((x: any) => x.module === data.module);
    configData.modules[moduleIndex] = data; // eslint-disable-line no-param-reassign
    setConfigData({ ...configData });
  };
  const getDisplayValue = (key: any): any => {
    return sections[key]?.displayValue;
  };
  return (
    <>
      <div className='row member-signup-container shadow py-2 mt-0'>
        <div className='col-12 py-2 px-3 fw-bold'>
          New Configuration <span className='px-1'>{'>'}</span> Step 3{' '}
          <span className='px-1'>{'>'}</span> Configure Module <span className='px-1'>{'>'}</span>{' '}
          Account Settings
        </div>
      </div>
      <div className='row member-signup-container shadow py-2 mt-4'>
        <div className='row member-signup-text pt-3 mb-4 lh-1'>
          <div className='col-12'>Sections</div>
        </div>

        <Sections
          data={configData}
          module={MODULE_NAMES.SETTINGS}
          onModuleChange={changeConfigData}
        />
      </div>
      <div className='row member-signup-text mt-4 mb-4 lh-1'>
        <div className='col-12 px-0'>Addressable Spaces</div>
      </div>
      {addressableSpace &&
        addressableSpace.map((a: any, index: number) => (
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
                      <h2 className='mb-0 col'>{getDisplayValue(a.name) || a.name}</h2>
                      <div className='item-count'>({a.items.length} items)</div>
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
                        <HOCTable
                          nodData={a.items}
                          configData={configData}
                          module={MODULE_NAMES.SETTINGS}
                          onModuleChange={changeConfigData}
                          parentIndex={index}
                        />
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
            onClick={() => goToSubStep(MODULE_NAMES.MODULES)}>
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
    </>
  );
}
