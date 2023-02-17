import { InputFormDefaultValue } from '@Helpers/forms/forms-api';

export type InputFormType = {
  fields: InputFormDefaultValue[];
};

export type InputBuilderProps = {
  onSubmit: (data: InputFormType) => void;
};
