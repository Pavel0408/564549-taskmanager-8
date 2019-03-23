import {
  formatHachtags
} from "./format-hachtags";

import {
  days
} from "./mock/repeating-days";

const dateFormatter = new Intl.DateTimeFormat(`en-US`, {
  day: `numeric`
});
const monthFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `long`
});

export const getCardTemplate = (card) => {
  return `<article class="card card--${card.color} ${card.isRepeating ? `card--repeat` : ``}" id="${card.id}" data-id="card">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit" data-id="edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${card.title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button" data-id="date-status">
                date: <span class="card__date-status" data-id="date-status">no</span>
              </button>

              <fieldset class="card__date-deadline" ${!card.isDate && `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="${dateFormatter.format(card.dueDate)} ${monthFormatter.format(card.dueDate)}"
                    name="date"
                    value = "${dateFormatter.format(card.dueDate)} ${monthFormatter.format(card.dueDate)}"
                  />
                </label>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__time"
                    type="text"
                    placeholder="${card.dueDate.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`})}"
                    name="time"
                    value = "${card.dueDate.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`})}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button" data-id="repeat-status">
                repeat:<span class="card__repeat-status" data-id="repeat-status">no</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-mo-${card.id}"
                    name="repeat"
                    value="mo"
                    ${card.repeatingDays[days.Monday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-mo-${card.id}"
                    >mo</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-tu-${card.id}"
                    name="repeat"
                    value="tu"
                    ${card.repeatingDays[days.Tuesday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-tu-${card.id}"
                    >tu</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-we-${card.id}"
                    name="repeat"
                    value="we"
                    ${card.repeatingDays[days.Wednesday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-we-${card.id}"
                    >we</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-th-${card.id}"
                    name="repeat"
                    value="th"
                    ${card.repeatingDays[days.Thursday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-th-${card.id}"
                    >th</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-fr-${card.id}"
                    name="repeat"
                    value="fr"
                    ${card.repeatingDays[days.Friday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-fr-${card.id}"
                    >fr</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    name="repeat"
                    value="sa"
                    id="repeat-sa-${card.id}"
                    ${card.repeatingDays[days.Saturday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-sa-${card.id}"
                    >sa</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-su-${card.id}"
                    name="repeat"
                    value="su"
                    ${card.repeatingDays[days.Sunday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-su-${card.id}"
                    >su</label
                  >
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${formatHachtags(card.tags)}
              </div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <label class="card__img-wrap">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="${card.picture}"
              alt="task picture"
              class="card__img"
            />
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              <input
                type="radio"
                id="color-black-${card.id}"
                class="card__color-input card__color-input--black visually-hidden"
                name="color"
                value="black"
              data-id="color-input"/>
              <label
                for="color-black-${card.id}"
                class="card__color card__color--black"
                data-id="color-input">black</label
              >
              <input
                type="radio"
                id="color-yellow-${card.id}"
                class="card__color-input card__color-input--yellow visually-hidden"
                name="color"
                value="yellow"
              />
              <label
                for="color-yellow-${card.id}"
                class="card__color card__color--yellow" data-id="color-input"
                >yellow</label
              >
              <input
                type="radio"
                id="color-blue-${card.id}"
                class="card__color-input card__color-input--blue visually-hidden"
                name="color"
                value="blue"
              />
              <label
                for="color-blue-${card.id}"
                class="card__color card__color--blue" data-id="color-input"
                >blue</label
              >
              <input
                type="radio"
                id="color-green-${card.id}"
                class="card__color-input card__color-input--green visually-hidden"
                name="color"
                value="green"
                checked
              />
              <label
                for="color-green-${card.id}"
                class="card__color card__color--green" data-id="color-input"
                >green</label
              >
              <input
                type="radio"
                id="color-pink-${card.id}"
                class="card__color-input card__color-input--pink visually-hidden"
                name="color"
                value="pink"
              />
              <label
                for="color-pink-${card.id}"
                class="card__color card__color--pink" data-id="color-input"
                >pink</label
              >
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button" data-id="delete">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};

export const getEditCardtemplate = (card) => {
  return `<article class="card card--edit card--${card.color} ${card.isRepeating ? `card--repeat` : ``}" id="${card.id}" data-id="card">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit" data-id="edit">edit</button>
          <button type="button" class="card__btn card__btn--archive">archive</button>
          <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea class="card__text" placeholder="Start typing your text here..." name="text">${card.title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button" data-id="date-status">
                date: <span class="card__date-status" data-id="date-status">${card.isDate ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" ${!card.isDate && `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input class="card__date" type="text" placeholder="23 September" name="date" value="${dateFormatter.format(card.dueDate)} ${monthFormatter.format(card.dueDate)}" />
                </label>

                <label class="card__input-deadline-wrap">
                  <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${card.dueDate.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`})}" />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button" data-id="repeat-status">
                repeat: <span class="card__repeat-status" data-id="repeat-status">${card.isRepeat ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${!card.isRepeat && `disabled`}>
                <div class="card__repeat-days-inner">
                  <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-${card.id}" name="repeat" value="mo" ${card.repeatingDays[days.Monday] ? `checked` : ``} />
                  <label class="card__repeat-day" for="repeat-mo-${card.id}">mo</label>

                  <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-${card.id}" name="repeat" value="tu" ${card.repeatingDays[days.Tuesday] ? `checked` : ``} />
                  <label class="card__repeat-day" for="repeat-tu-${card.id}">tu</label>

                  <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-${card.id}" name="repeat" value="we" ${card.repeatingDays[days.Wednesday] ? `checked` : ``} />
                  <label class="card__repeat-day" for="repeat-we-${card.id}" >w</label>

                  <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-${card.id}" name="repeat" value="th" ${card.repeatingDays[days.Thursday] ? `checked` : ``} />
                  <label class="card__repeat-day" for="repeat-th-${card.id}">th</label>

                  <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-${card.id}" name="repeat" value="fr" ${card.repeatingDays[days.Friday] ? `checked` : ``} />
                  <label class="card__repeat-day" for="repeat-fr-${card.id}" >fr</label>

                  <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-${card.id}" ${card.repeatingDays[days.Saturday] ? `checked` : ``} />
                  <label class="card__repeat-day" for="repeat-sa-${card.id}">sa</label>

                  <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-${card.id}" name="repeat" value="su" ${card.repeatingDays[days.Sunday] ? `checked` : ``} />
                  <label class="card__repeat-day" for="repeat-su-${card.id}" >su</label>
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${formatHachtags(card.tags)}
              </div>

              <label>
                <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
              </label>
            </div>
          </div>

          <label class="card__img-wrap card__img-wrap--empty">
            <input type="file" class="card__img-input visually-hidden" name="img" />
          </label>

          <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input type="radio" id="color-black-${card.id}" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" ${card.color === `black` && `checked`}/>
                <label for="color-black-${card.id}" class="card__color card__color--black" data-id="color-input" data-id="color-input">black</label>

                <input type="radio" id="color-yellow-${card.id}" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow" ${card.color === `yellow` && `checked`} />
                <label for="color-yellow-${card.id}" class="card__color card__color--yellow" data-id="color-input">yellow</label>

                <input type="radio" id="color-blue-${card.id}" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue" ${card.color === `blue` && `checked`} />
                <label for="color-blue-${card.id}" class="card__color card__color--blue" data-id="color-input">blue</label>

                <input type="radio" id="color-green-${card.id}" class="card__color-input card__color-input--green visually-hidden" name="color" value="green" ${card.color === `green` && `checked`} />
                <label for="color-green-${card.id}" class="card__color card__color--green" data-id="color-input">green</label>

                <input type="radio" id="color-pink-${card.id}" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink" ${card.color === `pink` && `checked`} />
                <label for="color-pink-${card.id}" class="card__color card__color--pink" data-id="color-input">pink</label>
              </div>
            </div>
          </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button" data-id="delete">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};

export const getFilterTemplate = (filterName, filterCtount) => {
  return `<input
  type="radio"
  id="filter__${filterName}"
  class="filter__input visually-hidden"
  name="filter" ${filterCtount > 0 ? `` : `disabled`}/>
<label for="filter__${filterName}" class="filter__label" data-id=${filterName}>
${filterName}
<span class="filter__all-count">${filterCtount}</span>
</label>`;
};
