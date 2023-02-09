import { SchemaFieldDescription, SchemaInnerTypeDescription, SchemaObjectDescription } from 'yup';

export function getValidationProps(
  data: Record<string, SchemaFieldDescription>,
  props: string,
  validationName: string
): number {
  let index = 0;
  let result: number;
  const fieldNames: string[] = props.split('.').filter((el) => !Number.isInteger(+el));

  (function validate(data: Record<string, SchemaFieldDescription>): void {
    if (index < fieldNames.length - 1) {
      try {
        const innerData: Record<string, SchemaFieldDescription> = (
          (data[fieldNames[index]] as SchemaInnerTypeDescription).innerType as SchemaObjectDescription
        ).fields;
        index++;
        validate(innerData);
      } catch {
        throw Error('getValidationProps. Property does not exist');
      }
    } else {
      try {
        const i = (data[fieldNames[index]] as SchemaInnerTypeDescription).tests.findIndex(
          ({ name }) => name === validationName
        );

        result = i;
      } catch {
        throw Error('getValidationProps. Property does not exist');
      }
    }
  })(data);

  return result;
}

export function isFieldRequired(data: Record<string, SchemaFieldDescription>, props: string): boolean {
  return getValidationProps(data, props, 'required') >= 0;
}
