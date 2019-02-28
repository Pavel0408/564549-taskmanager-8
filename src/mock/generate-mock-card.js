import {
  getRandomValue,
  getRandomNumber
} from "./../utilities";

import {
  gnerateMockDate
} from "./generate-mok-date";

import {
  RepeatingDays
} from "./repeating-days";

import mokArrays from "./mock-arrays";

export const mockCard = function () {
  return {
    title: getRandomValue(mokArrays.titles),
    dueDate: gnerateMockDate(),
    tags: new Set(mokArrays.tags.slice(0, getRandomNumber(1, mokArrays.tags.length - 1))),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: getRandomValue(mokArrays.colors),
    repeatingDays: new RepeatingDays(),
    isFavorite: getRandomValue(mokArrays.boolArray),
    isDone: getRandomValue(mokArrays.boolArray)
  };
};
