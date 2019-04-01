import {
  allTasks
} from "./main";

export class FilterComponent {
  constructor() {
    if (new.target === FilterComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  get name() {
    return this._name;
  }

  // get cardsArr() {
  //   return this._cardsArr;
  // }




  render() {
    throw new Error(`You need to create a Filter first.`);
  }
}
