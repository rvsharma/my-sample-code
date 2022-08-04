import React from 'react';
import { CheckBoxCell } from '../../../Cells';

interface ownProps {
  data?: any;
  onModuleChange: Function;
  module?: string;
}

export default function Sections({ data, onModuleChange, module }: ownProps): JSX.Element {
  const mod = data.modules.find((x: any) => x.module === module);

  const onDataChange = (e: any, dataItem: any, key: any): void => {
    dataItem.enabled = e.target.checked; // eslint-disable-line no-param-reassign
    mod.moduleData.SectionName[key] = dataItem;
    onModuleChange(mod);
  };
  return (
    <div className='table-bg'>
      <table className='table shadow-sm simple-table '>
        <thead>
          <tr className='header'>
            <th>Name</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {mod.moduleData &&
            Object.keys(mod.moduleData.SectionName).map((key: any) => (
              <tr className='body'>
                <td>{mod.moduleData.SectionName[key]?.displayValue || key}</td>
                <td>
                  {CheckBoxCell({
                    props: { dataItem: mod.moduleData.SectionName[key], field: 'enabled', key },
                    onDataChange,
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
