<template>
  <ion-slides
    ref="mySlider"
    pager="true"
    :options="slideOpts"
    @ionSlideDidChange="slideChanged"
  >
    <ion-slide v-for="month in entriesMonths" :key="month.index">
      <span>{{ month.displayMonth }}</span>
    </ion-slide>
  </ion-slides>

  <ion-list>
    <entry-list-item
      v-for="entry in filtered_entries"
      :key="entry.id"
      :entry="entry"
    ></entry-list-item>
  </ion-list>
</template>

<script>
import { IonList } from "@ionic/vue";
import moment from "moment";

import EntryListItem from "./EntryListItem.vue";

import { IonSlides, IonSlide } from "@ionic/vue";

export default {
  components: {
    IonList,
    EntryListItem,
    IonSlides,
    IonSlide
  },

  data() {
    return {
      activeSlide: 0,
      slideOpts: {
        initialSlide: this.$store.getters.entriesMonths.length - 1, // Start with newest slide/month
        speed: 300,
        pagination: false,
      },
    }
  },

  computed: {
    entriesMonths() {
      return this.$store.getters.entriesMonths;
    },

    sorted_entries() {
      return this.$store.getters.sorted_entries;
    },

    filtered_entries() {
      var activeMonth = this.$store.getters.entriesMonths.filter(
        month => month.index == this.activeSlide
      );
      var sorted_entries = this.$store.getters.sorted_entries;
      return sorted_entries.filter(
        (entry) =>
          moment(String(entry.date)).format("MM") == activeMonth[0].month &&
          moment(String(entry.date)).format("YYYY") == activeMonth[0].year
      );
    },
  },

  // beforeMount() {
  //   // Initially set activeSlide
  //   this.activeSlide = this.$store.getters.entriesMonths.length - 1;
  // },

  methods: {    
    async slideChanged() {
      // Get slider
      const s = await this.$refs.mySlider.$el.getSwiper();

      // Update activeSlide and button availability
      const newActiveSlide = s.activeIndex;
      this.activeSlide = newActiveSlide;
    },
  },
};
</script>

<style scoped>
ion-slide {
  height: 50px;
}
</style>