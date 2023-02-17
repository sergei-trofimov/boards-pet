import { Button } from '@Common/Button/Button';
import { TextInput } from '@Common/Form/TextInput/TextInput';
import { validationMessages } from '@Constants/validation-messages-map.constant';
import { OptionModel, SelectFormDefaultValue } from '@Helpers/forms/forms-api';
import { bin } from '@Icons';
import { FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik';
import { FC, useMemo } from 'react';
import { array, object, SchemaFieldDescription, string } from 'yup';
import { SelectBuilderProps, SelectFormType } from './types';

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
  const validationObject: Record<string, SchemaFieldDescription> = useMemo(
    () => validationSchema.describe().fields,
    []
  );

  const initialSelectFormValues: SelectFormType = {
    fields: [new SelectFormDefaultValue()],
  };

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
                <fieldset className="flex flex-col mb-2">
                  {values.fields.map((field: SelectFormDefaultValue, i: number) => (
                    <div className="mb-4" key={field.id}>
                      <TextInput
                        name={`fields.${i}.field`}
                        type="text"
                        label="Name of select"
                        validationObject={validationObject}
                        className="mb-3"
                      />
                      <FieldArray
                        name={`fields.${i}.options`}
                        render={(optionHelpers: FieldArrayRenderProps) => (
                          <>
                            <fieldset className="flex flex-col gap-y-2">
                              {field.options.map((option: OptionModel, index: number) => (
                                <div className="flex w-full gap-x-1.5 items-end" key={option.id}>
                                  <TextInput
                                    name={`fields.${i}.options.${index}.option`}
                                    type="text"
                                    label="Name of option"
                                    validationObject={validationObject}
                                    className={!index && 'w-9/10'}
                                  />
                                  {index ? (
                                    <Button
                                      type="button"
                                      classNames="w-1/10 pb-2"
                                      onClickHandler={() => optionHelpers.remove(index)}
                                    >
                                      <img src={bin} alt="remove field" className="w-full px-2" />
                                    </Button>
                                  ) : null}
                                </div>
                              ))}
                              <Button
                                type="button"
                                classNames="mt-3"
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
