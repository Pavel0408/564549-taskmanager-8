import {
  getCardTemplate,
  getEditCardtemplate
} from "./templates";

import {
  Component
} from "./component";

import {
  days,
  daysShort
} from "./mock/repeating-days";

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
    this.isDate = true;
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
      isDate: this.isDate,
      isRepeat: this._isRepeat
    };

    newElement.innerHTML = getTemplates(templateArguments);
    this._element = newElement.firstChild;

    return this._element;
  }

  update(data) {
    console.log(this._repeatingDays);
    Object.keys(this._repeatingDays).forEach((day) => {
      console.log(day);
      this._repeatingDays[day] = data.repeatingDays[day.toLowerCase()];
      console.log(this);
      delete data.repeatingDays[days[day]];
    });
    console.log(this);
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;

    console.log(data.repeatingDays);
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => target.title = value,
      color: (value) => target.color = value,
      repeat: (value) => target.repeatingDays[value] = true,
      date: (value) => target.dueDate[value],

    }
  }

  onSubmit(newObject) {
    this.title = newObject.title;
    this.tags = newObject.tags;
    this.color = newObject.color;
    this.repeatingDays = newObject.repeatingDays;
    this.dueDate = newObject.dueDate;
  }

  _processForm(formData) {
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
}
