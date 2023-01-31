import { ButtonClassesMapperType, ButtonProps, ButtonRole } from './types';
import { FC, PropsWithChildren } from 'react';
import { buildClassesByAttributes } from '@Utils/build-classes-by-attributes.function';
import { twMerge } from 'tailwind-merge';

const ButtonClassesMapper: ButtonClassesMapperType = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  horizontalCentered: 'mx-auto',
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  classNames,
  type = 'button',
  onClickHandler,
  ...rest
}) => {
  const classesByAttributes: string = buildClassesByAttributes<ButtonRole>(rest, ButtonClassesMapper);
  const classes = twMerge(`${classNames || ''} ${classesByAttributes}`.trim());

  return (
    <button type={type} className={classes} onClick={onClickHandler || null}>
      {children}
    </button>
  );
};
