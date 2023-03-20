import { FC, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Button } from '@Common/Button/Button';
import { Card } from '@Types/entities/card.model';
import { CardUI } from '@Common/CardUI/CardUI';
import { ErrorMessage, Field, FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik';
import { FieldTypeEnum } from '@Components/Field/NewField/types';
import { BaseFormFieldDisplayModel, SelectOptionDisplayModel } from '@Types/form/form-data-to-display.models';
import { object, string } from 'yup';
import { bin } from '@Icons';
import { observer } from 'mobx-react-lite';
import { useRootStoreContext } from '@App-store/mobx/store';
import { RemoveFieldsPayload } from '@App-store/mobx/types/remove-fields-payload.model';
import { AnimationsName } from '@Constants/animations-name.constant';
import { Animation } from '@Common/Animation/Animation';

type FormType = { title: string; fields: BaseFormFieldDisplayModel[] };

const CardEdit: FC = () => {
  const navigate = useNavigate();
  const { cardId, boardId } = useParams();
  const [isEditMode] = useState(cardId !== 'new');
  const [fieldsIdForRemoving, setFieldsForRemoving] = useState<string[]>([]);
  const location = useLocation();
  const {
    cards: { getCardById, createCardAsync, editCardAsync, removeFieldFromCardAsync, isLoading },
    boards: { removeFieldsFromBoardAsync },
  } = useRootStoreContext();
  const card: Card = getCardById(cardId) || (location.state as Card);

  const removeField = (id: string) => {
    setFieldsForRemoving((state) => [...state, id]);
  };

  const handleFormSubmit = (data: FormType | Pick<FormType, 'title'>) => {
    if (isEditMode) {
      if (fieldsIdForRemoving.length) {
        const payload: RemoveFieldsPayload = {
          updatedCard: { ...card, fields: (data as FormType).fields },
          boardId,
          removeFieldsId: fieldsIdForRemoving,
        };
        removeFieldFromCardAsync(payload);
        removeFieldsFromBoardAsync({ boardId, removeFieldsId: fieldsIdForRemoving });
      } else {
        editCardAsync({ ...card, ...data });
      }
    } else {
      createCardAsync({ title: data.title, boardId });
    }

    navigate(`/${AppRoutes.cards.replace(':boardId', boardId)}`);
  };

  return (
    <>
      {isLoading ? (
        <Animation animationConfig={{ style: { height: '320px' } }} animationName={AnimationsName.CIRCLE_LOADER} />
      ) : (
        <CardUI horizontalCentered classNames="w-96 flex flex-col gap-y-2 justify-center items-center py-6">
          <h4 className="font-main font-bold text-4xl text-slate-600">{isEditMode ? 'Update card' : 'Create card'}</h4>

          <Formik
            initialValues={isEditMode ? { title: card?.title, fields: card?.fields ?? [] } : { title: '' }}
            onSubmit={(values) => handleFormSubmit(values)}
            validationSchema={object({
              title: string().required('Required'),
            })}
          >
            {({ values }) => (
              <Form className="flex flex-col min-w-9/10 gap-y-4">
                <div className="field-container">
                  <label htmlFor="title">Card title</label>
                  <Field name="title" id="title" type="text" />
                  <ErrorMessage name="title" />
                </div>
                <FieldArray
                  name="fields"
                  render={(optionHelpers: FieldArrayRenderProps) => (
                    <>
                      {values.fields?.map((field: BaseFormFieldDisplayModel, i: number) => {
                        switch (field.type) {
                          case FieldTypeEnum.TEXT:
                          case FieldTypeEnum.CHECKBOX:
                            return (
                              <div
                                className={`${
                                  field.type === FieldTypeEnum.TEXT ? 'field-container' : 'flex gap-x-2 items-center'
                                }`}
                                key={field.id}
                              >
                                <label
                                  className={`${
                                    field.type === FieldTypeEnum.TEXT ? '' : 'text-slate-700 font-bold text-xl'
                                  }`}
                                  htmlFor={field.id}
                                >
                                  {field.label}
                                </label>
                                <div className="flex gap-x-2">
                                  <Field name={`fields.${i}.value`} id={field.id} type={field.type} />
                                  <Button
                                    onClickHandler={() => {
                                      removeField(field.id);
                                      optionHelpers.remove(i);
                                    }}
                                  >
                                    <img className="w-4" src={bin} alt="remove field" />
                                  </Button>
                                </div>
                              </div>
                            );

                          case FieldTypeEnum.SELECT:
                            return (
                              <div className="flex flex-col gap-y-3" key={field.id}>
                                <div className="field-container">
                                  <label htmlFor={field.id}>{field.label}</label>
                                  <div className="flex gap-x-2">
                                    <Field
                                      as="select"
                                      name={`fields.${i}.value`}
                                      id={field.id}
                                      className="bg-white px-1 py-1.5"
                                    >
                                      {field.options.map(({ id, value }) => {
                                        return (
                                          <option key={id} value={value}>
                                            {value}
                                          </option>
                                        );
                                      })}
                                    </Field>
                                    <Button
                                      onClickHandler={() => {
                                        removeField(field.id);
                                        optionHelpers.remove(i);
                                      }}
                                    >
                                      <img className="w-4" src={bin} alt="remove field" />
                                    </Button>
                                  </div>
                                </div>

                                <FieldArray
                                  name={`fields.${i}.options`}
                                  render={(nestedOptionHelpers: FieldArrayRenderProps) => (
                                    <>
                                      {field.options.map((option: SelectOptionDisplayModel, index: number) => (
                                        <div className="field-container" key={option.id}>
                                          <label className="text-slate-700 font-bold text-xl" htmlFor={option.id}>
                                            {'Option ' + (index + 1)}
                                          </label>
                                          <div className="flex gap-x-2 items-center">
                                            <Field
                                              name={`fields.${i}.options.${index}.value`}
                                              id={option.id}
                                              type="text"
                                            />
                                            {!!index && (
                                              <Button
                                                onClickHandler={() => {
                                                  removeField(option.id);
                                                  nestedOptionHelpers.remove(index);
                                                }}
                                              >
                                                <img className="w-4" src={bin} alt="remove field" />
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                />
                              </div>
                            );
                        }
                      })}
                      <div className="flex flex-col gap-y-3 mt-4 items-center">
                        <Button type="submit" primary>
                          Save
                        </Button>
                        <Button
                          classNames="w-15"
                          type="button"
                          secondary
                          onClickHandler={() => navigate(`/${AppRoutes.cards.replace(':boardId', boardId)}`)}
                        >
                          Back
                        </Button>
                      </div>
                    </>
                  )}
                />
              </Form>
            )}
          </Formik>
        </CardUI>
      )}
    </>
  );
};

export default observer(CardEdit);
