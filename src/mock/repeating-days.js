import {
  getRandomIndex
} from "./../utilities";

import mokArrays from "./mock-arrays";

export const RepeatingDays = function () {
  mokArrays.repeatingDays.forEach((day) => {
    this[day] = mokArrays.boolArray[getRandomIndex(mokArrays.boolArray)];
  });
};
