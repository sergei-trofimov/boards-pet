export type CardClassesType = 'horizontalCentered';

export type CardClassesMapperType = {
  [key in CardClassesType]?: string;
};

export type CardRestProps = {
  [key in CardClassesType]?: boolean;
};

export type CardProps = {
  classNames?: string;
} & CardRestProps;
