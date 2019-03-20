export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  render() {
    throw new Error(`You need to create a Task first.`);
  }

  changeEditingStatus() {
    this.state._editing = !this.state._editing;
    this.state._isRepeat = this._isRepeating();
  }

  changeDateStatus() {
    this.state._isDate = !this.state._isDate;
  }

  changeColor(color) {
    this._color = color;
  }

  changeRepeatStatus() {
    if (this._isRepeat) {
      Object.keys(this._repeatingDays).forEach((day) => {
        this._repeatingDays[day] = false;
      });
    }
    this.state._isRepeat = !this.state._isRepeat;
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some(Boolean);
  }
}
