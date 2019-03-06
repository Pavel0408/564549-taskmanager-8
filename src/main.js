import generateFilter from './generate-filter';
import generateCard from './generate-card';
import {
  generateCardsArray
} from "./mock/generate-mock-cards-array";

import {
  getCardTemplate,
  getEditCardtemplate
} from "./generate-card";

const filtersNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

let mockCards = [];
const board = document.querySelector(`.board__tasks`);
const START_CARDS_COUNT = 7;

const renderFilters = () => {
  const filterContainer = document.querySelector(`.main__filter`);
  let fragment = ``;
  filtersNames.forEach((filterName) => {
    fragment += generateFilter(filterName);
  });
  filterContainer.innerHTML = fragment;
};

const renderCards = (number) => {
  let fragment = document.createDocumentFragment();
  mockCards = generateCardsArray(number);
  board.innerHTML = ``;
  console.log(mockCards);
  for (let i = 0; i < number; i++) {
    mockCards[i]._id = i;
    fragment.appendChild(mockCards[i].render(getCardTemplate));

    console.log(board.innerHTML);
  }
  board.appendChild(fragment);
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

const buttonsClickHandler = (evt) => {
  evt.preventDefault();
  const button = evt.target.textContent.trim();
  console.log(button);
  if (button === `edit` || button === `save` || button === `delete`) {
    console.log(`пошло`);
    const card = evt.target.closest(`article`);
    const cardId = card.id;
    let template = ``;
    if (button === `edit`) {
      template = getEditCardtemplate;
    } else if (button === `save`) {
      template = getCardTemplate;
    } else if (button === `delete`) {
      card.remove();
      mockCards[cardId] = null;
      return;
    }
    console.log(cardId);
    mockCards[cardId].changeEditing();
    console.log(mockCards[cardId]);
    board.replaceChild(mockCards[cardId].render(template), card);
    return;
  }

};

renderFilters();
renderCards(START_CARDS_COUNT);

document.body.addEventListener(`click`, filterClickHandler);
document.body.addEventListener(`click`, buttonsClickHandler);
