import { Card } from '@Types/entities/card.model';
import { createSelector } from 'reselect';
import { RootState } from './../store';

const cardsEntities: (state: RootState) => Card[] = (state: RootState) => state.cards.cards;

export const cardsSelectors = {
  getCards: createSelector(cardsEntities, (cards: Card[]): Card[] => cards),
  getCardById: createSelector(
    [cardsEntities, (state: RootState, id: string) => id],
    (cards: Card[], cardId: string): Card => cards.find((card) => card.id === cardId)
  ),
};
