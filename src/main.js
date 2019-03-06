import generateFilter from './generate-filter';
import {
  generateCardsArray
} from "./mock/generate-mock-cards-array";

import {
  getCardTemplate,
  getEditCardtemplate
} from "./templates";

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
  mockCards = generateCardsArray(number);
  mockCards.forEach((card, index) => {
    if (card) {
      mockCards[index]._id = index;
      fragment.appendChild(card.render(getCardTemplate));
    }
  });
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
  if (button === `edit` || button === `save` || button === `delete`) {
    const card = evt.target.closest(`article`);
    const cardId = card.id;
    let template = ``;

    if (button === `edit`) {
      template = getEditCardtemplate;

    } else if (button === `save`) {
      template = getCardTemplate;

    } else {
      card.remove();
      mockCards[cardId] = null;
      return;
    }

    mockCards[cardId].changeEditing();
    board.replaceChild(mockCards[cardId].render(template), card);
    return;
  }

};

renderFilters();
renderCards(START_CARDS_COUNT);

document.body.addEventListener(`click`, filterClickHandler);
document.body.addEventListener(`click`, buttonsClickHandler);
