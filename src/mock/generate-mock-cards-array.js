import {
  MockCard
} from "./generate-mock-card";

export const generateCardsArray = (cardsNumber) => {
  const cardsArr = [];
  for (let i = 0; i < cardsNumber; i++) {
    const card = new MockCard();
    cardsArr.push(card);
  }
  return cardsArr;
};
