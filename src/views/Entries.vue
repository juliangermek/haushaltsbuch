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
      <entry-list></entry-list>
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
    entriesMonths() {
      return this.$store.getters.entriesMonths;
    },
    entries() {
      return this.$store.getters.entries;
    }
  },
};
</script>
