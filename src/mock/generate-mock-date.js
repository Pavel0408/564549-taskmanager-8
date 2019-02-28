import {
  getRandomNumber
} from '../utilities';
export const gnerateMockDate = () => {
  const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
  const dateNow = new Date();
  return new Date(getRandomNumber(+dateNow - MS_IN_WEEK, +dateNow + MS_IN_WEEK));
};
