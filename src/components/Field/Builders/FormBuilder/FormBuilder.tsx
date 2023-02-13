import { Button } from '@Common/Button/Button';
import { FieldTypeEnum } from '@Components/Field/NewField/types';
import { InputFormDefaultValue } from '@Helpers/forms/forms-api';
import { FC } from 'react';
import { BaseFormFieldDisplayModel, SelectOptionDisplayModel } from 'src/types/form/form-data-to-display.models';
import { InputBuilder } from '../InputBuilder/InputBuilder';
import { InputFormType } from '../InputBuilder/types';
import { SelectBuilder } from '../SelectBuilder/SelectBuilder';
import { SelectFormType } from '../SelectBuilder/types';
import { FormBuilderProps } from './types';

export const FormBuilder: FC<FormBuilderProps> = ({ type, onSubmit, handleBackBtnClick }) => {
  const handleSelectData = (data: SelectFormType) => {
    const result: BaseFormFieldDisplayModel<string>[] = data.fields.map(({ id, field, options }) => {
      const handleOptions: SelectOptionDisplayModel[] = options.map(({ id, option }) => ({
        id,
        value: option,
      }));

      return { id, type, name: field, label: field, options: handleOptions, value: options[0].option as string };
    });

    onSubmit(result);
  };

  const handleInputData = (data: InputFormType) => {
    const result: BaseFormFieldDisplayModel<string | boolean>[] = data.fields.map(
      ({ id, field }: InputFormDefaultValue) => ({
        id,
        type,
        name: field,
        label: field,
        value: type === FieldTypeEnum.CHECKBOX ? false : '',
      })
    );

    onSubmit(result);
  };

  const content =
    type === FieldTypeEnum.SELECT ? (
      <SelectBuilder onSubmit={handleSelectData} />
    ) : (
      <InputBuilder onSubmit={handleInputData} />
    );

  return (
    <>
      {content}
      <Button secondary horizontalCentered onClickHandler={() => handleBackBtnClick(null)}>
        Back
      </Button>
    </>
  );
};
