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

export const repeatingDays = function () {
  const daysObject = {};
  mokArrays.repeatingDays.forEach((day) => {
    daysObject[day] = getRandomValue(mokArrays.boolArray);
  });
  return daysObject;
};
