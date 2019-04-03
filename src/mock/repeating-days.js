import {
  getRandomValue
} from "../utilities";

import {
  repeatingDays as repeatingDaysArr
} from "../constats";

import moсkArrays from "./mock-arrays";

export const days = {
  Monday: `mo`,
  Tuesday: `tu`,
  Wednesday: `we`,
  Thursday: `th`,
  Friday: `fr`,
  Saturday: `sa`,
  Sunday: `su`
};

export const daysShort = {
  Mo: `Monday`,
  Tu: `Tuesday`,
  We: `Wednesday`,
  Th: `Thursday`,
  Fr: `Friday`,
  Sa: `Saturday`,
  Su: `Sunday`
};

export const repeatingDays = function () {
  const daysObject = {};
  repeatingDaysArr.forEach((day) => {
    daysObject[day] = getRandomValue(moсkArrays.boolArray);
  });
  return daysObject;
};
