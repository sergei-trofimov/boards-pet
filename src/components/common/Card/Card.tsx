import { CardClassesMapperType, CardClassesType, CardProps } from './types';
import { FC, PropsWithChildren } from 'react';
import { buildClassesByAttributes } from '@Utils/build-classes-by-attributes.function';
import { twMerge } from 'tailwind-merge';

const CardClassesMapper: CardClassesMapperType = {
  horizontalCentered: 'mx-auto',
};

export const Card: FC<PropsWithChildren<CardProps>> = ({ children, classNames, onClickHandler, ...rest }) => {
  const defaultClasses = `bg-slate-100 rounded-3xl py-2 px-3 ${classNames || ''}`;
  const classesByAttributes: string = buildClassesByAttributes<CardClassesType>(rest, CardClassesMapper);
  const classes = twMerge(`${defaultClasses} ${classesByAttributes}`.trim());

  return (
    <div className={classes} onClick={onClickHandler}>
      {children}
    </div>
  );
};
