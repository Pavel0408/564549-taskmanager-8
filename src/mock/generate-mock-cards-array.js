import {
  mockCard
} from "./generate-mock-card";

export const generateCardsArray = (cardsNumber) => {
  const cardsArr = new Array(cardsNumber);
  cardsArr.fill(1);
  return cardsArr.map(() => {
    return mockCard();
  });
};
