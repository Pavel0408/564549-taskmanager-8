import {
  getRandomNumber
} from './utilities';
const MAX_CARDS_NUMBERS = 15;
const MIN_CARDS_NUMBERS = 1;
export const filtersNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];
export const generateFilter = (count) => {
  const cardNumbers = getRandomNumber(MIN_CARDS_NUMBERS, MAX_CARDS_NUMBERS);
  return `<input
            type="radio"
            id="filter__${filtersNames[count]}"
            class="filter__input visually-hidden"
            name="filter"/>
    <label for="filter__${filtersNames[count]}" class="filter__label">
      ${filtersNames[count]}
      <span class="filter__all-count">${cardNumbers}</span>
    </label>`;
};
