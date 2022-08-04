import React from 'react';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { MenueItemsCell } from './cells';

export default function MenuItems(): any {
  const onEdit = (dataItem: any): void => {
    console.log(dataItem, 'onEdit');
  };

  return (
    <>
      <div className='row mt-3'>
        <div className='col-12 member-signup-container shadow py-4'>
          <div className='row pb-4 aling-items-center'>
            <div className='col-auto'>
              <label htmlFor='name' className='form-label lbl lead'>
                Menu Items
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
              {
                id: '1',
                module: 'Dashboard',
                displayName: 'Using My Benifits',
                weight: 0,
                default: true,
                type: 'primary',
              },
              {
                id: '2',
                module: 'My Health Plan',
                displayName: 'Using My Benifits',
                weight: 0,
                default: true,
                type: 'primary',
              },
            ]}>
            <TableCells field='module' type='text' title='Module' />
            <TableCells field='displayName' title='Display Name' type='text' />
            <TableCells field='weight' title='Weight' type='text' />
            <TableCells field='default' title='Default' type='checkbox' />
            <TableCells field='type' title='Type' type='text' />
            <TableCells
              field='action'
              filter='date'
              title='Action'
              cell={(props: any) => MenueItemsCell({ dataItem: props?.dataItem, onEdit })}
            />
          </GridView>
        </div>
      </div>
    </>
  );
}
