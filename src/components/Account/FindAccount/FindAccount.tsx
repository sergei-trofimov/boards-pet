import { Button } from '@Common/Button/Button';
import { TextInput } from '@Common/Form/TextInput/TextInput';
import { validationMessages } from '@Constants/validation-messages-map.constant';
import { Form, Formik } from 'formik';
import { FC, useMemo } from 'react';
import { object, SchemaFieldDescription, string } from 'yup';

export type FindAccountProps = {
  onSearchHandler: (id: string) => void;
};

const validationSchema = object().shape({
  id: string().required(validationMessages.required),
});

const FindAccount: FC<FindAccountProps> = ({ onSearchHandler }) => {
  const validationObject: Record<string, SchemaFieldDescription> = useMemo(
    () => validationSchema.describe().fields,
    []
  );

  const submitHandler = (id: string) => {
    onSearchHandler(id);
  };

  return (
    <div>
      <h3 className="font-bold text-4xl text-slate-800 mb-3 ml-5">Find account by id:</h3>
      <Formik
        initialValues={{ id: '' }}
        onSubmit={(values, { resetForm }) => {
          submitHandler(values.id);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({ isValid }) => {
          return (
            <Form className="flex flex-col gap-y-2 mx-auto w-96 items-center">
              <TextInput name="id" type="text" label="ID" validationObject={validationObject} />
              <Button disabled={!isValid} type="submit" primary>
                Find
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FindAccount;
