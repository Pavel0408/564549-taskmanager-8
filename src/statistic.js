import {
  getUniqueValue
} from "./utilities";

import {
  allTasks
} from "./all-tasks";

import {
  renderTagsStats,
  renderColorsStats
} from "./stats-render";

import {
  Component
} from "./component";

const rundomColors = [
  `#8dd3c7`,
  `#ffffb3`,
  `#bebada`,
  `#fb8072`,
  `#80b1d3`,
  `#fdb462`,
  `#b3de69`,
  `#fccde5`,
  `#d9d9d9`,
  `#bc80bd`,
  `#ccebc5`,
  `#ffed6f`
];

const cardColors = [`pink`, `yellow`, `blue`, `black`, `green`];

const statisticContainer = document.querySelector(`.statistic__active-statistic`);

export class Statistic extends Component {
  constructor() {
    super();

    this._rundomCulors = rundomColors.slice();
    this._intervalValue = document.querySelector(`.statistic__period-input`).value;
    this._year = new Date().getFullYear();
    this._interval = this._parseIntervalValue(this._intervalValue);

    this._cards = allTasks.filter((card) => {
      return card.dueDate < this._interval.end && card.dueDate > this._interval.start;
    });
    this._label = document.querySelector(`.statistic__period-result`);
    this._allTags = new Set();

    this._cards.forEach((card) => {
      card.tags.forEach((tag) => {
        this._allTags.add(tag);
      });
    });
    this._tags = [...this._allTags];

    this._tagsColors = this._tags.map(() => {
      let color = getUniqueValue(rundomColors);

      return color;
    });

    this._tagsCounts = this._tags.map((tag) => {
      let count = 0;
      this._cards.forEach((card) => {
        if (card.tags.has(tag)) {
          count++;
        }
      });
      return count;
    });

    this._cardColorsCount = cardColors.map((color) => {
      let count = 0;
      this._cards.forEach((card) => {
        if (card.color === color) {
          count++;
        }
      });
      return count;
    });

    this._colorLabels = cardColors.map((color) => {
      return `#` + color;
    });
  }

  get template() {
    return `<div class="statistic__circle">
    <div class="statistic__tags-wrap">
      <canvas class="statistic__tags" width="400" height="300"></canvas>
    </div>
    <div class="statistic__colors-wrap">
      <canvas class="statistic__colors" width="400" height="300"></canvas>
    </div>
  </div>`;
  }

  _parseIntervalValue(value) {

    const vlaues = value.split(`to`)
      .map((val) => {
        const newDay = new Date(val);
        newDay.setFullYear(this._year);
        return newDay;
      });
    const [start, end] = vlaues;

    if (start && end) {
      start.setHours(0, 0);
      end.setHours(23, 59);
    }

    return {
      start,
      end
    };
  }

  render() {
    statisticContainer.innerHTML = this.template;

    if (this._cards && this._cards.length) {

      // В разрезе цветов
      renderColorsStats(this._colorLabels, this._cardColorsCount);

      // В разрезе тегов
      renderTagsStats(this._tags, this._tagsCounts, this._tagsColors);

      document.querySelector(`.statistic__period-result`).textContent = `In total for the specified period ${this._cards.length} tasks were fulfilled.`;
    } else {
      statisticContainer.innerHTML = ``;
    }

  }
}
