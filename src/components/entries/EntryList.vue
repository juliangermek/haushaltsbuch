<template>
  <month-selector @change-active-slide="changeActiveSlide"></month-selector>
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
import MonthSelector from "./MonthSelector.vue";
export default {
  components: {
    IonList,
    EntryListItem,
    MonthSelector
  },
  data() {
    return {
      activeSlide: 0,
    }
  },
  computed: {
    sorted_entries() {
      return this.$store.getters.sorted_entries;
    },
    
    entriesMonths() {
      return this.$store.getters.entriesMonths;
    },
    filtered_entries() {
      var activeMonth = this.entriesMonths.filter(
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
  beforeMount() {
    // Initially set activeSlide
    this.activeSlide = this.entriesMonths.length - 1;
  },
  methods: {
    changeActiveSlide(newSlideIndex) {
      this.activeSlide = newSlideIndex;
    },
  },
};
</script>