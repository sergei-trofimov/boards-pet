import { Card } from '@Types/entities/card.model';

interface CardsState {
  cards: Card[];
  isLoading: boolean;
  error: string;
}

export default CardsState;
