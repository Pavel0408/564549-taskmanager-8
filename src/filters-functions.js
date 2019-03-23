export const filtersFunctions = {
  all() {
    return true;
  },

  overdue(card) {
    const today = new Date();
    return card._dueDate < today;
  },

  today(card) {
    const today = new Date();
    return today.getMonth() === card._dueDate.getMonth() && today.getDate() === card._dueDate.getDate();

  },

  favorites(card) {
    return card.isFavorite;
  },

  repeating(card) {
    return card._state.isRepeat;
  },

  tags() {
    return true;
  },

  archive(card) {
    return card._isArchive;
  }
};
