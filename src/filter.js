import {
  FilterComponent
} from "./filter-component";

import {
  getFilterTemplate
} from "./templates";

import {
  filtersTasks
} from "./filters-tasks";

import {
  allTasks
} from "./all-tasks";

import {
  checkCard
} from "./check-card";


export class Filter extends FilterComponent {
  constructor(name) {
    super();

    this._name = name;
    this._filterFunction = filtersTasks[this._name];
    this._count = 0;
    this._cardsArr = null;
  }

  get filteredTasks() {
    return allTasks.filter(checkCard).filter(this._filterFunction);
  }

  render(getTemplates = getFilterTemplate) {
    this._count = this.filteredTasks.length;

    let newElement = getTemplates(this._name, this._count);
    this._element = newElement;

    return this._element;
  }
}
