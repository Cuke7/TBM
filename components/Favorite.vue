<template>
  <div>
    <v-divider></v-divider>
    <v-card-subtitle class="my-2 py-0 font-weight-bold text-body-1">
      <v-icon slot="prependIcon" color="red"> mdi-map-marker </v-icon>
      {{ favorite.stopPointName }}
    </v-card-subtitle>

    <v-row>
      <v-col cols="5" class="pt-0">
        <v-card-subtitle class="py-0 my-2">
          <v-icon slot="prependIcon" color="blue"> mdi-tram </v-icon>
          {{ favorite.lineName }}
        </v-card-subtitle>
        <v-card-subtitle class="my-2 py-0">
          <v-icon slot="prependIcon" color="blue">
            mdi-arrow-right-bold-box
          </v-icon>
          {{ favorite.direction }}
        </v-card-subtitle>
      </v-col>
      <v-col cols="5" class="pt-0">
        <v-card-subtitle class="py-0 my-2" v-if="times[0]">
          <v-icon slot="prependIcon" color="green">
            mdi-arrow-right-box
          </v-icon>
          {{ times[0].destinationName }}
        </v-card-subtitle>
        <v-card-subtitle class="my-2 py-0" v-if="times[0]">
          <v-icon slot="prependIcon" color="red"> mdi-timer-sand-empty </v-icon>
          {{ times[0].waitTimeText }}
        </v-card-subtitle>
      </v-col>
      <v-col cols="2">
        <v-btn icon @click="$store.commit('removeFavorite', favoriteSerial)">
          <v-icon color="gold"> mdi-star </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- <div v-if="loading" class="text-center my-12">
      <v-progress-circular indeterminate color="loader2"></v-progress-circular>
    </div>
    <v-card-text v-else>
      <div v-for="(time, index) in times" :key="index" class="my-4">
        <div>
          <v-icon slot="prependIcon" color="green">
            mdi-arrow-right-box
          </v-icon>
          {{ time.destinationName }}
        </div>
        <div>
          <v-icon slot="prependIcon" color="red"> mdi-timer-sand-empty </v-icon>
          {{ time.waitTimeText }}
        </div>
      </div>
    </v-card-text> -->
  </div>
</template>

<script>
export default {
  props: ["favoriteSerial"],

  data: () => ({
    times: [],
  }),

  computed: {
    favorite() {
      return JSON.parse(this.favoriteSerial);
    },
  },

  async fetch() {
    let url =
      "https://my-servo.herokuapp.com/tbmAPI/get_infos?externalcode=" +
      encodeURI(this.favorite.externalCode) +
      "&code=" +
      encodeURI(this.favorite.code);

    this.loading = true;
    this.$axios.$get(url).then((res) => {
      this.times = res
        .flat()
        .sort((a, b) => (a.waitTime > b.waitTime ? 1 : -1));
    });
    this.loading = false;
  },
};
</script>

<style></style>
