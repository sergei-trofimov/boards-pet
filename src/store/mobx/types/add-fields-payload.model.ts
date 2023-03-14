import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';

export type AddFieldsPayload = {
  boardId: string;
  fields: BaseFormFieldDisplayModel[];
};
