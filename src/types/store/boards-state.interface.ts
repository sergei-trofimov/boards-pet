import { Board } from '@Types/entities/board.model';

interface BoardsState {
  boards: Board[];
  isLoading: boolean;
  error: string;
}

export default BoardsState;
