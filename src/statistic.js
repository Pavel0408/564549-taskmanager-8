import {
  getUniqueValue
} from "./utilities";

import {
  allTasks
} from "./main";

import {
  renderTagsStats,
  renderColorsStats
} from "./stats-render";

export const statistic = () => {
  const intervalValue = document.querySelector(`.statistic__period-input`).value;
  const year = new Date().getFullYear();

  const parseIntervalValue = (value) => {
    const vlaueArr = value.split(`to`)
      .map((val) => {
        const newDay = new Date(val);
        newDay.setFullYear(year);
        return newDay;
      });
    const [start, end] = vlaueArr;

    if (start && end) {
      start.setHours(0, 0);
      end.setHours(23, 59);
    }

    return {
      start,
      end
    };
  };

  const interval = parseIntervalValue(intervalValue);

  const cardsArr = allTasks.filter((card) => {
    return card.dueDate < interval.end && card.dueDate > interval.start;
  });

  const label = document.querySelector(`.statistic__period-result`);
  label.textContent = `In total for the specified period ${cardsArr.length} tasks were fulfilled.`;


  const allTags = new Set();
  cardsArr.forEach((card) => {
    card.tags.forEach((tag) => {
      allTags.add(tag);
    });
  });

  const tags = [...allTags];

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

  const tagsColors = tags.map(() => {
    let color = getUniqueValue(rundomColors);

    return color;
  });

  const tagsCountArr = tags.map((tag) => {
    let count = 0;
    cardsArr.forEach((card) => {
      if (card.tags.has(tag)) {
        count++;
      }
    });
    return count;
  });


  const cardColors = [`pink`, `yellow`, `blue`, `black`, `green`];
  const cardColorsCount = cardColors.map((color) => {
    let count = 0;
    cardsArr.forEach((card) => {
      if (card.color === color) {
        count++;
      }
    });
    return count;
  });

  const colorLabels = cardColors.map((color) => {
    return `#` + color;
  });

  // В разрезе цветов
  renderColorsStats(colorLabels, cardColorsCount);

  // В разрезе тегов
  renderTagsStats(tags, tagsCountArr, tagsColors);
};
