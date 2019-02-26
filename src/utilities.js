export const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// случайный индекс массива
export const getRandomIndex = (arr) => {
  return getRandomNumber(0, arr.length - 1);
};
