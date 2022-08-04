/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../../shared/sharedComponent/tableGrid/TableCells';
import AddUpdateTermsAndConditionModel from './AddUpdateTermsAndConditionModel';
import { TermsAndConditionCells } from './TermsAndConditionCells';
import TermsAndConditionHtmlViewModal from './TermsAndConditionHtmlViewModal';
import * as actions from '../../../../../redux/screens/common/CommonActions';
import { toPascalCase } from '../../../../shared/helperMethods/HelperMethod';
import GeneralModal from '../GeneralModal';
import {
  ADDED_TERMS_AND_COND,
  TERMS_AND_COND_HEADING,
  UPDATED_TERMS_AND_COND,
} from '../../../../shared/constant/AppConstants';
import GeneralConfirmModal from '../GeneralConfirmModal';
import { AFFECTED_COUNT } from '../../../../../redux/services/Apis';

export default function TermsAndCondition(): JSX.Element {
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

  const onGetTermsAndConditions = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryParams = `member-experience&subtype=term-condition&sort=${JSON.stringify(sortData)}`;
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
    onGetTermsAndConditions();

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
  //     subtype: 'term-condition',
  //     records: [dataItem?._id], // eslint-disable-line no-underscore-dangle
  //   };
  //   setOnDelete(true);
  //   dispatch(
  //     actions.createDeleteGeneralDataRequest(data, (res: any) => {
  //       if (res?.isSuccess) {
  //         setTableData({});
  //         setOnDelete(false);
  //         onGetTermsAndConditions();
  //       }
  //     })
  //   );
  // };

  const addNew = (dataItem: any): any => {
    const data = {
      type: 'member-experience',
      subtype: 'term-condition',
      data: dataItem,
    };
    onGetTermsAndConditions();

    let termsConditionIsUnique = false;
    if (dataItem.name) {
      termsConditionIsUnique = !tableData.some(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      );

      if (termsConditionIsUnique) {
        setNameUniqueError(false);
        dispatch(
          actions.createAddNewDataRequest(null, data, (res: any) => {
            if (res?.isSuccess) {
              setGeneralModalMsg(ADDED_TERMS_AND_COND);
              setShowGeneralMsgModal(true);
              setTableData([]);
              setAddNew(false);
              onGetTermsAndConditions();
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

    onGetTermsAndConditions();

    let termsConditionValid = false;

    if (dataItem.name) {
      const termsConditionExist = tableData.filter(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      )[0]; // only one entry with unique tile name can exist in table as we are validating it

      // console.log(termsConditionExist);
      if (termsConditionExist) {
        if (termsConditionExist._id === dataItem._id) {
          termsConditionValid = true;
        } else {
          termsConditionValid = false;
        }
      } else {
        termsConditionValid = true;
      }

      if (termsConditionValid) {
        setNameUniqueError(false);
        setRowData(dataItem);
        const confirmModalParams = `?type=member-experience&subtype=general&sectionName=termscondition&sectionId=${dataItem?._id}`;

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

  // const onOpenHTMView = (type: any, dataItem: any): void => {
  //   setTermsAndConditionViewer({ type, dataItem });
  //   showViewModal(true);
  // };

  const renderValuesUrl = (dataItem: any): any => {
    return (
      <tr>
        {dataItem?.values &&
          Object.keys(dataItem?.values)?.map((i: any, key: any) => (
            <>
              <td>{key !== 0 ? '\xa0|\xa0' : ''}</td>
              <td>
                <a href={dataItem?.values[i]}>{toPascalCase(i)}</a>
              </td>
            </>
          ))}
      </tr>
    );
  };

  const openModalHandler = (): void => {
    setAddNew(true);
    setRowData({});
  };

  const closeModalHandler = (): void => {
    setAddNew(false);
    setRowEdit(false);
    setNameUniqueError(false);
  };
  const onsortChange = (col: any): void => {
    setSortColumn(col.field);
    setSortOrder(sortOrder === 1 ? -1 : 1);
  };

  const confirmationModalHandler = (dataItem: any): void => {
    showConfirmationModal(false);
    const data = {
      type: 'member-experience',
      subtype: 'term-condition',
      recordId: dataItem._id, // eslint-disable-line no-underscore-dangle
      data: dataItem,
    };

    dispatch(
      actions.createUpdateDataRequest(null, data, (res: any) => {
        if (res?.isSuccess) {
          setGeneralModalMsg(UPDATED_TERMS_AND_COND);
          setShowGeneralMsgModal(true);
          setTableData([]);
          setRowEdit(false);
          onGetTermsAndConditions();
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
      <div className='row mt-3'>
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
      </div>

      <GridView
        // dataState={dataState}
        // onListItemClick={(item: string, dataItem: any) => onOpenHTMView(item, dataItem)}
        // onItemChange={(data: any) => console.log('onChange', data)}
        // total={totalCount}
        loading={loading}
        data={tableData}
        sort={{ sortBy: sortColumn, order: sortOrder }}
        onsortChange={onsortChange}
        // onDataStateChange={() => console.log('onData Change :')}
      >
        <TableCells field='name' type='text' title='Name' sortable />
        <TableCells field='type' title='Type' type='text' sortable />
        <TableCells
          field='values'
          title='Values | View HTML'
          type='url'
          cell={(props: any) => renderValuesUrl(props?.dataItem)}
        />
        <TableCells
          field='action'
          filter='date'
          title='Action'
          cell={(props: any) => TermsAndConditionCells({ dataItem: props?.dataItem, onEdit })}
        />
      </GridView>
      {/* </div> */}

      {onAddNew || onRowEdit ? (
        <AddUpdateTermsAndConditionModel
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
          modalHeading={TERMS_AND_COND_HEADING}
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

      {/* {viewModal ? (
        <TermsAndConditionHtmlViewModal
          data={termsAndConditionViewer}
          show={viewModal}
          onClose={() => showViewModal(false)}
        />
      ) : null} */}
    </>
  );
}
