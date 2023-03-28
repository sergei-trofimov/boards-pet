import { CardRestProps } from '@Common/CardUI/types';

export type CreateNewItemsProps = {
  onClickHandler: () => void;
  cardClasses?: string;
} & CardRestProps;
