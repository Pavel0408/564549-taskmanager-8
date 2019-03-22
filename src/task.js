import {
  getCardTemplate,
  getEditCardtemplate
} from "./templates";

import {
  Component
} from "./component";

import flatpickr from "flatpickr";

export class Task extends Component {
  constructor(card) {
    super();

    this._title = card.title;
    this._tags = card.tags;
    this._picture = card.picture;
    this._dueDate = card.dueDate;
    this._repeatingDays = card.repeatingDays;
    this._element = null;
    this._id = ``;
    this.isDone = card.isDone;
    this._color = card.color;
    this.isFavorite = card.isFavorite;

    this._state = {
      isDate: true,
      isRepeat: true,
      editing: false
    };
  }

  render(getTemplates = this._state.editing ? getEditCardtemplate : getCardTemplate) {
    const newElement = document.createElement(`div`);
    const templateArguments = {
      color: this._color,
      isRepeating: this._isRepeating(),
      id: this.id,
      title: this._title,
      dueDate: this._dueDate,
      repeatingDays: this._repeatingDays,
      tags: this._tags,
      picture: this._picture,
      isDate: this._state.isDate,
      isRepeat: this._state.isRepeat
    };

    newElement.innerHTML = getTemplates(templateArguments);
    this._element = newElement.firstChild;

    if (this._state.isDate && this._state.editing) {
      flatpickr(this._element.querySelector(`.card__date`), {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`
      });

      flatpickr(this._element.querySelector(`.card__time`), {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`
      });
    }

    return this._element;
  }

  update(data) {
    this._repeatingDays = Object.assign(data.repeatingDays);
    this._title = data.title;
    this._tags = new Set(data.tags);
    this._color = data.color;
    this._dueDate = new Date(data.dueDate);
  }

  static parseForm(formData) {
    const repeatingDays = formData.getAll(`repeat`);

    const entry = generateEntry(formData, repeatingDays);

    if (formData.get(`time`)) {
      setTime(formData.get(`time`), entry);
    } else {
      entry.dueDate = new Date();
    }

    return entry;
  }
}

const generateEntry = (formData, repeatingDays) => {
  return {
    title: formData.get(`text`),
    color: formData.get(`color`),
    tags: new Set(formData.getAll(`hashtag`)),
    dueDate: new Date(formData.get(`date`)),

    repeatingDays: {
      'Mo': (repeatingDays.indexOf(`mo`) !== -1),
      'Tu': (repeatingDays.indexOf(`tu`) !== -1),
      'We': (repeatingDays.indexOf(`we`) !== -1),
      'Th': (repeatingDays.indexOf(`th`) !== -1),
      'Fr': (repeatingDays.indexOf(`fr`) !== -1),
      'Sa': ((repeatingDays.indexOf(`sa`) !== -1)),
      'Su': (repeatingDays.indexOf(`su`) !== -1),
    }
  };
};

const setTime = (value, entry) => {
  value = value.split(` `);
  let [time, timeAdd] = value;
  time = time.split(`:`);
  let [hours, minutes] = time;

  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  if (timeAdd === `PM`) {
    hours += 12;
  }

  entry.dueDate.setHours(hours, minutes);
};
