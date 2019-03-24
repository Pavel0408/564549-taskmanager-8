import {
  generateCardsArray
} from "./mock/generate-mock-cards-array";

import {
  cardsById
} from "./cards-by-id";

import {
  Task
} from "./task";

import {
  Filter
} from "./filter";

import {
  filtersByNames
} from "./filters-by-name";

import {
  statistic
} from "./statistic";

import {
  generateEndAndStartWeek
} from "./utilities";

import flatpickr from "flatpickr";

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
  filterContainer.innerHTML = ``;
  let fragment = ``;
  filtersNames.forEach((filterName) => {
    const filter = new Filter(filterName);
    filtersByNames.add(filter);
    fragment += (filter.render());
  });

  filterContainer.innerHTML = fragment;
};

const mockCardArray = generateCardsArray(START_CARDS_COUNT)
  .map((mockData) => {
    const task = new Task(mockData);
    task.id = cardsById.newIndex;
    cardsById.add(task);

    return task;
  });

const renderCards = (cardsArr) => {
  let fragment = document.createDocumentFragment();
  board.innerHTML = ``;

  cardsArr.forEach((card) => {
    if (card) {
      fragment.appendChild(card.render());
    }
  });

  board.appendChild(fragment);
};

const filterClickHandler = (evt) => {
  const filter = evt.target.closest(`.filter__label`);
  if (filter) {
    const name = filter.dataset.id;

    if (name && filtersByNames[name].cardsArr.length > 0) {
      renderCards(filtersByNames[name].cardsArr);
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
        renderFilters();
        return;
      }

      // Обработчик кнопки EDIT
      if (button === `edit` && cardItem.changeEditingStatus) {
        cardItem.changeEditingStatus();
      }

      // Перерисовываем карточку
      if (cardItem.render) {
        board.replaceChild(cardItem.render(), card);
        renderFilters();
      }
    }
  }
};

const buttonSubmitHandler = (evt) => {
  evt.preventDefault();

  const card = evt.target.closest(`article`);
  const cardItem = cardsById[card.id];
  const formData = new FormData(card.querySelector(`.card__form`));

  if (cardItem && Task.parseForm && cardItem.changeEditingStatus && cardItem.render) {
    const newData = Task.parseForm(formData);

    cardItem.update(newData);
    cardItem.changeEditingStatus();

    board.replaceChild(cardItem.render(), card);
    renderFilters();
  }
};

const tascsAndStatisticToggle = (evt) => {
  const changedInput = evt.target.closest(`input`);
  if (changedInput) {
    const toggle = changedInput.dataset.toggle;

    if (toggle) {
      const tascsContainer = document.querySelector(`.board`);
      const statisticContainer = document.querySelector(`.statistic`);
      const filterContainer = document.querySelector(`.filter`);

      if (toggle === `tasks`) {
        tascsContainer.classList.remove(`visually-hidden`);
        filterContainer.classList.remove(`visually-hidden`);
        statisticContainer.classList.add(`visually-hidden`);
      }

      if (toggle === `statistic`) {
        tascsContainer.classList.add(`visually-hidden`);
        filterContainer.classList.add(`visually-hidden`);
        statisticContainer.classList.remove(`visually-hidden`);
        statistic();
      }
    }
  }
};

renderCards(mockCardArray);
renderFilters();
document.querySelector(`#filter__all`).setAttribute(`checked`, `checked`);

document.body.addEventListener(`click`, filterClickHandler);
document.body.addEventListener(`click`, buttonsClickHandler);
document.body.addEventListener(`submit`, buttonSubmitHandler);
document.body.addEventListener(`change`, tascsAndStatisticToggle);


const week = generateEndAndStartWeek();

const statisticInput = document.querySelector(`.statistic__period-input`);

flatpickr((statisticInput), {
  mode: `range`,
  altInput: true,
  altFormat: `j M`,
  dateFormat: `j M`,
  defaultDate: [week.monday, week.sunday]
});

statisticInput.addEventListener(`change`, statistic);
