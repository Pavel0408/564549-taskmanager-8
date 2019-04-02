export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  render() {
    throw new Error(`You need to create a Task first.`);
  }
}
