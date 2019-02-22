import {
  generateFilter,
  filtersNames
} from './generate-filter';
import generateCard from './generate-card';
const START_CARDS_COUNT = 7;

const renderFilters = () => {
  const filterContainer = document.querySelector(`.main__filter`);
  let fragment = ``;
  filtersNames.forEach((value, index) => {
    fragment += generateFilter(index);
  });
  filterContainer.innerHTML = fragment;
};

const renderCards = (number) => {
  const board = document.querySelector(`.board__tasks`);
  let fragment = ``;
  for (let i = 0; i < number; i++) {
    fragment += generateCard();
  }
  board.innerHTML = fragment;
};

const filterClickHandler = (evt) => {
  const filter = evt.target.closest(`.filter__label`);
  if (filter) {
    const number = parseInt(filter.querySelector(`.filter__all-count`).textContent, 10);

    if (number) {
      renderCards(number);
    }
  }
};

renderFilters();
renderCards(START_CARDS_COUNT);

document.body.addEventListener(`click`, filterClickHandler);
