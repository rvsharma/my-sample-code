import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import TableRow from './TableRow';
import arrayMove from './arrayMove';
import { DRAG_INST } from '../../constant/AppConstants';

import * as actions from '../../../../redux/screens/content/ContentAction';

const typeData = [
  { value: 'link', text: 'Link' },
  { value: 'tile', text: 'Tile' },
  { value: 'sso', text: 'Sso' },
];

const MyTableWrapper = styled.div`
  padding: 10px;

  .fixed_header {
    width: 800px;
    table-layout: fixed;
    border-collapse: collapse;

    & > tbody {
      display: block;
      overflow: auto;
      height: 100%;
      cursor: grabbing;
      background: grey;
    }

    & > thead {
      background: yellow;
      color: black;

      & > tr {
        display: block;
        //width: 793px;
      }
    }

    & > thead th,
    & > tbody td {
      padding: 5px;
      text-align: left;

      border: 1px solid #000;
    }
  }
`;
const SortableCont = SortableContainer(({ children }: any) => {
  return <tbody>{children}</tbody>;
});
// eslint-disable-next-line
const SortableItem = SortableElement((props: any) => <TableRow {...props} />);

interface ownProps {
  nodData: any;
  configData: any;
  module: string;
  onModuleChange: any;
  parentIndex: number;
}

export default function HOCTable({
  nodData,
  configData,
  module,
  onModuleChange,
  parentIndex,
}: ownProps): JSX.Element {
  const mod = configData.modules.find((x: any) => x.module === module);

  const [items, setItems] = useState<any[]>([]);
  // const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch();

  const onGetItemData = (type: string, index: number): void => {
    if (type !== '') {
      const queryStr = `?type=content&subtype=${type}&limit=100`;
      dispatch(
        actions.createGetDataRequest(queryStr, (res: any) => {
          if (res?.isSuccess) {
            const refinedData = res?.data.map((d: any) => {
              /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
              return { value: d._id, text: d.name };
            });
            items[index].items = refinedData;
            setItems([...items]);
          }
        })
      );
    } else {
      items[index].items = [];
      setItems([...items]);
    }
  };
  const onTypeChange = (e: any, index: any): any => {
    if (e.target.name === 'type') {
      onGetItemData(e.target.value, index);
      mod.moduleData.addressableSpaces[parentIndex].items[index].type = e.target.value;
      onModuleChange(mod);
    }
    if (e.target.name === 'item') {
      mod.moduleData.addressableSpaces[parentIndex].items[index].id = e.target.value;
      mod.moduleData.addressableSpaces[parentIndex].items[index].text =
        e.target.options[e.target.selectedIndex].text;
      onModuleChange(mod);
    }
  };

  const onRemove = (index: any): any => {
    mod.moduleData.addressableSpaces[parentIndex].items.splice(index, 1);
    onModuleChange(mod);
  };

  const onAddNew = (): void => {
    mod.moduleData.addressableSpaces[parentIndex].items.push({
      type: '',
      id: '',
      text: '',
    });
    onModuleChange(mod);
  };
  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    mod.moduleData.addressableSpaces[parentIndex].items = arrayMove(
      mod.moduleData.addressableSpaces[parentIndex].items,
      oldIndex,
      newIndex
    );
    onModuleChange(mod);
  }, []);

  useEffect(() => {
    nodData.forEach((s: any, i: any) => {
      if (!s.items) {
        onGetItemData(s.type, i);
      }
    });
    setItems(nodData);
  }, [onRemove]);

  return (
    <>
      <div className='row pb-0 aling-items-center'>
        <div className='col drag-inst'>
          <label className='col-12 pb-2 mb-0 brdr-btm-color' htmlFor='accelerationmark'>
            <span className='accelerationmark font-family-fontawesome' />
            <span className='text-black fw-normal ms-2'>{DRAG_INST}</span>
          </label>
        </div>
        <div className='col all-Button text-end justify-content-end align-items-end d-flex'>
          <button
            type='button'
            className='btn btn-blue btn-radius text-white fw-normal px-3'
            onClick={onAddNew}>
            Add Item
          </button>
        </div>
      </div>
      <MyTableWrapper>
        <div className='table-bg'>
          <table className='table shadow-sm'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Type</th>
                <th>Item</th>
                <th>Action</th>
              </tr>
            </thead>
            <SortableCont
              onSortEnd={onSortEnd}
              axis='y'
              lockAxis='y'
              lockToContainerEdges
              lockOffset={['30%', '50%']}
              helperClass='helperContainerClass'
              useDragHandle>
              {[...items] &&
                [...items].map((value: any, index: any) => (
                  <SortableItem
                    // eslint-disable-next-line
                    key={`item-${index}`}
                    index={index}
                    dataIndex={index}
                    first={index + 1}
                    second={value.type}
                    third={value.id}
                    typeData={typeData}
                    itemData={value.items ? value.items : []}
                    data={value}
                    onChange={onTypeChange}
                    onRemove={onRemove}
                  />
                ))}
            </SortableCont>
          </table>
        </div>
      </MyTableWrapper>
    </>
  );
}
