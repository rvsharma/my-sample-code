import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CONFIG_ENV_LBL } from '../../../shared/constant/AppConstants';
import AdminSearch from '../../../shared/sharedComponent/adminSearch/AdminSearch';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import Tabs from '../../../shared/sharedComponent/tabs/Tabs';
import DeployToModal from './DeployToModal';
import * as actions from '../../../../redux/screens/common/CommonActions';
import { MemberConfigCell, EffectiveCell, EnvCell, NameTagCell, ParameterCell } from './Cells';
import {
  FETCH_CONFIG,
  FETCH_CONTENT_DATA_COUNT,
  PROMOTE_CONFIG,
} from '../../../../redux/services/Apis';
import MemberConfigurationsMsgModal from './MemberConfigurationsMsgModal';

let pageInfo = { skip: 1, take: 10 };

export default function MemberConfiguratios(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [rowDataItem, setRowData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('name');
  const [configurationsMsg, setConfigurationsMsg] = useState('');
  const [configurationsMsgModal, showConfigurationsMsgModal] = useState(false);
  // const [configFilters, setConfigFilters] = useState({});
  const dispatch = useDispatch();

  const onGetConfigurationsData = (additionaParam: any): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryString = `?environment=${selectedFilter}&page=${pageInfo?.skip}&limit=${
      pageInfo?.take
    }&name=${additionaParam}&sort=${JSON.stringify(sortData)}`;

    dispatch(
      actions.createGetDataRequest(
        queryString,
        (res: any) => {
          // console.log(res?.data);
          if (res?.isSuccess) {
            setTableData(res?.data);
            setLoading(false);
          }
        },
        FETCH_CONFIG
      )
    );

    const countQueryStr = `?type=member-experience&subtype=configuration&environment=${selectedFilter}&name=${additionaParam}`;
    dispatch(
      actions.createGetDataCountRequest(
        countQueryStr,
        (res: any) => {
          if (res?.isSuccess) {
            // console.log('test');
            // console.log('Total Records ', res?.data?.length);
            setTotalCount(res?.data?.totalRecords);
          }
        },
        FETCH_CONTENT_DATA_COUNT
      )
    );
  };

  // const onGetConfigFiltersData = (): any => {
  //   setLoading(true);
  //   const queryString = `?query={"filterContent":["Parameters"]}`;

  //   dispatch(
  //     actions.createGetConfigFiltersDataRequest(queryString, (res: any) => {
  //       if (res?.isSuccess) {
  //         setConfigFilters(res?.data[0]?.parameterFilterData[0]);
  //         console.log(configFilters);
  //       }
  //     })
  //   );
  // };

  // useEffect(() => {
  //   onGetConfigFiltersData();
  // }, []);

  useEffect(() => {
    onGetConfigurationsData(searchText || ``);
  }, [selectedFilter, sortColumn, sortOrder]);

  const onDataStateChange = (data: any): void => {
    pageInfo = { skip: data?.skip, take: data?.take };
    onGetConfigurationsData(searchText || ``);
  };

  const deployModalHandler = (dataItem: any): any => {
    setRowData({
      ...dataItem,
      environment: ['Admin', ...dataItem?.environment],
    });
    setShowDeployModal(true);
  };

  const onDeploy = (deployData: any): any => {
    // console.log('on deploy data', deployData);

    dispatch(
      actions.createAddNewDataRequest(PROMOTE_CONFIG, deployData, (res: any) => {
        if (res?.isSuccess) {
          // console.log(res?.data);
          setShowDeployModal(false);
          setConfigurationsMsg('Environment has been updated successfully!');
          showConfigurationsMsgModal(true);
          onGetConfigurationsData(searchText || ``);
        } else {
          setShowDeployModal(false);
          setConfigurationsMsg(res?.data?.message);
          showConfigurationsMsgModal(true);
        }
      })
    );
  };

  const onSearchConfig = (text: string): void => {
    setSearchText(text);
    pageInfo = { skip: 1, take: 10 };

    if (text === '') {
      onGetConfigurationsData(``);
    } else {
      onGetConfigurationsData(text);
    }
  };

  // const onChangeTab = (tab: string): void => {
  //   pageInfo = { skip: 1, take: 10 };
  //   setSelectedFilter(tab);
  // };
  const onsortChange = (col: any): void => {
    setSortColumn(col.field);
    setSortOrder(sortOrder === 1 ? -1 : 1);
  };
  return (
    <>
      <div className='col-12 member-signup-container shadow'>
        <div className='row'>
          <div className='col-12 member-signup-text'>{CONFIG_ENV_LBL}</div>
        </div>
        <Tabs
          data={[
            { title: 'All', value: 'all' },
            { title: 'Production', value: 'prod' },
            { title: 'Stage', value: 'stage' },
            { title: 'Test', value: 'test' },
            { title: 'Dev', value: 'dev' },
            { title: 'None', value: 'admin' },
          ]}
          active={selectedFilter}
          onSelect={(data: any) => setSelectedFilter(data)}
        />

        <div className='row pb-4 aling-items-center'>
          <AdminSearch onSearch={(t: string) => onSearchConfig(t)} />
        </div>

        <GridView
          pagination
          dataState={pageInfo}
          total={totalCount}
          loading={loading}
          data={tableData}
          sort={{ sortBy: sortColumn, order: sortOrder }}
          onsortChange={onsortChange}
          onDataStateChange={onDataStateChange}>
          <TableCells
            field='name'
            type='text'
            title='Name'
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
            type='text'
            cell={(props: any) => ParameterCell(props)}
            sortable
          />
          <TableCells
            field='ipa'
            title='IPA'
            type='text'
            cell={(props: any) => ParameterCell(props)}
            sortable
          />
          <TableCells
            field='employer'
            title='Employer'
            type='text'
            cell={(props: any) => ParameterCell(props)}
            sortable
          />
          <TableCells
            field='isPreffective'
            title='Effective / Pre-effective'
            type='text'
            cell={(props: any) => EffectiveCell({ dataItem: props?.dataItem })}
            sortable
          />
          <TableCells
            field='environments'
            title='Environments'
            cell={(props: any) => EnvCell({ dataItem: props?.dataItem })}
          />
          <TableCells
            field='action'
            title='Action'
            cell={(props: any) =>
              MemberConfigCell({ dataItem: props?.dataItem, deployModalHandler })
            }
          />
        </GridView>
      </div>

      {configurationsMsgModal && configurationsMsg !== '' && (
        <MemberConfigurationsMsgModal
          modalHeading='Member Configurations Message'
          modalMessage={configurationsMsg}
          onOK={() => showConfigurationsMsgModal(false)}
        />
      )}

      {showDeployModal && (
        <DeployToModal
          data={rowDataItem}
          show={showDeployModal}
          onClose={() => setShowDeployModal(false)}
          onDeploy={onDeploy}
        />
      )}
    </>
  );
}
