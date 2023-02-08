import { FC, useEffect, useState } from 'react';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';
import { FieldType } from './types';
import { createFieldCTAs } from '@Constants/craete-field-cta.constant';
import { useSearchParams } from 'react-router-dom';

export const NewField: FC = () => {
  const [search, setSearchParams] = useSearchParams();
  const [fieldType, setFieldType] = useState<FieldType>(null);

  useEffect(() => {
    const type = (search.get('type') as FieldType) ?? null;
    setFieldType(type);
  }, [search]);

  const handleTypeChange = (type: FieldType) => {
    setSearchParams({ type });
    setFieldType(type);
  };

  return (
    <div className="container px-10 mx-auto overflow-auto flex-grow">
      <CardUI horizontalCentered classNames="w-135 flex flex-col justify-center items-center gap-y-6 font-main py-16">
        <h4 className="font-main font-bold text-4xl text-slate-600">What field you want to create?</h4>
        <div className="flex justify-between w-full px-4">
          {Object.values(createFieldCTAs).map(({ type, title }) => (
            <Button primary classNames="max-w-36" key={type} onClickHandler={() => handleTypeChange(type)}>
              {title}
            </Button>
          ))}
        </div>
      </CardUI>
    </div>
  );
};
