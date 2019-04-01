export class FilterComponent {
  constructor() {
    if (new.target === FilterComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  get name() {
    return this._name;
  }

  render() {
    throw new Error(`You need to create a Filter first.`);
  }
}
