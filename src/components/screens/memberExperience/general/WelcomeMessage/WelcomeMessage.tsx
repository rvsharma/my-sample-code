/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ADDED_WELCOME_MESSAGE,
  ADD_NEW_LBL,
  UPDATED_WELCOME_MESSAGE,
  WELCOME_MESSAGE_HEADING,
} from '../../../../shared/constant/AppConstants';
import { toPascalCase } from '../../../../shared/helperMethods/HelperMethod';
import GridView from '../../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../../shared/sharedComponent/tableGrid/TableCells';
import AddNewWelcomeMessage from './AddNewWelcomeMessage';
import { WelcomeMessageCell } from './Cells';
import * as actions from '../../../../../redux/screens/memberExperience/general/GeneralActions';
import GeneralModal from '../GeneralModal';

const initialDataState = {
  skip: 1,
  take: 10,
};
export default function WelcomeMessage(): JSX.Element {
  const [rowDataItem, setRowData] = useState({});
  const [onAddNew, setAddNew] = useState(false);
  const [onRowEdit, setRowEdit] = useState(false);
  // const [onDeleteRow, setOnDelete] = useState(false);
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalModalMsg, setGeneralModalMsg] = useState('');
  const [showGeneralMsgModal, setShowGeneralMsgModal] = useState(false);
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('title');
  const dispatch = useDispatch();

  const onGetWelcomeMessageData = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryParams = `member-experience&subtype=welcome-message&sort=${JSON.stringify(
      sortData
    )}`;
    dispatch(
      actions.createGetGeneralDataRequest(queryParams, (res: any) => {
        if (res?.isSuccess) {
          setTableData(res?.data);
          setLoading(false);
        }
      })
    );
  };

  useEffect(() => {
    onGetWelcomeMessageData();

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
  //     subtype: 'welcome-message',
  //     records: [dataItem?._id], // eslint-disable-line no-underscore-dangle
  //   };
  //   setOnDelete(true);
  //   dispatch(
  //     actions.createDeleteGeneralDataRequest(data, (res: any) => {
  //       if (res?.isSuccess) {
  //         setTableData({});
  //         setOnDelete(false);
  //         onGetWelcomeMessageData();
  //       }
  //     })
  //   );
  // };

  const addNew = (dataItem: any): any => {
    const data = {
      type: 'member-experience',
      subtype: 'welcome-message',
      data: dataItem,
    };
    dispatch(
      actions.createAddGeneralDataRequest(data, (res: any) => {
        if (res?.isSuccess) {
          setGeneralModalMsg(ADDED_WELCOME_MESSAGE);
          setShowGeneralMsgModal(true);
          setTableData({});
          setAddNew(false);
          onGetWelcomeMessageData();
        }
      })
    );
  };

  const update = (dataItem: any): any => {
    const data = {
      type: 'member-experience',
      subtype: 'welcome-message',
      recordId: dataItem._id, // eslint-disable-line no-underscore-dangle
      data: dataItem,
    };
    dispatch(
      actions.createUpdateGeneralDataRequest(data, (res: any) => {
        if (res?.isSuccess) {
          setGeneralModalMsg(UPDATED_WELCOME_MESSAGE);
          setShowGeneralMsgModal(true);
          setTableData({});
          setRowEdit(false);
          onGetWelcomeMessageData();
        }
      })
    );
  };

  const rendeTitle = (dataItem: any): any => {
    return <td>{dataItem?.callToAction.title}</td>;
  };

  const renderPreEffective = (dataItem: any): any => {
    return <td>{dataItem?.isPreEffective === true ? 'Pre-effective' : 'Effective'}</td>;
  };

  const renderValues = (dataItem: any): any => {
    return (
      <td>
        <a href={dataItem?.callToAction.link}>Select PCP</a>
      </td>
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
        <TableCells
          field='title'
          title='Title'
          cell={(props: any) => rendeTitle(props?.dataItem)}
          sortable
        />
        <TableCells field='message' title='Message' sortable />
        <TableCells
          field='isPreEffective'
          title='Effective/Pre-effective'
          cell={(props: any) => renderPreEffective(props?.dataItem)}
          sortable
        />
        <TableCells field='type' title='Type' cell={() => <td>Link</td>} />
        <TableCells
          field='values'
          title='Values'
          cell={(props: any) => renderValues(props?.dataItem)}
        />
        <TableCells
          field='action'
          filter='date'
          title='Action'
          cell={(props: any) => WelcomeMessageCell({ dataItem: props?.dataItem, onEdit })}
        />
      </GridView>
      {/* </div> */}
      {onAddNew || onRowEdit ? (
        <AddNewWelcomeMessage
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNew : update}
        />
      ) : null}

      {showGeneralMsgModal && (
        <GeneralModal
          modalHeading={WELCOME_MESSAGE_HEADING}
          modalMessage={generalModalMsg}
          onOK={() => setShowGeneralMsgModal(false)}
        />
      )}
    </>
  );
}
