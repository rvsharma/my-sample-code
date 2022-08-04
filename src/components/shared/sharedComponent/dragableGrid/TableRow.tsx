import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import styled from 'styled-components';
import { DropDownCell, MenueItemsCell } from './cell';

const TrWrapper = styled.tr`
  background: blue;
  cursor: default;

  .firstElement {
    display: flex;
    flex-direction: row;
  }

  &.helperContainerClass {
    width: auto;
    border: 1px solid #efefef;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;

    &:active {
      cursor: grabbing;
    }

    & > td {
      padding: 5px;
      text-align: left;
    }
  }
`;

const Handle = styled.div`
  margin-right: 10px;
  padding: 0 5px;
  cursor: grab;
`;

const RowHandler = SortableHandle(() => (
  <Handle className='handle'>
    <span className='gripdotsvertical font-family-fontawesome' />
    <span className='gripdotsvertical font-family-fontawesome' />
  </Handle>
));

const TableRow = (props: any): any => {
  const {
    dataIndex,
    first,
    second,
    third,
    className,
    data,
    typeData,
    itemData,
    onChange,
    onRemove,
  } = props;
  return (
    <TrWrapper className={className}>
      <td>
        <div className='firstElement'>
          <RowHandler />
          {first}
        </div>
      </td>
      <td>
        {DropDownCell({ value: second, onChange, items: typeData, index: dataIndex, name: 'type' })}
      </td>
      <td>
        {DropDownCell({ value: third, onChange, items: itemData, index: dataIndex, name: 'item' })}
      </td>
      <td>{MenueItemsCell({ onRemove, data, index: data.index })}</td>
    </TrWrapper>
  );
};

export default TableRow;
