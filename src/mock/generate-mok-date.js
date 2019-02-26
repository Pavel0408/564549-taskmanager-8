import {
  getRandomNumber
} from './../utilities';
export const gnerateMockDate = () => {
  const msInWeek = 7 * 24 * 60 * 60 * 1000;
  const dateNow = new Date();
  return new Date(getRandomNumber(+dateNow - msInWeek, +dateNow + msInWeek));
};
