/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CONFIG_ENV_LBL, MODULE_NAMES } from '../../../shared/constant/AppConstants';
import AdminSearch from '../../../shared/sharedComponent/adminSearch/AdminSearch';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import Tabs from '../../../shared/sharedComponent/tabs/Tabs';
import * as actions from '../../../../redux/screens/memberExperience/configurations/ConfigurationsActions';
import newConfigData from './configuration.json';

import {
  EffectiveCell,
  EnvCell,
  MemberConfigCell,
  MemberConfigStatusCell,
  NameTagCell,
  ParameterCell,
} from './Cells';
import Step1 from './steps/Step1/Step1';
import Step2 from './steps/Step2/Step2';
import Step3 from './steps/Step3/Step3';
import Step4 from './steps/Step4/Step4';
import ComfirmationModal from '../../../shared/sharedComponent/confirmationModal/ConfirmationModal';
import { getGeneral } from '../../../shared/helperMethods/HelperMethod';

const initialDataState = {
  skip: 1,
  take: 10,
};

export default function Configurations(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [configStep, setStep] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const [dataState, setPageLimit] = useState(initialDataState);
  const [configFilters, setConfigFilters] = useState({});
  const [configData, setConfigData] = useState(newConfigData);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [message, setMessage] = useState('');
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('name');
  const dispatch = useDispatch();

  // const brandingTableData: any = useSelector((state: any) => state?.contentData);

  // const tableData = brandingTableData?.data || [];

  const onGetConfigurationsData = (additionaPram: any): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryString = `?environment=${selectedFilter}&page=${dataState?.skip}&limit=${
      dataState?.take
    }${additionaPram}&sort=${JSON.stringify(sortData)}`;

    dispatch(
      actions.createGetConfigurationDataRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          setTableData(res?.data);
          setLoading(false);
        }
      })
    );
    const countQueryStr = `?environment=${selectedFilter}&limit=${100}${additionaPram}`;
    dispatch(
      actions.createGetConfigurationDataCountRequest(countQueryStr, (res: any) => {
        if (res?.isSuccess) {
          setTotalCount(res?.data?.length);
          setAllData(res?.data);
        }
      })
    );
  };

  const onGetConfigFiltersData = (): any => {
    setLoading(true);
    const queryString = `?query={"filterContent":["Parameters"]}`;

    dispatch(
      actions.createGetConfigFiltersDataRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          setConfigFilters(res?.data[0]?.parameterFilterData[0]);
          console.log(configFilters);
        }
      })
    );
  };

  useEffect(() => {
    onGetConfigFiltersData();
  }, []);

  useEffect(() => {
    onGetConfigurationsData(``);
  }, [selectedFilter, configStep, sortColumn, sortOrder]);

  const onDisable = (dataItem: any): any => {
    console.log(dataItem);
    setShowInfoModal(true);
  };

  const getAddressableSpace = (sec: any, add: any): any => {
    add.forEach((ad: any) => {
      ad.name = sec[ad.location]?.displayValue || ad.location; // eslint-disable-line no-param-reassign
    });
    return add;
  };

  const removeId = (add: any): any => {
    add.forEach((ad: any) => {
      delete ad._id; // eslint-disable-line no-param-reassign
      ad.items.forEach((i: any) => {
        delete i._id; // eslint-disable-line no-param-reassign
      });
    });
    return add;
  };

  const onEdit = (dataItem: any): any => {
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    const queryString = `?id=${dataItem._id}`;
    dispatch(
      actions.createGetConfigDetailRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          setConfigFilters(res?.data);
          dataItem.modules.forEach((m: any) => {
            /* eslint-disable no-param-reassign */
            m.weight = m.weight.toString();
            const mm = res.data[m.module];
            if (mm) {
              m.moduleData = {
                SectionName: mm.sections,
                branding: mm.branding || [],
                addressableSpaces: getAddressableSpace(mm.sections, mm.addressableSpaces),
                ...(m.module === MODULE_NAMES.DOCTOR_SERVICES && {
                  enableDisable: mm.enableDisable,
                }),
              };
            } else {
              setMessage(
                'Something went wrong. Data may be corrupted or deleted. Please contact admin.'
              );
              setShowFailModal(true);
            }
            /* eslint-disable no-param-reassign */
          });
          console.log(dataItem);
          setConfigData(dataItem);
          setStep(1);
        }
      })
    );
  };

  const onClone = (dataItem: any): any => {
    const queryString = `?id=${dataItem._id}`;
    dispatch(
      actions.createGetConfigDetailRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          setConfigFilters(res?.data);
          dataItem.modules.forEach((m: any) => {
            /* eslint-disable no-param-reassign */
            delete m._id;
            m.weight = m.weight.toString();
            const mm = res.data[m.module];
            m.moduleData = {
              SectionName: mm.sections,
              branding: mm.branding || [],
              addressableSpaces: removeId(mm.addressableSpaces),
              ...(m.module === MODULE_NAMES.DOCTOR_SERVICES && {
                enableDisable: mm.enableDisable,
              }),
            };
            /* eslint-disable no-param-reassign */
          });
          delete dataItem._id;

          dataItem.general = getGeneral(dataItem.general, {});
          dataItem.branding.forEach((b: any) => {
            b.type = 'test';
          });
          delete dataItem.environment;
          delete dataItem.type;
          delete dataItem.__v;
          delete dataItem.createdAt;
          delete dataItem.isDeleted;
          delete dataItem.status;
          delete dataItem.updatedAt;

          dispatch(
            actions.createAddConfigurationDataRequest(dataItem, (result: any) => {
              if (result?.isSuccess) {
                setMessage('Config Cloned Successfully.');
                setShowSuccessModal(true);
              } else {
                setMessage(result?.message);
                setShowFailModal(true);
              }
            })
          );
        }
      })
    );
  };

  const onCloseSuccessModal = (): void => {
    setShowSuccessModal(false);
    onGetConfigurationsData(``);
  };

  const onAddNew = (): any => {
    setConfigData(newConfigData);
    setStep(1);
  };

  const goToStep = (step: number): any => {
    setStep(step);
  };

  const onDataStateChange = (data: any): void => {
    setPageLimit(data);
    onGetConfigurationsData(``);
  };

  const onSearchConfig = (text: string): void => {
    if (text === '') {
      onGetConfigurationsData(``);
    } else {
      onGetConfigurationsData(`&name=${text}`);
    }
  };

  const changeConfigData = (data: any): void => {
    setConfigData({ ...data });
  };

  const onChangeTab = (tab: string): void => {
    initialDataState.skip = 1;
    setPageLimit(initialDataState);
    setSelectedFilter(tab);
  };

  const onsortChange = (col: any): void => {
    setSortColumn(col.field);
    setSortOrder(sortOrder === 1 ? -1 : 1);
  };

  return (
    <>
      {configStep === 0 && (
        <div className='col-12 member-signup-container shadow'>
          <div className='row'>
            <div className='col-12 member-signup-text'>{CONFIG_ENV_LBL}</div>
          </div>

          <Tabs
            data={[
              { title: 'All', value: 'all' },
              { title: 'Production', value: 'prod' },
              { title: 'Stage', value: 'stage' },
              { title: 'QA', value: 'test' },
              { title: 'Dev', value: 'dev' },
            ]}
            active={selectedFilter}
            onSelect={(data: any) => onChangeTab(data)}
          />

          <div className='row pb-4 aling-items-center'>
            <AdminSearch onSearch={(t: string) => onSearchConfig(t)} />
            <div className='col all-Button text-end'>
              <button
                type='button'
                className='btn btn-blue btn-radius text-white fw-normal px-3'
                onClick={onAddNew}>
                Add New
              </button>
            </div>
          </div>
          <GridView
            pagination
            dataState={dataState}
            total={totalCount}
            loading={loading}
            data={tableData}
            sort={{ sortBy: sortColumn, order: sortOrder }}
            onsortChange={onsortChange}
            onDataStateChange={onDataStateChange}>
            <TableCells
              field='name'
              type='text'
              title='Name - Tag'
              cell={(props: any) => NameTagCell({ dataItem: props?.dataItem })}
              sortable
            />
            <TableCells
              field='product'
              title='Product'
              cell={(props: any) => ParameterCell(props)}
              sortable
            />
            <TableCells
              field='payor'
              title='Payor'
              cell={(props: any) => ParameterCell(props)}
              sortable
            />
            <TableCells
              field='plan'
              title='Plan'
              cell={(props: any) => ParameterCell(props)}
              sortable
            />
            <TableCells
              field='ipa'
              title='IPA'
              width='100px'
              cell={(props: any) => ParameterCell(props)}
              sortable
            />
            <TableCells
              field='employer'
              title='Employer'
              cell={(props: any) => ParameterCell(props)}
              sortable
            />
            <TableCells
              field='isPreffective'
              title='Effective/Pre-effective'
              cell={(props: any) => EffectiveCell({ dataItem: props?.dataItem })}
              sortable
            />
            <TableCells
              field='environments'
              title='Environments'
              cell={(props: any) => EnvCell({ dataItem: props?.dataItem })}
            />
            <TableCells
              field='status'
              title='Status'
              cell={(props: any) => MemberConfigStatusCell({ dataItem: props?.dataItem })}
              sortable
            />
            <TableCells
              field='action'
              title='Action'
              cell={(props: any) =>
                MemberConfigCell({ dataItem: props?.dataItem, onDisable, onClone, onEdit })
              }
            />
          </GridView>
        </div>
      )}
      {configData && configStep === 1 && (
        <Step1
          configData={configData}
          setConfigData={changeConfigData}
          goToStep={(step: number) => goToStep(step)}
        />
      )}

      {configData && configStep === 2 && (
        <Step2
          configData={configData}
          setConfigData={changeConfigData}
          goToStep={(step: number) => goToStep(step)}
        />
      )}
      {configData && configStep === 3 && (
        <Step3
          configData={configData}
          setConfigData={changeConfigData}
          goToStep={(step: number) => goToStep(step)}
        />
      )}
      {configData && configStep === 4 && (
        <Step4
          configData={configData}
          goToStep={(step: number) => goToStep(step)}
          allData={allData}
        />
      )}
      {showSuccessModal && (
        <ComfirmationModal
          title='Success'
          message={message}
          closeModal={onCloseSuccessModal}
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
      {showInfoModal && (
        <ComfirmationModal
          title='Information'
          message='Development in progress.'
          closeModal={() => setShowInfoModal(false)}
          showModal={showInfoModal}
        />
      )}
    </>
  );
}
