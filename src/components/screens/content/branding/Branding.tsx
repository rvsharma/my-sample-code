/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import Tabs from '../../../shared/sharedComponent/tabs/Tabs';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import { ADD_NEW_LBL, BRANDING_LBL } from '../../../shared/constant/AppConstants';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { BrandingCell } from './Cells';
import AddEditBranding from './AddEditBranding';
import * as actions from '../../../../redux/screens/content/ContentAction';

let initialDataState = {
  skip: 1,
  take: 10,
};

export default function Branding(): JSX.Element {
  // const [selectedFilter, setSelectedFilter] = useState('All');
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

  // const brandingTableData: any = useSelector((state: any) => state?.contentData);

  // const tableData = brandingTableData?.data || [];

  const onGetBrandingsData = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryString = `?type=content&subtype=branding&page=${dataState?.skip}&limit=${
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
    const countQueryStr = '?type=content&subtype=branding';
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
    onGetBrandingsData();

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
  //   onGetBrandingsData();
  // }, [onAddNew]);

  function onEdit(dataItem: any): void {
    setRowData(dataItem);
    setRowEdit(true);
    // console.log('Edited', dataItem);
  }

  const updatebranding = (dataItem: any): any => {
    setIsRunning(true);
    const data = {
      type: 'content',
      subtype: 'branding',
      recordId: dataItem?._id,
      data: dataItem,
    };

    onGetBrandingsData();

    let brandingNameValid = false;

    if (dataItem.name) {
      const brandingNameExist = tableData.filter(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      )[0]; // only one entry with unique tile name can exist in table as we are validating it

      // console.log(brandingNameExist);
      if (brandingNameExist) {
        if (brandingNameExist._id === dataItem._id) {
          brandingNameValid = true;
        } else {
          brandingNameValid = false;
        }
      } else {
        brandingNameValid = true;
      }

      if (brandingNameValid) {
        setNameUniqueError(false);
        dispatch(
          actions.createUpdateDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              setIsRunning(false);
              setAddNew(false);
              setRowEdit(false);
              onGetBrandingsData();
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
      subtype: 'branding',
      records: [dataItem?._id],
    };
    dispatch(
      actions.createDeleteDataRequest(data, (res: any) => {
        if (res?.isSuccess) {
          setAddNew(false);
          onGetBrandingsData();
        }
      })
    );
    // console.log('Deleted', dataItem);
  }

  function itemChange(dataItem: any): void {
    setRowData(dataItem);
    // console.log('data on Change', dataItem);
  }

  const addNewbranding = (dataItem: any): any => {
    setIsRunning(true);
    const data = {
      type: 'content',
      subtype: 'branding',
      data: dataItem,
    };

    onGetBrandingsData();

    let brandingNameIsUnique = false;
    if (dataItem.name) {
      brandingNameIsUnique = !tableData.some(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      );

      if (brandingNameIsUnique) {
        setNameUniqueError(false);
        dispatch(
          actions.createAddNewDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              // setTimeout(() => onGetBrandingsData(), 2000);
              setIsRunning(false);
              setAddNew(false);
              onGetBrandingsData();
            }
          })
        );
        // console.log('add branding', data);
      } else {
        setIsRunning(false);
        setNameUniqueError(true);
      }
    }
  };

  // const onFilterSelect = (data: any): void => {
  //   setSelectedFilter(data);
  //   onGetBrandingsData();
  // };
  const onDataStateChange = (data: any): void => {
    setPageLimit(data);
    onGetBrandingsData();
  };

  const renderImage = (dataItem: any): any => {
    // console.log('data', dataItem);
    return (
      dataItem?.logos &&
      Object.keys(dataItem?.logos)?.map(
        (i: any) =>
          dataItem?.logos[i] !== '' && (
            <span className='mx-2'>
              <img style={{ height: '22px' }} src={dataItem?.logos[i]} alt={i} />
            </span>
          )
      )
    );
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

  return (
    <>
      {' '}
      <div className='col-12 member-signup-container shadow'>
        <div className='row'>
          <div className='col-12 member-signup-text'>{BRANDING_LBL}</div>
        </div>
        {/* <Tabs
          data={[
            { title: 'All' },
            { title: 'Production' },
            { title: 'Stage' },
            { title: 'Dev' },
            { title: 'None' },
          ]}
          active={selectedFilter}
          onSelect={(data: any) => setSelectedFilter(data)}
        /> */}
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
          <TableCells field='name' editor='date' title='Name' sortable />
          <TableCells field='type' filter='date' title='Type' sortable />
          <TableCells
            field='logo'
            filter='date'
            title='Logos'
            type='url'
            cell={(props: any) => <td>{renderImage(props?.dataItem)}</td>}
          />
          <TableCells
            field='action'
            filter='date'
            title='Action'
            cell={(props: any) => BrandingCell({ dataItem: props?.dataItem, onEdit, onDelete })}
          />
        </GridView>
      </div>
      {onAddNew || onRowEdit ? (
        <AddEditBranding
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNewbranding : updatebranding}
          uniqueNameError={nameUniqueError}
          setUniqueNameError={() => setNameUniqueError(false)}
          isLoadRunning={isRunning}
        />
      ) : null}
    </>
  );
}
