export const checkCard = (card) => {
  if (card && card._state) {
    return true;
  }
  return false;
};
