import { Button } from '@Common/Button/Button';
import { TextInput } from '@Common/Form/TextInput/TextInput';
import { Form, Formik } from 'formik';
import { FC, useMemo } from 'react';
import { object, SchemaFieldDescription, string } from 'yup';

type NewAccountProps = {
  onSubmit: (name: string, password: string) => void;
};

const validationSchema = object({
  name: string().required('Required'),
  password: string().required('Required'),
});

const NewAccount: FC<NewAccountProps> = ({ onSubmit }) => {
  const validationObject: Record<string, SchemaFieldDescription> = useMemo(
    () => validationSchema.describe().fields,
    []
  );

  return (
    <Formik
      initialValues={{ name: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={({ name, password }) => {
        onSubmit(name, password);
      }}
    >
      {() => (
        <Form className="flex flex-col gap-y-2 mx-auto">
          <TextInput name="name" type="text" label="Account Name" validationObject={validationObject} />
          <TextInput name="password" type="password" label="Password" validationObject={validationObject} />

          <Button type="submit" horizontalCentered primary classNames="mt-4">
            Add an Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewAccount;
