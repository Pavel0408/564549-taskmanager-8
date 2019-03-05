import {
  getRandomValue
} from "../utilities";

import {
  repeatingDays as repeatingDaysArr
} from "../constats";

import moсkArrays from "./mock-arrays";

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
  repeatingDaysArr.forEach((day) => {
    daysObject[day] = getRandomValue(moсkArrays.boolArray);
  });
  return daysObject;
};
