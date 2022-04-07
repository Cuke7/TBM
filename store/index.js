export const state = () => ({
  favorites: [],
});

export const getters = {
  isFavorite: (state) => (favorite) => {
    return state.favorites.includes(favorite);
  },
};

export const mutations = {
  addFavorite(state, favorite) {
    console.log("Favorite added", favorite);
    state.favorites.push(favorite);
    console.log("After adding", state.favorites);
    localStorage.favorites = JSON.stringify(state.favorites);
  },

  removeFavorite(state, favorite) {
    console.log("Favorite removed", favorite);
    state.favorites.splice(state.favorites.indexOf(favorite), 1);
    console.log("After removing", state.favorites);
    localStorage.favorites = JSON.stringify(state.favorites);
  },

  initFavorites(state, favorites) {
    state.favorites = favorites;
  },
};

// function sortedObject(unordered) {
//   return Object.keys(unordered)
//     .sort()
//     .reduce((obj, key) => {
//       obj[key] = unordered[key];
//       return obj;
//     }, {});
// }
