export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((day) => {
      return day === true;
    });
  }

  changeEditingStatus() {
    this._editing = !this._editing;
  }
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  changeEditingStatus() {
    this._editing = !this._editing;
  }

  render() {
    throw new Error(`You need to create a Task first.`);
  }
}
