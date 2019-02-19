'use strict';
const filtersNames = [
  `ALL`,
  `OVERDUE`,
  `TODAY`,
  `FAVORITES`,
  `Repeating`,
  `Tags`,
  `ARCHIVE`
];

const filtersIdentifers = [
  `filter__all`,
  `filter__overdue`,
  `filter__today`,
  `filter__favorites`,
  `filter__repeating`,
  `filter__tags`,
  `filter__archive`
];

const MIN_CARDS_NUMBERS = 1;
const MAX_CARDS_NUMBERS = 15;

const getRandomNumber = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

const generateFilter = (count) => {
  const cardNumbers = getRandomNumber(MIN_CARDS_NUMBERS, MAX_CARDS_NUMBERS);
  return `
<input
type="radio"
id="${filtersIdentifers[count]}"
class="filter__input visually-hidden"
name="filter"
checked
/>
<label for="filter__all" class="filter__label">
${filtersNames[count]} <span class="filter__all-count">${cardNumbers}</span></label
>
`;
};

const renderFilters = function () {
  const filterContainer = document.querySelector(`.main__filter`);
  let fragment = ``;
  filtersNames.forEach((value, index) => {
    fragment += generateFilter(index);
  });
  filterContainer.innerHTML = fragment;
};

renderFilters();
