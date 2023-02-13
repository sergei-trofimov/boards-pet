import { FC } from 'react';
import { DisplayFieldCheckboxProps } from './types';

export const DisplayFieldCheckbox: FC<DisplayFieldCheckboxProps> = ({ field }) => {
  return (
    <div className="flex gap-x-2">
      <label className="font-bold" htmlFor={field.id}>
        {field.label}:
      </label>
      <input readOnly id={field.id} type={field.type} name={field.name} checked={field.value} />
    </div>
  );
};
