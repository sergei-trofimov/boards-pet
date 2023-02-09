import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import { FC } from 'react';

type TextInputProps = {
  label: string;
} & FieldHookConfig<string>;

export const TextInput: FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="form-label">
        <span className="form-label__title">{label}</span>
        <Field className="form-label__input" {...field} {...props} />
        <ErrorMessage name={props.name} component="span" className="validation-error !text-start" />
      </label>
    </>
  );
};
