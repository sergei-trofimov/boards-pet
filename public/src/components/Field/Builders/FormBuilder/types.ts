import { FieldTypeEnum } from '@Components/Field/NewField/types';
import { BaseFormFieldDisplayModel } from 'src/types/form/form-data-to-display.models';

export type FormBuilderProps = {
  onSubmit: (data: BaseFormFieldDisplayModel[]) => void;
  type: FieldTypeEnum;
  handleBackBtnClick: (type: FieldTypeEnum) => void;
};
