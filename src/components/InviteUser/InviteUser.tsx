import { TextInput } from '@Common/Form/TextInput/TextInput';
import { validationMessages } from '@Constants/validation-messages-map.constant';
import { Form, Formik, FormikProps } from 'formik';
import { FC, forwardRef, useMemo, useRef } from 'react';
import { object, SchemaFieldDescription, string } from 'yup';

export type InviteUserProps = {
  onSubmit?: (e: any) => void;
};

const validationSchema = object().shape({
  email: string().email(validationMessages.email).required(validationMessages.required),
});

const InviteUser: FC<InviteUserProps> = ({ onSubmit }) => {
  const ref = useRef<FormikProps<{ email: string }>>(null);
  const validationObject: Record<string, SchemaFieldDescription> = useMemo(
    () => validationSchema.describe().fields,
    []
  );

  return (
    <Formik
      innerRef={ref}
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit={() => {}}
    >
      {() => {
        onSubmit(ref);

        return (
          <Form>
            <TextInput name="email" type="email" label="Email" validationObject={validationObject} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default InviteUser;
