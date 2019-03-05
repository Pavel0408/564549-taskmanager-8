import {
  getRandomNumber
} from "../utilities";

export const gnerateMockDate = () => {
  const MS_IN_WEEK = 1000 * 60 * 60 * 24 * 7;
  const dateNow = new Date();
  return new Date(getRandomNumber(dateNow.getTime() - MS_IN_WEEK, dateNow.getTime() + MS_IN_WEEK));
};
