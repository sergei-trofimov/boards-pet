export enum FieldTypeEnum {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
}

export type CreateFieldCTAs = {
  [key in FieldTypeEnum]: {
    type: FieldTypeEnum;
    title: string;
  };
};
