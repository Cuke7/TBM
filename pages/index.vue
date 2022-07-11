<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-img src="/banner.png" class="mx-6"> </v-img>
      <v-card class="py-4 pt-6 px-4 mx-4 rounded-t-xl" elevation="0">
        <v-text-field
          label="Rechercher un arrêt"
          hide-details
          v-model="stop"
          :loading="searchLoading"
          append-icon="mdi-close"
          @click:append="stop = ''"
        ></v-text-field>
      </v-card>

      <div class="mx-8 mt-6">
        <div v-for="(result, index) in searchResults" :key="index" class="my-4">
          <div class="text-body-1 black--text" @click="$router.push(result.id)">
            {{ result.text }}
          </div>
          <v-divider class="mt-4"> </v-divider>
        </div>
      </div>
      <v-card-title class="py-0 px-8"> Favoris </v-card-title>
      <div class="px-8">
        <div v-for="(favorite, index) in favorites" :key="index">
          <Favorite :favoriteSerial="favorite"></Favorite>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    searchResults: [],
    searchLoading: false,
    stop: "",
    favorite: [],
    panel: undefined,
  }),

  mounted: function () {
    this.$nextTick(function () {
      //Local storage stuff
      if (localStorage.favorites) {
        let favorites = [...JSON.parse(localStorage.favorites)];
        // console.log("Favorites from localStorage", favorites);
        this.$store.commit("initFavorites", favorites);
      } else {
        console.log("Creating for localStorage");
        // localStorage.favorites = JSON.stringify([]);
      }
    });
  },

  methods: {
    async fetchSuggestions(stop) {
      this.searchLoading = true;
      const searchResults = await this.$axios.$get(
        "https://my-servo.herokuapp.com/tbmAPI/get_infos?stop=" +
          encodeURI(stop)
      );
      this.searchResults = searchResults;
      this.searchLoading = false;
    },
  },
  watch: {
    stop(val) {
      if (val.length > 0) {
        this.panel = undefined;
      }
      if (val.length > 2) {
        this.fetchSuggestions(val);
      } else {
        this.searchResults = [];
      }
    },
  },

  computed: {
    favorites() {
      return this.$store.state.favorites;
    },
  },
};
</script>

<style scoped>
a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
}
</style>
