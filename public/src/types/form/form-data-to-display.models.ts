import { FieldTypeEnum } from '@Components/Field/NewField/types';

export interface SelectOptionDisplayModel {
  id: string;
  value: string;
}

export interface BaseFormFieldDisplayModel<V extends string | boolean = any> {
  id: string;
  type: FieldTypeEnum;
  name: string;
  label: string;
  value: V;
  options?: SelectOptionDisplayModel[];
}
