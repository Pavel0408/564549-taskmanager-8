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

    this.state = {
      _isDate: true,
      _isRepeat: true,
      _editing: false
    };
  }

  render(getTemplates = this.state._editing ? getEditCardtemplate : getCardTemplate) {
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
      isDate: this.state._isDate,
      isRepeat: this.state._isRepeat
    };

    newElement.innerHTML = getTemplates(templateArguments);
    this._element = newElement.firstChild;

    if (this.state._isDate && this.state._editing) {
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

    const entry = {
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

    const setTime = (value) => {
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

    if (formData.get(`time`)) {
      setTime(formData.get(`time`));
    } else {
      entry.dueDate = new Date();
    }

    return entry;
  }
}
