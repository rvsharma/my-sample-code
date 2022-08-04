import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { ErrorAndAlertsCell } from './Cells';
import ViewErrorDetails from './ViewErrorDetails';
import * as actions from '../../../../redux/screens/common/CommonActions';
import { ERRORS_ALERTS_LBL } from '../../../shared/constant/AppConstants';
import {
  FETCH_CONTENT_DATA_COUNT,
  LIST_ERROR_ALERTS,
  RESOLVE_ERROR_ALERTS,
} from '../../../../redux/services/Apis';
import { dateFormat } from '../../../shared/helperMethods/HelperMethod';
import MessageModal from '../../../shared/sharedComponent/messageModal/MessageModal';

let pageInfo = { skip: 1, take: 10 };

export default function ErrorAndAlerts(): JSX.Element {
  const [rowDataItem, setRowData] = useState({});
  const [tableData, setTableData]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const [errorDetailsModal, showErrorDetailsModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageModal, showMessageModal] = useState(false);
  const dispatch = useDispatch();

  const onGetErrorAndAlerts = (): any => {
    setLoading(true);

    const queryString = `?page=${pageInfo.skip}&limit=${pageInfo.take}`;

    dispatch(
      actions.createGetDataRequest(
        queryString,
        (res: any) => {
          if (res?.isSuccess) {
            // console.log('test');
            setTableData(res?.data);
            setLoading(false);
          }
        },
        LIST_ERROR_ALERTS
      )
    );

    const countQueryStr = '?type=operation&subtype=error-alert';
    dispatch(
      actions.createGetDataCountRequest(
        countQueryStr,
        (res: any) => {
          if (res?.isSuccess) {
            // console.log('test');
            setTotalCount(res?.data?.totalRecords);
          }
        },
        FETCH_CONTENT_DATA_COUNT
      )
    );
  };

  useEffect(() => {
    onGetErrorAndAlerts();

    return () => {
      pageInfo = { skip: 1, take: 10 };
      setRowData({});
      setTableData({});
      setLoading(false);
      setTotalCount(false);
    };
  }, []);

  const onViewDetails = (dataItem: any): void => {
    setRowData(dataItem);
    showErrorDetailsModal(true);
    // console.log('Edited', dataItem);
  };

  const onMarkResolved = (dataItem: any): void => {
    // console.log('Deleted', dataItem);

    const markResolvedData = {
      type: dataItem?.type,
      recordId: dataItem?.recordId,
    };

    dispatch(
      actions.createUpdateDataRequest(RESOLVE_ERROR_ALERTS, markResolvedData, (res: any) => {
        if (res?.isSuccess) {
          setMessageTitle('Error And Alerts Message ');
          setMessageText('Error And Alerts has been updated successfully');
          showMessageModal(true);
          onGetErrorAndAlerts();
        } else {
          setMessageTitle('Error And Alerts Message ');
          setMessageText(res?.data?.message);
          showMessageModal(true);
        }
      })
    );
  };

  const onDataStateChange = (data: any): void => {
    pageInfo = { skip: data?.skip, take: data?.take };
    onGetErrorAndAlerts();
  };

  const closeErrorDetailsHandler = (): void => {
    setRowData({});
    showErrorDetailsModal(false);
  };

  return (
    <>
      {' '}
      <div className='col-12 member-signup-container shadow'>
        <div className='row'>
          <div className='col-12 member-signup-text'>{ERRORS_ALERTS_LBL}</div>
        </div>
        <GridView
          pagination
          dataState={pageInfo}
          total={totalCount}
          loading={loading}
          data={tableData}
          onDataStateChange={onDataStateChange}>
          <TableCells field='title' title='Title' type='text' />
          <TableCells
            field='date'
            title='Date'
            type='text'
            cell={(props: any) => <td>{dateFormat(new Date(props?.dataItem?.date))}</td>}
          />
          <TableCells field='priority' title='Priority' type='text' />
          <TableCells
            field='actions'
            title='Action'
            cell={(props: any) =>
              ErrorAndAlertsCell({ dataItem: props?.dataItem, onViewDetails, onMarkResolved })
            }
          />
        </GridView>
      </div>
      {errorDetailsModal && (
        <ViewErrorDetails data={rowDataItem} onClose={closeErrorDetailsHandler} />
      )}
      {messageModal && messageTitle !== '' && (
        <MessageModal
          title={messageTitle}
          text={messageText}
          onOK={() => showMessageModal(false)}
        />
      )}
    </>
  );
}
