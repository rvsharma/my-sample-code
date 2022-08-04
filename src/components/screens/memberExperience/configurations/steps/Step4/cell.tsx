import Tooltip from '@mui/material/Tooltip';
import React from 'react';

export function ToolTipCell(props: any): React.ReactNode {
  const { dataItem } = props;

  return (
    <td>
      <Tooltip
        title={dataItem.items.map((i: any) => (
          <div className='tootip-items px-2 py-1'>{i.text}</div>
        ))}
        placement='right'>
        <span>
          {dataItem.name} ({dataItem.items.length} items)
        </span>
      </Tooltip>
    </td>
  );
}
