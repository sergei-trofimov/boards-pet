import { FieldTypeEnum } from '@Components/Field/NewField/types';

export interface SelectOptionDisplayModel {
  id: string;
  value: string;
  selected: boolean;
}

export interface BaseFormFieldDisplayModel<V extends string | boolean = any> {
  id: string;
  type: FieldTypeEnum;
  name: string;
  label: string;
  value: V extends string | boolean ? V : null;
  options?: V extends null ? SelectOptionDisplayModel[] : null;
}
