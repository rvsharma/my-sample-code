/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
// import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
// import { LinksTableHeaders } from './Cells';
import { ADD_NEW_LBL, TILES_LBL } from '../../../shared/constant/AppConstants';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { LinksCell } from './Cells';
import AddEditNewTiles from './AddEditNewTiles';
import * as actions from '../../../../redux/screens/content/ContentAction';
// import { toPascalCase } from '../../../shared/helperMethods/HelperMethod';

let initialDataState = {
  skip: 1,
  take: 10,
};

export default function Tiles(): JSX.Element {
  const [rowDataItem, setRowData] = useState({});
  const [onAddNew, setAddNew] = useState(false);
  const [onRowEdit, setRowEdit] = useState(false);
  // const [onCloneTile, setClone] = useState(false);
  const [tableData, setTableData]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const [dataState, setPageLimit] = useState(initialDataState);
  const [nameUniqueError, setNameUniqueError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('name');
  const dispatch = useDispatch();

  const onGetTilesData = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryString: any = `?type=content&subtype=tile&page=${dataState?.skip}&limit=${
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
    const countQueryStr = '?type=content&subtype=tile';
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
    onGetTilesData();

    return () => {
      initialDataState = { skip: 1, take: 10 };
      setRowData({});
      setAddNew(false);
      setRowEdit(false);
      // setClone(false);
      setTableData({});
      setLoading(false);
      setTotalCount(false);
      setPageLimit(initialDataState);
      setNameUniqueError(false);
      setIsRunning(false);
    };
  }, [sortColumn, sortOrder]);

  function onEdit(dataItem: any): void {
    setRowData(dataItem);
    setRowEdit(true);
    // console.log('Edited', dataItem);
  }

  const updateTiles = (dataItem: any): any => {
    setIsRunning(true);
    const data = {
      type: 'content',
      subtype: 'tile',
      recordId: dataItem?._id,
      data: dataItem,
    };

    onGetTilesData();

    let tileNameValid = false;

    if (dataItem.name) {
      const tileNameExist = tableData.filter(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      )[0]; // only one entry with unique tile name can exist in table as we are validating it

      // console.log(tileNameExist);
      if (tileNameExist) {
        if (tileNameExist._id === dataItem._id) {
          tileNameValid = true;
        } else {
          tileNameValid = false;
        }
      } else {
        tileNameValid = true;
      }

      if (tileNameValid) {
        setNameUniqueError(false);
        dispatch(
          actions.createUpdateDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              setIsRunning(false);
              setAddNew(false);
              setRowEdit(false);
              onGetTilesData();
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
      subtype: 'tile',
      records: [dataItem?._id],
      data: dataItem,
    };
    dispatch(
      actions.createDeleteDataRequest(data, (res: any) => {
        if (res?.isSuccess) {
          setAddNew(false);
          onGetTilesData();
        }
      })
    );
    // console.log('Deleted', dataItem);
  }

  function itemChange(dataItem: any): void {
    setRowData(dataItem);
    // console.log('data on Change', dataItem);
  }

  const addNewTiles = (dataItem: any): any => {
    setIsRunning(true);
    let data: any;
    const tileData = {
      type: 'content',
      subtype: 'tile',
    };

    // if (onCloneTile) {
    //   const { _id, ...cloneItem } = dataItem;
    //   data = {
    //     ...tileData,
    //     data: cloneItem,
    //   };
    // }

    if (onAddNew) {
      data = {
        ...tileData,
        data: dataItem,
      };
    }

    onGetTilesData();

    let tileNameIsUnique = false;
    if (dataItem.name) {
      tileNameIsUnique = !tableData.some(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      );

      if (tileNameIsUnique) {
        setNameUniqueError(false);
        dispatch(
          actions.createAddNewDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              setIsRunning(false);
              setAddNew(false);
              // setClone(false);
              onGetTilesData();
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
    onGetTilesData();
  };

  // const onClone = (dataItem: any): any => {
  //   setRowData(dataItem);
  //   setClone(true);
  //   console.log('test data', dataItem);
  // };

  const addModalHandler = (): void => {
    setAddNew(true);
    setRowData({});
  };

  const closeModalHandler = (): void => {
    setAddNew(false);
    setRowEdit(false);
    // setClone(false);
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
          <div className='col-12 member-signup-text'>{TILES_LBL}</div>
        </div>
        <div className='row mb-3'>
          <div className='col-12 all-Button text-end'>
            <button
              type='button'
              className='btn btn-blue btn-radius text-white fw-normal px-3'
              onClick={addModalHandler}>
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
          <TableCells field='title' title='Title' sortable />
          <TableCells
            field='action'
            filter='date'
            title='Action'
            cell={(props: any) => LinksCell({ dataItem: props?.dataItem, onEdit, onDelete })}
          />
        </GridView>
      </div>
      {onAddNew || onRowEdit ? (
        <AddEditNewTiles
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNewTiles : updateTiles}
          uniqueNameError={nameUniqueError}
          setUniqueNameError={() => setNameUniqueError(false)}
          isLoadRunning={isRunning}
        />
      ) : null}
    </>
  );
}
