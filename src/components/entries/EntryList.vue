<template>
  <ion-list>
    <entry-list-item
      v-for="entry in entries_filtered"
      :key="entry.id"
      :entry="entry"
    ></entry-list-item>
  </ion-list>
</template>

<script>
import { IonList } from "@ionic/vue";
import moment from "moment";

import EntryListItem from "./EntryListItem.vue";

export default {
  props: ["entries"],
  components: {
    IonList,
    EntryListItem,
  },
  computed: {
    activeMonth() {
      return this.$store.getters.activeMonth;
    },

    entries_filtered() {
      var entries = this.entries;
      return entries.filter(
        (entries) =>
          moment(String(entries.date)).format("MM") == this.activeMonth.month &&
          moment(String(entries.date)).format("YYYY") == this.activeMonth.year
      );
    },
  },
};
</script>
