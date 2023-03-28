import { SelectFormDefaultValue } from '@Helpers/forms/forms-api';

export type SelectFormType = {
  fields: SelectFormDefaultValue[];
};

export type SelectBuilderProps = {
  onSubmit: (data: SelectFormType) => void;
};
