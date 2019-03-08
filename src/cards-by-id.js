export const cardsById = {
  newIndex: 0,
  add(task) {
    this[this.newIndex] = task;
    this.newIndex++;
  }
};
