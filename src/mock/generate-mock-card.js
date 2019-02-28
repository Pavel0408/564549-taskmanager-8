import {
  getRandomValue,
  getRandomNumber
} from "./../utilities";

import {
  gnerateMockDate
} from "./generate-mock-date";

import {
  RepeatingDays
} from "./repeating-days";

import mokArrays from "./mock-arrays";

export const MockCard = function () {
  this.title = getRandomValue(mokArrays.titles);
  this.dueDate = gnerateMockDate();
  this.tags = new Set(mokArrays.tags.slice(0, getRandomNumber(1, mokArrays.tags.length - 1)));
  this.picture = `http://picsum.photos/100/100?r=${Math.random()}`;
  this.color = getRandomValue(mokArrays.colors);
  this.repeatingDays = new RepeatingDays();
  this.isFavorite = getRandomValue(mokArrays.boolArray);
  this.isDone = getRandomValue(mokArrays.boolArray);
};
