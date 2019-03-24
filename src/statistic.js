import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  filtersByNames
} from "./filters-by-name";
import {
  getUniqueValue
} from "./utilities";

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

  const tagsCtx = document.querySelector(`.statistic__tags`);
  const colorsCtx = document.querySelector(`.statistic__colors`);
  const cardsArr = filtersByNames.all.cardsArr.slice().filter((card) => {
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

  const allTagsArr = [...allTags];

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

  const colorsforTags = allTagsArr.map(() => {
    let color = getUniqueValue(rundomColors);

    return color;
  });

  const tagsCountArr = allTagsArr.map((tag) => {
    let count = 0;
    cardsArr.forEach((card) => {
      if (card.tags.has(tag)) {
        count++;
      }
    });
    return count;
  });


  // В разрезе тегов
  // eslint-disable-next-line no-unused-vars
  const tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: allTagsArr,
      datasets: [{
        data: tagsCountArr,
        backgroundColor: colorsforTags
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });

  // В разрезе цветов
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

  // eslint-disable-next-line no-unused-vars
  const colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: colorLabels,
      datasets: [{
        data: cardColorsCount,
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
};
