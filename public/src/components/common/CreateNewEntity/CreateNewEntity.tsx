import { FC, PropsWithChildren } from 'react';
import { CardUI } from '@Common/CardUI/CardUI';
import { CreateNewItemsProps } from './types';
import { add } from '@Icons';

export const CreateNewEntity: FC<PropsWithChildren<CreateNewItemsProps>> = ({
  onClickHandler,
  cardClasses,
  children,
  ...rest
}) => {
  return (
    <CardUI classNames={cardClasses} onClickHandler={onClickHandler} {...rest}>
      {children}
      <img src={add} className="w-10 text-blue-500" alt="create new entity" />
    </CardUI>
  );
};
