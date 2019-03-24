export const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Случайный индекс массива
export const getRandomIndex = (arr) => {
  return getRandomNumber(0, arr.length - 1);
};

// Уникальное значение из массива
export const getUniqueValue = function (arr) {
  const randInd = getRandomIndex(arr);
  return arr.splice([randInd], 1);
};

// Случайное значение из массива
export const getRandomValue = (arr) => {
  return arr[getRandomIndex(arr)];
};

export const generateEndAndStartWeek = () => {
  let msInDay = 1000 * 60 * 60 * 24;
  let monday = new Date();
  let sunday = new Date();


  while (monday.getDay() !== 1) {
    monday = new Date(monday.getTime() - msInDay);
  }

  while (sunday.getDay() !== 0) {
    sunday = new Date(sunday.getTime() + msInDay);
  }

  return {
    sunday,
    monday
  };
};
