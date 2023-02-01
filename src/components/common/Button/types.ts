import { SyntheticEvent } from 'react';

export type ButtonRole = 'primary' | 'secondary' | 'horizontalCentered';

export type ButtonClassesMapperType = {
  [key in ButtonRole]?: string;
};

export type ButtonRestProps = {
  [key in ButtonRole]?: boolean;
};

export type ButtonProps = {
  classNames?: string;
  loading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClickHandler?: (event?: SyntheticEvent<HTMLButtonElement, MouseEvent>) => void;
} & ButtonRestProps;
