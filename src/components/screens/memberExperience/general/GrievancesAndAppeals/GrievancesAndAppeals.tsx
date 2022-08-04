/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ADDED_GRIEVANCES_APPEALS,
  ADD_NEW_LBL,
  GRIEVANCES_APPEALS_HEADING,
  UPDATED_GRIEVANCES_APPEALS,
} from '../../../../shared/constant/AppConstants';
import { toPascalCase } from '../../../../shared/helperMethods/HelperMethod';
import GridView from '../../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../../shared/sharedComponent/tableGrid/TableCells';
import AddNewGrievancesAndAppeals from './AddNewGrievancesAndAppeals';
import { CheckBoxCell, GrievancesAndAppealsCell } from './Cells';
import * as actions from '../../../../../redux/screens/common/CommonActions';
import GeneralModal from '../GeneralModal';
import GeneralConfirmModal from '../GeneralConfirmModal';
import { AFFECTED_COUNT } from '../../../../../redux/services/Apis';

const initialDataState = {
  skip: 1,
  take: 10,
};

export default function GrievancesAndAppeals(): JSX.Element {
  const [rowDataItem, setRowData] = useState({});
  const [onAddNew, setAddNew] = useState(false);
  const [onRowEdit, setRowEdit] = useState(false);
  // const [onDeleteRow, setOnDelete] = useState(false);
  const [tableData, setTableData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [generalModalMsg, setGeneralModalMsg] = useState('');
  const [showGeneralMsgModal, setShowGeneralMsgModal] = useState(false);
  const [nameUniqueError, setNameUniqueError] = useState(false);
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('name');
  const [confirmationHeading, setConfirmationHeading] = useState('');
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const [confirmationModal, showConfirmationModal] = useState(false);
  const dispatch = useDispatch();

  const onGetGrievanceAppeal = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryParams = `member-experience&subtype=grievance-appeal&sort=${JSON.stringify(
      sortData
    )}`;
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
    onGetGrievanceAppeal();

    return () => {
      setRowData({});
      setTableData([]);
      setLoading(false);
      setNameUniqueError(false);
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
  //     subtype: 'grievance-appeal',
  //     records: [dataItem?._id], // eslint-disable-line no-underscore-dangle
  //   };
  //   setOnDelete(true);
  //   dispatch(
  //     actions.createDeleteGeneralDataRequest(data, (res: any) => {
  //       if (res?.isSuccess) {
  //         setTableData([]);
  //         setOnDelete(false);
  //         onGetGrievanceAppeal();
  //       }
  //     })
  //   );
  // };

  const addNew = (dataItem: any): any => {
    const data = {
      type: 'member-experience',
      subtype: 'grievance-appeal',
      data: dataItem,
    };

    onGetGrievanceAppeal();

    let grievanceNameIsUnique = false;
    if (dataItem.name) {
      grievanceNameIsUnique = !tableData.some(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      );

      if (grievanceNameIsUnique) {
        setNameUniqueError(false);
        dispatch(
          actions.createAddNewDataRequest(null, data, (res: any) => {
            if (res?.isSuccess) {
              setGeneralModalMsg(ADDED_GRIEVANCES_APPEALS);
              setShowGeneralMsgModal(true);
              setTableData([]);
              setAddNew(false);
              onGetGrievanceAppeal();
            }
          })
        );
      } else {
        setNameUniqueError(true);
      }
    }
  };

  const update = (dataItem: any): any => {
    showConfirmationModal(false);

    onGetGrievanceAppeal();

    let grievanceNameValid = false;

    if (dataItem.name) {
      const grievanceNameExist = tableData.filter(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      )[0]; // only one entry with unique tile name can exist in table as we are validating it

      // console.log(grievanceNameExist);
      if (grievanceNameExist) {
        if (grievanceNameExist._id === dataItem._id) {
          grievanceNameValid = true;
        } else {
          grievanceNameValid = false;
        }
      } else {
        grievanceNameValid = true;
      }

      if (grievanceNameValid) {
        setNameUniqueError(false);
        setRowData(dataItem);
        const confirmModalParams = `?type=member-experience&subtype=general&sectionName=grievancesAndAppeals&sectionId=${dataItem?._id}`;

        dispatch(
          actions.createGetDataRequest(
            confirmModalParams,
            (res: any) => {
              if (res?.isSuccess) {
                setAddNew(false);
                setRowEdit(false);
                setConfirmationHeading('Confirmation Dialogue');
                setConfirmationMsg(
                  `${res?.data?.totalRecords} active configurations will be affected`
                );
                showConfirmationModal(true);
              }
            },
            AFFECTED_COUNT
          )
        );
      } else {
        setNameUniqueError(true);
      }
    }
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

  function itemChange(dataItem: any): void {
    // console.log(dataItem);
    // console.log('data on Change', dataItem);
  }

  const openModalHandler = (): void => {
    setAddNew(true);
    setRowData({});
  };

  const closeModalHandler = (): void => {
    setAddNew(false);
    setRowEdit(false);
    setNameUniqueError(false);
  };

  const onDataChange = (e: any, dataItem: any): void => {
    tableData.find((x: any) => x._id === dataItem._id).defaultEnabled = e.target.checked;
    setTableData([...tableData]);

    const data = {
      type: 'member-experience',
      subtype: 'grievance-appeal',
      recordId: dataItem._id, // eslint-disable-line no-underscore-dangle
      data: dataItem,
    };

    dispatch(actions.createUpdateDataRequest(null, data, (res: any) => {}));
  };
  const onsortChange = (col: any): void => {
    setSortColumn(col.field);
    setSortOrder(sortOrder === 1 ? -1 : 1);
  };

  const confirmationModalHandler = (dataItem: any): void => {
    showConfirmationModal(false);
    const data = {
      type: 'member-experience',
      subtype: 'grievance-appeal',
      recordId: dataItem._id, // eslint-disable-line no-underscore-dangle
      data: dataItem,
    };

    dispatch(
      actions.createUpdateDataRequest(null, data, (res: any) => {
        if (res?.isSuccess) {
          setGeneralModalMsg(UPDATED_GRIEVANCES_APPEALS);
          setShowGeneralMsgModal(true);
          setTableData([]);
          setRowEdit(false);
          onGetGrievanceAppeal();
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
        // onItemChange={(data: any) => itemChange(data)}
        // total={totalCount}
        loading={loading}
        data={tableData}
        sort={{ sortBy: sortColumn, order: sortOrder }}
        onsortChange={onsortChange}
        // onDataStateChange={() => console.log('onData Change :')}
      >
        <TableCells field='name' title='Name' sortable />

        <TableCells
          field='defaultEnabled'
          title='Default'
          type='checkbox'
          cell={(props: any) => (
            <td>
              {CheckBoxCell({
                props: { dataItem: props?.dataItem, field: 'defaultEnabled' },
                onDataChange,
              })}
            </td>
          )}
        />
        <TableCells field='type' title='Type' sortable />
        <TableCells field='label' title='Label' sortable />
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
          cell={(props: any) => GrievancesAndAppealsCell({ dataItem: props?.dataItem, onEdit })}
        />
      </GridView>
      {/* </div> */}
      {onAddNew || onRowEdit ? (
        <AddNewGrievancesAndAppeals
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNew : update}
          uniqueNameError={nameUniqueError}
          setUniqueNameError={() => setNameUniqueError(false)}
        />
      ) : null}

      {showGeneralMsgModal && (
        <GeneralModal
          modalHeading={GRIEVANCES_APPEALS_HEADING}
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
