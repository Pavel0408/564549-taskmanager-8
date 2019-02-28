import {
  getRandomValue
} from "../utilities";

import mokArrays from "./mock-arrays";

export const RepeatingDays = function () {
  mokArrays.repeatingDays.forEach((day) => {
    this[day] = getRandomValue(mokArrays.boolArray);
  });
};
