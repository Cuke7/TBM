<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-col cols="3">
        <v-avatar color="green" class="white--text">
          {{ getAvatarText(result) }}
        </v-avatar>
        <!-- <div class="primary--text text-h6">
         
        </div> -->
      </v-col>
      <v-col cols="9" @click.stop="openDialog()">
        {{ result.direction }}
      </v-col>
      <!-- <v-col cols="2">
        <v-btn
          icon
          v-if="$store.getters.isFavorite(result)"
          @click="$store.commit('removeFavorite', result)"
        >
          <v-icon> mdi-star </v-icon>
        </v-btn>
        <v-btn icon v-else @click="$store.commit('addFavorite', result)">
          <v-icon> mdi-star-outline </v-icon>
        </v-btn>
      </v-col> -->
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title style="word-break: normal" class="my-2 pb-0">
          <v-icon slot="prependIcon" color="red"> mdi-map-marker </v-icon>
          {{ result.stopPointName }}
        </v-card-title>
        <v-card-subtitle class="pb-0 my-2">
          <v-icon slot="prependIcon" color="blue"> mdi-tram </v-icon>
          {{ result.lineName }}
        </v-card-subtitle>
        <v-card-subtitle class="my-2 pb-0">
          <v-icon slot="prependIcon" color="blue">
            mdi-arrow-right-bold-box
          </v-icon>
          {{ result.direction }}
        </v-card-subtitle>
        <v-divider></v-divider>
        <div v-if="loading" class="text-center my-12">
          <v-progress-circular
            indeterminate
            color="loader2"
          ></v-progress-circular>
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
              <v-icon slot="prependIcon" color="red">
                mdi-timer-sand-empty
              </v-icon>
              {{ time.waitTimeText }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["result"],

  data: () => ({
    dialog: false,
    times: "",
    loading: false,
  }),

  methods: {
    getAvatarText(result) {
      if (result.lineName.includes("Tram")) {
        return result.lineName.split(" ")[1];
      } else {
        return result.code;
      }
    },
    openDialog() {
      let url =
        "https://my-servo.herokuapp.com/tbmAPI/get_infos?externalcode=" +
        encodeURI(this.result.externalCode) +
        "&code=" +
        encodeURI(this.result.code);

      this.loading = true;
      this.$axios.$get(url).then((res) => {
        this.times = res
          .flat()
          .sort((a, b) => (a.waitTime > b.waitTime ? 1 : -1));
        console.log(this.times);
        this.loading = false;
      });
      this.dialog = true;
    },
  },
};
</script>

<style></style>
