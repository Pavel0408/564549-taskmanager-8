export const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Случайный индекс массива
export const getRandomIndex = (arr) => {
  return getRandomNumber(0, arr.length - 1);
};

// Случайное значение из массива
export const getRandomValue = function (arr) {
  const randInd = getRandomIndex(arr);
  const val = arr[randInd];
  return val;
};
