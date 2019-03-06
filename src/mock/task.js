import {
  formatHachtags
} from "../format-hachtags";

import {
  days
} from "./repeating-days";

import {
  getCardTemplate,
  getEditCardtemplate
} from "../generate-card";


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

  _isRepeating() {
    return Object.values(this._repeatingDays).some((day) => {
      return day === true;
    });
  }

  unrender() {
    this._element = null;
  }

  get template() {
    return this._editing ? getEditCardtemplate(this) : getCardTemplate(this);
  }

  render(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template(this);
    console.log(newElement);
    this._element = newElement.firstChild;
    console.log(this._element);
    return this._element;
  }

  changeEditing() {
    this.__editing = !this.__editing;
  }
}
