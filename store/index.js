export const state = () => ({
  favorites: [],
});

export const getters = {
  isFavorite: (state) => (favorite) => {
    return state.favorites.some(
      (item) =>
        JSON.stringify(sortedObject(item)) ===
        JSON.stringify(sortedObject(favorite))
    );
  },
};

export const mutations = {
  addFavorite(state, favorite) {
    state.favorites.push(favorite);
    localStorage.favorites = JSON.stringify(state.favorites);
  },

  removeFavorite(state, favorite) {
    console.log(favorite.direction);
    state.favorites.map((item) => item == sortedObject(item));
    state.favorites.splice(state.favorites.indexOf(sortedObject(favorite)), 1);

    localStorage.favorites = JSON.stringify(state.favorites);
  },

  initFavorites(state, favorites) {
    state.favorites = favorites;
  },
};

function sortedObject(unordered) {
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
}
