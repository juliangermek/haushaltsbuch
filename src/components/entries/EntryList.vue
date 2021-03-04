<template>
  <div v-for="entryMonth in entriesMonths" :key="entryMonth.index">
    {{ entryMonth.displayMonth }}
    <br />
    <ion-list>
    <entry-list-item
      v-for="entry in filtered_entries(entryMonth.index)"
      :key="entry.id"
      :entry="entry"
    ></entry-list-item>
    </ion-list>
    <br />
  </div>
</template>

<script>
import { IonList } from "@ionic/vue";
import moment from "moment";

import EntryListItem from "./EntryListItem.vue";

export default {
  components: {
    IonList,
    EntryListItem,
  },

  data() {
    return {};
  },

  computed: {
    sorted_entries() {
      return this.$store.getters.sorted_entries;
    },
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
