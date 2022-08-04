import React from 'react';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { PagesCell } from './cells';

export default function Pages(): any {
  const onEdit = (dataItem: any): void => {
    console.log(dataItem, 'onEdit');
  };
  const onDelete = (dataItem: any): void => {
    console.log(dataItem, 'onEdit');
  };

  return (
    <>
      <div className='row mt-3'>
        <div className='col-12 member-signup-container shadow py-4'>
          <div className='row pb-4 aling-items-center'>
            <div className='col-auto'>
              <label htmlFor='name' className='form-label lbl lead'>
                Pages
              </label>
            </div>
            <div className='col all-Button text-end'>
              <button type='button' className='btn btn-blue btn-radius text-white fw-normal px-3'>
                Add New
              </button>
            </div>
          </div>

          <GridView
            pagination
            data={[
              { id: '1', name: 'UMB-HNET-CC-SFHSS', displayLable: 'Using My Benifits' },
              { id: '2', name: 'UMB-HNET-CC-SFHSS', displayLable: 'Using My Benifits' },
            ]}>
            <TableCells field='name' type='text' title='Name' />
            <TableCells field='displayLable' title='Display Lable' type='text' />
            <TableCells
              field='action'
              filter='date'
              title='Action'
              cell={(props: any) => PagesCell({ dataItem: props?.dataItem, onEdit, onDelete })}
            />
          </GridView>
        </div>
      </div>
    </>
  );
}
