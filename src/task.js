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

    this._repeatingDays = card.repeatingDays;
    this._title = card.title;
    this._tags = card.tags;
    this._picture = card.picture;
    this._dueDate = card.dueDate;
    this._element = null;
    this._id = card.id || ``;
    this.isDone = card.isDone;
    this._color = card.color;
    this.isFavorite = card.isFavorite;
    this._isArchive = card.isArchive;
    this.shake = this.shake.bind(this);

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

  shake() {

    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  static parseTask(data) {
    const dataTask = {
      id: data[`id`],
      title: data[`title`] || ``,
      dueDate: new Date(data[`due_date`]),
      tags: new Set(data[`tags`] || []),
      picture: data[`picture`] || ``,
      repeatingDays: data[`repeating_days`],
      color: data[`color`],
      isFavorite: Boolean(data[`is_favorite`]),
      isDone: Boolean(data[`is_done`])
    };

    return new Task(dataTask);
  }

  static parseTasks(data) {
    return data.map(Task.parseTask);
  }

  toRAW() {
    return {
      'id': this.id,
      'title': this._title,
      'due_date': this._dueDate,
      'tags': [...this._tags.values()],
      'picture': this._picture,
      'repeating_days': this._repeatingDays,
      'color': this._color,
      'is_favorite': this.isFavorite,
      'is_done': this.isDone,
    };
  }
}

const generateEntry = (formData, repeatingDays) => {
  return {
    title: formData.get(`text`),
    color: formData.get(`color`),
    tags: new Set(formData.getAll(`hashtag`)),
    dueDate: new Date(formData.get(`date`)),

    repeatingDays: {
      'mo': (repeatingDays.indexOf(`mo`) !== -1),
      'tu': (repeatingDays.indexOf(`tu`) !== -1),
      'we': (repeatingDays.indexOf(`we`) !== -1),
      'th': (repeatingDays.indexOf(`th`) !== -1),
      'fr': (repeatingDays.indexOf(`fr`) !== -1),
      'sa': ((repeatingDays.indexOf(`sa`) !== -1)),
      'su': (repeatingDays.indexOf(`su`) !== -1),
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
