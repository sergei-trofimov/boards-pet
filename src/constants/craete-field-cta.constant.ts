import { CreateFieldCTAs, FieldTypeEnum } from '@Components/Field/NewField/types';

export const createFieldCTAs: CreateFieldCTAs = {
  text: {
    type: FieldTypeEnum.TEXT,
    title: 'Text',
  },
  checkbox: {
    type: FieldTypeEnum.CHECKBOX,
    title: 'Checkbox',
  },
  select: {
    type: FieldTypeEnum.SELECT,
    title: 'Select',
  },
};
