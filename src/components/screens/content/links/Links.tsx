/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import Tabs from '../../../shared/sharedComponent/tabs/Tabs';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import { ADD_NEW_LBL, LINKS_LBL } from '../../../shared/constant/AppConstants';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { LinksCell } from './Cells';
import AddNewLinks from './AddNewLinks';
import * as actions from '../../../../redux/screens/content/ContentAction';
import { toPascalCase } from '../../../shared/helperMethods/HelperMethod';
// import { dynamicSort } from '../../../shared/helperMethods/HelperMethod';

let initialDataState = {
  skip: 1,
  take: 10,
};

// interface dataItemState {
//   createdAt?: string;
//   deletedAt?: null;
//   name?: string;
//   text?: string;
//   updatedAt?: string;
//   url?: any;
// }

export default function Links(): JSX.Element {
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

  // const linkTableData: any = useSelector((state: any) => state?.contentData);

  // const tableData = linkTableData?.data || [];

  const onGetLinksData = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryString = `?type=content&subtype=link&page=${dataState?.skip}&limit=${
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
    const countQueryStr = '?type=content&subtype=link';
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
    onGetLinksData();

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
  }, [sortOrder, sortColumn]);

  // useEffect(() => {
  //   onGetLinksData();
  // }, [onAddNew]);

  function onEdit(dataItem: any): void {
    setRowData(dataItem);
    setRowEdit(true);
    // console.log('Edited', dataItem);
  }

  const updateLink = (dataItem: any): any => {
    setIsRunning(true);
    const data = {
      type: 'content',
      subtype: 'link',
      recordId: dataItem?._id,
      data: dataItem,
    };

    onGetLinksData();

    let linkNameValid = false;

    if (dataItem.name) {
      const linkNameExist = tableData.filter(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      )[0]; // only one entry with unique tile name can exist in table as we are validating it

      // console.log(linkNameExist);
      if (linkNameExist) {
        if (linkNameExist._id === dataItem._id) {
          linkNameValid = true;
        } else {
          linkNameValid = false;
        }
      } else {
        linkNameValid = true;
      }

      if (linkNameValid) {
        setNameUniqueError(false);
        dispatch(
          actions.createUpdateDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              setIsRunning(false);
              setAddNew(false);
              setRowEdit(false);
              onGetLinksData();
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
      subtype: 'link',
      records: [dataItem?._id],
      data: dataItem,
    };
    dispatch(
      actions.createDeleteDataRequest(data, (res: any) => {
        if (res?.isSuccess) {
          setAddNew(false);
          onGetLinksData();
        }
      })
    );
    // console.log('Deleted', dataItem);
  }

  function itemChange(dataItem: any): void {
    setRowData(dataItem);
    // console.log('data on Change', dataItem);
  }

  const addNewLink = (dataItem: any): any => {
    setIsRunning(true);
    const data = {
      type: 'content',
      subtype: 'link',
      data: dataItem,
    };

    onGetLinksData();

    let linkNameIsUnique = false;
    if (dataItem.name) {
      linkNameIsUnique = !tableData.some(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      );

      if (linkNameIsUnique) {
        setNameUniqueError(false);
        dispatch(
          actions.createAddNewDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              // setTimeout(() => onGetLinksData(), 2000);
              setIsRunning(false);
              setAddNew(false);
              onGetLinksData();
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

  // const onFilterSelect = (data: any): void => {
  //   setSelectedFilter(data);
  //   onGetLinksData();
  // };
  const onDataStateChange = (data: any): void => {
    setPageLimit(data);
    onGetLinksData();
  };

  const renderUrl = (dataItem: any): any => {
    // console.log('uhdjhsdsdj', dataItem);
    return (
      dataItem?.url &&
      Object.keys(dataItem?.url)?.map((i: any) => (
        <span>
          <a className='mt-4' href={dataItem?.url[i]}>
            {toPascalCase(i)}: {dataItem?.url[i]}
          </a>
          <br />
        </span>
      ))
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
          <div className='col-12 member-signup-text'>{LINKS_LBL}</div>
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
          onSelect={(data: any) => onFilterSelect(data)}
        /> */}
        <div className='row mb-3'>
          <div className='col-12 all-Button text-end'>
            <button
              type='button'
              className='btn btn-blue btn-radius text-white fw-normal px-3'
              onClick={() => {
                setAddNew(true);
                setRowData({});
              }}
              // data-bs-toggle='modal'
              // data-bs-target='#addNewLink'
            >
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
          <TableCells field='name' title='Name' sortable />
          <TableCells field='text' title='Text' sortable />
          <TableCells
            field='url'
            title='Destination URL'
            type='url'
            cell={(props: any) => renderUrl(props?.dataItem)}
          />
          <TableCells
            field='action'
            filter='date'
            title='Action'
            cell={(props: any) => LinksCell({ dataItem: props?.dataItem, onEdit, onDelete })}
          />
        </GridView>
      </div>
      {onAddNew || onRowEdit ? (
        <AddNewLinks
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNewLink : updateLink}
          uniqueNameError={nameUniqueError}
          setUniqueNameError={() => setNameUniqueError(false)}
          isLoadRunning={isRunning}
        />
      ) : null}
    </>
  );
}
