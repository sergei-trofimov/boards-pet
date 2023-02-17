import { FC } from 'react';
import { DisplayFieldTextProps } from './types';

export const DisplayFieldText: FC<DisplayFieldTextProps> = ({ field }) => {
  return (
    <div className="flex gap-x-2 items-center">
      <span className="font-bold text-3xl">{field.label}:</span>
      <span>{field.value}</span>
    </div>
  );
};
