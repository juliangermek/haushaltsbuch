<template>
  <base-layout page-title="Einträge">
    <template v-slot:actions-end>
      <ion-button router-link="/tabs/entries/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>

    <ion-content class="ion-padding">
      <month-selector :entries-months="entriesMonths"></month-selector>
      <!-- <ion-button color="medium" @click="toggleSort">Reihenfolge umkehren</ion-button> -->
      <entry-list :entries="entries"></entry-list>
    </ion-content>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon, IonContent } from "@ionic/vue";
import { add } from "ionicons/icons";

import moment from "moment";
import "moment/locale/de"; // without this line it didn't work
moment.locale("de");

import MonthSelector from "../components/entries/MonthSelector.vue";
import EntryList from "../components/entries/EntryList.vue";

export default {
  components: {
    IonButton,
    IonIcon,
    IonContent,
    MonthSelector,
    EntryList,
  },

  data() {
    return {
      add,
    };
  },

  computed: {
    entries() {
      var entries = this.$store.getters.entries;

      //Sort entries
      var order = -1;
      entries.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * order;
      });

      // Save newest month to store
      var newest_entry = entries[entries.length - 1];
      var newest_month = moment(String(newest_entry.date)).format("MM");
      var newest_year = moment(String(newest_entry.date)).format("YYYY");
      const newestMonth = {
        month: newest_month,
        year: newest_year,
      };
      this.$store.dispatch("updateActiveMonth", newestMonth);

      return entries;
    },

    entriesMonths() {
      return this.$store.getters.entriesMonths;
    },
  },
};
</script>
