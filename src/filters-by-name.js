export const filtersByNames = {
  add(filter) {
    this[filter.name] = filter;
  }
};
