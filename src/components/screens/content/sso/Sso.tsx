/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
// import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
// import { LinksTableHeaders } from './Cells';
import { ADD_NEW_LBL, SSO_LBL } from '../../../shared/constant/AppConstants';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { SsoCell } from './Cells';
import AddEditNewSso from './AddEditNewSso';
import * as actions from '../../../../redux/screens/content/ContentAction';
import { toPascalCase } from '../../../shared/helperMethods/HelperMethod';

let initialDataState = {
  skip: 1,
  take: 10,
};

export default function Sso(): JSX.Element {
  const [rowDataItem, setRowData] = useState({});
  const [onAddNew, setAddNew] = useState(false);
  const [onRowEdit, setRowEdit] = useState(false);
  // const [onCloneSso, setClone] = useState(false);
  // const [showSsoModal, setShowSsoModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [dataState, setPageLimit] = useState(initialDataState);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const dispatch = useDispatch();
  const [tableData, setTableData]: any = useState({});
  const [nameUniqueError, setNameUniqueError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortColumn, setSortColumn] = useState('name');

  // const linkTableData: any = useSelector((state: any) => state?.contentData);

  // const tableData = linkTableData?.data || [];
  // console.log(tableData);

  const onGetSsoData = (): any => {
    const sortData = { sortBy: sortColumn, order: sortOrder };
    setLoading(true);
    const queryString: any = `?type=content&subtype=sso&page=${dataState?.skip}&limit=${
      dataState?.take
    }&sort=${JSON.stringify(sortData)}`;

    dispatch(
      actions.createGetDataRequest(queryString, (res: any) => {
        if (res?.isSuccess) {
          setTableData(res?.data);
          setLoading(false);
          // console.log('test');
        }
      })
    );
    const countQueryStr = '?type=content&subtype=sso';
    dispatch(
      actions.createGetDataCountRequest(countQueryStr, (res: any) => {
        if (res?.isSuccess) {
          // console.log('test');
          setTotalCount(res?.data?.totalRecords);
          // console.log(res?.data?.totalRecords);
        }
      })
    );
  };

  useEffect(() => {
    onGetSsoData();

    return () => {
      initialDataState = { skip: 1, take: 10 };
      setRowData({});
      setAddNew(false);
      setRowEdit(false);
      // setClone(false);
      setPageLimit(initialDataState);
      setLoading(false);
      setTotalCount(false);
      setTableData(false);
      setNameUniqueError(false);
      setIsRunning(false);
    };
  }, [sortColumn, sortOrder]);

  function onEdit(dataItem: any): void {
    setRowData(dataItem);
    setRowEdit(true);
    // setAddNew(false);
    // setShowSsoModal(true);
    // console.log('Edited', dataItem);
  }

  // const onToggle = (dataItem: any): void => {
  //   const data = {
  //     type: 'content',
  //     subtype: 'sso',
  //     recordId: dataItem?._id,
  //     data: {
  //       enabled: dataItem?.enabled ? !dataItem?.enabled : true,
  //     },
  //   };

  //   dispatch(
  //     actions.createUpdateDataRequest(data, (res: any) => {
  //       if (res?.isSuccess) {
  //         // setTimeout(() => onGetSsoData(), 2000);
  //         // setShowSsoModal(false);
  //         // setAddNew(false);
  //         onGetSsoData();
  //       }
  //     })
  //   );
  //   console.log('toggle link', data);
  // };

  const updateSso = (dataItem: any): any => {
    setIsRunning(true);
    const data = {
      type: 'content',
      subtype: 'sso',
      recordId: dataItem?._id,
      data: dataItem,
    };

    onGetSsoData();

    let ssoNameValid = false;

    if (dataItem.name) {
      const ssoNameExist = tableData.filter(
        (item: any) => item.name.trim().toLowerCase() === dataItem.name.trim().toLowerCase()
      )[0]; // only one entry with unique tile name can exist in table as we are validating it

      // console.log(ssoNameExist);
      if (ssoNameExist) {
        if (ssoNameExist._id === dataItem._id) {
          ssoNameValid = true;
        } else {
          ssoNameValid = false;
        }
      } else {
        ssoNameValid = true;
      }

      if (ssoNameValid) {
        setNameUniqueError(false);

        dispatch(
          actions.createUpdateDataRequest(data, (res: any) => {
            if (res?.isSuccess) {
              setIsRunning(false);
              setRowEdit(false);
              onGetSsoData();
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
      subtype: 'sso',
      records: [dataItem?._id],
    };
    dispatch(
      actions.createDeleteDataRequest(data, (res: any) => {
        if (res?.isSuccess) {
          onGetSsoData();
        }
      })
    );
    // console.log('Deleted', dataItem);
  }

  function itemChange(dataItem: any): void {
    setRowData(dataItem);
    // console.log('data on Change', dataItem);
  }

  const addNewSso = (dataItem: any): any => {
    setIsRunning(true);
    let data: any;
    const ssoData = {
      type: 'content',
      subtype: 'sso',
    };

    // if (onCloneSso) {
    //   const { _id, ...cloneItem } = dataItem;
    //   data = {
    //     ...ssoData,
    //     data: {
    //       ...cloneItem,
    //       enabled: true,
    //     },
    //   };
    // }

    if (onAddNew) {
      data = {
        ...ssoData,
        data: {
          ...dataItem,
          enabled: true,
        },
      };
    }

    onGetSsoData();

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
              // setTimeout(() => onGetSsoData(), 2000);
              // setShowSsoModal(false);
              setIsRunning(false);
              setAddNew(false);
              // setClone(false);
              onGetSsoData();
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
    onGetSsoData();
  };

  // const onClone = (dataItem: any): any => {
  //   setRowData(dataItem);
  //   setClone(true);
  //   // console.log('test data', dataItem);
  // };

  const renderUrl = (dataItem: any): any => {
    // console.log('uhdjhsdsdj', dataItem);
    return (
      dataItem?.target &&
      Object.keys(dataItem?.target)?.map((i: any) => (
        <span>
          <a className='mt-4' href={dataItem?.target[i]}>
            {toPascalCase(i)}: {dataItem?.target[i]}
          </a>
          <br />
        </span>
      ))
    );
  };

  const addModalHandler = (): void => {
    // setShowSsoModal(true);
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
          <div className='col-12 member-signup-text'>{SSO_LBL}</div>
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
          <TableCells field='text' title='Text' sortable />
          {/* <TableCells
            field='enabled'
            type='text'
            title='Status'
            cell={(props: any) => (props?.dataItem?.enabled ? <td>Enabled</td> : <td>Disabled</td>)}
          /> */}
          <TableCells
            field='target'
            title='Destination Target'
            type='url'
            cell={(props: any) => renderUrl(props?.dataItem)}
          />
          <TableCells
            field='action'
            filter='date'
            title='Action'
            cell={(props: any) => SsoCell({ dataItem: props?.dataItem, onEdit, onDelete })}
          />
        </GridView>
      </div>
      {onAddNew || onRowEdit ? (
        <AddEditNewSso
          data={rowDataItem}
          show={onAddNew || onRowEdit}
          // show={showSsoModal}
          onClose={closeModalHandler}
          onSave={onAddNew ? addNewSso : updateSso}
          uniqueNameError={nameUniqueError}
          setUniqueNameError={() => setNameUniqueError(false)}
          isLoadRunning={isRunning}
        />
      ) : null}
    </>
  );
}
