import React from 'react';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import { GENERATE_NEW_LBL, REPORTS_LBL } from '../../../shared/constant/AppConstants';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { ReportsCell } from './Cells';

export default function Reports(): JSX.Element {
  function onDownload(dataItem: any): void {
    console.log('Edited', dataItem);
  }

  function onDelete(dataItem: any): void {
    console.log('Deleted', dataItem);
  }

  function addNewLink(): any {
    console.log('add link');
  }

  return (
    <>
      {' '}
      <div className='col-12 member-signup-container shadow'>
        <div className='row'>
          <div className='col-12 member-signup-text'>{REPORTS_LBL}</div>
        </div>
        <div className='row mb-3'>
          <div className='col-12 all-Button text-end'>
            <button
              type='button'
              className='btn btn-blue btn-radius text-white fw-normal px-3'
              onClick={() => addNewLink()}>
              {GENERATE_NEW_LBL}
            </button>
          </div>
        </div>
        <GridView
          pagination
          data={[
            {
              id: 1,
              title: 'data1',
              date: 'data2',
              source: 'data3',
            },
            {
              id: 2,
              title: 'data2',
              date: 'data3',
              source: 'data4',
            },
          ]}>
          <TableCells field='title' type='text' title='Title' />
          <TableCells field='date' type='text' title='Date' />
          <TableCells field='source' title='Source' type='url' />
          <TableCells
            field='action'
            filter='date'
            title='Action'
            cell={(props: any) => ReportsCell({ dataItem: props?.dataItem, onDownload, onDelete })}
          />
        </GridView>
      </div>
    </>
  );
}
