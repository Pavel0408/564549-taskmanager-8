import {
  getCardTemplate,
  getEditCardtemplate
} from "./templates";

import {
  Component
} from "./component";

import {
  monthes
} from "./constats";

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
    this._editing = false;
    this._id = ``;
    this.isDone = card.isDone;
    this._color = card.color;
    this.isFavorite = card.isFavorite;
    this._isDate = true;
    this._isRepeat = true;
  }

  render(getTemplates = this._editing ? getEditCardtemplate : getCardTemplate) {
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
      isDate: this._isDate,
      isRepeat: this._isRepeat
    };

    newElement.innerHTML = getTemplates(templateArguments);
    this._element = newElement.firstChild;

    // Не работает
    if (this._isDate && this._editing) {
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
    Object.keys(this._repeatingDays).forEach((day) => {
      this._repeatingDays[day] = data.repeatingDays[day.toLowerCase()];
    });

    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._dueDate = data.dueDate;
  }

  processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskMapper = Task.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskMapper[property]) {
        taskMapper[property](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => {
        target.tags.add(value);
      },
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        value = value.split(` `);
        let [day, month] = value;
        month = monthes.indexOf(month);
        target.dueDate.setMonth(month, day);
      }
    };
  }
}
