import React from 'react';

export interface DropDownProps {
  className?: string;
  data: any;
  onSelect: any;
  value: string;
  name: string;
  id?: string;
  defaultValue?: string;
}

export default function DropDownList({
  name,
  className,
  data,
  onSelect,
  value,
  id,
  defaultValue,
}: DropDownProps): JSX.Element {
  return (
    <select className={className} id={id} onChange={onSelect} value={value} name={name}>
      <option value=''>{defaultValue}</option>
      {data.map((e: any) => (
        <option value={e.name}>{e.name}</option>
      ))}
    </select>
  );
}
