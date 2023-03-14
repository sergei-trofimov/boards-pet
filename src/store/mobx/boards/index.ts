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

  set setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  getAllBoardsAsync = async (): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const boards: Board[] = await boardsApi.getAllBoardsAsync();

      runInAction(() => {
        this.boards = boards;
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  createBoardAsync = async (title: string): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const board: Board = await boardsApi.createBoardAsync(title);

      runInAction(() => {
        this.boards.push(board);
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  removeBoardAsync = async (id: string): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      await boardsApi.removeBoardAsync(id);

      runInAction(() => {
        this.boards = this.boards.filter((board: Board) => board.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  editBoardAsync = async (board: Board): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const updatedBoard: Board = await boardsApi.editBoardAsync<Board>(board);

      runInAction(() => {
        const index = this.boards.findIndex(({ id }) => id === updatedBoard.id);

        this.boards.splice(index, 1, updatedBoard);
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  addNewFieldsAsync = async (payload: AddFieldsPayload): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const { boardId, fields } = payload;
      const board: Board = this.getBoardById(boardId);
      const relatedFields: BaseFormFieldDisplayModel[] = [...fields, ...(board?.relatedFields || [])];

      await boardsApi.editRelatedFieldsAsync({ relatedFields, id: boardId });

      runInAction(() => {
        board.relatedFields = relatedFields;
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  removeFieldsFromBoardAsync = async ({ boardId, removeFieldsId }: Omit<RemoveFieldsPayload, 'updatedCard'>): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const board: Board = this.getBoardById(boardId);
      const updatedBoardRelatedFields: BaseFormFieldDisplayModel[] = removeEntitiesByIds(
        board.relatedFields,
        removeFieldsId
      );

      await boardsApi.editRelatedFieldsAsync({ relatedFields: updatedBoardRelatedFields, id: boardId });

      runInAction(() => {
        board.relatedFields = updatedBoardRelatedFields;
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  getBoardById = (boardId: string): Board => {
    return this.boards.find(({ id }) => id === boardId);
  };

  getRelatedFieldsByFieldType = (board: Board, type: FieldTypeEnum): BaseFormFieldDisplayModel[] => {
    return (board?.relatedFields || []).filter((field: BaseFormFieldDisplayModel) => type === field.type);
  };

  private handleResponseError(error: AxiosError): void {
    this.error = error.message;
  }
}
