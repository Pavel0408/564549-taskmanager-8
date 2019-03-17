import generateFilter from './generate-filter';
import {
  generateCardsArray
} from "./mock/generate-mock-cards-array";

import {
  getCardTemplate
} from "./templates";

import {
  cardsById
} from "./cards-by-id";

import {
  Task
} from "./task";

const filtersNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const board = document.querySelector(`.board__tasks`);
const START_CARDS_COUNT = 7;

let mockCards = [];

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
  mockCards.map((mockData) => {
    const task = new Task(mockData);
    task.id = cardsById.newIndex;
    cardsById.add(task);
    return task;
  })
    .forEach((card) => {
      if (card) {
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

  if (evt.target.classList.contains(`card__btn--edit`) ||
    evt.target.classList.contains(`card__delete`) || evt.target.classList.contains(`card__date-status`) ||
    evt.target.classList.contains(`card__date-deadline-toggle`) || evt.target.classList.contains(`card__repeat-status`) ||
    evt.target.classList.contains(`card__repeat-toggle`) ||
    evt.target.classList.contains(`card__color`)) {

    const card = evt.target.closest(`article`);
    const cardItem = cardsById[card.id];
    const button = evt.target.textContent.trim();

    evt.preventDefault();

    if (button === `delete`) {
      card.remove();
      cardsById[card.id] = null;
      return;
    }

    if (cardItem && cardItem.changeEditingStatus && cardItem.render && cardItem.changeDateStatus) {

      if (evt.target.classList.contains(`card__date-status`) ||
        evt.target.classList.contains(`card__date-deadline-toggle`)) {
        cardItem.changeDateStatus();
      }

      if (evt.target.classList.contains(`card__repeat-status`) ||
        evt.target.classList.contains(`card__repeat-toggle`)) {
        cardItem.changeRepeatStatus();
      }

      if (evt.target.classList.contains(`card__color`)) {
        const color = evt.target.textContent;
        cardItem.changeColor(color);
      }

      if (button === `edit`) {
        cardItem.changeEditingStatus();
      }

      board.replaceChild(cardItem.render(), card);
    }
  }
};

const buttonSubmitHandler = (evt) => {
  evt.target.classList.contains(`card__save`);
  evt.preventDefault();

  const card = evt.target.closest(`article`);
  const cardItem = cardsById[card.id];

  const formData = new FormData(card.querySelector(`.card__form`));
  const newData = cardItem._processForm(formData);
  cardItem.update(newData);
  cardItem.changeEditingStatus();
  board.replaceChild(cardItem.render(), card);
};

renderFilters();
renderCards(START_CARDS_COUNT);

document.body.addEventListener(`click`, filterClickHandler);
document.body.addEventListener(`click`, buttonsClickHandler);
document.body.addEventListener(`submit`, buttonSubmitHandler);
