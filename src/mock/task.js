import {
  formatHachtags
} from "../format-hachtags";

import {
  days
} from "./repeating-days";


const dateFormatter = new Intl.DateTimeFormat(`en-US`, {
  day: `numeric`
});
const monthFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `long`
});

export class Task {
  constructor(card) {
    this._title = card.title;
    this._tags = card.tags;
    this._picture = card.picture;
    this._dueDate = card.dueDate;
    this._repeatingDays = card.repeatingDays;
    this._element = null;
    this._editing = false;
    this._id = ``;
    this.isDone = card.isDone;
    this._color = card.color;
    this.isFavorite = card.isFavorite;
  }

  isRepeating() {
    return Object.values(this._repeatingDays).some((day) => {
      return day === true;
    });
  }

  unrender() {
    this._element = null;
  }

  get template() {
    return `<article class="card card--${this._color}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
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
            >${this._title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">no</span>
              </button>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="${dateFormatter.format(this._dueDate)} ${monthFormatter.format(this._dueDate)}"
                    name="date"
                    value = "${dateFormatter.format(this._dueDate)} ${monthFormatter.format(this._dueDate)}"
                  />
                </label>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__time"
                    type="text"
                    placeholder="${this._dueDate.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`})}"
                    name="time"
                    value = "${this._dueDate.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`})}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">no</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-mo-5"
                    name="repeat"
                    value="mo"
                    ${this._repeatingDays[days.Monday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-mo-5"
                    >mo</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-tu-5"
                    name="repeat"
                    value="tu"
                    ${this._repeatingDays[days.Tuesday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-tu-5"
                    >tu</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-we-5"
                    name="repeat"
                    value="we"
                    ${this._repeatingDays[days.Wednesday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-we-5"
                    >we</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-th-5"
                    name="repeat"
                    value="th"
                    ${this._repeatingDays[days.Thursday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-th-5"
                    >th</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-fr-5"
                    name="repeat"
                    value="fr"
                    ${this._repeatingDays[days.Friday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-fr-5"
                    >fr</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    name="repeat"
                    value="sa"
                    id="repeat-sa-5"
                    ${this._repeatingDays[days.Saturday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-sa-5"
                    >sa</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-su-5"
                    name="repeat"
                    value="su"
                    ${this._repeatingDays[days.Sunday] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-su-5"
                    >su</label
                  >
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${formatHachtags(this._tags)}
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
              src="${this._picture}"
              alt="task picture"
              class="card__img"
            />
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              <input
                type="radio"
                id="color-black-5"
                class="card__color-input card__color-input--black visually-hidden"
                name="color"
                value="black"
              />
              <label
                for="color-black-5"
                class="card__color card__color--black"
                >black</label
              >
              <input
                type="radio"
                id="color-yellow-5"
                class="card__color-input card__color-input--yellow visually-hidden"
                name="color"
                value="yellow"
              />
              <label
                for="color-yellow-5"
                class="card__color card__color--yellow"
                >yellow</label
              >
              <input
                type="radio"
                id="color-blue-5"
                class="card__color-input card__color-input--blue visually-hidden"
                name="color"
                value="blue"
              />
              <label
                for="color-blue-5"
                class="card__color card__color--blue"
                >blue</label
              >
              <input
                type="radio"
                id="color-green-5"
                class="card__color-input card__color-input--green visually-hidden"
                name="color"
                value="green"
                checked
              />
              <label
                for="color-green-5"
                class="card__color card__color--green"
                >green</label
              >
              <input
                type="radio"
                id="color-pink-5"
                class="card__color-input card__color-input--pink visually-hidden"
                name="color"
                value="pink"
              />
              <label
                for="color-pink-5"
                class="card__color card__color--pink"
                >pink</label
              >
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
  }

  render() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.template;
    console.log(newElement);
    this._element = newElement.firstChild;
    console.log(this._element);
    return this._element;
  }
}
