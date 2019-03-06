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

  render(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template(this);
    this._element = newElement.firstChild;
    return this._element;
  }

  changeEditing() {
    this.__editing = !this.__editing;
  }
}
