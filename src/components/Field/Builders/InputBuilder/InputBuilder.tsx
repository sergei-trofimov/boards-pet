import { Button } from '@Common/Button/Button';
import { TextInput } from '@Common/Form/TextInput/TextInput';
import { validationMessages } from '@Constants/validation-messages-map.constant';
import { InputFormDefaultValue } from '@Helpers/forms/forms-api';
import { FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik';
import { FC, useMemo } from 'react';
import { array, object, SchemaFieldDescription, string } from 'yup';
import { InputBuilderProps, InputFormType } from './types';

const initilalInputFormValue: InputFormType = {
  fields: [new InputFormDefaultValue()],
};

const validationSchema = object().shape({
  fields: array().of(
    object().shape({
      field: string().required(validationMessages.required),
    })
  ),
});

export const InputBuilder: FC<InputBuilderProps> = ({ onSubmit }) => {
  const validationObject: Record<string, SchemaFieldDescription> = useMemo(
    () => validationSchema.describe().fields,
    []
  );

  return (
    <Formik
      initialValues={initilalInputFormValue}
      validationSchema={validationSchema}
      onSubmit={(values: InputFormType) => onSubmit(values)}
      render={({ values }) => (
        <Form className="flex flex-col gap-y-6 w-4/5">
          <FieldArray
            name="fields"
            render={(helpers: FieldArrayRenderProps) => (
              <>
                <fieldset className="flex flex-col gap-y-3">
                  {values.fields.map((field: InputFormDefaultValue, i: number) => {
                    return (
                      <TextInput
                        key={field.id}
                        name={`fields.${i}.field`}
                        type="text"
                        label="Name of field"
                        validationObject={validationObject}
                      />
                    );
                  })}
                </fieldset>
                <div className="flex flex-col gap-y-2">
                  <Button type="submit" horizontalCentered primary>
                    Save
                  </Button>
                  <Button
                    type="button"
                    horizontalCentered
                    primary
                    onClickHandler={() => helpers.push(new InputFormDefaultValue())}
                  >
                    Create one more
                  </Button>
                </div>
              </>
            )}
          />
        </Form>
      )}
    ></Formik>
  );
};
