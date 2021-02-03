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
      entries: [],
      entriesMonths: [],
    };
  },

  beforeMount() {
    var entries = this.$store.getters.entries;

    //Sort entries
    var order = -1;
    entries.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      var results = a > b ? -1 : a < b ? 1 : 0;
      return results * order;
    });

    this.entries = entries;

    // Save newest month to store
    var newest_entry = entries[entries.length - 1];
    var newest_month = moment(String(newest_entry.date)).format("MM");
    var newest_year = moment(String(newest_entry.date)).format("YYYY");
    const newestMonth = {
      month: newest_month,
      year: newest_year,
    };

    this.$store.dispatch("updateActiveMonth", newestMonth);

    /* Create var "entriesMonths" that contains all available months in entries */
    var entriesMonths = [];
    var months_unique = [];
    var current_index = 0;

    for (var i in entries) {
      var month = moment(String(entries[i].date)).format("MM");
      var year = moment(String(entries[i].date)).format("YYYY");
      var displayMonth = moment(String(entries[i].date)).format("MMMM YYYY");

      if(!months_unique.includes(displayMonth)){ // Push if displayMonth not existent yet
        months_unique.push(displayMonth);
        entriesMonths.push({
          "index": current_index, "month": month, "year": year, "displayMonth": displayMonth
        });
        current_index++;
      }

      this.entriesMonths = entriesMonths;
    }
  },

  methods: {
    // toggleSort() {
    //   this.oldestFirst = !this.oldestFirst;
    // },
    // For sorting:
    // requires data variable: oldestFirst: false,
    // entries() {
    //   var entries = this.$store.getters.entries;

    //   // Order entries
    //   var order = this.oldestFirst ? 1 : -1;
    //   entries.sort(function(a, b) {
    //     // this wegmachen?
    //     a = new Date(a.date);
    //     b = new Date(b.date);
    //     var results = a > b ? -1 : a < b ? 1 : 0;
    //     return results * order;
    //   });

    //   return entries;
    // },
  },
};
</script>
