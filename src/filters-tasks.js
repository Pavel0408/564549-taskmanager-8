export const filtersTasks = {
  'all': () => {
    return true;
  },

  'overdue': (card) => {
    const today = new Date();
    return card.dueDate < today;
  },

  'today': (card) => {
    const today = new Date();
    return today.getMonth() === card.dueDate.getMonth() && today.getDate() === card.dueDate.getDate();
  },

  'favorites': (card) => {
    return card.isFavorite;
  },

  'repeating': (card) => {
    return card.isRepeating;
  },

  'tags': () => {
    return true;
  },

  'archive': (card) => {
    return card._isArchive;
  }
};
