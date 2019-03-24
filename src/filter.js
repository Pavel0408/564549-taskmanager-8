import {
  FilterComponent
} from "./filter-component";

import {
  getFilterTemplate
} from "./templates";

import {
  filtersFunctions
} from "./filters-functions";


export class Filter extends FilterComponent {
  constructor(name) {
    super();

    this._name = name;
    this._filterFunction = filtersFunctions[this._name];
    this._count = 0;
    this._cardsArr = null;
    this._filtredFild = `isRepeat`;
  }

  render(getTemplates = getFilterTemplate) {
    this.generatCardsArray(`_state.isRepeat`);
    this._count = this._cardsArr.length;
    let newElement = getTemplates(this._name, this._count);
    this._element = newElement;

    return this._element;
  }
}
