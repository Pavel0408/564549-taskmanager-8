import {
  mockCard
} from "./generate-mock-card";

export const generateCardsArray = (cardsNumber) => {
  const cardsArr = [];
  for (let i = 0; i < cardsNumber; i++) {
    const card = mockCard();
    cardsArr.push(card);
  }
  return cardsArr;
};
