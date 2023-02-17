import { FC, useEffect, useState } from 'react';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';
import { FieldTypeEnum } from './types';
import { createFieldCTAs } from '@Constants/craete-field-cta.constant';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FormBuilder } from '../Builders/FormBuilder/FormBuilder';
import { BaseFormFieldDisplayModel } from 'src/types/form/form-data-to-display.models';
import { useAppDispatch } from '@App-store/store';
import { feidlsThunks } from '@App-store/fields/actions';

const Type = 'type';

export const NewField: FC = () => {
  const [search, setSearchParams] = useSearchParams();
  const [fieldType, setFieldType] = useState<FieldTypeEnum>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();

  useEffect(() => {
    const type = (search.get(Type) as FieldTypeEnum) ?? null;
    setFieldType(type);
  }, [search]);

  const handleTypeChange = (type: FieldTypeEnum) => {
    if (!type) {
      search.delete(Type);
      setSearchParams(search);
    } else {
      setSearchParams({ type });
    }

    setFieldType(type);
  };

  const handleFormSubmit = (data: BaseFormFieldDisplayModel[]) => {
    dispatch(feidlsThunks.addField({ boardId, fields: data }));
    navigate('..');
  };

  return (
    <div className="container px-10 mx-auto overflow-auto flex-grow">
      <CardUI
        horizontalCentered
        classNames="w-135 flex flex-col justify-center items-center gap-y-6 font-main py-16 relative"
      >
        {!fieldType ? (
          <>
            <h4 className="font-main font-bold text-4xl text-slate-600">What field you want to create?</h4>
            <div className="flex justify-between w-full px-4">
              {Object.values(createFieldCTAs).map(({ type, title }) => (
                <Button primary classNames="max-w-36" key={type} onClickHandler={() => handleTypeChange(type)}>
                  {title}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <FormBuilder type={fieldType} onSubmit={handleFormSubmit} handleBackBtnClick={handleTypeChange} />
        )}
      </CardUI>
    </div>
  );
};
