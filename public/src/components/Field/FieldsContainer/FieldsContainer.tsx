import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';
import { FC } from 'react';
import { DisplayFieldCheckbox } from '../DisplayFieldCheckbox/DisplayFieldCheckbox';
import { DisplayFieldText } from '../DisplayFieldText/DisplayFieldText';
import { FieldTypeEnum } from '../NewField/types';
import { FieldsContainerProps } from './types';

export const FieldsContainer: FC<FieldsContainerProps> = ({ card }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {card.fields.map((field: BaseFormFieldDisplayModel<string | boolean>) => {
        switch (field.type) {
          case FieldTypeEnum.TEXT:
          case FieldTypeEnum.SELECT:
            return <DisplayFieldText key={field.id} field={field as BaseFormFieldDisplayModel<string>} />;

          case FieldTypeEnum.CHECKBOX:
            return <DisplayFieldCheckbox key={field.id} field={field as BaseFormFieldDisplayModel<boolean>} />;
        }
      })}
    </div>
  );
};
