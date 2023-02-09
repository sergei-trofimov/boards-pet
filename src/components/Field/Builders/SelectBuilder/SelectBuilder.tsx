import { Button } from '@Common/Button/Button';
import { TextInput } from '@Common/Form/TextInput/TextInput';
import { validationMessages } from '@Constants/validation-messages-map.constant';
import { OptionModel, SelectFormDefaultValue } from '@Helpers/forms/forms-api';
import { FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik';
import { FC } from 'react';
import { array, object, string } from 'yup';
import { SelectBuilderProps, SelectFormType } from './types';

const initialSelectFormValues: SelectFormType = {
  fields: [new SelectFormDefaultValue()],
};

const validationSchema = object().shape({
  fields: array().of(
    object().shape({
      field: string().required(validationMessages.required),
      options: array().of(
        object().shape({
          option: string().required(validationMessages.required),
        })
      ),
    })
  ),
});

export const SelectBuilder: FC<SelectBuilderProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialSelectFormValues}
      validationSchema={validationSchema}
      onSubmit={(values: SelectFormType) => onSubmit(values)}
      render={({ values }) => (
        <Form className="flex flex-col gap-y-6 w-4/5">
          <FieldArray
            name="fields"
            render={(fieldHelpers: FieldArrayRenderProps) => (
              <>
                <fieldset className="flex flex-col gap-y-3">
                  {values.fields.map((field: SelectFormDefaultValue, i: number) => (
                    <div key={field.id}>
                      <TextInput name={`fields.${i}.field`} type="text" label="Name of field" />
                      <FieldArray
                        name={`fields.${i}.options`}
                        render={(optionHelpers: FieldArrayRenderProps) => (
                          <>
                            <fieldset className="flex flex-col gap-y-3">
                              {field.options.map((option: OptionModel, index: number) => (
                                <TextInput
                                  key={option.id}
                                  name={`fields.${i}.options.${index}.option`}
                                  type="text"
                                  label="Name of option"
                                />
                              ))}
                              <Button
                                type="button"
                                horizontalCentered
                                primary
                                onClickHandler={() => optionHelpers.push(new OptionModel())}
                              >
                                Add Option
                              </Button>
                            </fieldset>
                          </>
                        )}
                      />
                    </div>
                  ))}
                </fieldset>
                <div className="flex flex-col gap-y-2">
                  <Button type="submit" horizontalCentered primary>
                    Save
                  </Button>
                  <Button
                    type="button"
                    horizontalCentered
                    primary
                    onClickHandler={() => fieldHelpers.push(new SelectFormDefaultValue())}
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
