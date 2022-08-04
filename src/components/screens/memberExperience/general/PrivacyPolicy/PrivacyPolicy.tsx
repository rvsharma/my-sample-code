/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ADDED_PRIVACY_POLICY,
  ADD_NEW_LBL,
  PRIVACY_POLICY_HEADING,
  UPDATED_PRIVACY_POLICY,
} from '../../../../shared/constant/AppConstants';
import { toPascalCase } from '../../../../shared/helperMethods/HelperMethod';
import GridView from '../../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../../shared/sharedComponent/tableGrid/TableCells';
import AddNewPrivacyPolicy from './AddNewPrivacyPolicy';
import { PrivacyPolicyCell } from './Cells';
import * as actions from '../../../../../redux/screens/common/CommonActions';
import GeneralModal from '../GeneralModal';
import GeneralConfirmModal from '../GeneralConfirmModal';
import { AFFECTED_COUNT } from '../../../../../redux/services/Apis';

const initialDataState = {
  skip: 1,
  take: 10,
};

export default function PrivacyPolicy(): JSX.Element {
  const [rowDataItem, setRowData] = useState({});
  const [onAddNew, setAddNew] = useState(false);
  const [onRowEdit, setRowEdit] = useState(false);
  // const [onDeleteRow, setOnDelete] = useState(false);
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalModalMsg, setGeneralModalMsg] = useState('');
  const [showGeneralMsgModal, setShowGeneralMsgModal] = useState(false);
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('name');
  const [confirmationHeading, setConfirmationHeading] = useState('');
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const [confirmationModal, showConfirmationModal] = useState(false);
  const dispatch = useDispatch();

  const onGetPrivacyPolicy = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryParams = `member-experience&subtype=privacy-policy&sort=${JSON.stringify(sortData)}`;
    dispatch(
      actions.createGetDataRequest(queryParams, (res: any) => {
        if (res?.isSuccess) {
          setTableData(res?.data);
          setLoading(false);
        }
      })
    );
  };

  useEffect(() => {
    onGetPrivacyPolicy();

    return () => {
      setRowData({});
      setTableData({});
      setLoading(false);
    };
  }, [sortColumn, sortOrder]);

  function onEdit(dataItem: any): void {
    setRowData(dataItem);
    setRowEdit(true);
    // console.log('Edited', dataItem);
  }

  // const onDelete = (dataItem: any): any => {
  //   const data = {
  //     type: 'member-experience',
  //     subtype: 'privacy-policy',
  //     records: [dataItem?._id], // eslint-disable-line no-underscore-dangle
  //   };
  //   setOnDelete(true);
  //   dispatch(
  //     actions.createDeleteGeneralDataRequest(data, (res: any) => {
  //       if (res?.isSuccess) {
  //         setTableData({});
  //         setOnDelete(false);
  //         onGetPrivacyPolicy();
  //       }
  //     })
  //   );
  // };

  const addNew = (dataItem: any): any => {
    const data = {
      type: 'member-experience',
      subtype: 'privacy-policy',
      data: dataItem,
    };

    dispatch(
      actions.createAddNewDataRequest(null, data, (res: any) => {
        if (res?.isSuccess) {
          setGeneralModalMsg(ADDED_PRIVACY_POLICY);
          setShowGeneralMsgModal(true);
          setTableData({});
          setAddNew(false);
          onGetPrivacyPolicy();
        }
      })
    );
  };

  const update = (dataItem: any): any => {
    showConfirmationModal(false);
    setRowData(dataItem);
    const confirmModalParams = `?type=member-experience&subtype=general&sectionName=privacyPolicy&sectionId=${dataItem?._id}`;

    dispatch(
      actions.createGetDataRequest(
        confirmModalParams,
        (res: any) => {
          if (res?.isSuccess) {
            setAddNew(false);
            setRowEdit(false);
            setConfirmationHeading('Confirmation Dialogue');
            setConfirmationMsg(`${res?.data?.totalRecords} active configurations will be affected`);
            showConfirmationModal(true);
          }
        },
        AFFECTED_COUNT
      )
    );
  };

  const renderUrl = (dataItem: any): any => {
    return (
      dataItem?.values &&
      Object.keys(dataItem?.values)?.map((i: any) => (
        <div className='mt-1'>
          <a href={dataItem?.values[i]}>
            {toPascalCase(i)}: {dataItem?.values[i]}
          </a>
          <br />
        </div>
      ))
    );
  };

  const openModalHandler = (): void => {
    setAddNew(true);
    setRowData({});
  };

  const closeModalHandler = (): void => {
    setAddNew(false);
    setRowEdit(false);
  };
  const onsortChange = (col: any): void => {
    setSortColumn(col.field);
    setSortOrder(sortOrder === 1 ? -1 : 1);
  };

  const confirmationModalHandler = (dataItem: any): void => {
    showConfirmationModal(false);
    const data = {
      type: 'member-experience',
      subtype: 'privacy-policy',
      recordId: dataItem._id, // eslint-disable-line no-underscore-dangle
      data: dataItem,
    };

    dispatch(
      actions.createUpdateDataRequest(null, data, (res: any) => {
        if (res?.isSuccess) {
          setGeneralModalMsg(UPDATED_PRIVACY_POLICY);
          setShowGeneralMsgModal(true);
          setTableData({});
          setRowEdit(false);
          onGetPrivacyPolicy();
        }
      })
    );
  };

  const goBackHandler = (): void => {
    setRowEdit(true);
    showConfirmationModal(false);
  };

  return (
    <>
      <div className='row mb-3'>
        <div className='col-12 all-Button text-end'>
          <button
            type='button'
            className='btn btn-blue btn-radius text-white fw-normal px-3'
            onClick={openModalHandler}>
            {ADD_NEW_LBL}
          </button>
        </div>
      </div>
      <GridView
        // dataState={dataState}
        // onItemChange={(data: any) => console.log('onChange', data)}
        // total={totalCount}
        loading={loading}
        data={tableData}
        sort={{ sortBy: sortColumn, order: sortOrder }}
        onsortChange={onsortChange}
        // onDataStateChange={() => console.log('onData Change :')}
      >
        <TableCells field='name' title='Name' sortable />
        <TableCells field='type' title='Type' sortable />
        <TableCells
          field='values'
          title='Values'
          type='url'
          cell={(props: any) => renderUrl(props?.dataItem)}
        />
        <TableCells
          field='action'
          filter='date'
          title='Action'
          cell={(props: any) => PrivacyPolicyCell({ dataItem: props?.dataItem, onEdit })}
        />
      </GridView>
      {/* </div> */}
      {onAddNew || onRowEdit ? (
        <AddNewPrivacyPolicy
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNew : update}
        />
      ) : null}

      {showGeneralMsgModal && (
        <GeneralModal
          modalHeading={PRIVACY_POLICY_HEADING}
          modalMessage={generalModalMsg}
          onOK={() => setShowGeneralMsgModal(false)}
        />
      )}

      {confirmationModal && (
        <GeneralConfirmModal
          data={rowDataItem}
          modalHeading={confirmationHeading}
          modalMessage={confirmationMsg}
          onGoBack={goBackHandler}
          onOK={confirmationModalHandler}
        />
      )}
    </>
  );
}
