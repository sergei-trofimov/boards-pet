import { FieldTypeEnum } from '@Components/Field/NewField/types';
import { BoardsApi } from '@Helpers/api/boards-api';
import { Board } from '@Types/entities/board.model';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';
import { removeEntitiesByIds } from '@Utils/remove-entities-by-ids.function';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { AddFieldsPayload } from '../types/add-fields-payload.model';
import { RemoveFieldsPayload } from '../types/remove-fields-payload.model';

const boardsApi = BoardsApi.Instance;

export class BoardsStore {
  boards: Board[] = [];
  isLoading = false;
  error: string = null;

  constructor() {
    makeAutoObservable(this);
  }

  getAllBoardsAsync = async (): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const boards: Board[] = await boardsApi.getAllBoardsAsync();

      runInAction(() => {
        this.isLoading = false;
        this.boards = boards;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  createBoardAsync = async (title: string): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const board: Board = await boardsApi.createBoardAsync(title);

      runInAction(() => {
        this.isLoading = false;
        this.boards.push(board);
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  removeBoardAsync = async (id: string): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      await boardsApi.removeBoardAsync(id);

      runInAction(() => {
        this.isLoading = false;
        this.boards = this.boards.filter((board: Board) => board.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  editBoardAsync = async (board: Board): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const updatedBoard: Board = await boardsApi.editBoardAsync<Board>(board);

      runInAction(() => {
        this.isLoading = false;
        const index = this.boards.findIndex(({ id }) => id === updatedBoard.id);

        this.boards.splice(index, 1, updatedBoard);
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  addNewFieldsAsync = async (payload: AddFieldsPayload): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const { boardId, fields } = payload;
      const board: Board = this.getBoardById(boardId);
      const relatedFields: BaseFormFieldDisplayModel[] = [...fields, ...(board?.relatedFields || [])];

      await boardsApi.editRelatedFieldsAsync({ relatedFields, id: boardId });

      runInAction(() => {
        this.isLoading = false;
        board.relatedFields = relatedFields;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  removeFieldsFromBoardAsync = async (payload: Omit<RemoveFieldsPayload, 'updatedCard'>): Promise<void> => {
    this.isLoading = true;
    this.error = null;

    try {
      const { boardId, removeFieldsId } = payload;

      const board: Board = this.getBoardById(boardId);
      const updatedBoardRelatedFields: BaseFormFieldDisplayModel[] = removeEntitiesByIds(
        board.relatedFields,
        removeFieldsId
      );

      await boardsApi.editRelatedFieldsAsync({ relatedFields: updatedBoardRelatedFields, id: boardId });

      runInAction(() => {
        this.isLoading = false;
        board.relatedFields = updatedBoardRelatedFields;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = (error as AxiosError).message;
      });
    }
  };

  getBoardById = (boardId: string): Board => {
    return this.boards.find(({ id }) => id === boardId);
  };

  getRelatedFieldsByFieldType = (board: Board, type: FieldTypeEnum): BaseFormFieldDisplayModel[] => {
    return (board?.relatedFields || []).filter((field: BaseFormFieldDisplayModel) => type === field.type);
  };
}
