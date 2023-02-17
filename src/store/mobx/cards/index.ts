/* eslint-disable prefer-const */
import { BoardsApi } from '@Helpers/api/boards-api';
import { CardsApi } from '@Helpers/api/cards-api';
import { FieldsApi } from '@Helpers/api/fields-api';
import { Board } from '@Types/entities/board.model';
import { Card, CardRequestPayload } from '@Types/entities/card.model';
import { removeEntitiesByIds } from '@Utils/remove-entities-by-ids.function';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../store';
import { AddFieldsPayload } from '../types/add-fields-payload.model';
import { RemoveFieldsPayload } from '../types/remove-fields-payload.model';

const cardsApi = CardsApi.Instance;
const boardsApi = BoardsApi.Instance;
const fieldsApi = FieldsApi.Instance;

export class CardsStore {
  cards: Card[] = [];
  isLoading = false;
  error: string = null;

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  createCardAsync = async ({ title, boardId }: Pick<Card, 'title' | 'boardId'>): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      let { id, relatedCardsId, relatedFields }: Board = this.root.boards.getBoardById(boardId);
      const payload: CardRequestPayload = new Card(title, boardId, relatedFields);
      const card: Card = await cardsApi.createCardAsync(payload, id);
      const relatedIds: string[] = (relatedCardsId ?? []).concat(card.id);

      await boardsApi.editRelatedCardsIdAsync({ id, relatedCardsId: relatedIds });

      runInAction(() => {
        this.isLoading = false;
        this.cards.push(card);

        relatedCardsId ? relatedCardsId.push(card.id) : (relatedCardsId = [card.id]);
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  fetchCardsByBoardIdAsync = async (boardId: string): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const cards: Card[] = await cardsApi.getCardsByBoardIdAsync(boardId);

      runInAction(() => {
        this.isLoading = false;
        this.cards = cards;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  editCardAsync = async (card: Card): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const updatedCard: Card = await cardsApi.editCardAsync(card);

      runInAction(() => {
        this.isLoading = false;
        this.cards = this.cards.updateItem(updatedCard);
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  deleteCardAsync = async (card: Card): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      await cardsApi.deleteCardAsync(card);
      const board: Board = this.root.boards.getBoardById(card.boardId);
      const relatedIds: string[] = board.relatedCardsId.filter((cardId) => cardId !== card.id);
      await boardsApi.editRelatedCardsIdAsync({ id: board.id, relatedCardsId: relatedIds });

      runInAction(() => {
        this.isLoading = false;
        this.cards = this.cards.filter(({ id }) => id !== card.id);
        board.relatedCardsId = board.relatedCardsId.filter((cardId) => cardId !== card.id);
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  addFieldsToCardsAsync = async (payload: AddFieldsPayload): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const { boardId, fields } = payload;
      const updatedCards: Card[] = this.cards.map((card: Card) => ({
        ...card,
        fields: [...(card?.fields || []), ...fields],
      }));

      await fieldsApi.editFieldsAsync(boardId, updatedCards);

      runInAction(() => {
        this.isLoading = false;
        this.cards = updatedCards;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  removeFieldFromCardAsync = async (payload: RemoveFieldsPayload): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const { boardId, removeFieldsId, updatedCard } = payload;
      const updatedCards: Card[] = this.cards.map((card: Card) => {
        return card.id === updatedCard.id
          ? updatedCard
          : {
              ...card,
              fields: removeEntitiesByIds(card.fields, removeFieldsId),
            };
      });

      await fieldsApi.editFieldsAsync(boardId, updatedCards);

      runInAction(() => {
        this.isLoading = false;
        this.cards = updatedCards;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  getCardById = (id: string): Card => {
    const card: Card = this.cards.find((card) => card.id === id);
    return card;
  };
}
