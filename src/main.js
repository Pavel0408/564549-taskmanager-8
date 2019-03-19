import generateFilter from './generate-filter';
import {
  generateCardsArray
} from "./mock/generate-mock-cards-array";

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
  board.innerHTML = ``;

  generateCardsArray(number)
    .map((mockData) => {
      const task = new Task(mockData);
      task.id = cardsById.newIndex;
      cardsById.add(task);

      return task;
    })
    .forEach((card) => {
      if (card) {
        fragment.appendChild(card.render());
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

// Обработчик на кнопок EDIT, DATE, REPEAT, и радио выбора цвета
const buttonsClickHandler = (evt) => {
  const card = evt.target.closest(`article`);

  if (card) {
    const cardItem = cardsById[card.id];
    const button = evt.target.dataset.id;

    if (card && cardItem && button) {

      evt.preventDefault();

      // Обработчик кнопки DATE
      if (button === `date-status` && cardItem.changeEditingStatus) {
        cardItem.changeDateStatus();
      }

      // Обработчик кнопки REPEAT
      if (button === `repeat-status` && cardItem.changeRepeatStatus) {
        cardItem.changeRepeatStatus();
      }

      // Обработчик выбора цвета
      if (button === `color-input` && cardItem.changeColor) {
        const color = evt.target.textContent;
        cardItem.changeColor(color);
      }

      // Обработчик кнопки DELETE
      if (button === `delete`) {
        card.remove();
        cardsById[card.id] = null;
        return;
      }

      // Обработчик кнопки EDIT
      if (button === `edit` && cardItem.changeEditingStatus) {
        cardItem.changeEditingStatus();
      }

      // Перерисовываем карточку
      if (cardItem.render) {
        board.replaceChild(cardItem.render(), card);
      }
    }
  }
};

const buttonSubmitHandler = (evt) => {
  evt.preventDefault();

  const card = evt.target.closest(`article`);
  const cardItem = cardsById[card.id];
  const formData = new FormData(card.querySelector(`.card__form`));
  console.log(formData.getAll(`repeat`));

  if (cardItem && Task.processForm && cardItem.changeEditingStatus && cardItem.render) {
    const newData = Task.processForm(formData);

    cardItem.update(newData);
    cardItem.changeEditingStatus();

    board.replaceChild(cardItem.render(), card);
  }
};

renderFilters();
renderCards(START_CARDS_COUNT);

document.body.addEventListener(`click`, filterClickHandler);
document.body.addEventListener(`click`, buttonsClickHandler);
document.body.addEventListener(`submit`, buttonSubmitHandler);
