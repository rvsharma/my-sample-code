/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ADDED_PHONE_NUMBERS,
  ADD_NEW_LBL,
  PHONE_NUMBERS_HEADING,
  UPDATED_PHONE_NUMBERS,
} from '../../../../shared/constant/AppConstants';
import { toPascalCase } from '../../../../shared/helperMethods/HelperMethod';
import GridView from '../../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../../shared/sharedComponent/tableGrid/TableCells';
import AddNewPhoneNumbers from './AddNewPhoneNumbers';
import { PhoneNumbersCell } from './Cells';
import * as actions from '../../../../../redux/screens/common/CommonActions';
import GeneralModal from '../GeneralModal';
import GeneralConfirmModal from '../GeneralConfirmModal';
import { AFFECTED_COUNT } from '../../../../../redux/services/Apis';

const initialDataState = {
  skip: 1,
  take: 10,
};

export default function PhoneNumbers(): JSX.Element {
  const [rowDataItem, setRowData] = useState({});
  const [onAddNew, setAddNew] = useState(false);
  const [onRowEdit, setRowEdit] = useState(false);
  // const [onDeleteRow, setOnDelete] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('name');
  const [confirmationHeading, setConfirmationHeading] = useState('');
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const [confirmationModal, showConfirmationModal] = useState(false);
  const dispatch = useDispatch();

  const onGetPhoneNumbers = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryParams = `member-experience&subtype=phone-number&sort=${JSON.stringify(sortData)}`;
    dispatch(
      actions.createGetDataRequest(queryParams, (res: any) => {
        if (res?.isSuccess) {
          setTableData(res?.data);
          setLoading(false);
          // console.log(res?.data);
        }
      })
    );
  };

  useEffect(() => {
    onGetPhoneNumbers();

    return () => {
      setRowData({});
      setTableData([]);
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
  //     subtype: 'phone-number',
  //     records: [dataItem?._id], // eslint-disable-line no-underscore-dangle
  //   };
  //   setOnDelete(true);
  //   dispatch(
  //     actions.createDeleteGeneralDataRequest(data, (res: any) => {
  //       if (res?.isSuccess) {
  //         setTableData({});
  //         setOnDelete(false);
  //         onGetPhoneNumbers();
  //       }
  //     })
  //   );
  // };

  const addNew = (dataItem: any): any => {
    if (tableData.some((x) => x.name === dataItem.name)) {
      setTitle('Erorr');
      setMessage(`Phone Number with name ${dataItem.name} already exist.`);
      setShowSuccessModal(true);
    } else {
      const data = {
        type: 'member-experience',
        subtype: 'phone-number',
        data: dataItem,
      };
      dispatch(
        actions.createAddNewDataRequest(null, data, (res: any) => {
          if (res?.isSuccess) {
            setTitle('Success');
            setMessage(`Phone Number added successfully.`);
            setShowSuccessModal(true);
            setTableData([]);
            setAddNew(false);
            onGetPhoneNumbers();
          }
        })
      );
    }
  };

  const update = (dataItem: any): any => {
    showConfirmationModal(false);
    setRowData(dataItem);
    const confirmModalParams = `?type=member-experience&subtype=general&sectionName=phoneNumber&sectionId=${dataItem?._id}`;

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

  const renderDefault = (dataItem: any): any => {
    return dataItem?.defaultEnabled === true ? <td>Yes</td> : <td>No</td>;
  };

  const renderLabel = (phoneLabel: any): any => {
    let maskedTelHtml: any = null;

    if (!phoneLabel) {
      maskedTelHtml = 'No telephone number';
    } else {
      const phoneToString = phoneLabel.toString();

      const maskedTelNumber = `
        ${phoneToString.substring(0, 1)}-
        ${phoneToString.substring(1, 4)}-
        ${phoneToString.substring(4, 7)}-
        ${phoneToString.substring(7, phoneToString.length)}`;

      maskedTelHtml = maskedTelNumber;
    }

    return <td>{maskedTelHtml}</td>;
  };

  const renderTelephoneNumber = (dataItem: any): any => {
    let index = 0;
    return (
      <div>
        {dataItem?.values &&
          Object.keys(dataItem?.values)?.map((i: any) => {
            index += 1;
            const urlName = i[0].toUpperCase() + i.slice(1);

            const splitPhoneDetail = dataItem?.values[i];
            const telephoneUrl = `tel: +${splitPhoneDetail}`;
            return (
              <>
                {urlName}: tel:
                <a href={telephoneUrl}>
                  {renderLabel(splitPhoneDetail)}
                  {index !== 4 ? ' | ' : null}
                </a>
              </>
            );
          })}
      </div>
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
      subtype: 'phone-number',
      recordId: dataItem._id, // eslint-disable-line no-underscore-dangle
      data: dataItem,
    };

    dispatch(
      actions.createUpdateDataRequest(null, data, (res: any) => {
        if (res?.isSuccess) {
          setTitle('Success');
          setMessage(`Phone Number updated successfully.`);
          setShowSuccessModal(true);
          setTableData([]);
          setRowEdit(false);
          onGetPhoneNumbers();
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
        <TableCells
          field='defaultEnabled'
          title='Default'
          cell={(props: any) => renderDefault(props?.dataItem)}
          sortable
        />
        <TableCells field='type' title='Type' />
        <TableCells
          field='label'
          title='Label'
          cell={(props: any) => renderLabel(props?.dataItem?.label)}
        />
        <TableCells
          field='values'
          title='Values'
          cell={(props: any) => renderTelephoneNumber(props?.dataItem)}
        />
        <TableCells
          field='action'
          filter='date'
          title='Action'
          cell={(props: any) => PhoneNumbersCell({ dataItem: props?.dataItem, onEdit })}
        />
      </GridView>
      {/* </div> */}
      {onAddNew || onRowEdit ? (
        <AddNewPhoneNumbers
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNew : update}
        />
      ) : null}

      {showSuccessModal && (
        <GeneralModal
          modalHeading={title}
          modalMessage={message}
          onOK={() => setShowSuccessModal(false)}
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
