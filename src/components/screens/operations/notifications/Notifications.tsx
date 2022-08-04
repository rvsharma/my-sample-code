// import axios from 'axios';
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { NotificationsCell } from './Cells';
import * as actions from '../../../../redux/screens/common/CommonActions';
import AddEditNotification from './AddEditNotification';
import { FETCH_CONTENT_DATA_COUNT, FETCH_CONTENT_DATA } from '../../../../redux/services/Apis';
import Tabs from '../../../shared/sharedComponent/tabs/Tabs';
import NotificationMsgModal from './NotificationMsgModal';
import { NOTIFICATIONS_LBL } from '../../../shared/constant/AppConstants';
import { dateFormat, memberCommaSeperator } from '../../../shared/helperMethods/HelperMethod';

let pageInfo = { skip: 1, take: 10 };

export default function Notifications(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [onAddNew, setAddNew] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalEnvMembers, setTotalEnvMembers] = useState(0);
  const [commaSptMembers, setCommaSptMembers]: any = useState('');
  const [tableData, setTableData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [msgTitle, setMsgTitle] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgModal, showMsgModal] = useState(false);
  const dispatch = useDispatch();

  const onGetNotification = (): any => {
    setLoading(true);

    const queryString = `?type=operation&subtype=notification&page=${pageInfo?.skip}&limit=${pageInfo?.take}&query={"environment": "${selectedFilter}"}`;

    dispatch(
      actions.createGetDataRequest(
        queryString,
        (res: any) => {
          if (res?.isSuccess) {
            setTableData(res?.data);
            setLoading(false);
          }
        },
        FETCH_CONTENT_DATA
      )
    );

    const countQueryStr = `?type=operation&subtype=notification&query={"environment": "${selectedFilter}"}`;

    dispatch(
      actions.createGetDataCountRequest(
        countQueryStr,
        (res: any) => {
          if (res?.isSuccess) {
            setTotalCount(res?.data?.totalRecords);
          }
        },
        FETCH_CONTENT_DATA_COUNT
      )
    );
  };

  useEffect(() => {
    onGetNotification();

    return () => {
      setLoading(false);
      setTotalCount(0);
      setTableData([]);
    };
  }, [selectedFilter]);

  const onDataStateChange = (data: any): void => {
    pageInfo = { skip: data?.skip, take: data?.take };
    onGetNotification();
  };

  const addNew = (dataItem: any): any => {
    const notificationData = {
      type: 'operation',
      subtype: 'notification',
      data: dataItem,
    };

    dispatch(
      actions.createAddNewDataRequest(null, notificationData, (res: any) => {
        if (res?.isSuccess) {
          setTableData([]);
          setAddNew(false);
          setMsgTitle('Success');
          setMsgText('Notification has been added');
          onGetNotification();
        } else {
          setMsgTitle('Failed');
          setMsgText('Something went wrong while adding notification');
        }
        showMsgModal(true);
      })
    );
  };

  const notificationCategory = (category: any): React.ReactNode => {
    let categoryName = category;

    if (categoryName === 'gen') {
      categoryName = 'General';
    }

    if (categoryName === 'healthInfo') {
      categoryName = 'Health Info';
    }

    if (categoryName === 'myHealthPlan') {
      categoryName = 'Health Plan';
    }

    return <td>{categoryName}</td>;
  };

  const openModalHandler = (): void => {
    setAddNew(true);
    const countEnvUsers = `?type=operation&subtype=user-management&environment=${selectedFilter}`;

    dispatch(
      actions.createGetDataCountRequest(
        countEnvUsers,
        (res: any) => {
          if (res?.isSuccess) {
            setCommaSptMembers(memberCommaSeperator(res?.data?.totalRecords));
            setTotalEnvMembers(res?.data?.totalRecords);
          } else {
            setCommaSptMembers(0);
            setTotalEnvMembers(0);
            setAddNew(false);
          }
        },
        FETCH_CONTENT_DATA_COUNT
      )
    );
  };

  const environmentName = (environment: any): void => {
    return environment?.charAt(0).toUpperCase() + environment?.slice(1);
  };

  return (
    <>
      <div className='col-12 member-signup-container shadow mt-0'>
        <div className='row'>
          <div className='col-12 member-signup-text'>{NOTIFICATIONS_LBL}</div>
        </div>

        <Tabs
          data={[
            { title: 'All', value: 'all' },
            { title: 'Production', value: 'prod' },
            { title: 'Stage', value: 'stage' },
            { title: 'QA', value: 'qa' },
            { title: 'Dev', value: 'dev' },
          ]}
          active={selectedFilter}
          onSelect={(data: any) => setSelectedFilter(data)}
        />

        <div className='row pb-4 aling-items-center'>
          <div className='col all-Button text-end'>
            <button
              type='button'
              className='btn btn-blue btn-radius text-white fw-normal px-3'
              onClick={openModalHandler}>
              Add New
            </button>
          </div>
        </div>

        <GridView
          pagination
          dataState={pageInfo}
          // onItemChange={(data: any) => itemChange(data)}
          total={totalCount}
          loading={loading}
          data={tableData}
          onDataStateChange={onDataStateChange}>
          <TableCells field='title' title='Text' type='text' />
          <TableCells
            field='environment'
            title='Environment'
            type='text'
            cell={(props: any) => <td> {environmentName(props?.dataItem?.environment)}</td>}
          />
          <TableCells
            field='members'
            title='Members'
            type='text'
            cell={(props: any) => <td> {memberCommaSeperator(props?.dataItem?.members)}</td>}
          />
          <TableCells
            field='date'
            title='Date'
            type='text'
            cell={(props: any) => <td>{dateFormat(new Date(props?.dataItem?.date))}</td>}
          />
          <TableCells
            field='category'
            title='Category'
            type='text'
            cell={(props: any) => notificationCategory(props?.dataItem?.category)}
          />
          <TableCells
            field='actions'
            title='Action'
            cell={(props: any) => NotificationsCell({ dataItem: props?.dataItem })}
          />
        </GridView>
      </div>

      {onAddNew && totalEnvMembers && (
        <AddEditNotification
          onSave={addNew}
          onClose={() => setAddNew(false)}
          envMembers={totalEnvMembers}
          commaMembers={commaSptMembers}
        />
      )}

      {msgModal && (
        <NotificationMsgModal
          userTitle={msgTitle}
          userMessage={msgText}
          onOK={() => showMsgModal(false)}
        />
      )}
    </>
  );
}
