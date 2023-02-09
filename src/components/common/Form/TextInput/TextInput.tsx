/* eslint-disable quotes */
import { isFieldRequired } from '@Utils/get-validation-props.function';
import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import { FC, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { SchemaFieldDescription } from 'yup';

type TextInputProps = {
  label: string;
  validationObject: Record<string, SchemaFieldDescription>;
} & FieldHookConfig<string>;

export const TextInput: FC<TextInputProps> = ({ label, validationObject, className, ...props }) => {
  const [field] = useField(props);
  const isRequired = useMemo(() => isFieldRequired(validationObject, props.name), [validationObject, props.name]);
  const inputClasses = twMerge(`form-label__input ${className}`);

  return (
    <>
      <label className="form-label w-full">
        <span className={`form-label__title ${isRequired && `form-label__title--required after:content-['*']`}`}>
          {label}
        </span>
        <Field className={inputClasses} {...field} {...props} />
        <ErrorMessage name={props.name} component="span" className="validation-error !text-start" />
      </label>
    </>
  );
};
