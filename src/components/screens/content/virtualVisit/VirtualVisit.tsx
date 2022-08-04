/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
// import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
// import { LinksTableHeaders } from './Cells';
import { ADD_NEW_LBL, VIRTUAL_VISIT_LBL } from '../../../shared/constant/AppConstants';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { VirtualVisitCell } from './Cells';
import AddEditVirtualVisit from './AddEditVirtualVisit';
import * as actions from '../../../../redux/screens/content/ContentAction';
// import { dynamicSort } from '../../../shared/helperMethods/HelperMethod';

let initialDataState = {
  skip: 1,
  take: 10,
};

export default function VirtualVisit(): JSX.Element {
  const [rowDataItem, setRowData] = useState({});
  const [onAddNew, setAddNew] = useState(false);
  const [onRowEdit, setRowEdit] = useState(false);
  const [tableData, setTableData]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const [dataState, setPageLimit] = useState(initialDataState);
  const [nameUniqueError, setNameUniqueError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('name');
  const dispatch = useDispatch();

  const onGetVirtualVisitData = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryString: any = `?type=content&subtype=virtual-visit&page=${dataState?.skip}&limit=${
      dataState?.take
    }&sort=${JSON.stringify(sortData)}`;
    dispatch(
      actions.createGetDataRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          // console.log('test');
          setTableData(res?.data);
          setLoading(false);
        }
      })
    );
    const countQueryStr = '?type=content&subtype=virtual-visit';
    dispatch(
      actions.createGetDataCountRequest(countQueryStr, (res: any) => {
        if (res?.isSuccess) {
          // console.log('test');
          setTotalCount(res?.data?.totalRecords);
        }
      })
    );
  };

  useEffect(() => {
    onGetVirtualVisitData();

    return () => {
      initialDataState = { skip: 1, take: 10 };
      setRowData({});
      setAddNew(false);
      setRowEdit(false);
      setTableData(false);
      setLoading(false);
      setTotalCount(false);
      setPageLimit(initialDataState);
      setNameUniqueError(false);
      setIsRunning(false);
    };
  }, [sortColumn, sortOrder]);

  // useEffect(() => {
  //   onGetVirtualVisitData();
  // }, [onAddNew]);

  function onEdit(dataItem: any): void {
    setRowData(dataItem);
    setRowEdit(true);
    // console.log('Edited', dataItem);
  }

  const updateVirtualVisit = (dataItem: any): any => {
    setIsRunning(true);
    const data = {
      type: 'content',
      subtype: 'virtual-visit',
      recordId: dataItem?._id,
      data: dataItem,
    };

    onGetVirtualVisitData();

    let virtualVisitNameValid = false;

    if (dataItem.name) {
      const virtualVisitNameExist = tableData.filter(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      )[0]; // only one entry with unique tile name can exist in table as we are validating it

      // console.log(virtualVisitNameExist);
      if (virtualVisitNameExist) {
        if (virtualVisitNameExist._id === dataItem._id) {
          virtualVisitNameValid = true;
        } else {
          virtualVisitNameValid = false;
        }
      } else {
        virtualVisitNameValid = true;
      }

      if (virtualVisitNameValid) {
        setNameUniqueError(false);
        dispatch(
          actions.createUpdateDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              setIsRunning(false);
              setAddNew(false);
              setRowEdit(false);
              onGetVirtualVisitData();
            }
          })
        );
      } else {
        setIsRunning(false);
        setNameUniqueError(true);
      }
    }
  };

  function onDelete(dataItem: any): void {
    setRowData(dataItem);
    const data = {
      type: 'content',
      subtype: 'virtual-visit',
      records: [dataItem?._id],
      data: dataItem,
    };
    dispatch(
      actions.createDeleteDataRequest(data, (res: any) => {
        if (res?.isSuccess) {
          setAddNew(false);
          onGetVirtualVisitData();
        }
      })
    );
    // console.log('Deleted', dataItem);
  }

  function itemChange(dataItem: any): void {
    setRowData(dataItem);
    // console.log('data on Change', dataItem);
  }

  const addNewVirtualVisit = (dataItem: any): any => {
    setIsRunning(true);
    const data = {
      type: 'content',
      subtype: 'virtual-visit',
      data: dataItem,
    };

    onGetVirtualVisitData();

    let virtualVisitNameIsUnique = false;
    if (dataItem.name) {
      virtualVisitNameIsUnique = !tableData.some(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      );

      if (virtualVisitNameIsUnique) {
        setNameUniqueError(false);
        dispatch(
          actions.createAddNewDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              setIsRunning(false);
              setAddNew(false);
              onGetVirtualVisitData();
            }
          })
        );
        // console.log('add link', data);
      } else {
        setIsRunning(false);
        setNameUniqueError(true);
      }
    }
  };

  const onDataStateChange = (data: any): void => {
    setPageLimit(data);
    onGetVirtualVisitData();
  };

  // const onViewDetails = (dataItem: any): any => {
  //   console.log('view Vertual Visit', dataItem);
  // };

  const closeModalHandler = (): void => {
    setAddNew(false);
    setRowEdit(false);
    setNameUniqueError(false);
  };
  const onsortChange = (col: any): void => {
    setSortColumn(col.field);
    setSortOrder(sortOrder === 1 ? -1 : 1);
  };
  return (
    <>
      {' '}
      <div className='col-12 member-signup-container shadow'>
        <div className='row'>
          <div className='col-12 member-signup-text'>{VIRTUAL_VISIT_LBL}</div>
        </div>
        <div className='row mb-3'>
          <div className='col-12 all-Button text-end'>
            <button
              type='button'
              className='btn btn-blue btn-radius text-white fw-normal px-3'
              onClick={() => {
                setAddNew(true);
                setRowData({});
              }}>
              {ADD_NEW_LBL}
            </button>
          </div>
        </div>
        <GridView
          pagination
          dataState={dataState}
          onItemChange={(data: any) => itemChange(data)}
          total={totalCount}
          loading={loading}
          data={tableData}
          sort={{ sortBy: sortColumn, order: sortOrder }}
          onsortChange={onsortChange}
          onDataStateChange={onDataStateChange}>
          <TableCells field='name' type='text' title='Name' sortable />
          <TableCells field='title' title='Title' type='text' sortable />
          <TableCells
            field='action'
            title='Action'
            cell={(props: any) => VirtualVisitCell({ dataItem: props?.dataItem, onEdit, onDelete })}
          />
        </GridView>
      </div>
      {onAddNew || onRowEdit ? (
        <AddEditVirtualVisit
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNewVirtualVisit : updateVirtualVisit}
          uniqueNameError={nameUniqueError}
          setUniqueNameError={() => setNameUniqueError(false)}
          isLoadRunning={isRunning}
        />
      ) : null}
    </>
  );
}
