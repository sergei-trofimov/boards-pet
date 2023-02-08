export type FieldType = 'text' | 'checkbox' | 'select';

export type CreateFieldCTAs = {
  [key in FieldType]: {
    type: FieldType;
    title: string;
  };
};
