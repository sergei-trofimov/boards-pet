import { cardThunks } from '@App-store/cards/actions';
import { useAppDispatch } from '@App-store/store';
import { CardsItem } from '@Components/Card/CardsItem/CardsItem';
import { FieldTypeEnum } from '@Components/Field/NewField/types';
import { Board } from '@Types/entities/board.model';
import { Card } from '@Types/entities/card.model';
import { BaseFormFieldDisplayModel, SelectOptionDisplayModel } from '@Types/form/form-data-to-display.models';
import { FC, useCallback, useEffect, useState } from 'react';

type DragAndDropProps = {
  board: Board;
  cards: Card[];
  groupBy: string;
};

type DragAndDropOption = {
  id: string;
  value: string | boolean;
  items: Card[];
};

export const DragAndDrop: FC<DragAndDropProps> = ({ board, cards, groupBy }) => {
  const [options, setOptions] = useState<DragAndDropOption[]>(() => groupByFn(board, cards, groupBy));
  const [draggableCard, setDraggebleCard] = useState<Card>(null);
  const [dragFromBoard, setDragFromBoard] = useState<DragAndDropOption>(null);
  const dispatch = useAppDispatch();

  const dragStartHandler = (option: DragAndDropOption, item: Card) => {
    setDraggebleCard(item);
    setDragFromBoard(option);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragFromBoard(null);
  };

  useEffect(() => {
    setOptions(() => groupByFn(board, cards, groupBy));
  }, [board, cards, groupBy]);

  const dropBoardHandler = (e: React.DragEvent<HTMLDivElement>, option: DragAndDropOption) => {
    e.preventDefault();

    if (dragFromBoard === option) {
      return;
    }

    const updatedOptions = updateDragAndDropOptions(options, option, draggableCard);
    const updatedCard: Card = updateCardValue(option, draggableCard, groupBy);

    dispatch(cardThunks.editCard(updatedCard));
    setDraggebleCard(null);
    setOptions(updatedOptions);
  };

  const createTitle = useCallback((value: string | boolean): string => {
    if (typeof value === 'string') {
      return value;
    } else {
      return value ? 'Checked' : 'Unchecked';
    }
  }, []);

  return (
    <div className="grid grid-cols-auto grid-rows-min-h auto-rows-m gap-5 py-3">
      {options.map((option) => {
        return (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => dropBoardHandler(e, option)}
            className="py-2 px-3 flex flex-col items-center border border-gray-300 rounded-xl"
            key={option.id}
          >
            <h4 className="font-main font-bold text-slate-800 text-4xl">{createTitle(option.value)}</h4>
            <span className="block h-px w-9/10 px-3 bg-gray-300 mb-2"></span>
            {option.items.map((item) => {
              return (
                <div
                  draggable
                  className="w-full mt-3"
                  key={item.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDragStart={() => dragStartHandler(option, item)}
                  onDragEnd={(e) => dragEndHandler(e)}
                >
                  <CardsItem card={item} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const updateCardValue = (dropOnOption: DragAndDropOption, draggableCard: Card, groupBy: string): Card => {
  const fields: BaseFormFieldDisplayModel[] = structuredClone(draggableCard).fields.map((field) => {
    if (field.name === groupBy) {
      field.value = dropOnOption.value;
    }

    return field;
  });

  return { ...draggableCard, fields };
};

const updateDragAndDropOptions = (
  options: DragAndDropOption[],
  dropOnOption: DragAndDropOption,
  draggableCard: Card
): DragAndDropOption[] => {
  const updatedOptions: DragAndDropOption[] = structuredClone(options).map((option) => {
    option.items = option.items.filter((opt) => opt.id !== draggableCard.id);
    option.id === dropOnOption.id && option.items.push(draggableCard);

    return option;
  });

  return updatedOptions;
};

const groupByFn = (board: Board, cards: Card[], groupBy: string): DragAndDropOption[] => {
  const fieldForGroup: BaseFormFieldDisplayModel = board.relatedFields.find(({ name }) => name === groupBy);

  let options: DragAndDropOption[];

  if (fieldForGroup.type === FieldTypeEnum.SELECT) {
    options = fieldForGroup.options.map((option: SelectOptionDisplayModel): DragAndDropOption => {
      const items = cards.filter((card): boolean => {
        const cardOption: BaseFormFieldDisplayModel = card.fields.find((cardField) => cardField.name === groupBy);

        return cardOption.value === option.value;
      });

      return { ...option, items };
    });
  }

  if (fieldForGroup.type === FieldTypeEnum.CHECKBOX) {
    options = [
      { id: 'unchecked', value: false, items: [] },
      { id: 'checked', value: true, items: [] },
    ];

    cards.forEach((card) => {
      card.fields.forEach((field) => {
        if (field.name === groupBy) {
          options[Number(field.value)].items.push(card);
        }
      });
    });
  }

  return options;
};
