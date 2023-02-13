import { FC } from 'react';
import { DisplayFieldTextProps } from './types';

export const DisplayFieldText: FC<DisplayFieldTextProps> = ({ field }) => {
  return (
    <div>
      <span className="font-bold">{field.label}:</span>
      <span>{field.value}</span>
    </div>
  );
};
