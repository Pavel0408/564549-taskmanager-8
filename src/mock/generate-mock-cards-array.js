import {
  mockCard
} from "./generate-mock-card";

export const generateCardsArray = (cardsNumber) => {
  return new Array(cardsNumber)
    .fill(``)
    .map(mockCard);
};
