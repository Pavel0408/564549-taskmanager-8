import {
  getRandomValue
} from "../utilities";

import mokArrays from "./mock-arrays";

export const days = {
  Monday: `Mo`,
  Tuesday: `Tu`,
  Wednesday: `We`,
  Thursday: `Th`,
  Friday: `Fr`,
  Saturday: ` Sa`,
  Sunday: `Su`
};

export const RepeatingDays = function () {
  mokArrays.repeatingDays.forEach((day) => {
    this[day] = getRandomValue(mokArrays.boolArray);
  });
};
