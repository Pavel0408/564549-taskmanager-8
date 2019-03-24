import {
  cardsById
} from "./cards-by-id";

export class FilterComponent {
  constructor() {
    if (new.target === FilterComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  get name() {
    return this._name;
  }

  get cardsArr() {
    return this._cardsArr;
  }


  generatCardsArray() {
    this._cardsArr = Object.keys(cardsById).map((index) => {
      return cardsById[index];
    })
      .filter(this._checkCard)
      .filter(this._filterFunction);
  }

  render() {
    throw new Error(`You need to create a Filter first.`);
  }

  _checkCard(card) {
    if (card && card._state) {

      return true;
    }
    return false;
  }
}
