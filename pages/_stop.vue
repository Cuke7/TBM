<template>
  <div>
    <v-app-bar color="primary" app>
      <v-btn icon color="white" @click="$router.push('./')">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
    </v-app-bar>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" class="px-6">
        <v-card-title class="pl-0">
          <v-icon slot="prependIcon" color="red">mdi-map-marker</v-icon>
          {{ results.stopName }}
        </v-card-title>
        <div class="mb-6 text-body-1">
          Sélectionnez une direction pour connaître l’heure de passage à votre
          arrêt.
        </div>
        <div v-if="$fetchState.pending" class="text-center">
          <v-progress-circular
            indeterminate
            color="loader2"
          ></v-progress-circular>
        </div>
        <div v-for="(result, index) in sortedResults" :key="index">
          <v-divider class="my-4"></v-divider>
          <SearchResult :result="result"> </SearchResult>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const stopID = params.stop;
    return { stopID };
  },

  async fetch() {
    this.results = await fetch(
      "https://my-servo.herokuapp.com/tbmAPI/get_infos?stopid=" +
        encodeURI(this.stopID)
    ).then((res) => res.json());
    console.log(this.results);
  },

  //   async asyncData({ params }) {
  //     const stopID = params.stop; // When calling /abc the slug will be "abc"
  //     return { stopID };
  //   },
  data: () => ({
    results: [],
  }),

  computed: {
    sortedResults() {
      if (this.results.routes) {
        return this.results.routes.sort(function compareFn(a, b) {
          if (a.lineName.includes("Tram")) return -1;
          return a.code - b.code;
        });
      } else {
        return [];
      }
    },
  },
};
</script>
