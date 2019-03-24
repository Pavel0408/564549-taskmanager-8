export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  get id() {
    return this._id;
  }

  get dueDate() {
    return this._dueDate;
  }

  get tags() {
    return this._tags;
  }

  get color() {
    return this._color;
  }

  set id(id) {
    this._id = id;
  }

  render() {
    throw new Error(`You need to create a Task first.`);
  }

  changeEditingStatus() {
    this._state.editing = !this._state.editing;
    this._state.isRepeat = this._isRepeating();
  }

  changeDateStatus() {
    this._state.isDate = !this._state.isDate;
  }

  changeColor(color) {
    this._color = color;
  }

  changeRepeatStatus() {
    if (this._state.isRepeat) {
      Object.keys(this._repeatingDays).forEach((day) => {
        this._repeatingDays[day] = false;
      });
    }

    this._state.isRepeat = !this._state.isRepeat;
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some(Boolean);
  }
}
