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

import mockArrays from "./mock-arrays";

import {
  Task
} from "./task";

import {
  cardsById
} from "../cards-by-id";

export const mockCard = function () {
  const mockData = () => {
    return {
      title: getRandomValue(mockArrays.titles),
      dueDate: gnerateMockDate(),
      tags: new Set(mockArrays.tags.slice(0, getRandomNumber(1, mockArrays.tags.length - 1))),
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: getRandomValue(colors),
      repeatingDays: repeatingDays(),
      isFavorite: getRandomValue(mockArrays.boolArray),
      isDone: getRandomValue(mockArrays.boolArray)
    };
  };

  const task = new Task(mockData());
  task.id = cardsById.newIndex;
  cardsById.add(task);
  return task;
};
