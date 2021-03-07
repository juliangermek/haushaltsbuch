<template>
  <ion-item>
    <ion-label>Monat</ion-label>
    <ion-select interface="action-sheet" v-model="selectedMonth">
      <ion-select-option
        v-for="entryMonth in entriesMonths"
        :key="entryMonth.index"
        >{{ entryMonth.displayMonth }}</ion-select-option
      >
    </ion-select>
  </ion-item>
  {{ selectedMonth }}
</template>

<script>
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/vue";

import moment from "moment";

export default {
  components: {
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
  },

  data() {
    return {
      selectedMonth: this.$store.getters.entriesMonths[
        this.$store.getters.entriesMonths.length - 1
      ].displayMonth, // Get newest month
    };
  },

  computed: {
    entriesMonths() {
      return this.$store.getters.entriesMonths;
    },
  },
  
  methods: {
    filtered_entries(activeIndex) {
      var activeMonth = this.entriesMonths.filter(
        (month) => month.index == activeIndex
      );
      var sorted_entries = this.$store.getters.sorted_entries;
      return sorted_entries.filter(
        (entry) =>
          moment(String(entry.date)).format("MM") == activeMonth[0].month &&
          moment(String(entry.date)).format("YYYY") == activeMonth[0].year
      );
    },
  },
};
</script>
