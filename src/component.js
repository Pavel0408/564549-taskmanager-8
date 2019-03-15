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
    this._editing = !this._editing;
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((day) => {
      return day === true;
    });
  }
}
