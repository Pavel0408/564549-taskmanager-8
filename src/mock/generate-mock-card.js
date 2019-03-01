import {
  getRandomValue,
  getRandomNumber
} from "../utilities";

import {
  gnerateMockDate
} from "./generate-mock-date";

import {
  repeatingDays
} from "./repeating-days";

import {
  colors
} from "../constats";

import mokArrays from "./mock-arrays";

export const mockCard = function () {
  return {
    title: getRandomValue(mokArrays.titles),
    dueDate: gnerateMockDate(),
    tags: new Set(mokArrays.tags.slice(0, getRandomNumber(1, mokArrays.tags.length - 1))),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: getRandomValue(colors),
    repeatingDays: repeatingDays(),
    isFavorite: getRandomValue(mokArrays.boolArray),
    isDone: getRandomValue(mokArrays.boolArray)
  };
};
